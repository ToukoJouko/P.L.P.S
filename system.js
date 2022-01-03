const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;

let pearImage = "pear tölk.png";
let lagerImage = "lager tölk.png";

class Particle {
  constructor(x, y, velocityX, velocityY, width, height, imageFile) {
    this.imageFile = imageFile;
    this.x = x;
    this.y = y;
    this.width = width; //Math.floor(Math.random() * (150 - 100 + 1) - 100);
    this.height = height; //Math.floor(Math.random() * (200 - 100 + 1) - 100);
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
      this.y < 0 ||
      this.velocityY === 0
    );
  }
}

let lagerParticleList = [];
let pearParticleList = [];
let particleList = [pearParticleList, lagerParticleList];

const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
/*
const draw = () => {
  //console.log(particles.length);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let pearParticle = new Particle(
    canvas.width - canvas.width / 3,
    canvas.height - 25,
    pearImage
  );
  pearParticleList.push(pearParticle);
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].move();
    if (particles[i].deleteParticle()) {
      particles.splice(i, 1);
    }
  }

  raf = window.requestAnimationFrame(draw);
};
*/

const pearRain = () => {
  console.log(particleList.length);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let pearParticle = new Particle(
    Math.random() * canvas.width,
    0,
    0,
    randomBetween(1, 10),
    randomBetween(50, 100),
    randomBetween(20, 80),
    pearImage
  );

  particleList[0].push(pearParticle);
  for (let i = particleList[0].length - 1; i >= 0; i--) {
    particleList[0][i].move();
    if (particleList[0][i].deleteParticle()) {
      particleList[0].splice(i, 1);
    }
  }

  rafPearRain = window.requestAnimationFrame(pearRain);
};

const lagerRain = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let lagerParticle = new Particle(
    Math.random() * canvas.width,
    0,
    0,
    randomBetween(1, 10),
    randomBetween(20, 30),
    randomBetween(10, 50),
    lagerImage
  );

  particleList[1].push(lagerParticle);
  for (let i = particleList[1].length - 1; i >= 0; i--) {
    particleList[1][i].move();
    if (particleList[1][i].deleteParticle()) {
      particleList[1].splice(i, 1);
    }
  }

  rafLagerRain = window.requestAnimationFrame(lagerRain);
};

const stopAnimation = (animationType) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particleList = [[], []];
  window.cancelAnimationFrame(animationType);
};

let pearRainActive = false;
let lagerRainActive = false;

document.getElementById("pearRain").addEventListener("click", () => {
  pearRainActive = !pearRainActive;
  if (pearRainActive) {
    rafPearRain = window.requestAnimationFrame(pearRain);
  } else {
    stopAnimation(rafPearRain);
  }
});

document.getElementById("lagerRain").addEventListener("click", () => {
  lagerRainActive = !lagerRainActive;
  if (lagerRainActive) {
    rafLagerRain = window.requestAnimationFrame(lagerRain);
  } else {
    stopAnimation(rafLagerRain);
  }
});
