const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

let pearImage = "pear tölk.png";

class Particle {
  constructor(x, y, velocityX, velocityY, imageFile) {
    this.imageFile = imageFile;
    this.x = x;
    this.y = y;
    this.width = Math.floor(Math.random() * (150 - 100 + 1) - 100);
    this.height = Math.floor(Math.random() * (200 - 100 + 1) - 100);
    this.velocityX = velocityX; //Math.random() * (10 + 9 + 1) - 9;
    this.velocityY = velocityY; //Math.random() * (-1 - 5 + 1) - 5;
  }

  show() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  move() {
    let img = new Image();
    img.src = this.imageFile;
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  deleteParticle() {
    return (
      this.x > canvas.width ||
      this.x < 0 ||
      this.y > canvas.height ||
      this.y < 0
    );
  }
}

let particles = [];

const draw = () => {
  //console.log(particles.length);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let pearParticle = new Particle(
    canvas.width - canvas.width / 3,
    canvas.height - 25,
    pearImage
  );
  particles.push(pearParticle);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].move();
    if (particles[i].deleteParticle()) {
      particles.splice(i, 1);
    }
  }

  raf = window.requestAnimationFrame(draw);
};

const pearRain = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let pearParticle = new Particle(
    Math.random() * canvas.width,
    25,
    0,
    Math.ceil(Math.random() * (10 + 5) - 5),
    pearImage
  );

  particles.push(pearParticle);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].move();
    if (particles[i].deleteParticle()) {
      particles.splice(i, 1);
    }
  }

  rafPearRain = window.requestAnimationFrame(pearRain);
};

const stopAnimation = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = [];
  window.cancelAnimationFrame(rafPearRain);
};

let pearRainActive = false;

document.getElementById("pearRain").addEventListener("click", () => {
  pearRainActive = !pearRainActive;
  if (pearRainActive) {
    rafPearRain = window.requestAnimationFrame(pearRain);
  } else {
    stopAnimation();
  }
});
