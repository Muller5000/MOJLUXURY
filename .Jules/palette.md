## 2025-02-20 - Icon-only Button Accessibility
**Learning:** Found multiple instances of icon-only buttons (Close, Remove, Decrease/Increase Quantity) in `CartDrawer.tsx` lacking `aria-label`s and visible keyboard focus states.
**Action:** Applied `aria-label`s and `focus-visible` Tailwind classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500` or `ring-red-500`) to ensure these elements are discoverable by screen readers and properly highlighted during keyboard navigation without affecting default mouse interaction.
