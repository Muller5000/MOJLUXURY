## 2025-03-09 - Avoid Hardcoded Fallbacks for Secrets and API Keys
**Vulnerability:** Found hardcoded fallback values for `VITE_ADMIN_PASSCODE` in `AdminDashboard.tsx` and `VITE_PAYSTACK_PUBLIC_KEY` in `CartDrawer.tsx` when the environment variables are not present.
**Learning:** Providing hardcoded default values for critical configurations and credentials bypasses environmental security entirely when deployed environments lack correct configuration, granting open access or leaking predefined testing keys.
**Prevention:** Remove fallback values for secrets/credentials. Always validate environment configurations securely and fail/abort the operation safely with descriptive logs or user alerts if missing.
