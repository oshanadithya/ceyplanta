import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import pkg from "react-router-sitemap"; // Import the entire package
import routes from "./src/routes.js"; // Ensure this exports an array of routes

const Sitemap = pkg.default; // Use the default export

// Fix __dirname issue in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  const sitemap = new Sitemap(routes)  // Now this should work as a constructor
    .build("https://www.ceyplanta.com") // Change this to your domain
    .save(path.join(__dirname, "public", "sitemap.xml"));

  console.log("✅ Sitemap generated successfully!");
}

generateSitemap();
