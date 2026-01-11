import fs from 'fs';
import path from 'path';

const src = path.resolve('build/tokens/typography.css');
const dest = path.resolve('dist/styles/typography.css');

if (!fs.existsSync(src)) {
  console.warn('⚠️ typography.css not found, skipping copy');
  process.exit(0);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);

console.log('✅ typography.css copied to dist/styles');
