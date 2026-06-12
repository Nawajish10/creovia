import { getServiceRoleClient } from "@/lib/supabase";
import { AdminOcrClient } from "./AdminOcrClient";

export const metadata = {
  title: "OCR Metrics Debugger | Axcrivo Admin",
};

export default async function AdminOcrPage() {
  try {
    const supabase = getServiceRoleClient();

    // 1. Fetch verification uploads along with linked asset titles
    const { data: uploads, error } = await supabase
      .from("verification_uploads")
      .select(`
        *,
        valuation_assets (
          title,
          platform
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // 2. Pre-generate signed URLs for private files (1-hour expiry)
    const uploadsWithUrls = await Promise.all(
      (uploads || []).map(async (upload: any) => {
        try {
          const { data } = await supabase.storage
            .from("verification-proofs")
            .createSignedUrl(upload.file_url, 3600);

          return {
            ...upload,
            signed_url: data?.signedUrl || "",
          };
        } catch (err) {
          console.error(`Failed to sign URL for file ${upload.file_url}:`, err);
          return {
            ...upload,
            signed_url: "",
          };
        }
      })
    );

    return <AdminOcrClient initialUploads={uploadsWithUrls} />;
  } catch (err: any) {
    return (
      <div className="p-8">
        <div className="bg-error-container text-on-error-container p-6 rounded-2xl border border-error/20">
          <h2 className="font-headline-md font-bold">OCR Inspection Configuration Error</h2>
          <p className="mt-2 text-sm opacity-90">
            Failed to connect to database or fetch upload entries. Ensure Supabase keys are configured.
          </p>
          <pre className="mt-4 p-4 bg-error/10 rounded-xl text-xs font-mono overflow-auto">{err.message}</pre>
        </div>
      </div>
    );
  }
}
