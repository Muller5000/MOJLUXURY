const fs = require('fs');
const files = [
  'c:/Users/Admin/.gemini/antigravity/stichh/fashion/src/App.tsx',
  'c:/Users/Admin/.gemini/antigravity/stichh/fashion/src/components/ProductCard.tsx',
  'c:/Users/Admin/.gemini/antigravity/stichh/fashion/src/components/InfoHub.tsx'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/initial=\{\{\s*opacity:\s*0,\s*y:\s*20\s*\}\}/g, "initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}");
  content = content.replace(/whileInView=\{\{\s*opacity:\s*1,\s*y:\s*0\s*\}\}/g, "whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}");
  content = content.replace(/transition=\{\{\s*duration:\s*0\.5,\s*ease:\s*\[0\.16,\s*1,\s*0\.3,\s*1\]\s*\}\}/g, "transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}");
  fs.writeFileSync(f, content);
});
console.log('Update complete');
