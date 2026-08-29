import fs from 'fs';
import path from 'path';

const certsDir = path.resolve('public/certificates');
const files = fs.readdirSync(certsDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));

console.log(`Found ${files.length} certificates.`);
files.forEach((file, index) => {
  const ext = path.extname(file);
  const target = path.join(certsDir, `cert-${index + 1}.jpg`);
  fs.copyFileSync(path.join(certsDir, file), target);
  console.log(`Copied ${file} -> cert-${index + 1}.jpg`);
});
