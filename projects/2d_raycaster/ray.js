class Ray {
  constructor(x, y, ctx, diagonal) {
    this.ctx = ctx;
    this.pos = {
      x: x,
      y: y,
    };
    this.dir = this.calculateDirection(0);
    this.maxModule = diagonal;
    this.module = this.maxModule;
    this.color = 0;
    this.lightness = 100;
  };

  draw() {
    this.ctx.strokeStyle = `hsl(${this.color}, 100%, ${this.lightness}%)`;
    this.ctx.lineWidth = 0.1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.ctx.lineTo(
      this.pos.x + this.dir.x * this.module,
      this.pos.y + this.dir.y * this.module,
    );
    this.ctx.stroke();
  };
  
  calculateDirection(angle) {
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  };
};