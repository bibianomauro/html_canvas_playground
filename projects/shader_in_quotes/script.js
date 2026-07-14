const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const ASPECT_RATIO = window.innerWidth / window.innerHeight;
const RES = 200;

const WIDTH = Math.floor(RES * ASPECT_RATIO);
const HEIGHT = Math.floor(RES);

canvas.width = WIDTH;
canvas.height = HEIGHT;

const FRAMES = 12000;
const PI_FRAMES = Math.PI * 2 / FRAMES;

const BOND = 0.69;

const FPS = 24;
const FRAMETIME = 1000 / FPS;

/************** IMAGE_DATA ******************/

// ctx.createImageData() using Uint32Array() buffer
const rola = ctx.createImageData(WIDTH, HEIGHT);
const rola_buffer32 = new Uint32Array(rola.data.buffer);

// ctx.createImageData() using Uint8Array() buffer
// const rola = ctx.createImageData(WIDTH, HEIGHT);
// const rola_data = rola.data;

// for(let i = 0; i < rola_data.length; i++)
// {
//   rola_data[i] = 255; // set alpha to 100%
// };

/************** MAIN LOOP *******************/

// let old_time = 0;
function animate(current_time)
{
  window.requestAnimationFrame(animate);
  
  // let dt = current_time - old_time;

  // if(dt >= FRAMETIME)
  {
    // old_time = current_time - (current_time % FRAMETIME);
    // console.log(dt);

    const time = current_time * PI_FRAMES;

    for(let y = 0; y < HEIGHT; y++)
    {
      for(let x = 0; x < WIDTH; x++)
      {
        let r = 0;
        let g = 0;
        let b = 0;

        const px = (2 * x - WIDTH) / HEIGHT;
        const py = (2 * y - HEIGHT) / HEIGHT;

        const l = 4 - 2 * Math.abs(BOND - (px * px + py * py));

        let vx = px * l;
        let vy = py * l;

        const exponent = Math.exp(l - 4 - py);

        for(let i = 1; i < 8; i++)
        {
          const absolute = Math.abs(vx - vy);

          r = r + (Math.sin(vx) + 1) * absolute;
          g = g + (Math.sin(vy) + 1) * absolute;
          b = b + (Math.sin(vy) + 1) * absolute;

          vx = vx + Math.cos(vy * i + time) / i + BOND;
          vy = vy + Math.cos(vx * i + i + time) / i + BOND;
        };

        const gamma = 6 * exponent;

        r = Math.tanh(gamma / r) * 255;
        g = Math.tanh(gamma / g) * 255;
        b = Math.tanh(gamma / b) * 255;
        
        // First optimization try
        // let i = 4 * (x + y * WIDTH);
        // rola_data[i]     = r; // red
        // rola_data[i + 1] = g; // green
        // rola_data[i + 2] = b; // blue

        // Second optimization try
        const hex_color = ((255 << 24) | (b << 16) | (g << 8) | r) >>> 0;
        rola_buffer32[x + y * WIDTH] = hex_color;
      };
    };
    ctx.putImageData(rola, 0, 0);
  };
};

animate(0);