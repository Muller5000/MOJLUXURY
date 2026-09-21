## 2024-05-24 - Accessibility on Icon-Only Buttons in CartDrawer
**Learning:** Icon-only buttons for critical actions (closing cart, removing items, adjusting quantities) lacked ARIA labels, titles, and proper disabled states, reducing accessibility for screen reader users.
**Action:** Always add `aria-label` and `title` attributes to icon-only buttons and implement visual/functional disabled states (e.g. opacity-50 cursor-not-allowed) when the action is invalid (like decreasing quantity below 1).
