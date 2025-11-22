/**
 * Post-build script to organize LLM files into section-specific directories
 * This script moves files from the root build directory into their respective section folders
 */

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');

// Mapping of source files to destination paths
const fileMappings = [
  // Embedded Wallets
  { from: 'llms-embedded-wallets.txt', to: 'embedded-wallets/llms.txt' },
  { from: 'llms-embedded-wallets-full.txt', to: 'embedded-wallets/llms-full.txt' },
  // SDK
  { from: 'llms-sdk.txt', to: 'sdk/llms.txt' },
  { from: 'llms-sdk-full.txt', to: 'sdk/llms-full.txt' },
  // Smart Accounts Kit
  { from: 'llms-smart-accounts-kit.txt', to: 'smart-accounts-kit/llms.txt' },
  { from: 'llms-smart-accounts-kit-full.txt', to: 'smart-accounts-kit/llms-full.txt' },
  // Snaps
  { from: 'llms-snaps.txt', to: 'snaps/llms.txt' },
  { from: 'llms-snaps-full.txt', to: 'snaps/llms-full.txt' },
  // Wallet
  { from: 'llms-wallet.txt', to: 'wallet/llms.txt' },
  { from: 'llms-wallet-full.txt', to: 'wallet/llms-full.txt' },
  // Tutorials
  { from: 'llms-tutorials.txt', to: 'tutorials/llms.txt' },
  { from: 'llms-tutorials-full.txt', to: 'tutorials/llms-full.txt' },
  // Dashboard
  { from: 'llms-dashboard.txt', to: 'developer-tools/dashboard/llms.txt' },
  { from: 'llms-dashboard-full.txt', to: 'developer-tools/dashboard/llms-full.txt' },
  // Services
  { from: 'llms-services.txt', to: 'services/llms.txt' },
  { from: 'llms-services-full.txt', to: 'services/llms-full.txt' },
];

function organizeFiles() {
  if (!fs.existsSync(buildDir)) {
    console.warn(`Build directory not found: ${buildDir}`);
    return;
  }

  let movedCount = 0;
  let skippedCount = 0;

  for (const mapping of fileMappings) {
    const sourcePath = path.join(buildDir, mapping.from);
    const destPath = path.join(buildDir, mapping.to);
    const destDir = path.dirname(destPath);

    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      console.log(`Skipping ${mapping.from} (not found)`);
      skippedCount++;
      continue;
    }

    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log(`Created directory: ${destDir}`);
    }

    // Move the file
    fs.renameSync(sourcePath, destPath);
    console.log(`Moved: ${mapping.from} -> ${mapping.to}`);
    movedCount++;
  }

  console.log(`\nOrganized ${movedCount} files, skipped ${skippedCount} files`);
}

organizeFiles();

