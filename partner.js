/**
 * SAHAPHAN ALLFRIEND - PARTNER CONTROLLER & ADMIN SYSTEM
 * Real-time CRUD, Firebase Firestore Integration, LocalStorage Fallback,
 * WebGL Liquid Metal Canvas, Drawer & Modals
 */

// ==========================================

// ==========================================
// 2. FIREBASE CONFIG — SAHAPHAN ALLFRIEND
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
// 3. DATA STORE (HYBRID: FIREBASE + LOCALSTORAGE)
// ==========================================
let allCrews = [];
let dbFirestore = null;
let isFirebaseActive = false;

function loadStoredCrews() {
  try {
    const raw = localStorage.getItem('sahaphan_crews');
    if (raw) {
      allCrews = sortCrews(JSON.parse(raw));
      allCrews.forEach((c, idx) => {
        if (c.order === undefined) c.order = idx + 1;
        c.no = String(idx + 1).padStart(2, '0');
      });
      saveStoredCrews();
    } else {
      // No local cache — Firebase will populate
      allCrews = [];
    }
  } catch (e) {
    allCrews = [];
  }
}

function sortCrews(list) {
  return list.sort((a, b) => {
    const oa = a.order !== undefined ? Number(a.order) : (parseInt(a.no) || 999);
    const ob = b.order !== undefined ? Number(b.order) : (parseInt(b.no) || 999);
    return oa - ob;
  });
}

function saveStoredCrews() {
  localStorage.setItem('sahaphan_crews', JSON.stringify(allCrews));
}

// Helper to convert hex to rgb string
function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
}

// Auto Firebase initialization using compat SDK (works with file://)
async function initFirebaseIntegration() {
  updateBackendStatusBadge('CONNECTING TO FIREBASE…', '#f59e0b');
  try {
    if (typeof firebase === 'undefined') {
      throw new Error('Firebase SDK not loaded');
    }

    // Initialize only once
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }

    // Init Analytics (non-blocking)
    try { firebase.analytics(); } catch (_) {}

    dbFirestore = firebase.firestore();
    isFirebaseActive = true;
    updateBackendStatusBadge('FIREBASE: FAM297 (CONNECTED)', '#f59e0b');

    // Sync: load Firestore data if available, otherwise push defaults
    const snapshot = await dbFirestore.collection('crews').get();
    if (!snapshot.empty) {
      const fbList = [];
      snapshot.forEach(d => fbList.push({ id: d.id, ...d.data() }));
      allCrews = sortCrews(fbList);
      allCrews.forEach((c, idx) => {
        if (c.order === undefined) c.order = idx + 1;
        c.no = String(idx + 1).padStart(2, '0');
      });
      saveStoredCrews();
      renderCrews(currentCrewPage);
      renderAdminDrawerList();
      updateBackendStatusBadge('FIREBASE: FAM297 ✓ SYNCED', '#4ade80');
    } else {
      // Firebase is empty — do NOT push defaults back, just render whatever is local
      renderCrews(currentCrewPage);
      renderAdminDrawerList();
      updateBackendStatusBadge('FIREBASE: FAM297 ✓ READY', '#4ade80');
    }
  } catch (err) {
    console.warn('[Firebase] Init failed, fallback to LocalStorage:', err);
    updateBackendStatusBadge('LOCAL STORAGE (ACTIVE)', '#4ade80');
    isFirebaseActive = false;
  }
}

function updateBackendStatusBadge(text, color) {
  const badge = document.getElementById('backendStatus');
  const dot = document.querySelector('#backendBadge i');
  if (badge) badge.textContent = text;
  if (dot) {
    dot.style.background = color;
    dot.style.boxShadow = `0 0 10px ${color}`;
  }
}

async function syncSaveCrew(crewObj) {
  const idx = allCrews.findIndex(c => c.id === crewObj.id);
  if (idx >= 0) {
    allCrews[idx] = { ...allCrews[idx], ...crewObj };
  } else {
    allCrews.push(crewObj);
  }
  saveStoredCrews();

  if (isFirebaseActive && dbFirestore) {
    try {
      await dbFirestore.collection('crews').doc(crewObj.id).set(crewObj, { merge: true });
    } catch (e) {
      console.warn('[Firestore] Write failed, saved to LocalStorage:', e);
    }
  }

  renderCrews(currentCrewPage);
  renderAdminDrawerList();
}

async function syncDeleteCrew(crewId) {
  allCrews = allCrews.filter(c => c.id !== crewId);
  saveStoredCrews();

  if (isFirebaseActive && dbFirestore) {
    try {
      await dbFirestore.collection('crews').doc(crewId).delete();
    } catch (e) {
      console.warn('[Firestore] Delete failed:', e);
    }
  }

  renderCrews(1);
  renderAdminDrawerList();
}

// ==========================================
// 3. VECTOR BANNER GENERATOR
// ==========================================
function getCrewBannerSvg(type, accent) {
  if (type === 'allfriend') {
    return `
      <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="afBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#050608"/><stop offset="60%" stop-color="#14120a"/><stop offset="100%" stop-color="#020305"/>
          </linearGradient>
          <radialGradient id="afGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stop-color="#f5c542" stop-opacity="0.35"/><stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="280" height="180" fill="url(#afBg)"/>
        <rect width="280" height="180" fill="url(#afGlow)"/>
        <text x="140" y="46" font-family="'Grenze Gotisch', Georgia, serif" font-size="28" font-weight="900" fill="#f5c542" text-anchor="middle" letter-spacing="3" filter="drop-shadow(0 0 10px rgba(245,197,66,0.8))">ALLFRIEND</text>
        <path d="M124 100 L124 75 Q140 68 156 75 L156 100 Z" fill="#ffffff" opacity="0.95"/>
        <rect x="120" y="100" width="40" height="40" rx="3" fill="#ffffff" opacity="0.95"/>
        <path d="M52 145 L62 95 L72 145 Z M62 90 A6 6 0 1 0 62 78 A6 6 0 1 0 62 90 Z" fill="#ffffff" opacity="0.95"/>
        <path d="M88 145 L98 90 L108 145 Z M98 85 A6 6 0 1 0 98 73 A6 6 0 1 0 98 85 Z" fill="#ffffff" opacity="0.95"/>
        <path d="M130 140 L140 96 L150 140 Z M140 92 A6.5 6.5 0 1 0 140 79 A6.5 6.5 0 1 0 140 92 Z" fill="#000000"/>
        <path d="M172 145 L182 90 L192 145 Z M182 85 A6 6 0 1 0 182 73 A6 6 0 1 0 182 85 Z" fill="#ffffff" opacity="0.95"/>
        <path d="M208 145 L218 95 L228 145 Z M218 90 A6 6 0 1 0 218 78 A6 6 0 1 0 218 90 Z" fill="#ffffff" opacity="0.95"/>
      </svg>
    `;
  }
  if (type === '8racha') {
    return `
      <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="r8Bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#050608"/><stop offset="50%" stop-color="#18080a"/><stop offset="100%" stop-color="#030406"/></linearGradient>
          <radialGradient id="r8Glow" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#e5484d" stop-opacity="0.3"/><stop offset="100%" stop-color="#000000" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="280" height="180" fill="url(#r8Bg)"/><rect width="280" height="180" fill="url(#r8Glow)"/>
        <path d="M115 75 L125 58 L140 68 L155 58 L165 75 Z" fill="none" stroke="#e5484d" stroke-width="2" opacity="0.6"/>
        <text x="140" y="98" font-family="'Grenze Gotisch', Georgia, serif" font-size="28" font-weight="900" fill="#e5484d" text-anchor="middle" letter-spacing="3" filter="drop-shadow(0 0 10px rgba(229,72,77,0.8))">8RACHA</text>
        <text x="140" y="118" font-family="'Syncopate', sans-serif" font-size="7" fill="#94a3b8" text-anchor="middle" letter-spacing="2">HOUSE OF 8 RACHA</text>
      </svg>
    `;
  }
  if (type === 'thanatos') {
    return `
      <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="thBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#050608"/><stop offset="50%" stop-color="#120c1c"/><stop offset="100%" stop-color="#030406"/></linearGradient>
          <radialGradient id="thGlow" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="#a78bfa" stop-opacity="0.3"/><stop offset="100%" stop-color="#000000" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="280" height="180" fill="url(#thBg)"/><rect width="280" height="180" fill="url(#thGlow)"/>
        <path d="M140 60 C120 45, 90 60, 70 85 C100 85, 125 80, 140 95 C155 80, 180 85, 210 85 C190 60, 160 45, 140 60 Z" fill="none" stroke="#a78bfa" stroke-width="1.5" opacity="0.5"/>
        <text x="140" y="105" font-family="'Grenze Gotisch', Georgia, serif" font-size="28" font-weight="900" fill="#a78bfa" text-anchor="middle" letter-spacing="3" filter="drop-shadow(0 0 10px rgba(167,139,250,0.8))">THANATOS</text>
      </svg>
    `;
  }
  // Generic or other crews
  const c = accent || '#ec4899';
  return `
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="genBg_${type}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#050608"/><stop offset="100%" stop-color="#020305"/></linearGradient>
        <radialGradient id="genGlow_${type}" cx="50%" cy="45%" r="55%"><stop offset="0%" stop-color="${c}" stop-opacity="0.3"/><stop offset="100%" stop-color="#000000" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="280" height="180" fill="url(#genBg_${type})"/><rect width="280" height="180" fill="url(#genGlow_${type})"/>
      <path d="M125 65 L155 95 M155 65 L125 95" stroke="${c}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <text x="140" y="115" font-family="'Grenze Gotisch', Georgia, serif" font-size="26" font-weight="900" fill="${c}" text-anchor="middle" letter-spacing="3" filter="drop-shadow(0 0 10px ${c})">${(type || '').toUpperCase()}</text>
    </svg>
  `;
}

// ==========================================
// 4. RENDERING PARTNER CREWS & PAGINATION
// ==========================================
let activeCrewCardId = 'allfriend';
let currentCrewPage = 1;
const CARDS_PER_PAGE = 4;

function renderCrews(page = 1) {
  const totalPages = Math.max(1, Math.ceil(allCrews.length / CARDS_PER_PAGE));
  currentCrewPage = Math.max(1, Math.min(page, totalPages));

  const startIdx = (currentCrewPage - 1) * CARDS_PER_PAGE;
  const currentSlice = allCrews.slice(startIdx, startIdx + CARDS_PER_PAGE);

  const container = document.getElementById('crews-grid');
  if (!container) return;

  if (allCrews.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 70px 20px; color: var(--text-dim); background: rgba(0,0,0,0.3); border-radius: 20px; border: 1px dashed rgba(255,255,255,0.1);">
        <div style="font-size: 2.5rem; margin-bottom: 12px;">🛡️</div>
        <div style="font-size: 1.2rem; color: #fff; font-family: var(--font-hud); margin-bottom: 8px;">ยังไม่มีข้อมูลเครือในระบบ</div>
        <p style="font-size: 0.88rem;">กรุณาเข้าสู่ระบบหลังบ้าน (ADMIN) เพื่อเพิ่มเครือแรกของคุณ</p>
      </div>
    `;
    const pgLabel = document.getElementById('pgLabel');
    if (pgLabel) pgLabel.textContent = '0/0';
    return;
  }

  container.innerHTML = currentSlice.map(crew => {
    const isActive = (crew.id === activeCrewCardId);
    const bgImage = crew.image || (crew.banner ? `assets/${crew.banner}-card.jpg` : '');
    const hasImage = !!bgImage;

    return `
      <article class="crew-card ${hasImage ? 'has-image' : ''} ${isActive ? 'is-active' : ''}" 
               style="--accent: ${crew.accent}; --accent-rgb: ${crew.accentRgb || hexToRgb(crew.accent)};" 
               data-crew-id="${crew.id}">
        ${hasImage ? `<span class="cc-bg" style="background-image: url('${bgImage}')" aria-hidden="true"></span>` : ''}
        <span class="cc-ring" aria-hidden="true"></span>
        <span class="cc-no">${crew.no || '00'}</span>
        
        ${!hasImage ? `
        <div class="cc-banner">
          ${getCrewBannerSvg(crew.banner || crew.id, crew.accent)}
        </div>` : ''}

        <span class="cc-mark" aria-hidden="true">${crew.mark || crew.name.charAt(0)}</span>
        <span class="cc-line" aria-hidden="true"></span>
        
        <div class="cc-info">
          <div>
            <span class="cc-tag"><i></i>FAMILY</span>
            <h3 class="cc-name">${crew.name}</h3>
            ${crew.thName ? `<p class="cc-th">${crew.thName}</p>` : ''}
            <p class="cc-desc">${crew.desc || ''}</p>
          </div>
          
          <div>
            <dl class="cc-stats">
              <div><dt>สมาชิก</dt><dd>${crew.membersCount || 0}<small>/${crew.maxMembers || 100}</small></dd></div>
              <div><dt>หัวหน้า</dt><dd>${crew.leader || '-'}</dd></div>
            </dl>
            
            <button class="cc-btn" type="button" data-detail-crew="${crew.id}">
              <span>ดูข้อมูลเพิ่มเติม</span>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Update Pager
  const pgLabel = document.getElementById('pgLabel');
  const pgPrev = document.getElementById('pgPrev');
  const pgNext = document.getElementById('pgNext');

  if (pgLabel) pgLabel.textContent = `${currentCrewPage}/${totalPages}`;
  if (pgPrev) pgPrev.disabled = (currentCrewPage === 1);
  if (pgNext) pgNext.disabled = (currentCrewPage === totalPages);

  // Click card to activate
  container.querySelectorAll('.crew-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-detail-crew]')) return;
      const crewId = card.getAttribute('data-crew-id');
      activeCrewCardId = crewId;
      container.querySelectorAll('.crew-card').forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');
    });
  });

  // Click detail button
  container.querySelectorAll('[data-detail-crew]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const crewId = btn.getAttribute('data-detail-crew');
      openCrewDetailModal(crewId);
    });
  });
}

// ==========================================
// 5. CREW DETAIL MODAL (ดูข้อมูลเพิ่มเติม)
// ==========================================
function openCrewDetailModal(crewId) {
  const crew = allCrews.find(c => c.id === crewId);
  if (!crew) return;

  const modal = document.getElementById('crewDetailModal');
  const banner = document.getElementById('detailBanner');
  const tag = document.getElementById('detailTag');
  const name = document.getElementById('detailName');
  const thName = document.getElementById('detailThName');
  const desc = document.getElementById('detailDesc');
  const leader = document.getElementById('detailLeader');
  const count = document.getElementById('detailCount');
  const rosterList = document.getElementById('detailRoster');
  const copyBtn = document.getElementById('detailCopyLeaderBtn');

  const crewImg = crew.image || (crew.banner ? `assets/${crew.banner}-card.jpg` : '');
  if (banner) {
    if (crewImg) {
      banner.innerHTML = `<img src="${crewImg}" alt="" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else {
      banner.innerHTML = getCrewBannerSvg(crew.banner || crew.id, crew.accent);
    }
  }
  if (tag) {
    tag.innerHTML = `<i></i><span>FAMILY</span>`;
    tag.style.color = crew.accent;
  }
  if (name) name.textContent = crew.name;
  if (thName) thName.textContent = crew.thName || '';
  if (desc) desc.textContent = crew.desc || 'ไม่มีคำอธิบาย';
  if (leader) leader.textContent = crew.leader || '-';
  if (count) count.textContent = `${crew.membersCount || 0}/${crew.maxMembers || 100}`;

  if (rosterList) {
    const list = crew.roster && crew.roster.length > 0 ? crew.roster : [
      { name: crew.leader, role: 'LEADER / HEAD', roleColor: crew.accent, discord: crew.leaderDiscord || crew.leader }
    ];
    rosterList.innerHTML = list.map(m => `
      <div class="detail-roster-item">
        <div class="detail-roster-user">
          <div class="detail-roster-avatar">${m.name.charAt(0)}</div>
          <div>
            <b style="color: #ffffff; font-size: 0.9rem;">${m.name}</b>
            <div style="font-size: 0.72rem; color: ${m.roleColor || '#ffffff'};">${m.role}</div>
          </div>
        </div>
        <button class="admin-btn-action" type="button" data-copy-fb="${m.facebook || m.discord || m.name}">
          Facebook
        </button>
      </div>
    `).join('');

    rosterList.querySelectorAll('[data-copy-fb]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-copy-fb');
        navigator.clipboard.writeText(val).then(() => showToast(`คัดลอก Facebook: ${val} แล้ว`));
      });
    });
  }

function formatFacebookUrl(val) {
  if (!val || typeof val !== 'string') return '';
  let str = val.trim();
  if (!str) return '';
  if (str.startsWith('http://') || str.startsWith('https://')) return str;
  if (str.startsWith('facebook.com/') || str.startsWith('www.facebook.com/')) return 'https://' + str;
  str = str.replace(/^@/, '');
  return 'https://facebook.com/' + encodeURIComponent(str);
}

  if (copyBtn) {
    const rawFb = crew.leaderFacebook || crew.leaderDiscord || '';
    const fbUrl = formatFacebookUrl(rawFb);
    if (fbUrl) {
      copyBtn.href = fbUrl;
      copyBtn.target = '_blank';
      copyBtn.onclick = null;
    } else {
      copyBtn.href = 'javascript:void(0)';
      copyBtn.target = '_self';
      copyBtn.onclick = (e) => {
        e.preventDefault();
        showToast('ยังไม่ได้ระบุลิงก์ Facebook ของหัวหน้า');
      };
    }
  }

  // Set link to member.html with crew ID param
  const memberGangBtn = document.getElementById('detailMemberGangBtn');
  if (memberGangBtn) {
    memberGangBtn.href = `member.html?crew=${encodeURIComponent(crew.id)}`;
  }

  if (modal) modal.classList.add('is-open');
}

function closeCrewDetailModal() {
  const modal = document.getElementById('crewDetailModal');
  if (modal) modal.classList.remove('is-open');
}

// ==========================================
// 6. ADMIN DRAWER & EDITOR MODAL
// ==========================================
function renderAdminDrawerList() {
  const listContainer = document.getElementById('adminCrewsList');
  const countLabel = document.getElementById('adminTotalCrews');
  if (countLabel) countLabel.textContent = `${allCrews.length} เครือ`;
  if (!listContainer) return;

  listContainer.innerHTML = allCrews.map(c => `
    <div class="admin-card-item">
      <div class="admin-card-info">
        <span class="admin-card-dot" style="background: ${c.accent};"></span>
        <div>
          <div class="admin-card-name">${c.name}</div>
          <div class="admin-card-sub">${c.thName || ''} · ${c.membersCount || 0} คน</div>
        </div>
      </div>
      <button class="admin-btn-action" type="button" data-edit-crew="${c.id}">
        แก้ไข
      </button>
    </div>
  `).join('');

  listContainer.querySelectorAll('[data-edit-crew]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-edit-crew');
      openCrewEditorModal(id);
    });
  });
}

let selectedAccentColor = '#f5c542';

function openCrewEditorModal(crewId = null) {
  const modal = document.getElementById('crewEditorModal');
  const title = document.getElementById('editorModalTitle');
  const deleteBtn = document.getElementById('btnDeleteCrew');

  const idInput = document.getElementById('editCrewId');
  const nameInput = document.getElementById('editCrewName');
  const thNameInput = document.getElementById('editCrewThName');
  const descInput = document.getElementById('editCrewDesc');
  const leaderInput = document.getElementById('editCrewLeader');
  const membersInput = document.getElementById('editCrewMembers');
  const customColorInput = document.getElementById('editCrewColorCustom');

  if (crewId) {
    const c = allCrews.find(x => x.id === crewId);
    if (!c) return;
    if (title) title.textContent = `แก้ไขข้อมูล: ${c.name}`;
    if (idInput) idInput.value = c.id;
    if (nameInput) nameInput.value = c.name;
    if (thNameInput) thNameInput.value = c.thName || '';
    if (descInput) descInput.value = c.desc || '';
    if (leaderInput) leaderInput.value = c.leader || '';
    if (membersInput) membersInput.value = c.membersCount || 0;
    selectedAccentColor = c.accent || '#f5c542';
    if (customColorInput) customColorInput.value = selectedAccentColor;
    if (deleteBtn) deleteBtn.style.display = 'block';
  } else {
    if (title) title.textContent = 'สร้างเครือใหม่';
    if (idInput) idInput.value = '';
    if (nameInput) nameInput.value = '';
    if (thNameInput) thNameInput.value = '';
    if (descInput) descInput.value = '';
    if (leaderInput) leaderInput.value = '';
    if (membersInput) membersInput.value = '1';
    selectedAccentColor = '#f5c542';
    if (customColorInput) customColorInput.value = selectedAccentColor;
    if (deleteBtn) deleteBtn.style.display = 'none';
  }

  // Update color swatch selection
  document.querySelectorAll('.admin-color-swatch').forEach(sw => {
    sw.classList.toggle('is-selected', sw.getAttribute('data-color') === selectedAccentColor);
  });

  if (modal) modal.classList.add('is-open');
}

function closeCrewEditorModal() {
  const modal = document.getElementById('crewEditorModal');
  if (modal) modal.classList.remove('is-open');
}

// Drawer open/close
function openAdminDrawer() {
  document.getElementById('menuDrawer')?.classList.add('is-open');
  document.getElementById('menuScrim')?.classList.add('is-open');
  renderAdminDrawerList();
}

function closeAdminDrawer() {
  document.getElementById('menuDrawer')?.classList.remove('is-open');
  document.getElementById('menuScrim')?.classList.remove('is-open');
}

// Toast
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-show');
  }, 2500);
}

// ==========================================
// 7. WEBGL LIQUID METAL CANVAS
// ==========================================
function initLiquidMetalCanvas() {
  const canvas = document.getElementById('bg');
  if (!canvas) return;
  const gl = canvas.getContext('webgl');
  if (!gl) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize);
  resize();

  const vsSource = `
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
  `;

  const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      vec2 m = u_mouse / u_resolution.xy;
      m.x *= u_resolution.x / u_resolution.y;

      float dist = length(st - m);
      float mouseInfluence = smoothstep(0.5, 0.0, dist) * 0.15;
      float t = u_time * 0.25;

      float wave1 = sin(st.x * 3.5 + t + mouseInfluence * 4.0) * cos(st.y * 3.5 - t);
      float wave2 = sin(st.y * 5.0 - t * 1.2 + wave1) * cos(st.x * 4.0 + t * 0.8);
      float wave3 = sin((st.x + st.y) * 4.0 + wave2 * 2.0 + t);

      float liquid = (wave1 + wave2 + wave3) * 0.333 + 0.5;

      vec3 darkBase = vec3(0.012, 0.015, 0.024);
      vec3 metallicSheen = vec3(0.08, 0.09, 0.14);
      vec3 specular = vec3(0.35, 0.38, 0.48);

      vec3 color = mix(darkBase, metallicSheen, smoothstep(0.2, 0.7, liquid));
      color += specular * pow(liquid, 6.0) * 0.35;

      vec2 center = gl_FragCoord.xy / u_resolution.xy - 0.5;
      float vignette = 1.0 - dot(center, center) * 0.85;
      color *= clamp(vignette, 0.0, 1.0);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const program = gl.createProgram();
  const vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vsSource);
  gl.compileShader(vs);

  const fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fsSource);
  gl.compileShader(fs);

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.useProgram(program);

  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,  1, -1, -1,  1,
    -1,  1,  1, -1,  1,  1
  ]), gl.STATIC_DRAW);

  const posAttr = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

  const resLoc = gl.getUniformLocation(program, 'u_resolution');
  const timeLoc = gl.getUniformLocation(program, 'u_time');
  const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

  let mouseX = window.innerWidth * 0.5;
  let mouseY = window.innerHeight * 0.5;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = window.innerHeight - e.clientY;
  });

  const startTime = performance.now();

  function render() {
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, (performance.now() - startTime) * 0.001);
    gl.uniform2f(mouseLoc, mouseX, mouseY);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  render();
}

// ==========================================
// 8. PIN MODAL
// ==========================================
const ADMIN_PIN = '2587'; // รหัสแอดมิน — เปลี่ยนได้ที่นี่
let pinBuffer = '';

function openPinModal() {
  pinBuffer = '';
  updatePinDots();
  document.getElementById('pinError')?.classList.remove('is-show');
  document.getElementById('pinBackdrop')?.classList.add('is-open');
}

function closePinModal() {
  pinBuffer = '';
  updatePinDots();
  document.getElementById('pinError')?.classList.remove('is-show');
  document.getElementById('pinBackdrop')?.classList.remove('is-open');
}

function updatePinDots() {
  for (let i = 0; i < 4; i++) {
    const dot = document.getElementById('dot' + i);
    if (dot) dot.classList.toggle('filled', i < pinBuffer.length);
  }
}

function handlePinInput(val) {
  if (pinBuffer.length >= 4) return;
  pinBuffer += val;
  updatePinDots();

  if (pinBuffer.length === 4) {
    setTimeout(() => {
      if (pinBuffer === ADMIN_PIN) {
        // ✅ รหัสถูก → บันทึก session และไปหน้า admin
        sessionStorage.setItem('adminAuth', 'ok');
        window.location.href = 'admin.html';
      } else {
        // ❌ รหัสผิด → shake + ล้าง
        const dots = document.getElementById('pinDots');
        if (dots) {
          dots.classList.add('is-shake');
          setTimeout(() => dots.classList.remove('is-shake'), 500);
        }
        const errEl = document.getElementById('pinError');
        if (errEl) errEl.classList.add('is-show');
        pinBuffer = '';
        setTimeout(() => updatePinDots(), 400);
      }
    }, 120);
  }
}

// ==========================================
// 9. INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initLiquidMetalCanvas();
  loadStoredCrews();
  renderCrews(1);
  initFirebaseIntegration();

  // ---- PIN Modal ----
  document.getElementById('menuBtn')?.addEventListener('click', openPinModal);
  document.getElementById('pinClose')?.addEventListener('click', closePinModal);
  document.getElementById('pinBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'pinBackdrop') closePinModal();
  });

  document.querySelectorAll('.pin-key[data-val]').forEach(btn => {
    btn.addEventListener('click', () => handlePinInput(btn.getAttribute('data-val')));
  });

  document.getElementById('pinDel')?.addEventListener('click', () => {
    if (pinBuffer.length > 0) {
      pinBuffer = pinBuffer.slice(0, -1);
      updatePinDots();
      document.getElementById('pinError')?.classList.remove('is-show');
    }
  });

  document.getElementById('pinClear')?.addEventListener('click', () => {
    pinBuffer = '';
    updatePinDots();
    document.getElementById('pinError')?.classList.remove('is-show');
  });

  // Keyboard PIN input support
  window.addEventListener('keydown', (e) => {
    if (document.getElementById('pinBackdrop')?.classList.contains('is-open')) {
      if (e.key >= '0' && e.key <= '9') handlePinInput(e.key);
      if (e.key === 'Backspace') {
        pinBuffer = pinBuffer.slice(0, -1);
        updatePinDots();
        document.getElementById('pinError')?.classList.remove('is-show');
      }
      if (e.key === 'Escape') closePinModal();
    } else {
      if (e.key === 'Escape') closeCrewDetailModal();
    }
  });

  // ---- Crew Detail Modal ----
  document.getElementById('crewDetailClose')?.addEventListener('click', closeCrewDetailModal);
  document.getElementById('crewDetailModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'crewDetailModal') closeCrewDetailModal();
  });

  // ---- Pager buttons ----
  document.getElementById('pgPrev')?.addEventListener('click', () => {
    if (currentCrewPage > 1) renderCrews(currentCrewPage - 1);
  });
  document.getElementById('pgNext')?.addEventListener('click', () => {
    const totalPages = Math.ceil(allCrews.length / CARDS_PER_PAGE);
    if (currentCrewPage < totalPages) renderCrews(currentCrewPage + 1);
  });
});
