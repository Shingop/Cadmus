// ── Tab switching ──
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');
 
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});
 
// ── File system ──
let files = [
  { name: 'scp/', type: 'folder', content: null },
  { name: 'scp-173.scp', type: 'file', content: '<strong>Item #:</strong> SCP-173<br><br><strong>Object Class:</strong> Euclid<br><br><strong>Special Containment Procedures:</strong> Item SCP-173 is to be kept in a locked container at all times. When personnel must enter SCP-173\'s container, no fewer than 3 may enter at any time and the door is to be relocked behind them.<br><br><strong>Description:</strong> Moved to Site-19 1993. Origin is as of yet unknown. It is constructed from concrete and rebar with traces of Krylon brand spray paint. SCP-173 is animate and extremely hostile.' },
  { name: 'scp-readme.txt', type: 'file', content: 'This directory contains classified SCP documentation. Unauthorised access is strictly prohibited. All access is logged and monitored.' },
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
 
renderFiles();
