const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

let W, H;
let stars = [];
let shootingStars = [];

const STAR_COUNT = 120;
const SHOOTING_STAR_MAX = 5;

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});

resizeCanvas();

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.radius = Math.random() * 1.2 + 0.2;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.twinkleSpeed = Math.random() * 0.012 + 0.004;
    this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
    const hue = Math.floor(Math.random() * 20 + 40);
    this.color = `hsla(${hue}, 90%, 80%,`;
  }

  update() {
    this.opacity += this.twinkleSpeed * this.twinkleDir;
    if (this.opacity >= 0.85) { this.opacity = 0.85; this.twinkleDir = -1; }
    if (this.opacity <= 0.05) { this.opacity = 0.05; this.twinkleDir = 1; }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `${this.color}${this.opacity})`;
    ctx.shadowBlur = this.radius * 4;
    ctx.shadowColor = `${this.color}0.6)`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

class ShootingStar {
  constructor() {
    this.spawn();
  }

  spawn() {
    this.x = Math.random() * W * 1.2;
    this.y = Math.random() * H * 0.4 - 40;
    this.len = Math.random() * 80 + 40;
    this.speed = Math.random() * 4 + 2;
    this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
    this.opacity = 0;
    this.fadeIn = true;
    this.maxOpacity = Math.random() * 0.7 + 0.3;
    this.radius = Math.random() * 1.5 + 0.5;
    this.life = 0;
    this.maxLife = Math.floor(Math.random() * 80 + 60);
    const hue = Math.floor(Math.random() * 20 + 42);
    this.hue = hue;
    this.dead = false;
  }

  update() {
    this.life++;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    const fadeThreshold = this.maxLife * 0.2;
    if (this.life < fadeThreshold) {
      this.opacity = (this.life / fadeThreshold) * this.maxOpacity;
    } else {
      this.opacity = ((this.maxLife - this.life) / (this.maxLife - fadeThreshold)) * this.maxOpacity;
    }

    if (this.life >= this.maxLife || this.x > W + 100 || this.y > H + 100) {
      this.dead = true;
    }
  }

  draw() {
    const tailX = this.x - Math.cos(this.angle) * this.len;
    const tailY = this.y - Math.sin(this.angle) * this.len;

    const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
    grad.addColorStop(0, `hsla(${this.hue}, 90%, 80%, 0)`);
    grad.addColorStop(0.6, `hsla(${this.hue}, 100%, 90%, ${this.opacity * 0.4})`);
    grad.addColorStop(1, `hsla(${this.hue}, 100%, 100%, ${this.opacity})`);

    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = grad;
    ctx.lineWidth = this.radius;
    ctx.lineCap = 'round';
    ctx.shadowBlur = 8;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 85%, ${this.opacity * 0.5})`;
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 98%, ${this.opacity})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = `hsla(${this.hue}, 100%, 90%, ${this.opacity})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function initStars() {
  stars = Array.from({ length: STAR_COUNT }, () => new Star());
}

let shootingStarTimer = 0;
const SPAWN_INTERVAL = 40;

function spawnShootingStarIfNeeded() {
  shootingStarTimer++;
  if (shootingStarTimer >= SPAWN_INTERVAL && shootingStars.length < SHOOTING_STAR_MAX) {
    shootingStars.push(new ShootingStar());
    shootingStarTimer = 0;
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);

  stars.forEach(star => {
    star.update();
    star.draw();
  });

  spawnShootingStarIfNeeded();
  shootingStars = shootingStars.filter(s => !s.dead);
  shootingStars.forEach(ss => {
    ss.update();
    ss.draw();
  });

  requestAnimationFrame(animate);
}

initStars();
animate();
