## 2025-02-28 - Hardcoded Passcode
**Vulnerability:** Weak, easily-guessable default passcode `12345` was used as a fallback if the environment variable `VITE_ADMIN_PASSCODE` was missing.
**Learning:** Security mechanisms failed open to an insecure state.
**Prevention:** Implement fail-safe defaults. Ensure authentication checks fail securely when configuration is missing.
