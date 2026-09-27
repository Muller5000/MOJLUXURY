## 2026-09-27 - Icon-only buttons lacking ARIA labels
**Learning:** Found an accessibility issue pattern across the app where core navigational and interactive elements (like the cart, wishlist, menu, search, and close buttons) using Lucide React icons had no accessible text alternatives (`aria-label`s) for screen readers, making them practically invisible to assistive technologies.
**Action:** Adding `aria-label` to all core structural components and ensure future newly added icon-only buttons always include descriptive `aria-label`s.
