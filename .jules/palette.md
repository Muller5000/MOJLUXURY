## 2024-05-18 - Missing ARIA Labels in CartDrawer
**Learning:** Found multiple icon-only buttons in the CartDrawer component that lacked `aria-label` attributes and focus-visible states, making them inaccessible to screen readers and keyboard users.
**Action:** Added semantic `aria-label`s and `focus-visible` classes to the close button, remove item button, and quantity adjustment buttons. Always ensure icon-only buttons have descriptive ARIA labels and clear focus states.
