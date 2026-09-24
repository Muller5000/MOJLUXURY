## 2024-03-24 - Missing ARIA Labels on Navigation Icons
**Learning:** Icon-only navigation buttons (menu, search, wishlist, cart) consistently lacked accessible names, making them completely opaque to screen reader users. The visual iconography was clear, but the semantic meaning was missing.
**Action:** Always verify that every interactive element relying solely on visual cues (like icons) has an explicit `aria-label` or visually hidden text to convey its purpose.
