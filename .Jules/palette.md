## 2025-02-28 - Missing Navigation ARIA Labels
**Learning:** High-level interactive elements like navigation headers often have icon-only buttons (like menu, search, wishlist, cart) that are missed during accessibility audits, despite being critical paths for screen reader users.
**Action:** When auditing or implementing navigation components, immediately verify that every icon-only interactive element (including toggles and action triggers) possesses a descriptive `aria-label`.
