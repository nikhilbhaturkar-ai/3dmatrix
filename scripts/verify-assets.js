const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

const assetsDir = path.join(__dirname, '..', 'public', 'videos', 'assets');
const outputDir = path.join(__dirname, '..', 'public', 'videos');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const scene1 = path.join(assetsDir, 'scene1_cad_wireframe.jpg');
const scene2 = path.join(assetsDir, 'scene2_creality_k2_printer.jpg');
const scene3 = path.join(assetsDir, 'scene3_nozzle_macro.jpg');
const scene4 = path.join(assetsDir, 'scene4_finished_reveal.jpg');
const scene5 = path.join(assetsDir, 'scene5_typography.png');

console.log('Verifying assets:');
[scene1, scene2, scene3, scene4, scene5].forEach(file => {
  console.log(path.basename(file), fs.existsSync(file) ? 'OK' : 'MISSING');
});
