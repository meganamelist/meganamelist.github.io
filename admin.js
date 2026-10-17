/**
 * SAHAPHAN ALLFRIEND — ADMIN PANEL CONTROLLER
 * Firebase Firestore CRUD, Crew Editor, WebGL Background
 */

// Security check
if (sessionStorage.getItem('adminAuth') !== 'ok') {
  window.location.href = 'Partner.html';
}

// ==========================================
// 1. FIREBASE CONFIG
// ==========================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCI4q6_4-Rihj7A4PJT67fneFtD1cJafHs",
  authDomain: "fam297.firebaseapp.com",
  projectId: "fam297",
  storageBucket: "fam297.firebasestorage.app",
  messagingSenderId: "144997285384",
  appId: "1:144997285384:web:6b6d3b3ec9cd539d8b5bbd",
  measurementId: "G-C3HSYN5QVY"
};

// ==========================================
// 2. DEFAULT CREWS DATA
// ==========================================
const DEFAULT_CREWS = [
  { id: 'allfriend', no: '01', mark: 'A', name: 'ALLFRIEND', thName: 'ออลเฟรนด์', accent: '#f5c542', accentRgb: '245, 197, 66', desc: 'เครือหลักของสหพันธ์ จุดเริ่มต้นของทุกอย่าง รวมตัวกันด้วยมิตรภาพและความศรัทธา', membersCount: 11, maxMembers: 100, leader: 'Chawhite', leaderDiscord: '@chawhlte.allfriend', banner: 'allfriend', image: 'assets/allfriend-card.jpg', roster: [{ name: 'Chawhite', role: 'FOUNDER', roleColor: '#ffffff', discord: '@chawhlte.allfriend' }, { name: 'HamJack', role: 'FOUNDER', roleColor: '#ffffff', discord: 'ooduzi_82558' }] },
  { id: '8racha', no: '02', mark: '8', name: '8RACHA', thName: 'House of 8 Racha', accent: '#e5484d', accentRgb: '229, 72, 77', desc: 'House of 8 Racha · Stay together as family', membersCount: 8, maxMembers: 100, leader: 'QillerX', leaderDiscord: 'qillerx_official', banner: '8racha', image: 'assets/8racha-card.jpg', roster: [{ name: 'QillerX', role: 'HEAD', roleColor: '#f87171', discord: 'qillerx_official' }] },
  { id: 'thanatos', no: '03', mark: 'T', name: 'THANATOS', thName: 'THANATOS แก๊งค์กู Real', accent: '#a78bfa', accentRgb: '167, 139, 250', desc: 'THANATOS แก๊งค์กู Real กูมากับ God', membersCount: 16, maxMembers: 100, leader: 'C4ix', leaderDiscord: 'C4ix', banner: 'thanatos', image: 'assets/thanatos-card.jpg', roster: [{ name: 'C4ix', role: 'FOUNDER', roleColor: '#ffffff', discord: 'C4ix' }] },
  { id: 'safespace-x', no: '04', mark: 'X', name: 'SAFESPACE X', thName: 'SAFESPACE', accent: '#ec4899', accentRgb: '236, 72, 153', desc: 'Do not need lies, greed, hate. Just loyalty', membersCount: 12, maxMembers: 100, leader: 'MAX', leaderDiscord: 'HELOS TEAM', banner: 'safespace', image: 'assets/safespace-x-card.jpg', roster: [{ name: 'MAX', role: 'FOUNDER', roleColor: '#ffffff', discord: 'HELOS TEAM' }] },
  { id: 'dearthug', no: '05', mark: 'D', name: 'DEARTHUG', thName: 'เดียร์ทัก', accent: '#38bdf8', accentRgb: '56, 189, 248', desc: 'DEARTHUG · Brotherhood and Street Loyalty', membersCount: 8, maxMembers: 100, leader: 'XeRz', leaderDiscord: 'ปลุกเสก', banner: 'dearthug', image: 'assets/dearthug-card.jpg', roster: [] },
  { id: 'underghost', no: '06', mark: 'U', name: 'UNDERGHOST', thName: 'อันเดอร์โกสต์', accent: '#4ade80', accentRgb: '74, 222, 128', desc: 'UNDERGHOST · Shadows of the City', membersCount: 5, maxMembers: 100, leader: 'Ghost', leaderDiscord: 'Ghost_AF', banner: 'underghost', image: 'assets/underghost-card.jpg', roster: [] },
  { id: 'berserk', no: '07', mark: 'B', name: 'BERSERK', thName: 'เบอร์เซิร์ก', accent: '#fb923c', accentRgb: '251, 146, 60', desc: 'Berserk · Unstoppable Willpower', membersCount: 7, maxMembers: 100, leader: 'Guts', leaderDiscord: 'Guts_Berserk', banner: 'berserk', image: 'assets/berserk-card.jpg', roster: [] }
];

// ==========================================
// 3. DATA STORE
// ==========================================
let allCrews = [];
let dbFirestore = null;
let isFirebaseActive = false;
let selectedAccentColor = '#f5c542';

function sortCrews(list) {
  return list.sort((a, b) => {
    const oa = a.order !== undefined ? Number(a.order) : (parseInt(a.no) || 999);
    const ob = b.order !== undefined ? Number(b.order) : (parseInt(b.no) || 999);
    return oa - ob;
  });
}

function normalizeCrewsOrder() {
  allCrews.forEach((c, i) => {
    c.order = i + 1;
    c.no = String(i + 1).padStart(2, '0');
  });
}

function loadStoredCrews() {
  try {
    const raw = localStorage.getItem('sahaphan_crews');
    if (raw) {
      allCrews = sortCrews(JSON.parse(raw));
    } else {
      // Start empty — Firebase will populate when connected
      allCrews = [];
    }
  } catch (e) {
    allCrews = [];
  }
  normalizeCrewsOrder();
}

function saveStoredCrews() {
  localStorage.setItem('sahaphan_crews', JSON.stringify(allCrews));
}

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

// ==========================================
// 4. FIREBASE
// ==========================================
async function initFirebase() {
  updateStatus('CONNECTING TO FIREBASE…', '#f59e0b');
  try {
    if (typeof firebase === 'undefined') throw new Error('Firebase SDK not loaded');
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    try { firebase.analytics(); } catch (_) {}
    dbFirestore = firebase.firestore();
    isFirebaseActive = true;
    updateStatus('FIREBASE: FAM297 (CONNECTED)', '#f59e0b');

    const snapshot = await dbFirestore.collection('crews').get();
    if (!snapshot.empty) {
      const list = [];
      snapshot.forEach(d => list.push({ id: d.id, ...d.data() }));
      allCrews = sortCrews(list);
      normalizeCrewsOrder();
      // Always replace localStorage with fresh Firebase data on connect
      saveStoredCrews();
      renderAdminList();
      updateStatus('FIREBASE: FAM297 ✓ SYNCED', '#4ade80');
    } else {
      // Firebase is empty — clear localStorage too and show empty list
      allCrews = [];
      localStorage.removeItem('sahaphan_crews');
      renderAdminList();
      updateStatus('FIREBASE: FAM297 ✓ READY (ว่างเปล่า)', '#4ade80');
    }
  } catch (err) {
    console.warn('[Firebase]', err);
    updateStatus('LOCAL STORAGE (ACTIVE)', '#4ade80');
    isFirebaseActive = false;
  }
}

function updateStatus(text, color) {
  const badge = document.getElementById('backendStatus');
  const dot = document.querySelector('#backendBadge i');
  if (badge) badge.textContent = text;
  if (dot) { dot.style.background = color; dot.style.boxShadow = '0 0 10px ' + color; }
}

async function reorderCrew(crewId, targetOrder) {
  const currentIdx = allCrews.findIndex(c => c.id === crewId);
  if (currentIdx === -1) return;

  const targetIdx = Math.max(0, Math.min(targetOrder - 1, allCrews.length - 1));
  if (currentIdx === targetIdx) return;

  const [item] = allCrews.splice(currentIdx, 1);
  allCrews.splice(targetIdx, 0, item);

  normalizeCrewsOrder();
  saveStoredCrews();

  if (isFirebaseActive && dbFirestore) {
    try {
      const batch = dbFirestore.batch();
      allCrews.forEach(c => {
        batch.set(dbFirestore.collection('crews').doc(c.id), {
          order: c.order,
          no: c.no
        }, { merge: true });
      });
      await batch.commit();
    } catch (e) {
      console.warn('[Firestore] reorder sync fail', e);
    }
  }

  renderAdminList();
  showToast(`จัดอันดับ "${item.name}" เป็นอันดับ #${targetIdx + 1} เรียบร้อย`);
}

async function syncSave(obj) {
  const idx = allCrews.findIndex(c => c.id === obj.id);
  if (idx >= 0) allCrews[idx] = { ...allCrews[idx], ...obj };
  else allCrews.push(obj);
  normalizeCrewsOrder();
  saveStoredCrews();
  if (isFirebaseActive && dbFirestore) {
    try { await dbFirestore.collection('crews').doc(obj.id).set(obj, { merge: true }); }
    catch (e) { console.warn('[Firestore] write fail', e); }
  }
  renderAdminList();
}

async function syncDelete(id) {
  allCrews = allCrews.filter(c => c.id !== id);
  normalizeCrewsOrder();
  saveStoredCrews();
  if (isFirebaseActive && dbFirestore) {
    try { await dbFirestore.collection('crews').doc(id).delete(); }
    catch (e) { console.warn('[Firestore] delete fail', e); }
  }
  renderAdminList();
}

// ==========================================
// 5. ADMIN LIST RENDER
// ==========================================
function renderAdminList() {
  const container = document.getElementById('adminCrewsList');
  const totalEl = document.getElementById('adminTotalCrews');
  if (!container) return;
  if (totalEl) totalEl.textContent = allCrews.length + ' เครือ';

  container.innerHTML = allCrews.map((c, idx) => {
    const memberCount = (c.roster && c.roster.length > 0) ? c.roster.length : (c.membersCount || 0);
    const isFirst = idx === 0;
    const isLast = idx === allCrews.length - 1;

    return `
    <div class="admin-card-item" style="display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 16px;">
      
      <!-- Left: Rank controls + Rank badge + Crew info -->
      <div style="display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0;">
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <button type="button" class="admin-rank-btn" data-rank-up="${c.id}" title="เลื่อนขึ้นอันดับก่อนหน้า" ${isFirst ? 'disabled' : ''}>▲</button>
          <button type="button" class="admin-rank-btn" data-rank-down="${c.id}" title="เลื่อนลงอันดับถัดไป" ${isLast ? 'disabled' : ''}>▼</button>
        </div>

        <div class="admin-rank-tag" title="อันดับที่ ${idx + 1}">
          <span style="font-size: 0.6rem; color: var(--text-dim); line-height: 1;">อันดับ</span>
          <b style="font-size: 1.05rem; font-family: var(--font-hud); color: #f5c542;">#${idx + 1}</b>
        </div>

        <div class="admin-card-info" style="display: flex; align-items: center; gap: 10px; min-width: 0;">
          <div class="admin-card-dot" style="background: ${c.accent}; box-shadow: 0 0 10px ${c.accent}; flex-shrink: 0;"></div>
          <div style="min-width: 0;">
            <div class="admin-card-name" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</div>
            <div class="admin-card-sub">${c.thName || ''} · ${memberCount} คน</div>
          </div>
        </div>
      </div>

      <!-- Right: Rank dropdown + Buttons -->
      <div style="display: flex; gap: 6px; align-items: center; flex-shrink: 0;">
        <select class="admin-rank-select" data-rank-select="${c.id}" title="เลือกอันดับ 1, 2, 3, 4...">
          ${allCrews.map((_, i) => `<option value="${i + 1}" ${i === idx ? 'selected' : ''}>อันดับ ${i + 1}</option>`).join('')}
        </select>

        <a href="addmember.html?crew=${encodeURIComponent(c.id)}" class="admin-btn-secondary" style="padding: 7px 11px; font-size: 0.78rem; text-decoration: none; border-radius: 8px; display: inline-flex; align-items: center; gap: 4px; color: #f5c542; border-color: rgba(245, 197, 66, 0.35);">
          <span>สมาชิก</span>
        </a>
        <button class="admin-btn-action" data-edit-crew="${c.id}">แก้ไข</button>
      </div>
    </div>
  `;
  }).join('');

  // Wire rank up
  container.querySelectorAll('[data-rank-up]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-rank-up');
      const idx = allCrews.findIndex(x => x.id === id);
      if (idx > 0) reorderCrew(id, idx);
    });
  });

  // Wire rank down
  container.querySelectorAll('[data-rank-down]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-rank-down');
      const idx = allCrews.findIndex(x => x.id === id);
      if (idx >= 0 && idx < allCrews.length - 1) reorderCrew(id, idx + 2);
    });
  });

  // Wire rank dropdown select
  container.querySelectorAll('[data-rank-select]').forEach(sel => {
    sel.addEventListener('change', () => {
      const id = sel.getAttribute('data-rank-select');
      const targetRank = parseInt(sel.value);
      reorderCrew(id, targetRank);
    });
  });

  container.querySelectorAll('[data-edit-crew]').forEach(btn => {
    btn.addEventListener('click', () => openEditor(btn.getAttribute('data-edit-crew')));
  });
}

// ==========================================
// 6. CREW EDITOR MODAL
// ==========================================
function openEditor(crewId) {
  const modal = document.getElementById('crewEditorModal');
  const title = document.getElementById('editorModalTitle');
  const idInput = document.getElementById('editCrewId');
  const nameInput = document.getElementById('editCrewName');
  const thNameInput = document.getElementById('editCrewThName');
  const descInput = document.getElementById('editCrewDesc');
  const leaderInput = document.getElementById('editCrewLeader');
  const leaderFbInput = document.getElementById('editCrewLeaderFb');
  const membersInput = document.getElementById('editCrewMembers');
  const memberCountDisplay = document.getElementById('memberCountDisplay');
  const btnGoAddMember = document.getElementById('btnGoAddMember');
  const customColor = document.getElementById('editCrewColorCustom');
  const deleteBtn = document.getElementById('btnDeleteCrew');
  const urlInput = document.getElementById('editCrewImageUrl');
  const previewImg = document.getElementById('editCrewImagePreview');
  const placeholder = document.getElementById('previewPlaceholder');
  const removeBtn = document.getElementById('btnRemoveImage');
  const fileInput = document.getElementById('editCrewImageFile');

  if (fileInput) fileInput.value = '';

  if (crewId) {
    const c = allCrews.find(x => x.id === crewId);
    if (!c) return;
    const currentMemberCount = (c.roster && c.roster.length > 0) ? c.roster.length : (c.membersCount || 0);

    if (title) title.textContent = 'แก้ไขข้อมูลเครือ';
    if (idInput) idInput.value = c.id;
    if (nameInput) nameInput.value = c.name;
    if (thNameInput) thNameInput.value = c.thName || '';
    if (descInput) descInput.value = c.desc || '';
    if (leaderInput) leaderInput.value = c.leader || '';
    if (leaderFbInput) leaderFbInput.value = c.leaderFacebook || c.leaderDiscord || '';
    if (membersInput) membersInput.value = currentMemberCount;
    if (memberCountDisplay) memberCountDisplay.textContent = currentMemberCount;
    if (btnGoAddMember) {
      btnGoAddMember.href = `addmember.html?crew=${encodeURIComponent(c.id)}`;
      btnGoAddMember.onclick = null;
    }
    selectedAccentColor = c.accent || '#f5c542';
    if (customColor) customColor.value = selectedAccentColor;
    if (deleteBtn) deleteBtn.style.display = 'block';

    const currentImg = c.image || '';
    if (urlInput) urlInput.value = currentImg;
    updateImagePreview(currentImg);
  } else {
    if (title) title.textContent = 'สร้างเครือใหม่';
    if (idInput) idInput.value = '';
    if (nameInput) nameInput.value = '';
    if (thNameInput) thNameInput.value = '';
    if (descInput) descInput.value = '';
    if (leaderInput) leaderInput.value = '';
    if (leaderFbInput) leaderFbInput.value = '';
    if (membersInput) membersInput.value = '0';
    if (memberCountDisplay) memberCountDisplay.textContent = '0';
    if (btnGoAddMember) {
      btnGoAddMember.href = 'addmember.html';
      btnGoAddMember.onclick = (e) => {
        alert('กรุณากดบันทึกข้อมูลเครือก่อน จึงจะสามารถจัดการสมาชิกใน addmember.html ได้ครับ');
        e.preventDefault();
      };
    }
    selectedAccentColor = '#f5c542';
    if (customColor) customColor.value = selectedAccentColor;
    if (deleteBtn) deleteBtn.style.display = 'none';
    if (urlInput) urlInput.value = '';
    updateImagePreview('');
  }

  // Populate order rank dropdown
  const orderSelect = document.getElementById('editCrewOrder');
  if (orderSelect) {
    const totalSlots = crewId ? allCrews.length : (allCrews.length + 1);
    const currentRank = crewId ? (allCrews.findIndex(x => x.id === crewId) + 1) : totalSlots;
    orderSelect.innerHTML = Array.from({ length: totalSlots }, (_, i) => `
      <option value="${i + 1}" ${i + 1 === currentRank ? 'selected' : ''}>
        อันดับ ${i + 1} ${i === 0 ? '(แสดงการ์ดใบแรกบนหน้า Partner)' : ''}
      </option>
    `).join('');
  }

  document.querySelectorAll('.admin-color-swatch').forEach(sw => {
    sw.classList.toggle('is-selected', sw.getAttribute('data-color') === selectedAccentColor);
  });

  if (modal) modal.classList.add('is-open');
}

function updateImagePreview(src) {
  const previewImg = document.getElementById('editCrewImagePreview');
  const placeholder = document.getElementById('previewPlaceholder');
  const removeBtn = document.getElementById('btnRemoveImage');
  if (!previewImg) return;

  if (src && src.trim() !== '') {
    previewImg.src = src;
    previewImg.style.display = 'block';
    if (placeholder) placeholder.style.display = 'none';
    if (removeBtn) removeBtn.style.display = 'block';
  } else {
    previewImg.src = '';
    previewImg.style.display = 'none';
    if (placeholder) placeholder.style.display = 'block';
    if (removeBtn) removeBtn.style.display = 'none';
  }
}

function closeEditor() {
  const modal = document.getElementById('crewEditorModal');
  if (modal) modal.classList.remove('is-open');
}

// ==========================================
// 7. TOAST
// ==========================================
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-show'), 2500);
}

// ==========================================
// 8. WEBGL CANVAS
// ==========================================
function initCanvas() {
  const canvas = document.getElementById('bg');
  if (!canvas) return;
  const gl = canvas.getContext('webgl');
  if (!gl) return;
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; gl.viewport(0, 0, canvas.width, canvas.height); }
  window.addEventListener('resize', resize); resize();

  const vs = `attribute vec2 position; void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
  const fs = `
    precision highp float;
    uniform vec2 u_resolution; uniform float u_time; uniform vec2 u_mouse;
    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy; st.x *= u_resolution.x / u_resolution.y;
      vec2 m = u_mouse / u_resolution.xy; m.x *= u_resolution.x / u_resolution.y;
      float dist = length(st - m); float mi = smoothstep(0.5, 0.0, dist) * 0.15; float t = u_time * 0.25;
      float w1 = sin(st.x * 3.5 + t + mi * 4.0) * cos(st.y * 3.5 - t);
      float w2 = sin(st.y * 5.0 - t * 1.2 + w1) * cos(st.x * 4.0 + t * 0.8);
      float w3 = sin((st.x + st.y) * 4.0 + w2 * 2.0 + t);
      float liquid = (w1 + w2 + w3) * 0.333 + 0.5;
      vec3 color = mix(vec3(0.012, 0.015, 0.024), vec3(0.08, 0.09, 0.14), smoothstep(0.2, 0.7, liquid));
      color += vec3(0.35, 0.38, 0.48) * pow(liquid, 6.0) * 0.35;
      vec2 center = gl_FragCoord.xy / u_resolution.xy - 0.5;
      color *= clamp(1.0 - dot(center, center) * 0.85, 0.0, 1.0);
      gl_FragColor = vec4(color, 1.0);
    }`;

  const program = gl.createProgram();
  const vShader = gl.createShader(gl.VERTEX_SHADER); gl.shaderSource(vShader, vs); gl.compileShader(vShader);
  const fShader = gl.createShader(gl.FRAGMENT_SHADER); gl.shaderSource(fShader, fs); gl.compileShader(fShader);
  gl.attachShader(program, vShader); gl.attachShader(program, fShader); gl.linkProgram(program); gl.useProgram(program);

  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(program, 'position'); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

  const resLoc = gl.getUniformLocation(program, 'u_resolution');
  const timeLoc = gl.getUniformLocation(program, 'u_time');
  const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
  let mx = window.innerWidth * 0.5, my = window.innerHeight * 0.5, tx = mx, ty = my;
  window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = window.innerHeight - e.clientY; });
  const t0 = performance.now();
  (function render() {
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, (performance.now() - t0) * 0.001);
    gl.uniform2f(mouseLoc, mx, my);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  })();
}

// ==========================================
// 9. INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  loadStoredCrews();
  renderAdminList();
  initFirebase();

  // Logout
  document.getElementById('adminLogout')?.addEventListener('click', () => {
    sessionStorage.removeItem('adminAuth');
    window.location.href = 'Partner.html';
  });

  // Add New Crew
  document.getElementById('btnAddNewCrew')?.addEventListener('click', () => openEditor(null));

  // Editor Modal close
  document.getElementById('crewEditorClose')?.addEventListener('click', closeEditor);
  document.getElementById('btnCancelEdit')?.addEventListener('click', closeEditor);
  document.getElementById('crewEditorModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'crewEditorModal') closeEditor();
  });

  // Color swatches
  document.querySelectorAll('.admin-color-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      document.querySelectorAll('.admin-color-swatch').forEach(s => s.classList.remove('is-selected'));
      sw.classList.add('is-selected');
      selectedAccentColor = sw.getAttribute('data-color');
      const cp = document.getElementById('editCrewColorCustom');
      if (cp) cp.value = selectedAccentColor;
    });
  });

  document.getElementById('editCrewColorCustom')?.addEventListener('input', (e) => {
    selectedAccentColor = e.target.value;
    document.querySelectorAll('.admin-color-swatch').forEach(s => s.classList.remove('is-selected'));
  });

  // Choose Image Button & File Input
  const fileInput = document.getElementById('editCrewImageFile');
  const chooseBtn = document.getElementById('btnChooseImage');
  const urlInput = document.getElementById('editCrewImageUrl');
  const removeBtn = document.getElementById('btnRemoveImage');

  chooseBtn?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      alert('รูปภาพมีขนาดใหญ่เกิน 3MB กรุณาเลือกรูปขนาดเล็กลง');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target.result;
      if (urlInput) urlInput.value = base64;
      updateImagePreview(base64);
    };
    reader.readAsDataURL(file);
  });

  urlInput?.addEventListener('input', (e) => {
    updateImagePreview(e.target.value.trim());
  });

  removeBtn?.addEventListener('click', () => {
    if (urlInput) urlInput.value = '';
    if (fileInput) fileInput.value = '';
    updateImagePreview('');
  });

  // Form submit
  document.getElementById('crewEditorForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const idInput = document.getElementById('editCrewId');
    const nameInput = document.getElementById('editCrewName');
    const thNameInput = document.getElementById('editCrewThName');
    const descInput = document.getElementById('editCrewDesc');
    const leaderInput = document.getElementById('editCrewLeader');
    const leaderFbInput = document.getElementById('editCrewLeaderFb');
    const membersInput = document.getElementById('editCrewMembers');
    const orderSelect = document.getElementById('editCrewOrder');
    const crewImageUrl = document.getElementById('editCrewImageUrl')?.value.trim() || '';

    const isEdit = idInput && idInput.value.trim() !== '';
    const crewId = isEdit ? idInput.value.trim() : nameInput.value.trim().toLowerCase().replace(/\s+/g, '-');
    const leaderFb = leaderFbInput ? leaderFbInput.value.trim() : '';

    const existingCrew = isEdit ? allCrews.find(c => c.id === crewId) : null;
    const currentRoster = existingCrew?.roster || [];
    const calculatedCount = currentRoster.length > 0 ? currentRoster.length : (parseInt(membersInput?.value) || 0);

    const targetRank = orderSelect ? parseInt(orderSelect.value) : (allCrews.length + 1);

    const crew = {
      id: crewId,
      name: nameInput.value.trim(),
      thName: thNameInput.value.trim(),
      desc: descInput.value.trim(),
      leader: leaderInput.value.trim(),
      leaderFacebook: leaderFb,
      leaderDiscord: leaderFb,
      membersCount: calculatedCount,
      maxMembers: 100,
      accent: selectedAccentColor,
      accentRgb: hexToRgb(selectedAccentColor),
      order: targetRank,
      no: String(targetRank).padStart(2, '0'),
      mark: nameInput.value.trim().charAt(0).toUpperCase(),
      banner: isEdit ? (existingCrew?.banner || crewId) : crewId,
      image: crewImageUrl,
      roster: currentRoster
    };

    if (isEdit) {
      const oldIdx = allCrews.findIndex(c => c.id === crewId);
      if (oldIdx !== -1) {
        allCrews[oldIdx] = crew;
        if (targetRank !== oldIdx + 1) {
          const [moved] = allCrews.splice(oldIdx, 1);
          allCrews.splice(Math.max(0, targetRank - 1), 0, moved);
        }
      } else {
        allCrews.push(crew);
      }
    } else {
      allCrews.splice(Math.max(0, targetRank - 1), 0, crew);
    }

    normalizeCrewsOrder();
    saveStoredCrews();

    // Disable submit button while saving
    const submitBtn = e.target.querySelector('[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'กำลังบันทึก...'; }

    let firebaseOk = true;
    if (isFirebaseActive && dbFirestore) {
      try {
        const batch = dbFirestore.batch();
        allCrews.forEach(c => {
          // Strip base64 images before saving to Firebase (Firestore has 1MB doc limit)
          // Base64 stays only in localStorage; external URLs are synced to cloud
          const isBase64 = typeof c.image === 'string' && c.image.startsWith('data:');
          const crewForFirebase = { ...c };
          if (isBase64) crewForFirebase.image = '';
          batch.set(dbFirestore.collection('crews').doc(c.id), crewForFirebase, { merge: true });
        });
        await batch.commit();
      } catch (fireErr) {
        firebaseOk = false;
        console.error('[Firestore] write fail', fireErr);
      }
    }

    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'บันทึกข้อมูล'; }

    renderAdminList();
    closeEditor();

    // Only show one toast — never overwrite error with success
    if (!isFirebaseActive) {
      showToast(`✓ บันทึกเครือ ${crew.name} สำเร็จ (Local)`);
    } else if (firebaseOk) {
      showToast(`✓ บันทึกเครือ ${crew.name} ขึ้น Firebase สำเร็จ`);
    } else {
      showToast(`⚠️ Firebase ไม่ตอบสนอง — บันทึกในเครื่องนี้เท่านั้น`);
    }
  });

  // Delete
  document.getElementById('btnDeleteCrew')?.addEventListener('click', () => {
    const id = document.getElementById('editCrewId')?.value;
    if (!id) return;
    if (confirm('ต้องการลบเครือนี้?')) {
      syncDelete(id);
      closeEditor();
      showToast('ลบเครือเรียบร้อยแล้ว');
    }
  });

  // Clear All Old Crews (ลบแก๊งเก่าทั้งหมดออก Firebase)
  document.getElementById('btnClearAllOldCrews')?.addEventListener('click', async () => {
    if (!confirm('⚠️ ลบแก๊งทั้งหมดออกจาก Firebase และหน้าเว็บเลยใช่ไหม?\n\nหลังจากนี้คุณสามารถเพิ่มแก๊งใหม่ได้เองจากปุ่ม "เพิ่มเครือใหม่"')) return;

    showToast('กำลังลบแก๊งทั้งหมด...');

    try {
      // 1. ลบจาก Firebase (ถ้าเชื่อมอยู่)
      if (isFirebaseActive && dbFirestore) {
        const snap = await dbFirestore.collection('crews').get();
        if (!snap.empty) {
          const batch = dbFirestore.batch();
          snap.forEach(doc => batch.delete(doc.ref));
          await batch.commit();
        }
      }

      // 2. ล้าง LocalStorage
      localStorage.removeItem('sahaphan_crews');

      // 3. ล้าง allCrews ในหน่วยความจำ
      allCrews = [];
      renderAdminList();
      showToast('✓ ลบแก๊งทั้งหมดเรียบร้อยแล้ว — กด "เพิ่มเครือใหม่" เพื่อเพิ่มแก๊งของคุณเองครับ');
    } catch (e) {
      console.error('[Clear All]', e);
      showToast('❌ เกิดข้อผิดพลาด: ' + e.message);
    }
  });

  // Reset
  document.getElementById('btnResetData')?.addEventListener('click', () => {
    if (confirm('ต้องการรีเซ็ตข้อมูลเครือทั้งหมดกลับเป็นค่าเริ่มต้น?')) {
      localStorage.removeItem('sahaphan_crews');
      loadStoredCrews();
      renderAdminList();
      showToast('รีเซ็ตข้อมูลเป็นค่าเริ่มต้นแล้ว');
    }
  });

  // Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEditor();
  });
});
