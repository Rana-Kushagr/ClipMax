# Sharko Engineering Guardrails & Security Policies

## 1. Zero Secret Leaks & Client Protection
- Never place secret API keys, webhook signing secrets, database passwords, or service-role keys (OpenAI, Gemini, Anthropic, Supabase, Stripe, Telegram) in client code or `VITE_*` / `NEXT_PUBLIC_*` environment variables.
- All LLM completions, video transcodes, Telegram bot dispatches, and payments MUST execute solely through hardened backend proxy endpoints with short-lived tokens and rate limiting.

## 2. Row-Level Security (RLS) & Multi-Tenant Isolation
- Enforce Row-Level Security (`auth.uid() = user_id`) on every database table.
- Never execute database mutations or queries without tenant/user boundary checks.

## 3. Server-Side Input Validation & Anti-SSRF
- Validate all incoming user inputs with strict allowlists and parameterized queries on the server.
- Block private IP addresses, loopback addresses (`127.0.0.1`, `localhost`), and internal VPC metadata endpoints (`169.254.169.254`) on all video ingestion and webhook handlers.

## 4. Server-Side Ledger & Anti-Tampering
- Calculate all checkout prices, credit balances, and deduction amounts strictly on the backend ledger. Never trust browser-supplied price or quota quantities.

## 5. India DPDP Act 2023 Compliance
- Retain temporary raw video streams for no more than 72 hours before permanent automated purging.
- Honor Data Principal rights (Access, Correction, Erasure, Withdrawal, Nomination) and support direct Grievance Redressal within statutory SLAs.
