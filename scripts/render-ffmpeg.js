const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');

const assetsDir = path.join(__dirname, '..', 'public', 'videos', 'assets');
const outputDir = path.join(__dirname, '..', 'public', 'videos');

const s1 = path.join(assetsDir, 'scene1_cad_wireframe.jpg');
const s2 = path.join(assetsDir, 'scene2_creality_k2_printer.jpg');
const s3 = path.join(assetsDir, 'scene3_nozzle_macro.jpg');
const s4 = path.join(assetsDir, 'scene4_finished_reveal.jpg');
const s5 = path.join(assetsDir, 'scene5_typography.png');
const outMp4 = path.join(outputDir, 'hero-cinematic.mp4');

// Filter complex explanation:
// 60 fps, 1920x1080
// Each clip has a smooth cinematic motion:
// Clip 1 (CAD): 0 to 1.6s. Slow push-in zoom 1.0 -> 1.08. Fade in from black at 0.0s - 0.3s.
// Clip 2 (K2 SE): 1.6 to 3.0s. Slow push-in zoom 1.02 -> 1.10.
// Clip 3 (Macro Nozzle): 3.0 to 4.2s. Smooth horizontal micro-pan and subtle zoom 1.0 -> 1.06.
// Clip 4 (Finished Reveal): 4.2 to 5.2s. Slow rotation/pan zoom 1.05 -> 1.00.
// Clip 5 (Typography): 5.2 to 6.0s. Subtle scale 1.00 -> 1.03. Fade to black 5.7s - 6.0s.

// Total video duration: exactly 6.00 seconds.
// Overlaps with xfade (duration=0.4s):
// offset 1: 1.3s
// offset 2: 2.6s
// offset 3: 3.7s
// offset 4: 4.8s
// Clip 5 finishes at 6.0s.

const fps = 60;
// durations in seconds before transition overlap
// v0: 1.7s -> 102 frames
// v1: 1.7s -> 102 frames
// v2: 1.5s -> 90 frames
// v3: 1.5s -> 90 frames
// v4: 1.6s -> 96 frames

const filterComplex = [
  // Scene 1: CAD Wireframe (102 frames = 1.7s) - push in + fade in
  `[0:v]scale=3840x2160,zoompan=z='min(zoom+0.0006,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=102:s=1920x1080:fps=${fps},fade=t=in:st=0:d=0.25[v0]`,

  // Scene 2: Creality K2 SE Printer (102 frames = 1.7s) - push in
  `[1:v]scale=3840x2160,zoompan=z='min(zoom+0.0007,1.10)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=102:s=1920x1080:fps=${fps}[v1]`,

  // Scene 3: Macro Nozzle (90 frames = 1.5s) - slow micro pan & zoom
  `[2:v]scale=3840x2160,zoompan=z='min(zoom+0.0006,1.07)':x='iw/2-(iw/zoom/2)+on*0.4':y='ih/2-(ih/zoom/2)':d=90:s=1920x1080:fps=${fps}[v2]`,

  // Scene 4: Finished Reveal (90 frames = 1.5s) - orbit pan
  `[3:v]scale=3840x2160,zoompan=z='1.06-on*0.0005':x='iw/2-(iw/zoom/2)-on*0.5':y='ih/2-(ih/zoom/2)':d=90:s=1920x1080:fps=${fps}[v3]`,

  // Scene 5: Typography (96 frames = 1.6s) - subtle breathe + fade out to black
  `[4:v]scale=3840x2160,zoompan=z='min(zoom+0.0003,1.04)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=96:s=1920x1080:fps=${fps},fade=t=out:st=1.2:d=0.4[v4]`,

  // Transitions (xfade fade transition, 0.4s = 24 frames overlap)
  // v0 (1.7s) + v1 (1.7s) -> offset = 1.3s
  `[v0][v1]xfade=transition=fade:duration=0.4:offset=1.3[x1]`,
  // x1 (1.3 + 1.7 = 3.0s) + v2 (1.5s) -> offset = 2.6s
  `[x1][v2]xfade=transition=fade:duration=0.4:offset=2.6[x2]`,
  // x2 (2.6 + 1.5 = 4.1s) + v3 (1.5s) -> offset = 3.7s
  `[x2][v3]xfade=transition=fade:duration=0.4:offset=3.7[x3]`,
  // x3 (3.7 + 1.5 = 5.2s) + v4 (1.6s) -> offset = 4.8s -> total 4.8 + 1.6 = 6.4s, trim to 6.0s
  `[x3][v4]xfade=transition=fade:duration=0.4:offset=4.8,trim=duration=6.0,format=yuv420p[vfinal]`
].join(';');

const cmd = `"${ffmpeg}" -y -loop 1 -t 2.0 -i "${s1}" -loop 1 -t 2.0 -i "${s2}" -loop 1 -t 2.0 -i "${s3}" -loop 1 -t 2.0 -i "${s4}" -loop 1 -t 2.0 -i "${s5}" -filter_complex "${filterComplex}" -map "[vfinal]" -c:v libx264 -preset slow -crf 17 -movflags +faststart "${outMp4}"`;

console.log('Running FFmpeg rendering...');
const start = Date.now();
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Render complete in ${((Date.now() - start) / 1000).toFixed(1)}s!`);
  const stat = fs.statSync(outMp4);
  console.log(`Output: ${outMp4} (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
} catch (err) {
  console.error('Render failed:', err);
}
