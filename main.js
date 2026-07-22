let members = [];
let searchQuery = '';
let isAudioPlaying = false;
let audioEl = null;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof membersData !== 'undefined') {
    members = membersData;
  } else {
    members = [];
  }
  
  setupEventListeners();
  renderMembers();
  updateStats();
  initAudioPlayer();
});

function renderMembers() {
  const grid = document.getElementById('membersGrid');
  if (!grid) return;

  const filtered = members.filter(member => {
    return searchQuery === '' || 
      (member.name && member.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(14,14,22,0.4); border: 1px dashed var(--gold-border); border-radius: var(--radius-lg);">
        <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 8px;">ไม่พบรายชื่อสมาชิกตรงตามคำค้นหา</p>
        <p style="color: var(--gold-light); font-size: 0.85rem;">ลองค้นหาด้วยคำอื่น</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(member => `
    <div class="member-card">
      <div class="avatar-container">
        <img class="avatar-img" src="${member.avatar || 'logo.png'}" alt="${member.name || 'Member'}" onerror="this.onerror=null; this.src='logo.png';">
      </div>
      
      <h3 class="member-name">${member.name || 'สมาชิก'}</h3>
      
      <div class="social-links" style="margin-top: 16px; width: 100%;">
        ${member.facebook ? `
          <a href="${member.facebook}" target="_blank" class="action-btn" style="width: 100%; justify-content: center; text-decoration: none;">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
        ` : '<span style="color: var(--text-muted); font-size: 0.85rem;">ไม่มีลิ้งก์ Facebook</span>'}
      </div>
    </div>
  `).join('');
}

function updateStats() {
  const totalEl = document.getElementById('statTotal');
  if (totalEl) totalEl.textContent = members.length;
}

function setupEventListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderMembers();
    });
  }
}

function initAudioPlayer() {
  audioEl = document.getElementById('bgAudio');
  const btnWrapper = document.getElementById('musicBtnWrapper');
  const tooltip = document.getElementById('musicTooltip');
  const path = document.getElementById('playPausePath');

  if (!btnWrapper || !audioEl) return;

  btnWrapper.addEventListener('click', () => {
    if (isAudioPlaying) {
      audioEl.pause();
      isAudioPlaying = false;
      btnWrapper.classList.remove('playing');
      if (path) path.setAttribute('d', 'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z');
      if (tooltip) {
        tooltip.textContent = '⏸️ ปิดเสียงเพลงแล้ว';
        tooltip.classList.add('show');
        setTimeout(() => tooltip.classList.remove('show'), 2000);
      }
    } else {
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isAudioPlaying = true;
          btnWrapper.classList.add('playing');
          if (path) path.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
          if (tooltip) {
            tooltip.textContent = '▶️ กำลังเล่นเพลงประกอบ';
            tooltip.classList.add('show');
            setTimeout(() => tooltip.classList.remove('show'), 2500);
          }
        }).catch(err => {
          console.warn('Audio play error:', err);
          if (tooltip) {
            tooltip.textContent = '⚠️ กรุณาใส่ไฟล์ song.mp3 ในโฟลเดอร์';
            tooltip.classList.add('show');
            setTimeout(() => tooltip.classList.remove('show'), 3500);
          }
        });
      }
    }
  });
}
