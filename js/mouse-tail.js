/**
 * MOUSE-TAIL.JS — Interactive Mouse Follower Animation
 * Creates a glowing trail that follows the user's cursor.
 * (V2.1 - Extreme Sensitivity)
 */

class MouseTail {
  constructor() {
    this.points = [];
    this.segments = 30; // Slightly shorter tail
    this.mouse = { x: 0, y: 0 };
    this.canvas = null;
    this.ctx = null;
    this.sensitivity = 0.95; // Extreme sensitivity
    this.followerSpeed = 0.8; // Faster follower lag

    this.init();
  }

  init() {
    // Disable on mobile/touch devices for stability and performance
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768) {
      return;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '99999';
    this.canvas.id = 'mouse-tail-canvas';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resize();

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => this.resize());

    // Initialize points with better distribution
    for (let i = 0; i < this.segments; i++) {
      this.points.push({ x: this.mouse.x, y: this.mouse.y });
    }

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update points with extreme sensitivity
    let head = this.points[0];
    head.x += (this.mouse.x - head.x) * this.sensitivity;
    head.y += (this.mouse.y - head.y) * this.sensitivity;

    for (let i = 1; i < this.segments; i++) {
      let p = this.points[i];
      let prev = this.points[i - 1];
      p.x += (prev.x - p.x) * this.followerSpeed;
      p.y += (prev.y - p.y) * this.followerSpeed;
    }

    // Draw tail
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.segments; i++) {
      // Bezier curve for smoother tail
      const xc = (this.points[i].x + this.points[i - 1].x) / 2;
      const yc = (this.points[i].y + this.points[i - 1].y) / 2;
      this.ctx.quadraticCurveTo(this.points[i - 1].x, this.points[i - 1].y, xc, yc);
    }

    // Gradient style (More vibrant "Tailwind" feel)
    const gradient = this.ctx.createLinearGradient(
      this.points[0].x, this.points[0].y,
      this.points[this.segments - 1].x, this.points[this.segments - 1].y
    );

    // Metallic Gold to Vivid Gold to transparent
    gradient.addColorStop(0, 'rgba(212, 175, 55, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();

    // Head glow
    this.ctx.beginPath();
    this.ctx.arc(this.points[0].x, this.points[0].y, 4, 0, Math.PI * 2);
    this.ctx.fillStyle = '#FFD700';
    this.ctx.fill();

    requestAnimationFrame(() => this.animate());
  }
}

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  new MouseTail();
});
