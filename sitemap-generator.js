import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemap = new SitemapStream({ hostname: 'https://www.ceyplanta.com' });

// Define your routes manually or dynamically
const routes = [
  "/",
  "/services-products",
  "/buy-greens",
  "/offers",
  "/contact-us",
  "/about-us"
];

routes.forEach(route => {
  sitemap.write({ url: route, changefreq: 'daily', priority: 0.7 });
});

sitemap.end();

streamToPromise(sitemap).then(sm => {
  fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sm);
  console.log('✅ Sitemap generated successfully!');
});
