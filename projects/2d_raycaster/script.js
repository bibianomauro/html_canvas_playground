const diagonal = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));

const windowSize = {
  x: window.innerWidth,
  y: window.innerHeight,
  fps: 60,
};

const canvas = document.querySelector('#canvas');
canvas.height = windowSize.y;
canvas.width = windowSize.x;

const ctx = canvas.getContext('2d');

const boundaries = [];

for(let i = 0; i < 6; i++) {
  const boundary = new Boundary(
    windowSize.x * Math.random(),
    windowSize.y * Math.random(),
    windowSize.x * Math.random(),
    windowSize.y * Math.random(),
    ctx
  );
  boundary.draw();
  boundaries.push(boundary);
};

const particle = new Particle(0, 0, ctx);

const rays = [];

for(let i = 0; i < 1337; i ++) {
  const ray = new Ray(particle.x, particle.y, ctx, diagonal);
  ray.dir = ray.calculateDirection(2 * Math.PI * i / 1337);
  rays.push(ray);
};

// window.addEventListener('resize', function() {
//   windowSize.x = window.innerWidth;
//   windowSize.y = window.innerHeight;

//   canvas.height = windowSize.y;
//   canvas.width = windowSize.x;

//   boundary.a = boundary.createPoint(windowSize.x * 0.69, windowSize.y * 0.420);
//   boundary.b = boundary.createPoint(windowSize.x * 0.69, windowSize.y * 0.69);
//   boundary.draw();
// });

window.addEventListener('mousemove', function(e) {
  const x = e.clientX;
  const y = e.clientY;
  
  particle.changePos(x, y);
  
  for(let i = 0; i < rays.length; i++) {
    rays[i].pos.x = x;
    rays[i].pos.y = y;
  };
});

window.addEventListener('mousedown', function() {
  const color = Math.floor(Math.random() * 361);
  const lightness = Math.floor(Math.random() * 51 + 50);

  for(let i = 0; i < rays.length; i++) {
    rays[i].color = color;
    rays[i].lightness = lightness;
  };
});

function cast(boundary, ray) {
  const x1 = boundary.a.x;
  const y1 = boundary.a.y;
  const x2 = boundary.b.x;
  const y2 = boundary.b.y;

  const x3 = ray.pos.x;
  const y3 = ray.pos.y;
  const x4 = ray.pos.x + ray.dir.x * ray.module;
  const y4 = ray.pos.y + ray.dir.y * ray.module;

  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if(den === 0) return;

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;

  const u = ((y1 - y2) * (x1 - x3) - (x1 - x2) * (y1 - y3)) / den;

  if(t >= 0 && t <= 1 && u >= 0) {
    const point = {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1),
    };

    const dx = point.x - ray.pos.x;
    const dy = point.y - ray.pos.y;

    const module = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if(module < ray.module) {
      ray.module = module;
    };
  };
};



function animate(timestamp) {
  
  ctx.fillStyle = '#000';
  ctx.clearRect(0, 0, windowSize.x, windowSize.y);
  ctx.fill();

  for(let i = 0; i < boundaries.length; i++) {
    boundaries[i].draw();
  };

  particle.draw();

  for(let i = 0; i < rays.length; i++) {
    rays[i].module = diagonal;
    for(let j = 0; j < boundaries.length; j++) {
      cast(boundaries[j], rays[i]);
    };
    rays[i].draw();
  };

  // console.log(timestamp);
  requestAnimationFrame(animate);
};

animate(0);