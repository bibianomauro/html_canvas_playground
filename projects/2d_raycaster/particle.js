class Particle {
  constructor(x, y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  };

  changePos(x, y) {
    this.x = x;
    this.y = y;
  };

  draw() {
    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.arc(
      this.x,
      this.y,
      1,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
  };
};