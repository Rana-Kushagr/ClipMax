/**
 * Fortress Security Utilities for Sharko Studio ("Hunt the Moments")
 * OWASP Top 10 mitigation: Anti-XSS, Anti-SSRF, Client Rate Limiting, Safe Uploads
 */

// 1. Strip any HTML/Script tags, event handlers, or control characters (Anti-XSS & Prompt Injection)
export function sanitizeUserText(input: string, maxLength = 500): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // Strip HTML tags
    .replace(/javascript:|data:|vbscript:/gi, "") // Strip dangerous URI schemes
    .replace(/[\u0000-\u001F\u007F]/g, "") // Strip control chars
    .trim()
    .slice(0, maxLength);
}

// 2. Strict Video Source URL Validator (Blocks SSRF, localhost, private IPs, and non-HTTPS schemes)
const ALLOWED_VIDEO_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "twitch.tv",
  "www.twitch.tv",
  "clips.twitch.tv",
  "kick.com",
  "www.kick.com",
  "rumble.com",
  "www.rumble.com",
  "drive.google.com",
  "vimeo.com",
  "www.vimeo.com",
]);

export function validateSafeVideoUrl(rawUrl: string): {
  valid: boolean;
  sanitizedUrl: string;
  reason?: string;
} {
  const cleaned = rawUrl.trim();
  if (!cleaned) return { valid: false, sanitizedUrl: "", reason: "Please enter a video URL." };

  try {
    const parsed = new URL(cleaned);
    if (parsed.protocol !== "https:") {
      return {
        valid: false,
        sanitizedUrl: "",
        reason: "Only secure https:// video links are permitted.",
      };
    }

    const host = parsed.hostname.toLowerCase();
    // Block localhost, loopback, internal networks, and cloud metadata SSRF targets
    if (
      host === "localhost" ||
      host.startsWith("127.") ||
      host.startsWith("10.") ||
      host.startsWith("192.168.") ||
      host.startsWith("169.254.") ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host) ||
      host.endsWith(".internal") ||
      host.endsWith(".local")
    ) {
      return {
        valid: false,
        sanitizedUrl: "",
        reason: "Internal or private network addresses are blocked.",
      };
    }

    if (!ALLOWED_VIDEO_HOSTS.has(host)) {
      return {
        valid: false,
        sanitizedUrl: "",
        reason: "Supported platforms: YouTube, Twitch, Kick, Rumble, Vimeo, or Google Drive.",
      };
    }

    return { valid: true, sanitizedUrl: parsed.toString() };
  } catch {
    return {
      valid: false,
      sanitizedUrl: "",
      reason: "Invalid URL format. Please paste a full https:// link.",
    };
  }
}

// 3. Sliding-Window Action Rate Limiter (Prevents Bot Spam & Rapid Double-Click Credit Drain)
const actionTimestamps: Record<string, number[]> = {};

export function checkRateLimit(actionKey: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const history = (actionTimestamps[actionKey] || []).filter((t) => now - t < windowMs);
  if (history.length >= maxRequests) {
    return false;
  }
  history.push(now);
  actionTimestamps[actionKey] = history;
  return true;
}

// 4. Safe File Upload Validator (Checks extension + size <= 2GB + blocks executable/script files)
const ALLOWED_VIDEO_MIMES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "video/x-matroska",
]);
const ALLOWED_VIDEO_EXTS = /\.(mp4|mov|webm|mkv)$/i;

export function validateVideoUploadFile(file: File): { valid: boolean; reason?: string } {
  if (!ALLOWED_VIDEO_MIMES.has(file.type) || !ALLOWED_VIDEO_EXTS.test(file.name)) {
    return {
      valid: false,
      reason:
        "Only safe video files (.mp4, .mov, .webm, .mkv) are allowed. HTML/SVG/scripts are blocked.",
    };
  }
  const MAX_BYTES = 2 * 1024 * 1024 * 1024; // 2 GB cap
  if (file.size > MAX_BYTES) {
    return { valid: false, reason: "File exceeds the 2GB secure upload limit." };
  }
  return { valid: true };
}
