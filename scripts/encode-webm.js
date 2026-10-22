const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

const videoDir = path.join(__dirname, '..', 'public', 'videos');
const mp4Path = path.join(videoDir, 'hero-cinematic.mp4');
const webmPath = path.join(videoDir, 'hero-cinematic.webm');
const posterPath = path.join(videoDir, 'hero-cinematic-poster.jpg');

console.log('Generating poster frame from 00:00:00.600...');
execSync(`"${ffmpeg}" -y -ss 00:00:00.600 -i "${mp4Path}" -vframes 1 -q:v 2 "${posterPath}"`, { stdio: 'inherit' });
console.log('Poster created:', fs.statSync(posterPath).size, 'bytes');

console.log('Generating WebM (VP9) version...');
execSync(`"${ffmpeg}" -y -i "${mp4Path}" -c:v libvpx-vp9 -b:v 3M -minrate 1.5M -maxrate 4.5M -crf 24 -threads 4 -speed 2 "${webmPath}"`, { stdio: 'inherit' });
console.log('WebM created:', fs.statSync(webmPath).size, 'bytes');
