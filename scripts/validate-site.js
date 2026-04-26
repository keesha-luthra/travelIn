const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../public');
const ignoredSchemes = /^(https?:|mailto:|tel:|#|javascript:)/i;
const failures = [];

function stripHtmlComments(source) {
  return source.replace(/<!--[\s\S]*?-->/g, '');
}

function existsRelative(fromFile, reference) {
  const cleanReference = reference.split('#')[0].split('?')[0];
  if (!cleanReference || ignoredSchemes.test(cleanReference)) {
    return true;
  }

  const targetPath = cleanReference.startsWith('/')
    ? path.join(root, cleanReference.slice(1))
    : path.resolve(path.dirname(fromFile), cleanReference);
  return fs.existsSync(targetPath);
}

function collectHtmlFiles(dir, base = '') {
  const skipDirs = new Set(['node_modules', '.git']);
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && skipDirs.has(entry.name)) {
      continue;
    }

    const rel = path.join(base, entry.name).replace(/\\/g, '/');
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectHtmlFiles(full, rel));
      continue;
    }

    if (entry.name.endsWith('.html')) {
      files.push(rel);
    }
  }

  return files;
}

function collectCssFiles() {
  const cssDir = path.join(root, 'css');
  if (!fs.existsSync(cssDir)) {
    return [];
  }

  return fs
    .readdirSync(cssDir)
    .filter((file) => file.endsWith('.css'))
    .map((file) => path.join('css', file).replace(/\\/g, '/'));
}

const htmlFiles = collectHtmlFiles(root);
const cssFiles = collectCssFiles();

for (const file of htmlFiles) {
  const filePath = path.join(root, file);
  const source = stripHtmlComments(fs.readFileSync(filePath, 'utf8'));
  const refs = [...source.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);

  for (const ref of refs) {
    if (!existsRelative(filePath, ref)) {
      failures.push(`${file}: missing referenced file "${ref}"`);
    }
  }
}

for (const file of cssFiles) {
  const filePath = path.join(root, file);
  const source = fs.readFileSync(filePath, 'utf8');
  const refs = [...source.matchAll(/url\(["']?([^"')]+)["']?\)/gi)].map((match) => match[1]);

  for (const ref of refs) {
    if (!existsRelative(filePath, ref)) {
      failures.push(`${file}: missing referenced file "${ref}"`);
    }
  }
}

if (failures.length > 0) {
  console.error('Site validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML files and ${cssFiles.length} CSS files.`);
