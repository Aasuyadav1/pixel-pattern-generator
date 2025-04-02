
import * as fs from 'fs';
import * as path from 'path';

// Read the current package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add Next.js scripts without modifying existing ones
packageJson.scripts = {
  ...packageJson.scripts,
  "dev:next": "next dev",
  "build:next": "next build",
  "start:next": "next start"
};

// Write the updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('Updated package.json with Next.js scripts');
