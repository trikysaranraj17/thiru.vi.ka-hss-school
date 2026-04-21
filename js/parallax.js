/**
 * PARALLAX.JS — Subtle mouse-move parallax effects for decorative elements
 */

const Parallax = {
  init() {
    this.hero = document.querySelector('.hero');
    if (!this.hero) return;

    this.orbs = this.hero.querySelectorAll('.orb');
    this.content = this.hero.querySelector('.hero__content');
    
    this.ticking = false;
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.requestTick();
    });
  },

  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.update());
      this.ticking = true;
    }
  },

  update() {
    this.handleMouseMove(this.mouseX, this.mouseY);
    this.ticking = false;
  },

  handleMouseMove(clientX, clientY) {
    const { innerWidth, innerHeight } = window;

    // Calculate movement ratios (-0.5 to 0.5)
    const moveX = (clientX / innerWidth) - 0.5;
    const moveY = (clientY / innerHeight) - 0.5;

    // Move orbs in different directions/speeds
    if (this.orbs.length >= 1) {
      this.orbs[0].style.transform = `translate(${moveX * 50}px, ${moveY * 50}px) scale(1.1)`;
    }
    if (this.orbs.length >= 2) {
      this.orbs[1].style.transform = `translate(${moveX * -30}px, ${moveY * -30}px) scale(1)`;
    }
    if (this.orbs.length >= 3) {
      this.orbs[2].style.transform = `translate(${moveX * 60}px, ${moveY * -40}px) scale(0.9)`;
    }

    // Move text content subtly (rounded to nearest pixel for sharpness)
    if (this.content) {
      this.content.style.transform = `translate(${Math.round(moveX * 15)}px, ${Math.round(moveY * 15)}px)`;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => Parallax.init());
