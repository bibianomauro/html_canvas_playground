const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

/* Window Logic */
// const RES = 1000;
// const ASPECT_RATIO = window.innerWidth / window.innerHeight;

// canvas.height = Math.floor(RES);
// canvas.width  = Math.floor(RES * ASPECT_RATIO);

/* FPS Logic */
// const FPS = 30;
// const FRAMETIME = 1000 / FPS;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const particles = [];

const speed = 5;
let hue = 0;

class Particle {
    constructor(x, y) {
        this.color = `hsl(${hue}, 100%, 50%)`;
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * speed - speed / 2;
        this.speedY = Math.random() * speed - speed / 2;
    };

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.wallColision();
        if(this.size > 0.2) this.size -= 0.05;
    };

    wallColision() {
        if(this.x <= this.size || this.x >= (canvas.width - this.size)) {
            this.speedX = this.speedX * -1;
        };
        if(this.y <= this.size || this.y >= (canvas.height - this.size)) {
            this.speedY = this.speedY * -1;
        };
    };

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
        ctx.fill();
    };
};

window.addEventListener('resize', function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

canvas.addEventListener('click', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    for(let i = 0; i < 69; i++) {
        particles.push(new Particle(x, y));
    };
});

canvas.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    for(let i = 0; i < 1; i++) {
        particles.push(new Particle(x, y));
    }
});

// function distance(i, j) {
//     const x1 = particles[i].x;
//     const y1 = particles[i].y;
//     const vx1 = particles[i].speedX;
//     const vy1 = particles[i].speedY;
//     const size1 = particles[i].size;

//     const x2 = particles[j].x;
//     const y2 = particles[j].y;
//     const vx2 = particles[j].speedX;
//     const vy2 = particles[j].speedY;
//     const size2 = particles[j].size;

//     const dx = Math.pow(x1 - x2, 2);
//     const dy = Math.pow(y1 - y2, 2);

//     const gap = Math.sqrt(dx + dy);
//     const sizes = size1 + size2;

//     if(colision(gap, sizes)) {
//         particles[i].speedX = velocity1(
//             vx1,
//             vx2,
//             size1,
//             size2
//         );
//         particles[j].speedX = velocity2(
//             vx1,
//             particles[i].speedX,
//             vx2
//         );
//         particles[i].speedY = velocity1(
//             vy1,
//             vy2,
//             size1,
//             size2
//         );
//         particles[j].speedY = velocity2(
//             vy1,
//             particles[i].speedY,
//             vy2
//         );
//         particles[i].update();
//         particles[i].draw();
//         particles[j].update();
//         particles[j].draw();
//     };
// };

// function colision(gap, sizes) {
//     if(gap <= sizes) return true;
//     return false;
// };

// function velocity1(v1, v2, m1, m2) {
//     return (v1 * (m1 - m2) + 2 * m2 * v2) / (m1 + m2);
// };

// function velocity2(v1i, v1f, v2i) {
//     return v1f + v1i - v2i;
// };

function constellation(i, j) {
    const x1 = particles[i].x;
    const y1 = particles[i].y;
    const x2 = particles[j].x;
    const y2 = particles[j].y;

    const d2x = Math.pow(x2 - x1, 2);
    const d2y = Math.pow(y2 - y1, 2);

    const dist = Math.sqrt(d2x + d2y);

    if(dist < 420) {
        // const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        // grad.addColorStop('0', particles[i].color);
        // grad.addColorStop('1.0', particles[j].color);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = particles[i].size / 10;
        // ctx.strokeStyle = grad;
        ctx.strokeStyle = particles[i].color;
        ctx.stroke();
    };
};

function handleParticles() {
    for(let i = 0; i < particles.length; i++) {
        for(let j = i; j < particles.length; j++) {
            if(i === j) continue;
            constellation(i, j);
            // distance(i, j);
        };
        particles[i].update();
        particles[i].draw();
        if(particles[i].size < 0.3) {
            particles.splice(i, 1);
            i--;
        };
    };
};

function handleHue() {
    hue+=10;
    if(hue > 360) hue = 0;
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    handleHue();
    requestAnimationFrame(animate);
};

animate();