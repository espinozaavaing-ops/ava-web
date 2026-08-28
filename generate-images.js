import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogImages = [
  'apt3100.png', 'tek-cor-1100a.png', 'tek-vor-1300c.png', 'tek-flo-mass-1300d.png',
  'tek-flux-1400a.png', 'tek-flux-1400b.png', 'tek-flux-1400c.png', 'tek-dp-1610d.png',
  'tek-dp-1620a.png', 'tek-dp-1640a.png', 'tek-dp-1650a.png', 'tek-thermal-1700b.png',
  'tek-temp-2100a.png', 'tek-bar-3110a.png', 'tek-bar-3110b-d.png', 'tek-bar-3120a.png',
  'tek-bar-3120b.png', 'tek-bar-3120s.png', 'tek-bar-3800e.png', 'tek-bar-3800xa.png',
  'tek-flex-4100a.png', 'tek-flex-4100b.png', 'tek-wave-4300b.png', 'tek-wave-4300c-g.png',
  'tek-hydro-4500a-g.png', 'tek-flex-4500ad.png', 'tek-sub-4800a.png', 'tek-sub-4800b.png',
  'tek-sub-4800c.png', 'tek-sub-4800d.png'
];

const telecomImages = [
  'belfone-bf-td511.png', 'belfone-bf-td510.png', 'belfone-bf-td930.png',
  'belfone-bf-tm8250.png', 'belfone-bf-tr900.png', 'switch-poe-8p.png',
  'switch-managed-16p.png', 'antena-base-uhf.png', 'fuente-redundante-24v.png'
];

const downloadPlaceholder = (folder, filename) => {
  const dir = path.join(__dirname, 'public', 'img', folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, filename);
  const label = filename.replace('.png', '');
  const url = `https://placehold.co/500x500/1e293b/ffffff.png?text=${encodeURIComponent(label)}`;

  https.get(url, (res) => {
    const fileStream = fs.createWriteStream(filePath);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`✓ Creada: public/img/${folder}/${filename}`);
    });
  }).on('error', (err) => console.error(`Error en ${filename}:`, err.message));
};

console.log('Generando imágenes para el catálogo...');
catalogImages.forEach(img => downloadPlaceholder('catalog', img));
telecomImages.forEach(img => downloadPlaceholder('telecom', img));