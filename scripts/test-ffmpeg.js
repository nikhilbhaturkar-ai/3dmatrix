const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

try {
  const filters = execSync(`"${ffmpeg}" -filters`, { encoding: 'utf-8' });
  console.log('xfade:', filters.includes('xfade'));
  console.log('zoompan:', filters.includes('zoompan'));
  console.log('drawtext:', filters.includes('drawtext'));
  console.log('vignette:', filters.includes('vignette'));
} catch (err) {
  console.error(err);
}
