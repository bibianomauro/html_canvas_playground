class Boundary {
  constructor(x1, y1, x2, y2, ctx) {
    this.ctx = ctx;
    this.a = this.createPoint(x1, y1);
    this.b = this.createPoint(x2, y2);
  };

  createPoint(x, y) {
    const point = {
      x: x,
      y: y,
    };
    return point;    
  };

  draw() {
    this.ctx.strokeStyle = 'hsl(240, 100%, 100%)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.a.x, this.a.y);
    this.ctx.lineTo(this.b.x, this.b.y);
    this.ctx.stroke();
  };
};