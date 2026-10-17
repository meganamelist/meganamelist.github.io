/**
 * SAHAPHAN ALLFRIEND - INTERACTIVE THEME CONTROLLER
 * WebGL Liquid Metal Canvas, Views Navigation, Filter & Search, Vinyl Player
 */

// ==========================================
// 1. DATA: CREWS & MEMBERS
// ==========================================
const CREWS_PAGES = [
  // Page 1 (The 4 Main Crews from screenshot)
  [
    {
      id: 'allfriend',
      no: '01',
      mark: 'A',
      name: 'ALLFRIEND',
      thName: 'ออลเฟรนด์',
      accent: '#f5c542',
      accentRgb: '245, 197, 66',
      desc: 'เครือหลักของสหพันธ์ จุดเริ่มต้นของทุกอย่าง',
      membersCount: 11,
      maxMembers: 100,
      leader: 'Chawhite',
      banner: 'allfriend'
    },
    {
      id: '8racha',
      no: '02',
      mark: '8',
      name: '8RACHA',
      thName: 'House of 8 Racha',
      accent: '#e5484d',
      accentRgb: '229, 72, 77',
      desc: 'House of 8 Racha · Stay together as family',
      membersCount: 0,
      maxMembers: 100,
      leader: 'QillerX',
      banner: '8racha'
    },
    {
      id: 'thanatos',
      no: '03',
      mark: 'T',
      name: 'THANATOS',
      thName: 'THANATOS แก๊งค์กู Real',
      accent: '#a78bfa',
      accentRgb: '167, 139, 250',
      desc: 'THANATOS แก๊งค์กู Real กูมากับ God',
      membersCount: 16,
      maxMembers: 100,
      leader: 'C4ix',
      banner: 'thanatos'
    },
    {
      id: 'safespace-x',
      no: '04',
      mark: 'X',
      name: 'SAFESPACE X',
      thName: 'SAFESPACE',
      accent: '#ec4899',
      accentRgb: '236, 72, 153',
      desc: 'Do not need lies, greed, hate. Just loyalty',
      membersCount: 2,
      maxMembers: 100,
      leader: 'MAX',
      banner: 'safespace'
    }
  ],
  // Page 2
  [
    {
      id: 'dearthug',
      no: '05',
      mark: 'D',
      name: 'DEARTHUG',
      thName: 'เดียร์ทัก',
      accent: '#38bdf8',
      accentRgb: '56, 189, 248',
      desc: 'DEARTHUG · Brotherhood and Street Loyalty',
      membersCount: 8,
      maxMembers: 100,
      leader: 'XeRz',
      banner: 'dearthug'
    },
    {
      id: 'underghost',
      no: '06',
      mark: 'U',
      name: 'UNDERGHOST',
      thName: 'อันเดอร์โกสต์',
      accent: '#4ade80',
      accentRgb: '74, 222, 128',
      desc: 'UNDERGHOST · Shadows of the City Moving in Silence',
      membersCount: 5,
      maxMembers: 100,
      leader: 'Ghost',
      banner: 'underghost'
    },
    {
      id: 'berserk',
      no: '07',
      mark: 'B',
      name: 'BERSERK',
      thName: 'เบอร์เซิร์ก',
      accent: '#fb923c',
      accentRgb: '251, 146, 60',
      desc: 'Berserk · Unstoppable Willpower and Raw Strength',
      membersCount: 7,
      maxMembers: 100,
      leader: 'Guts',
      banner: 'berserk'
    }
  ]
];

// Helper to access all crews
const ALL_CREWS = CREWS_PAGES.flat();

const MEMBERS_DATA = [
  {
    id: 'chawhite',
    crew: 'allfriend',
    num: '01',
    role: 'FOUNDER',
    roleColor: '#ffffff',
    name: 'Chawhite',
    sub: 'ชาลเต้ · ผู้ก่อตั้งเครือ',
    bio: 'ผู้ก่อตั้งและศูนย์กลางของเครือ Allfriend ยืนหยัดสร้างคอมมูนิตี้ที่แข็งแกร่ง',
    game: 'VALORANT / GTA V',
    discord: '@chawhlte.allfriend',
    instagram: 'chawhlte.shp',
    avatarChar: 'C'
  },
  {
    id: 'hamjack',
    crew: 'allfriend',
    num: '02',
    role: 'FOUNDER',
    roleColor: '#ffffff',
    name: 'HamJack',
    sub: 'ผู้ดูแลควบคุม',
    bio: 'ผู้ดูแลระบบและควบคุมความสงบเรียบร้อยภายในสหพันธ์',
    game: 'Roblox / FiveM',
    discord: 'ooduzi_82558',
    instagram: 'HamJack_888',
    avatarChar: 'H'
  },
  {
    id: 'c4ix',
    crew: 'thanatos',
    num: '03',
    role: 'FOUNDER',
    roleColor: '#ffffff',
    name: 'C4ix',
    sub: 'หัวหน้า Thanatos',
    bio: 'God Rap ผู้นำสายไรม์และจังหวะสังหาร',
    game: 'FiveM / FIFA',
    discord: 'C4ix',
    instagram: 'Shady_dmh',
    avatarChar: 'C'
  },
  {
    id: 'max',
    crew: 'safespace-x',
    num: '04',
    role: 'FOUNDER',
    roleColor: '#ffffff',
    name: 'MAX',
    sub: 'Senior Developer',
    bio: 'Developer WarZ / FiveM / GTA-SA-MP / Minecraft เบื้องหลังระบบเทคโนโลยี',
    game: 'FiveM / SA-MP',
    discord: 'HELOS TEAM',
    instagram: 'max_developer',
    avatarChar: 'M'
  },
  {
    id: 'qillerx',
    crew: '8racha',
    num: '05',
    role: 'HEAD',
    roleColor: '#f87171',
    name: 'QillerX',
    sub: 'หัวหน้า 8RACHA',
    bio: 'ผู้นำฝั่งปฏิบัติการ ความเด็ดขาดและระเบียบวินัย',
    game: 'FiveM / CS2',
    discord: 'qillerx_official',
    instagram: 'qiller_x',
    avatarChar: 'Q'
  },
  {
    id: 'luka',
    crew: 'thanatos',
    num: '06',
    role: 'MEMBER',
    roleColor: '#a3acb9',
    name: 'Luka Thanatos',
    sub: 'สมาชิกหน่วยจู่โจม',
    bio: 'เดินหน้าไม่ถอย พร้อมลุยทุกสถานการณ์',
    game: 'ROV / FiveM',
    discord: 'Luka_Tnt',
    instagram: 'babymxbab3eiei',
    avatarChar: 'L'
  },
  {
    id: 'pocky',
    crew: 'thanatos',
    num: '07',
    role: 'MEMBER',
    roleColor: '#a3acb9',
    name: 'Pocky Thanatos',
    sub: 'สมาชิกประจำการ',
    bio: 'สายนิ่ง เล่นเกมเป็นหลัก สายซัพพอร์ตเพื่อน',
    game: 'FiveM',
    discord: 'Pocky_88',
    instagram: 'Pocky_Thanatos',
    avatarChar: 'P'
  },
  {
    id: 'samud',
    crew: 'safespace-x',
    num: '08',
    role: 'MEMBER',
    roleColor: '#a3acb9',
    name: 'SAMUD',
    sub: 'สมาชิก Safespace',
    bio: 'เน้นความชิว สบายๆ เข้ากับทุกคนได้ง่าย',
    game: 'SA-MP / Roblox',
    discord: 'zepar_beelzebub',
    instagram: 'gop9923ok',
    avatarChar: 'S'
  }
];


// ==========================================
// 2. WEBGL LIQUID METAL / FERROFLUID CANVAS
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
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
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

      // Distance to mouse for interactive ripple
      float dist = length(st - m);
      float mouseInfluence = smoothstep(0.5, 0.0, dist) * 0.15;

      float t = u_time * 0.25;

      // Dark liquid metal ripple layers
      float wave1 = sin(st.x * 3.5 + t + mouseInfluence * 4.0) * cos(st.y * 3.5 - t);
      float wave2 = sin(st.y * 5.0 - t * 1.2 + wave1) * cos(st.x * 4.0 + t * 0.8);
      float wave3 = sin((st.x + st.y) * 4.0 + wave2 * 2.0 + t);

      float liquid = (wave1 + wave2 + wave3) * 0.333 + 0.5;

      // Deep dark chrome specular gradient
      vec3 darkBase = vec3(0.012, 0.015, 0.024);
      vec3 metallicSheen = vec3(0.08, 0.09, 0.14);
      vec3 specular = vec3(0.35, 0.38, 0.48);

      vec3 color = mix(darkBase, metallicSheen, smoothstep(0.2, 0.7, liquid));
      color += specular * pow(liquid, 6.0) * 0.35;

      // Subtle vignette
      vec2 center = gl_FragCoord.xy / u_resolution.xy - 0.5;
      float vignette = 1.0 - dot(center, center) * 0.85;
      color *= clamp(vignette, 0.0, 1.0);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function compileShader(src, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compileShader(vsSource, gl.VERTEX_SHADER));
  gl.attachShader(program, compileShader(fsSource, gl.FRAGMENT_SHADER));
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

  let startTime = performance.now();

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
// 3. VIEW SYSTEM & NAVIGATION
// ==========================================
let currentView = 'landing';
let activeCrewFilter = 'all';

function switchView(viewName) {
  const views = {
    landing: document.getElementById('view-landing'),
    crews: document.getElementById('view-crews'),
    members: document.getElementById('view-members')
  };

  Object.values(views).forEach(v => {
    if (v) v.classList.remove('is-active');
  });

  if (views[viewName]) {
    views[viewName].classList.add('is-active');
    currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ==========================================
// 4. RENDERING CREWS & MEMBERS
// ==========================================
function getCrewBannerSvg(type, accent) {
  if (type === 'allfriend') {
    return `
      <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="afBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#050608"/>
            <stop offset="60%" stop-color="#14120a"/>
            <stop offset="100%" stop-color="#020305"/>
          </linearGradient>
          <radialGradient id="afGlow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stop-color="#f5c542" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
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
          <linearGradient id="r8Bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#050608"/>
            <stop offset="50%" stop-color="#18080a"/>
            <stop offset="100%" stop-color="#030406"/>
          </linearGradient>
          <radialGradient id="r8Glow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stop-color="#e5484d" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="280" height="180" fill="url(#r8Bg)"/>
        <rect width="280" height="180" fill="url(#r8Glow)"/>
        <path d="M115 75 L125 58 L140 68 L155 58 L165 75 Z" fill="none" stroke="#e5484d" stroke-width="2" opacity="0.6"/>
        <text x="140" y="98" font-family="'Grenze Gotisch', Georgia, serif" font-size="28" font-weight="900" fill="#e5484d" text-anchor="middle" letter-spacing="3" filter="drop-shadow(0 0 10px rgba(229,72,77,0.8))">8RACHA</text>
        <text x="140" y="118" font-family="'Syncopate', sans-serif" font-size="7" fill="#94a3b8" text-anchor="middle" letter-spacing="2">HOUSE OF 8 RACHA</text>
        <text x="140" y="128" font-family="'Noto Sans Thai', sans-serif" font-size="7" fill="#64748b" text-anchor="middle">STAY TOGETHER AS FAMILY</text>
      </svg>
    `;
  }
  if (type === 'thanatos') {
    return `
      <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="thBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#050608"/>
            <stop offset="50%" stop-color="#120c1c"/>
            <stop offset="100%" stop-color="#030406"/>
          </linearGradient>
          <radialGradient id="thGlow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="280" height="180" fill="url(#thBg)"/>
        <rect width="280" height="180" fill="url(#thGlow)"/>
        <path d="M140 60 C120 45, 90 60, 70 85 C100 85, 125 80, 140 95 C155 80, 180 85, 210 85 C190 60, 160 45, 140 60 Z" fill="none" stroke="#a78bfa" stroke-width="1.5" opacity="0.5"/>
        <text x="140" y="105" font-family="'Grenze Gotisch', Georgia, serif" font-size="28" font-weight="900" fill="#a78bfa" text-anchor="middle" letter-spacing="3" filter="drop-shadow(0 0 10px rgba(167,139,250,0.8))">THANATOS</text>
        <text x="140" y="124" font-family="'Syncopate', sans-serif" font-size="7" fill="#94a3b8" text-anchor="middle" letter-spacing="2">GOD RAP · REAL GOD</text>
      </svg>
    `;
  }
  return `
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sfBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#050608"/>
          <stop offset="50%" stop-color="#1a0914"/>
          <stop offset="100%" stop-color="#030406"/>
        </linearGradient>
        <radialGradient id="sfGlow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="${accent || '#ec4899'}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="280" height="180" fill="url(#sfBg)"/>
      <rect width="280" height="180" fill="url(#sfGlow)"/>
      <path d="M125 65 L155 95 M155 65 L125 95" stroke="${accent || '#ec4899'}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
      <text x="140" y="115" font-family="'Grenze Gotisch', Georgia, serif" font-size="26" font-weight="900" fill="${accent || '#ec4899'}" text-anchor="middle" letter-spacing="3" filter="drop-shadow(0 0 10px ${accent || 'rgba(236,72,153,0.8)'})">${(type || '').toUpperCase()}</text>
      <text x="140" y="132" font-family="'Syncopate', sans-serif" font-size="6.5" fill="#94a3b8" text-anchor="middle" letter-spacing="1.5">LOYALTY ABOVE ALL</text>
    </svg>
  `;
}

let activeCrewCardId = 'allfriend';
let currentCrewPage = 1;

function renderCrews(page = 1) {
  currentCrewPage = Math.max(1, Math.min(page, CREWS_PAGES.length));
  const container = document.getElementById('crews-grid');
  if (!container) return;

  const currentCrews = CREWS_PAGES[currentCrewPage - 1];

  container.innerHTML = currentCrews.map(crew => {
    const isActive = (crew.id === activeCrewCardId);
    return `
      <article class="crew-card ${isActive ? 'is-active' : ''}" style="--accent: ${crew.accent}; --accent-rgb: ${crew.accentRgb};" data-crew-id="${crew.id}">
        <span class="cc-no">${crew.no}</span>
        <div class="cc-banner">
          ${getCrewBannerSvg(crew.banner, crew.accent)}
        </div>
        <span class="cc-mark" aria-hidden="true">${crew.mark}</span>
        
        <div class="cc-info">
          <div>
            <span class="cc-tag"><i></i>SAHAPHAN ${crew.no}</span>
            <h3 class="cc-name">${crew.name}</h3>
            <p class="cc-th">${crew.thName}</p>
            <p class="cc-desc">${crew.desc}</p>
          </div>
          
          <div>
            <dl class="cc-stats">
              <div><dt>สมาชิก</dt><dd>${crew.membersCount}<small>/${crew.maxMembers}</small></dd></div>
              <div><dt>หัวหน้า</dt><dd>${crew.leader}</dd></div>
            </dl>
            
            <button class="cc-btn" type="button" data-view-crew="${crew.id}">
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

  if (pgLabel) pgLabel.textContent = `${currentCrewPage}/${CREWS_PAGES.length}`;
  if (pgPrev) pgPrev.disabled = (currentCrewPage === 1);
  if (pgNext) pgNext.disabled = (currentCrewPage === CREWS_PAGES.length);

  // Attach card click to toggle active state
  container.querySelectorAll('.crew-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-view-crew]')) return;
      const crewId = card.getAttribute('data-crew-id');
      activeCrewCardId = crewId;
      container.querySelectorAll('.crew-card').forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');
    });
  });

  // Attach button click to navigate to members view
  container.querySelectorAll('[data-view-crew]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const crewId = btn.getAttribute('data-view-crew');
      openMembersView(crewId);
    });
  });
}

function openMembersView(crewId = 'all') {
  activeCrewFilter = crewId;
  const crew = ALL_CREWS.find(c => c.id === crewId);
  const kicker = document.getElementById('membersKicker');
  const title = document.getElementById('membersTitle');

  if (kicker && title) {
    if (crew) {
      kicker.textContent = `FEDERATION / ${crew.name.toUpperCase()}`;
      title.textContent = `สมาชิก ${crew.name}`;
    } else {
      kicker.textContent = 'THE FEDERATION';
      title.textContent = 'สมาชิกทั้งหมด';
    }
  }

  filterAndRenderMembers();
  switchView('members');
}

let activeRoleFilter = 'ALL';
let currentSearchTerm = '';

function filterAndRenderMembers() {
  const container = document.getElementById('members-bands');
  if (!container) return;

  let filtered = MEMBERS_DATA;

  // Filter by crew if not 'all'
  if (activeCrewFilter !== 'all') {
    filtered = filtered.filter(m => m.crew === activeCrewFilter);
  }

  // Filter by search
  if (currentSearchTerm.trim() !== '') {
    const q = currentSearchTerm.toLowerCase();
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(q) ||
      m.sub.toLowerCase().includes(q) ||
      m.bio.toLowerCase().includes(q) ||
      m.game.toLowerCase().includes(q) ||
      m.discord.toLowerCase().includes(q)
    );
  }

  // Update counts for role filter tabs
  const roles = ['FOUNDER', 'HEAD', 'MEMBER'];
  roles.forEach(role => {
    const badge = document.getElementById(`count-${role.toLowerCase()}`);
    if (badge) {
      const count = filtered.filter(m => m.role === role).length;
      badge.textContent = count;
    }
  });
  const allBadge = document.getElementById('count-all');
  if (allBadge) allBadge.textContent = filtered.length;

  // Group by role
  const rolesToDisplay = activeRoleFilter === 'ALL' ? roles : [activeRoleFilter];

  let html = '';
  rolesToDisplay.forEach(role => {
    const roleMembers = filtered.filter(m => m.role === role);
    if (roleMembers.length === 0 && activeRoleFilter !== 'ALL') {
      html += `
        <section class="role-band">
          <header class="rb-head">
            <h3 class="rb-tag">${role}</h3>
            <span class="rb-line"></span>
            <span class="rb-count">0 คน</span>
          </header>
          <p style="color: var(--text-dim); font-size: 0.9rem; padding: 20px 0;">ไม่มีข้อมูลสมาชิกในตำแหน่งนี้</p>
        </section>
      `;
      return;
    }
    if (roleMembers.length === 0) return;

    html += `
      <section class="role-band">
        <header class="rb-head">
          <h3 class="rb-tag">${role}</h3>
          <span class="rb-line"></span>
          <span class="rb-count">${roleMembers.length} คน</span>
        </header>
        <div class="rb-grid">
          ${roleMembers.map(m => `
            <article class="member-card" data-glass="" data-member-id="${m.id}">
              <div class="mc-top">
                <span class="mc-role" style="color: ${m.roleColor}">
                  <i></i>${m.role}
                </span>
                <span class="mc-num">${m.num}</span>
              </div>

              <div class="mc-body">
                <div class="mc-avatar">
                  <span>${m.avatarChar}</span>
                </div>
                <div>
                  <h3 class="mc-name">${m.name}</h3>
                  <p class="mc-sub">${m.sub}</p>
                </div>
              </div>

              <p class="mc-bio">${m.bio}</p>

              <div class="mc-meta">
                <span class="mc-tag">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  ${m.game}
                </span>
              </div>

              <div class="mc-links">
                <button class="mc-link" type="button" data-copy="${m.discord}" title="คัดลอก Discord: ${m.discord}">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"></path>
                  </svg>
                  <span>Discord</span>
                </button>
                <a class="mc-link" href="https://instagram.com/${m.instagram}" target="_blank" rel="noopener noreferrer">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>IG</span>
                </a>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  });

  container.innerHTML = html;

  // Bind member click (opens modal)
  container.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.mc-link')) return; // ignore link/button clicks
      const memberId = card.getAttribute('data-member-id');
      openMemberModal(memberId);
    });
  });

  // Bind copy buttons
  container.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        showToast(`คัดลอก Discord: ${text} สำเร็จแล้ว`);
      });
    });
  });
}

// ==========================================
// 5. MEMBER DETAIL MODAL
// ==========================================
function openMemberModal(memberId) {
  const m = MEMBERS_DATA.find(x => x.id === memberId);
  if (!m) return;

  const modal = document.getElementById('memberModal');
  document.getElementById('modalAvatarChar').textContent = m.avatarChar;
  document.getElementById('modalRole').innerHTML = `<i></i><span>${m.role}</span>`;
  document.getElementById('modalRole').style.color = m.roleColor;
  document.getElementById('modalName').textContent = m.name;
  document.getElementById('modalSub').textContent = m.sub;
  document.getElementById('modalBio').textContent = m.bio;
  document.getElementById('modalDiscord').textContent = m.discord;
  document.getElementById('modalInstagram').textContent = `@${m.instagram}`;
  document.getElementById('modalGame').textContent = m.game;

  const copyBtn = document.getElementById('modalCopyBtn');
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(m.discord).then(() => {
      showToast(`คัดลอก Discord: ${m.discord} สำเร็จ`);
    });
  };

  const igBtn = document.getElementById('modalIgBtn');
  igBtn.href = `https://instagram.com/${m.instagram}`;

  modal.classList.add('is-open');
}

function closeMemberModal() {
  const modal = document.getElementById('memberModal');
  if (modal) modal.classList.remove('is-open');
}

// ==========================================
// 6. TOAST NOTIFICATIONS
// ==========================================
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
// 7. EVENT LISTENERS INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Start Liquid WebGL background
  initLiquidMetalCanvas();

  // Render initial components
  renderCrews();
  filterAndRenderMembers();


  // Back button in Crews view (Crews -> Landing)
  const crewsBackBtn = document.getElementById('crewsBackBtn');
  if (crewsBackBtn) {
    crewsBackBtn.addEventListener('click', () => switchView('landing'));
  }

  // Back button in Members view (Members -> Crews)
  const membersBackBtn = document.getElementById('membersBackBtn');
  if (membersBackBtn) {
    membersBackBtn.addEventListener('click', () => switchView('crews'));
  }

  // Role filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeRoleFilter = btn.getAttribute('data-filter');
      filterAndRenderMembers();
    });
  });

  // Search input
  const searchInput = document.getElementById('memberSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value;
      filterAndRenderMembers();
    });
  }

  // Modal close button & backdrop click
  const modalClose = document.getElementById('modalClose');
  if (modalClose) modalClose.addEventListener('click', closeMemberModal);

  const memberModal = document.getElementById('memberModal');
  if (memberModal) {
    memberModal.addEventListener('click', (e) => {
      if (e.target === memberModal) closeMemberModal();
    });
  }

  // Pager buttons for crews
  const pgPrev = document.getElementById('pgPrev');
  if (pgPrev) {
    pgPrev.addEventListener('click', () => {
      if (currentCrewPage > 1) renderCrews(currentCrewPage - 1);
    });
  }

  const pgNext = document.getElementById('pgNext');
  if (pgNext) {
    pgNext.addEventListener('click', () => {
      if (currentCrewPage < CREWS_PAGES.length) renderCrews(currentCrewPage + 1);
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMemberModal();
  });
});
