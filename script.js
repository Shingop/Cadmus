// ── Tab switching ──
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');
 
document.addEventListener("DOMContentLoaded", () => {
  renderFiles();
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});
 
// Preload images used inside files
const preloadImages = [
  "https://github.com/Shingop/Cadmus/blob/main/scplogo.png?raw=true",
  "https://raw.githubusercontent.com/Shingop/imagehosting/refs/heads/main/cadmuslogo2.png",
  "https://raw.githubusercontent.com/Shingop/imagehosting/refs/heads/main/cadmuslogo3.png"
];

preloadImages.forEach(src => {
  const img = new Image();
  img.src = src;
});

// ── File system ──
// "{ name: 'scp/', type: 'folder', content: 'null' }," = file
let files = [
  { name: 'readme.txt', type: 'file', content: `
   <div class="doc-header">
      <img alt="" src="https://github.com/Shingop/Cadmus/blob/main/scplogo.png?raw=true" />
      <div>
        <div class="doc-header-tagline">SECURE. CONTAIN. PROTECT.</div>
        <div class="doc-header-title">SCP FOUNDATION</div>
      </div>
    </div>
    <hr class="doc-divider" />
    <center>
  <h2>Welcome to the 'CADMUS INSTITUTE DATABASE'</h2>
    </center>
   <p>The 'Cadmus Institute' Database holds all SCP Foundation files based around the Cadmus Institute, A Neutral/Friendly Group of Interest based around the existence of anomalous entities for both defense, financial & academic interest.</p>
   
  <div style="width: 1442px; height: 18px; line-height: 18px; overflow: hidden;"></div>
  
    <p>The Cadmus Research Group's Academic interests in the anomalous stems around the possibility of enormous increases in technological advances through a number of anomalous items & effects, such as:
    <div style="width: 1442px; height: 18px; line-height: 18px; overflow: hidden;"></div>
 <ul>
  <li>Paratechnology</li>
     <ul><li>Often referred to as “Anomalous Technology”, artificial devices or constructs designed to form, generate, manipulate, or amplify anomalous effects.</li></ul>
     <div style="width: 1442px; height: 18px; line-height: 18px; overflow: hidden;"></div>
     <li>Thaumatology</li>
     <ul><li>The study of magical principles as a practical science. In many ways, it is similar to Physics, except that it is born from very different principles.</li></ul>
</ul> 
</p>
  ` },
  { name: 'Cadmus-institute.txt', type: 'file', content: `
    <div class="doc-header">
      <img alt="" src="https://raw.githubusercontent.com/Shingop/imagehosting/refs/heads/main/cadmuslogo2.png" />
      <div>
        <div class="doc-header-tagline">RESEARCH. DEVELOP. DEFEND.</div>
        <div class="doc-header-title">THE CADMUS INSTITUTE</div>
      </div>
    </div>
    <hr class="doc-divider" />
<p>GoI – 325623, also known as the <strong><span style="letter-spacing: -0.0106132px; color: #ad1600;">CADMUS INSTITUTE</span></strong>, is a private subsidiary of the more public & known <strong><span style="letter-spacing: -0.0106132px; color: #ad1600;">CADMUS INDUSTRIES</span></strong> (See Cadmus-Industies.txt).</p>
  ` },
  { name: 'Cadmus-Industies.txt', type: 'file', content: `
    <div class="doc-header">
      <img alt="" src="https://raw.githubusercontent.com/Shingop/imagehosting/refs/heads/main/cadmuslogo3.png" />
      <div>
        <div class="doc-header-tagline">OBSERVE. ACQUIRE. EVOLVE.</div>
        <div class="doc-header-title">CADMUS INDUSTRIES</div>
      </div>
    </div>
    <hr class="doc-divider" />

  ` },
];
 
const fileList = document.getElementById('file-list');
const fileOverlay = document.getElementById('file-overlay');
const fileWindowName = document.getElementById('file-window-name');
const fileWindowBody = document.getElementById('file-window-body');
const fileWindowClose = document.getElementById('file-window-close');
 
function renderFiles() {
  fileList.innerHTML = '';
  files.forEach((file, index) => {
    const row = document.createElement('div');
    row.className = 'file-row';
    if (file.type === 'folder') row.classList.add('file-row--folder');
 
    const icon = file.type === 'folder'
      ? '<span class="material-symbols-outlined file-icon">folder</span>'
      : '<span class="material-symbols-outlined file-icon">description</span>';
    row.innerHTML = `${icon}<span class="file-name">${file.name}</span>`;
 
    if (file.type === 'file') {
      row.addEventListener('click', () => openFile(file));
    }
 
    fileList.appendChild(row);
  });
}
 
function openFile(file) {
  fileWindowName.textContent = file.name;
  fileWindowBody.innerHTML = `<div class="file-content">${file.content}</div>`;
  fileOverlay.classList.add('active');
}
 
fileWindowClose.addEventListener('click', () => {
  fileOverlay.classList.remove('active');
});
 
fileOverlay.addEventListener('click', (e) => {
  if (e.target === fileOverlay) fileOverlay.classList.remove('active');
});
 
// ── New item modal ──
const newItemBtn = document.getElementById('new-item-btn');
const newItemOverlay = document.getElementById('new-item-overlay');
const newItemClose = document.getElementById('new-item-close');
const newItemConfirm = document.getElementById('new-item-confirm');
const newFileName = document.getElementById('new-file-name');
const newFileContent = document.getElementById('new-file-content');
 
newItemBtn.addEventListener('click', () => {
  newFileName.value = '';
  newFileContent.value = '';
  newItemOverlay.classList.add('active');
});
 
newItemClose.addEventListener('click', () => newItemOverlay.classList.remove('active'));
 
newItemOverlay.addEventListener('click', (e) => {
  if (e.target === newItemOverlay) newItemOverlay.classList.remove('active');
});
 
newItemConfirm.addEventListener('click', () => {
  const name = newFileName.value.trim();
  const content = newFileContent.value.trim();
  if (!name) return;
  files.push({ name, type: 'file', content: content || '(empty file)' });
  renderFiles();
  newItemOverlay.classList.remove('active');
});
 

document.getElementById("date").innerHTML = Date();


//-----------------

(function() {
 
  /* ── Map canvas (procedural city grid) ── */
  const mapCanvas = document.getElementById('s72-map-canvas');
  if (mapCanvas) {
    const mctx = mapCanvas.getContext('2d');
    mapCanvas.width = 290;
    mapCanvas.height = 130;
    mctx.fillStyle = '#030d0d';
    mctx.fillRect(0, 0, 290, 130);
    // Draw random road-like lines
    mctx.strokeStyle = 'rgba(255,255,255,0.18)';
    mctx.lineWidth = 1;
    const seed = (n) => ((Math.sin(n) * 43758.5453) % 1 + 1) % 1;
    for (let i = 0; i < 30; i++) {
      mctx.beginPath();
      const x1 = seed(i * 3.1) * 290;
      const y1 = seed(i * 7.3) * 130;
      const x2 = seed(i * 2.9) * 290;
      const y2 = seed(i * 5.1) * 130;
      mctx.moveTo(x1, y1);
      mctx.lineTo(x2, y2);
      mctx.stroke();
    }
    // Bright highlight lines (major roads)
    mctx.strokeStyle = 'rgba(255,255,255,0.45)';
    mctx.lineWidth = 1.5;
    [[40,0,80,130],[120,0,100,130],[0,40,290,55],[0,90,290,85]].forEach(([x1,y1,x2,y2]) => {
      mctx.beginPath(); mctx.moveTo(x1,y1); mctx.lineTo(x2,y2); mctx.stroke();
    });
    // Marker dot
    mctx.fillStyle = '#fff';
    mctx.beginPath();
    mctx.arc(155, 75, 3.5, 0, Math.PI * 2);
    mctx.fill();
    mctx.strokeStyle = 'rgba(255,255,255,0.4)';
    mctx.lineWidth = 1;
    mctx.beginPath();
    mctx.arc(155, 75, 7, 0, Math.PI * 2);
    mctx.stroke();
  }
 
  /* ── Waveform canvas ── */
  const wCanvas = document.getElementById('s72-waveform');
  function drawWaveform(phase) {
    if (!wCanvas) return;
    const ctx = wCanvas.getContext('2d');
    const W = wCanvas.width, H = wCanvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    const seed2 = (n) => ((Math.sin(n * 127.1 + 311.7) * 43758.5453) % 1 + 1) % 1;
    for (let x = 0; x < W; x++) {
      const t = (x / W) * Math.PI * 2 * 6 + phase;
      const noise = (seed2(x * 0.05 + phase * 0.1) - 0.5) * 14;
      const y = H / 2 + Math.sin(t) * 8 + Math.sin(t * 2.3) * 5 + noise;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  let wPhase = 0;
  function animWave() {
    wPhase += 0.04;
    drawWaveform(wPhase);
    requestAnimationFrame(animWave);
  }
  animWave();
 
  /* ── Radar canvas ── */
  const radarCanvas = document.getElementById('s72-radar');
  let radarAngle = 0;
  function drawRadar() {
    if (!radarCanvas) return;
    const ctx = radarCanvas.getContext('2d');
    const W = 90, H = 90, cx = 45, cy = 45, r = 38;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 0.8;
    [r * 0.33, r * 0.66, r].forEach(ri => {
      ctx.beginPath(); ctx.arc(cx, cy, ri, 0, Math.PI * 2); ctx.stroke();
    });
    [0, Math.PI/2, Math.PI, Math.PI*3/2].forEach(a => {
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.stroke();
    });
    // Sweep
    const grad = ctx.createConicalGradient ? null : null;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(radarAngle);
    const sweepGrad = ctx.createLinearGradient(0, 0, r, 0);
    sweepGrad.addColorStop(0, 'rgba(255,255,255,0.25)');
    sweepGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, -0.3, 0.3);
    ctx.closePath();
    ctx.fillStyle = sweepGrad;
    ctx.fill();
    ctx.restore();
    radarAngle += 0.03;
    // Center dot
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath(); ctx.arc(cx, cy, 2, 0, Math.PI * 2); ctx.fill();
    requestAnimationFrame(drawRadar);
  }
  drawRadar();
 
  /* ── HKG waveform ── */
  const hkgCanvas = document.getElementById('s72-hkg-wave');
  let hkgPhase = 0;
  function drawHKG() {
    if (!hkgCanvas) return;
    const ctx = hkgCanvas.getContext('2d');
    const W = 160, H = 22;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < W; x++) {
      const t = (x / W) * Math.PI * 2 * 4 + hkgPhase;
      const y = H / 2 + Math.sin(t) * 6 + Math.sin(t * 3) * 2;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    hkgPhase += 0.05;
    requestAnimationFrame(drawHKG);
  }
  drawHKG();
 
  /* ── Event log generation ── */
  const logMessages = [
    'ALL SYSTEMS OPERA...',
    'LOADING DATABASE...',
    'LOADING SITE OVER...',
    'SETTING UP EVENT L...',
    'LOADING ADDITIONA...',
    'INITIALIZING USER S...',
    'OPTIMIZING INTERFA...',
    'LOCAL RESOURCE PA...',
    'TERMINAL FINISHED ...',
  ];
  const logEl = document.getElementById('s72-event-log');
  function addLogEntry(msg) {
    if (!logEl) return;
    const now = new Date();
    const time = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    const entry = document.createElement('div');
    entry.className = 's72-log-entry';
    entry.innerHTML = `<div class="s72-log-dot"></div><div class="s72-log-text-wrap"><div class="s72-log-type">NOTIFICATION</div><div class="s72-log-msg">${time} - ${msg}</div></div>`;
    logEl.appendChild(entry);
    logEl.scrollTop = logEl.scrollHeight;
  }
  logMessages.forEach((msg, i) => setTimeout(() => addLogEntry(msg), i * 300));
  // Keep adding random ones
  setInterval(() => {
    const msgs = ['SCAN COMPLETE...','MONITORING ACTIVE...','DATA SYNC OK...','PERIMETER CHECK...','NETWORK STABLE...'];
    addLogEntry(msgs[Math.floor(Math.random() * msgs.length)]);
  }, 8000);
 
  /* ── Visit counter ── */
  const vcEl = document.getElementById('s72-visit-count');
  if (vcEl) {
    let count = 75986;
    setInterval(() => {
      count += Math.floor(Math.random() * 3);
      vcEl.textContent = count.toLocaleString();
    }, 5000);
  }
 
})();

document.addEventListener("DOMContentLoaded", () => {

  const gridBtn = document.getElementById("grid-view-btn");
  const fileList = document.getElementById("file-list");

  if (gridBtn && fileList) {
    gridBtn.addEventListener("click", () => {

      fileList.classList.toggle("grid-view");

      if (fileList.classList.contains("grid-view")) {
        gridBtn.innerHTML = "☰ LIST VIEW";
      } else {
        gridBtn.innerHTML = "☷ GRID VIEW";
      }

    });
  }

});
