## 2026-09-23 - Adding ARIA Labels to Navbar
**Learning:** Icon-only buttons in the main navigation components were missing `aria-label` attributes, which impairs screen reader usability. Adding these is a quick win for accessibility that follows standard best practices.
**Action:** Added `aria-label` attributes to Menu, Search, Wishlist, Cart, and Close buttons in `Navbar.tsx`. Moving forward, always verify that icon-only interactive elements possess descriptive ARIA labels.
