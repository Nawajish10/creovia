"use server";

import { cookies } from "next/headers";
import { randomBytes } from "crypto";

// In-memory rate limiting (resets on server restart; acceptable for this use case)
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (record) {
    if (record.lockedUntil > now) {
      return { allowed: false, retryAfter: Math.ceil((record.lockedUntil - now) / 1000) };
    }
    if (record.lockedUntil <= now && record.count >= MAX_ATTEMPTS) {
      // Lock expired — reset
      loginAttempts.delete(identifier);
    }
  }
  return { allowed: true };
}

function recordFailedAttempt(identifier: string) {
  const now = Date.now();
  const record = loginAttempts.get(identifier) || { count: 0, lockedUntil: 0 };
  record.count += 1;
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
  }
  loginAttempts.set(identifier, record);
}

function clearAttempts(identifier: string) {
  loginAttempts.delete(identifier);
}

export async function verifyCredentials(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const envUser = process.env.ADMIN_USERNAME;
  const envPass = process.env.ADMIN_PASSWORD;

  if (!envUser || !envPass) {
    throw new Error("Admin credentials are not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD environment variables.");
  }

  const identifier = `creds:${username}`;
  const rateCheck = checkRateLimit(identifier);
  if (!rateCheck.allowed) {
    return { success: false, error: `Too many failed attempts. Try again in ${rateCheck.retryAfter} seconds.` };
  }

  if (username === envUser && password === envPass) {
    clearAttempts(identifier);
    return { success: true };
  }

  recordFailedAttempt(identifier);
  return { success: false, error: "Invalid username or password" };
}

export async function verifyPasscode(formData: FormData) {
  const passcode = formData.get("passcode") as string;
  const envPasscode = process.env.ADMIN_PASSCODE;

  if (!envPasscode) {
    throw new Error("Admin passcode is not configured. Set ADMIN_PASSCODE environment variable.");
  }

  const identifier = "passcode";
  const rateCheck = checkRateLimit(identifier);
  if (!rateCheck.allowed) {
    return { success: false, error: `Too many failed attempts. Try again in ${rateCheck.retryAfter} seconds.` };
  }

  if (passcode === envPasscode) {
    clearAttempts(identifier);

    // Generate a cryptographically secure session token
    const sessionToken = randomBytes(32).toString("hex");

    const cookieStore = await cookies();
    cookieStore.set({
      name: "admin_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 // 24 hours
    });

    // Store valid token in a server-side cookie for verification
    cookieStore.set({
      name: "admin_session_valid",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return { success: true };
  }

  recordFailedAttempt(identifier);
  return { success: false, error: "Invalid passcode" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  cookieStore.delete("admin_session_valid");
  return { success: true };
}
