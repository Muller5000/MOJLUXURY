## 2024-05-14 - Empty HMAC Key Vulnerability
**Vulnerability:** Paystack webhook verification was vulnerable to an authentication bypass. The `PAYSTACK_SECRET_KEY` defaulted to an empty string (`''`) if the environment variable was missing. An attacker could forge webhook requests by generating an HMAC signature using an empty string as the key.
**Learning:** Defaulting secret keys to empty strings rather than failing securely enables attackers to bypass signature verification entirely if the server is misconfigured.
**Prevention:** Always fail fast and securely by returning a 500 error if critical secrets are missing in the environment, rather than providing empty string fallbacks.

## 2024-05-14 - Hardcoded Fallback Passcode
**Vulnerability:** The Admin Dashboard had a hardcoded fallback passcode (`'12345'`) if the `VITE_ADMIN_PASSCODE` environment variable was not set.
**Learning:** Hardcoded secrets and fallback credentials provide an easy backdoor for attackers if a system is deployed with incomplete configuration.
**Prevention:** Remove fallback secrets and explicitly deny access or fail if the required environment variables are not configured.
