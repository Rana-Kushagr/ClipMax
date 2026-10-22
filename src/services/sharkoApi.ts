/**
 * Centralized Zero-Failure Backend API Client for Sharko Studio ("Hunt the Moments")
 * Guarantees zero unhandled promise rejections, AbortController timeouts, and graceful offline fallback.
 */

import { BountyCampaign } from "../types/studio";

export const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) || "";

export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
  isOfflineFallback?: boolean;
}

export async function safeApiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  timeoutMs = 15000
): Promise<ApiResponse<T>> {
  if (!API_BASE_URL) {
    return { ok: false, isOfflineFallback: true, error: "Backend URL not configured yet" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(options.headers || {}),
      },
    });
    clearTimeout(timer);

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      return {
        ok: false,
        error: (errBody as { message?: string })?.message || `Server responded with ${response.status}`,
      };
    }

    const data = (await response.json()) as T;
    return { ok: true, data };
  } catch (err: unknown) {
    clearTimeout(timer);
    const isAbort = err instanceof Error && err.name === "AbortError";
    return {
      ok: false,
      isOfflineFallback: true,
      error: isAbort ? "Request timed out after 15s" : "Network connection unavailable",
    };
  }
}

/* =========================================================================
   TYPED SHARKO API CLIENT METHODS
   ========================================================================= */

export interface IngestJobPayload {
  sourceUrl: string;
  genres: string[];
  customPrompt?: string;
  timeframeStartSec: number;
  timeframeEndSec: number;
  stylePreset: string;
}

export interface ExportClipPayload {
  clipId: string;
  framingMode: string;
  aspectRatio: string;
  captionPreset: string;
  stripFillerWords?: boolean;
  aiBrollEnabled?: boolean;
  transcriptTokens?: string[];
}

export interface BotApprovalPayload {
  clipId: string;
  targetNetworks: string[];
  scheduledAtIso: string;
  timezone?: string;
}

export interface BrandCampaignPayload {
  brandName: string;
  contactEmail: string;
  budgetUsd: number;
  niche: string;
  sourceVideoUrl: string;
}

export interface CheckoutPayload {
  planId: "starter" | "pro" | "agency";
  billingCycle: "monthly" | "annual";
}

export const sharkoApi = {
  /**
   * Fetch live verified escrow bounty campaigns
   */
  async fetchBounties(signal?: AbortSignal): Promise<ApiResponse<{ campaigns: BountyCampaign[] }>> {
    return safeApiRequest<{ campaigns: BountyCampaign[] }>("/api/v1/bounties", {
      method: "GET",
      signal,
    });
  },

  /**
   * Register a new pre-funded brand bounty escrow pool
   */
  async submitBrandCampaign(
    payload: BrandCampaignPayload
  ): Promise<ApiResponse<{ id: string; message: string }>> {
    return safeApiRequest<{ id: string; message: string }>("/api/v1/bounties/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Ingest a long video URL into the autonomous cutting engine
   */
  async ingestVideoJob(
    payload: IngestJobPayload
  ): Promise<ApiResponse<{ jobId: string; status: string }>> {
    return safeApiRequest<{ jobId: string; status: string }>("/api/v1/jobs/ingest", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Render and export an HD clip with chosen framing and caption preset
   */
  async exportClipJob(
    clipId: string,
    payload: ExportClipPayload
  ): Promise<ApiResponse<{ exportUrl?: string; message: string }>> {
    return safeApiRequest<{ exportUrl?: string; message: string }>(
      `/api/v1/clips/${encodeURIComponent(clipId)}/export`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },

  /**
   * Queue and approve social post with verified OAuth bot
   */
  async approveBotSchedule(
    payload: BotApprovalPayload
  ): Promise<ApiResponse<{ scheduled: boolean; message: string }>> {
    return safeApiRequest<{ scheduled: boolean; message: string }>("/api/v1/bot/approve", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /**
   * Create Stripe/Checkout session for subscription or credit purchase
   */
  async createCheckoutSession(
    payload: CheckoutPayload
  ): Promise<ApiResponse<{ checkoutUrl?: string; message?: string }>> {
    return safeApiRequest<{ checkoutUrl?: string; message?: string }>(
      "/api/v1/billing/checkout",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },
};
