## 2024-05-15 - ARIA Labels on Icon Buttons
**Learning:** Found several icon-only buttons (using SVG/Lucide icons) missing `aria-label`s in `CartDrawer.tsx`, `WishlistDrawer.tsx`, and `Lookbook.tsx`. This makes them invisible/unusable to screen readers.
**Action:** Always check for `aria-label` when using `<X />`, `<Trash2 />`, `<Minus />`, `<Plus />`, or raw `<svg>` elements inside a `<button>`. Added descriptive labels like "Close cart" or "Increase quantity".
