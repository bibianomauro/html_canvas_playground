const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/* Window Logic */
const RES = 1000; /* Vertical pixels quant. */
const ASPECT_RATIO = window.innerWidth / window.innerHeight;

canvas.height = Math.floor(RES);
canvas.width  = Math.floor(RES * ASPECT_RATIO);

/* FPS Logic */
const FPS = 10;
const FRAMETIME = 1000 / FPS;

/* Matrix rain style */
const CHAR_ARRAY = ['人', 'お', '社', '会', 'の', 'す', 'べ', 'て', 'と', '平', 'で', 'る', 'こ', 'き', 'な', 'い', 'す', 'は', 'ゐ', ];
const CHARS_NUMBERS = Math.floor(RES / 2);
const MIN_SIZE = RES * 1 / 100;
const MAX_SIZE = RES * 3 / 100;

/* Characters Prototype */
function create_char()
{
  const hiragana = CHAR_ARRAY[Math.floor(Math.random() * CHAR_ARRAY.length)];
  const size = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE)) + MIN_SIZE;
  const x = Math.floor(Math.random() * (canvas.width - size) + size);
  const speed = size;
  const y = -1 * Math.floor(Math.random() * 50 * size);
  return { x, y, size, speed, hiragana, }
}
const chars = [];
for(let i = 0; i < CHARS_NUMBERS; ++i) {
  chars.push(create_char());
}

/* Blur around the first falling character */
ctx.shadowBlur = 20;
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 0;

/* JS style Game Loop */
let last_time = 0;
function render(current_time)
{
  requestAnimationFrame(render);
  
  let delta_time = current_time - last_time;

  /* FPS Limiter conditional */
  if(delta_time >= FRAMETIME) {
    last_time = current_time - (delta_time % FRAMETIME);

    ctx.shadowColor = "#000";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#0f0";
    ctx.shadowColor = "#fff";
    for(let i = 0, length = chars.length; i < length; ++i) {
      let char = chars[i];
      let hiragana = CHAR_ARRAY[Math.floor(Math.random() * CHAR_ARRAY.length)];
      
      ctx.font = char.size + "px sans-serif";
      ctx.fillText(hiragana, char.x, char.y);

      char.y += char.speed;
      if(char.y > (canvas.height + char.size)) chars[i] = create_char();
    }
  }
}
render(0);