import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export function getServiceRoleClient() {
  if (!supabaseServiceKey) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY — cannot perform privileged operations.")
  if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  })
}

export async function getAuthenticatedUser(request?: any) {
  let token = "";

  // 1. Try Authorization header
  if (request && typeof request.headers?.get === "function") {
    const authHeader = request.headers.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  // 2. Try cookie (using next/headers dynamically to prevent static export issues)
  if (!token) {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get("sb-access-token")?.value || "";
    } catch (e) {
      // Cookies might not be available in non-request contexts
    }
  }

  if (!token) {
    return { user: null, error: new Error("No authorization token found"), token: null };
  }

  const client = createClient(supabaseUrl!, supabaseAnonKey!, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  });

  const { data: { user }, error } = await client.auth.getUser();
  return { user, error, token };
}
