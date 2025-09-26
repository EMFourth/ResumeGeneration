#!/usr/bin/env node

/**
 * Script to fetch and update ads.txt file from Ezoic
 * Usage: node scripts/update-ads-txt.js [domain]
 */

import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get domain from command line argument or environment variable
const domain = process.argv[2] || process.env.DOMAIN;

if (!domain) {
  console.error('Error: Domain is required');
  console.error('Usage: node scripts/update-ads-txt.js your-domain.com');
  console.error('Or set DOMAIN environment variable');
  process.exit(1);
}

// Ezoic ads.txt manager URL
const ezoicUrl = `https://srv.adstxtmanager.com/19390/${domain}`;
const outputPath = path.join(__dirname, '../public/ads.txt');

console.log(`Fetching ads.txt from: ${ezoicUrl}`);

https.get(ezoicUrl, (res) => {
  if (res.statusCode !== 200) {
    console.error(`HTTP ${res.statusCode}: ${res.statusMessage}`);
    console.error('Make sure your domain is correctly configured with Ezoic');
    
    // Create a placeholder file with instructions
    createPlaceholderFile(domain, outputPath);
    process.exit(1);
  }

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Add a header comment to the ads.txt file
    const header = `# Ads.txt file for ${domain}\n# Generated from Ezoic ads.txt manager\n# Last updated: ${new Date().toISOString()}\n\n`;
    const content = header + data;

    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`Successfully updated ads.txt at ${outputPath}`);
    console.log(`File size: ${content.length} bytes`);
  });

}).on('error', (err) => {
  console.error('Error fetching ads.txt:', err.message);
  console.error('This might be due to network restrictions or domain not being configured with Ezoic');
  
  // Create a placeholder file with instructions
  createPlaceholderFile(domain, outputPath);
  console.log('Created placeholder ads.txt file with configuration instructions');
});

function createPlaceholderFile(domain, outputPath) {
  const placeholderContent = `# Ads.txt file for ${domain}
# 
# This file was generated as a placeholder because the Ezoic ads.txt service
# could not be reached or the domain is not yet configured with Ezoic.
# 
# To complete the setup:
# 1. Ensure your domain (${domain}) is registered with Ezoic
# 2. Configure Ezoic ads.txt management for your site
# 3. Re-run this script: npm run update-ads-txt ${domain}
# 
# Alternative setup methods:
# - Use server redirects (see vercel.json or _redirects files)
# - Manually copy content from: https://srv.adstxtmanager.com/19390/${domain}
# 
# For more information, see EZOIC_SETUP.md

# Placeholder entry - replace with actual Ezoic ads.txt content
# google.com, pub-7524647518323966, DIRECT, f08c47fec0942fa0
`;
  
  fs.writeFileSync(outputPath, placeholderContent, 'utf8');
}