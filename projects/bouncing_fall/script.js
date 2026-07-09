class Particle {
    constructor(effect) {
        this.effect = effect;
        this.maxSpeed = 1;
        this.maxSize = 10;
        this.minSize = 5;

        this.hue = Math.random() * 360;
        // this.saturation = Math.random() * 100;
        this.saturation = 0;
        this.luminosity = Math.random() * 50 + 25;
        this.color = `hsl(${this.hue}, ${this.saturation}%, ${this.luminosity}%)`;

        this.radius = Math.random() * this.maxSize + this.minSize;
        this.diameter = this.radius * 2;

        this.twoPi = Math.PI * 2;

        this.x = this.radius
            + Math.random()
            * (this.effect.width - 2 * this.radius);
        this.y = - this.radius;

        this.speedX = Math.random() * this.maxSpeed;
        this.speedY = Math.random() * this.maxSpeed;
        this.gravity = 0.05;

        this.bounced = 0;
    };
    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, this.twoPi);
      context.fillStyle = this.color;
      context.fill();
    };
    update() {
      this.speedY = this.speedY + this.gravity;

      this.x = this.x + this.speedX;
      this.y = this.y + this.speedY;

      // VERTICAL COLLISION WITH HTML ELEMENT //////////////////////////////////
      if(
        this.y > this.effect.element.y - this.radius
        && this.y < this.effect.element.y
        && this.x >= this.effect.element.x
        && this.x <= this.effect.element.right
        && this.bounced < 2
      ) {
        this.y = this.effect.element.y - this.radius
        this.speedY = - this.speedY * 0.6;
        this.bounced = this.bounced + 1;
      };

      // HORIZONTAL COLLISION WITH HTML ELEMENT ////////////////////////////////
      // if(
      //   this.y >= this.effect.element.y
      //   && this.y < this.effect.element.bottom
      //   && this.x > this.effect.element.x - this.radius
      //   && this.x < this.effect.element.right + this.radius
      // ) {
      //   if(this.x < this.effect.width / 2) this.x = this.effect.element.x - this.radius;
      //   if(this.x > this.effect.width / 2) this.x = this.effect.element.right + this.radius;
      //   this.speedX = - this.speedX;
      // };

      // OUT OF BOUNDS /////////////////////////////////////////////////////////
      if(this.y > this.effect.height + this.radius) this.reset();
      if(this.x < - this.radius || this.x > this.effect.width + this.radius) this.reset();
    };
    reset() {
      this.x = this.radius
        + Math.random()
        * (this.effect.width - 2 * this.radius);
      this.y = - this.radius;
      this.speedY = Math.random() * this.maxSpeed;
      this.bounced = 0;
    };
};

class Effect {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.width = canvas.width;
        this.height = canvas.height;
        this.particles = [];
        this.numberOfParticles = 100;

        this.createParticles();

        this.element = document.querySelector('h1').getBoundingClientRect();

        window.addEventListener('resize', this.resize.bind(this));
    };
    createParticles() {
        let i = 0;
        while(i < this.numberOfParticles) {
            this.particles.push(new Particle(this));
            i++;
        };
    };
    handleParticles() {
        for(let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw(this.context);
        };
    };
    resize(e) {
        const width = e.target.innerWidth;
        const height = e.target.innerHeight;

        this.canvas.width = width;
        this.canvas.height = height;

        this.width = width;
        this.height = height;

        let i = 0;
        while(i < this.particles.length) {
            this.particles[i].reset();
            i++
        };

        this.element = document.querySelector('h1').getBoundingClientRect();
    };
};

function animate(effect) {
    effect.context.clearRect(0, 0, effect.canvas.width, effect.canvas.height);
    effect.handleParticles();
    requestAnimationFrame(function() {
      animate(effect);
    });
};

window.addEventListener('load', function() {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const effect = new Effect(canvas, ctx);

  animate(effect);
});