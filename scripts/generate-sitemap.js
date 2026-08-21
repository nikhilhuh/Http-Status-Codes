import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://http-status-codes-phi.vercel.app';

// Read statusCodes.ts and parse the codes
const statusCodesPath = path.join(__dirname, '..', 'src', 'data', 'statusCodes.ts');
const statusCodesContent = fs.readFileSync(statusCodesPath, 'utf8');

// Simple regex to find "code: 123"
const codeRegex = /code:\s*(\d{3})/g;
const statusCodes = [];
let match;
while ((match = codeRegex.exec(statusCodesContent)) !== null) {
  statusCodes.push(match[1]);
}

// Generate sitemap XML
const sitemapStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

const sitemapEnd = `\n</urlset>`;

const staticRoutes = [
  '/',
  '/status-codes',
  '/compare',
  '/playground',
  '/quiz',
  '/about'
];

const urls = [];

// Add static routes
for (const route of staticRoutes) {
  urls.push(`
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`);
}

// Add status code routes
for (const code of statusCodes) {
  urls.push(`
  <url>
    <loc>${SITE_URL}/status-codes/${code}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
}

const sitemapContent = sitemapStart + urls.join('') + sitemapEnd;

// Write sitemap.xml to public folder
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);

// Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /
Disallow: /assets/

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

console.log(`Successfully generated sitemap.xml with ${urls.length} URLs and robots.txt`);
