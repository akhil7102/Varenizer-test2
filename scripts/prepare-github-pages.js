#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🚀 Preparing Verinizer for GitHub Pages deployment...\n');

// Files and directories to remove for web-only deployment
const filesToRemove = [
  'src-tauri',
  'tauri.conf.json',
  'run-varenizer.bat',
  'run-varenizer.ps1', 
  'run-varenizer.sh',
  'standalone.html',
  'verify-setup.js',
  '.tauriremove',
  'Cargo.toml',
  'build.rs'
];

// Remove unnecessary files
let removedCount = 0;
filesToRemove.forEach(item => {
  const itemPath = path.join(rootDir, item);
  try {
    if (fs.existsSync(itemPath)) {
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(itemPath);
      }
      console.log(`✅ Removed: ${item}`);
      removedCount++;
    }
  } catch (error) {
    console.log(`⚠️ Could not remove ${item}: ${error.message}`);
  }
});

// Clean up any unused components that might cause build issues
const unusedComponents = [
  'components/AudioSettings.tsx',
  'components/BottomControlPanel.tsx', 
  'components/OutputSettings.tsx',
  'components/RecentRecordings.tsx',
  'components/RecordingControls.tsx',
  'components/ScreenSelection.tsx',
  'components/SettingsModal.tsx'
];

unusedComponents.forEach(component => {
  const componentPath = path.join(rootDir, component);
  try {
    if (fs.existsSync(componentPath)) {
      fs.unlinkSync(componentPath);
      console.log(`✅ Removed unused component: ${component}`);
      removedCount++;
    }
  } catch (error) {
    console.log(`⚠️ Could not remove ${component}: ${error.message}`);
  }
});

console.log(`\n🎉 Cleanup complete! Removed ${removedCount} items.`);
console.log('📝 Your application is now optimized for GitHub Pages deployment.');
console.log('\n📋 Next steps:');
console.log('1. Run: npm run build:github');
console.log('2. Push to GitHub repository: verenizerwebapp2');
console.log('3. Enable GitHub Pages in repository settings');
console.log('4. Your app will be live at: https://YOUR_USERNAME.github.io/verenizerwebapp2/\n');

// Create a summary of the current configuration
const configSummary = {
  repository: 'verenizerwebapp2',
  basePath: '/verenizerwebapp2/',
  buildScript: 'npm run build:github',
  previewScript: 'npm run preview:github',
  deploymentUrl: 'https://YOUR_USERNAME.github.io/verenizerwebapp2/',
  features: [
    'Automatic GitHub Actions deployment',
    'Dark mode only (as requested)',
    'VirusTotal API integration',
    'Local storage persistence',
    'Responsive design',
    'PWA features',
    'Usage limits with Discord upgrades'
  ]
};

fs.writeFileSync(
  path.join(rootDir, 'github-pages-config.json'), 
  JSON.stringify(configSummary, null, 2)
);

console.log('📄 Created github-pages-config.json with deployment details.');