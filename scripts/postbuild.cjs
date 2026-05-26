const { execSync } = require('child_process');

if (process.env.VERCEL === '1' || process.env.VERCEL === 'true' || process.env.VERCEL) {
  console.log('Vercel environment detected. Skipping react-snap to avoid Chromium launching issues.');
} else {
  console.log('Local/CI environment detected. Running react-snap for static pre-rendering...');
  try {
    execSync('npx react-snap', { stdio: 'inherit' });
  } catch (error) {
    console.error('react-snap execution failed:', error.message);
    process.exit(1);
  }
}
