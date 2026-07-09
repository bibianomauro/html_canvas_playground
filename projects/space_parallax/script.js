const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
  
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FPS = 30;
const FRAMETIME = 1000 / FPS;

const PARTICLES_NUMBER   = 99;
const PARTICLE_MIN_SIZE  =  1;
const PARTICLE_MAX_SIZE  = 50;
const PARTICLE_MIN_SPEED =  1;
const PARTICLE_MAX_SPEED = 50;

const IMAGE = document.getElementById("image");
const IMAGE_WIDTH  = image.width;
const IMAGE_HEIGHT = image.height;

function create_particle()
{
  const radius = Math.random() * PARTICLE_MAX_SIZE + PARTICLE_MIN_SIZE;
  const diameter = 2 * radius;
  const x = canvas.width * (Math.random() + 1);
  const y = Math.floor(Math.random() * (canvas.height - radius) + radius);
  const speed = -1 * (Math.random() * PARTICLE_MAX_SPEED + radius) / PARTICLE_MAX_SIZE;
  return { x, y, radius, diameter, speed, };
}

const particles = new Array(PARTICLES_NUMBER);
for(let i = 0; i < particles.length; ++i) {
  particles[i] = create_particle();
}

function update_particle(particle)
{
  particle.x += particle.speed;
}

/* ctx.drawImage(IMAGE,
                 source_x, source_y,
                 source_width, source_height,
                 destination_x, destination_y,
                 destination_width, destination_width);
*/
function render_particle(particle)
{
  ctx.drawImage(IMAGE,
                0, 0,
                IMAGE_WIDTH, IMAGE_HEIGHT,
                particle.x - particle.radius,
                particle.y - particle.radius,
                particle.diameter, particle.diameter);
}

/* Particles "Bright" */
ctx.shadowBlur = 50;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;
ctx.shadowColor = "#fff";

/* JS style Game Loop */
let last_time = 0;
function animate(current_time)
{
  requestAnimationFrame(animate);

  let delta_time = current_time - last_time;

  /* TODO */
  /* Separate physics HZ from rendering */
  
  /* FPS Limiter Conditional */
  if(delta_time >= FRAMETIME) {
    last_time = current_time - (delta_time % FRAMETIME);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0, length = particles.length; i < length; ++i) {
      update_particle(particles[i]);
      if(particles[i].x < (0 - particles[i].radius)) {
        particles[i] = create_particle();
        continue;
      }
      render_particle(particles[i]);
    }
  }
}

animate(0);