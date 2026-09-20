## 2024-05-18 - Missing ARIA labels on Icon-only buttons
**Learning:** Found multiple icon-only buttons in the main navigation (Menu, Search, Wishlist, Cart) lacking `aria-label`s, making them difficult to use with screen readers. This is a common pattern when adding aesthetic features without testing with a screen reader.
**Action:** Consistently add `aria-label`s to any button whose entire content is an icon (or an icon and an invisible badge) across the app to ensure keyboard and screen reader accessibility.
