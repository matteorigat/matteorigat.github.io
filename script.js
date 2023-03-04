
const { random, atan2, cos, sin, hypot } = Math;
const max = 300;
const canvas = document.createElement("canvas");
const $ = canvas.getContext('2d');
const body = document.body;
const toggle = document.getElementById("toggle");
const menu = document.getElementById("menu");
const plus = document.getElementById("plus");
const particles = [];

body.appendChild(canvas);

let width = canvas.width = body.style.width = window.innerWidth;
let height = canvas.height = body.style.height =  window.innerHeight;
let point = { x: width / 2, y: height / 2 };
let hue = 0;
let check = 0;
let velocity = 0


function Particle() {};

Particle.prototype = {
  init() {
    this.hue = hue;
    this.alpha = 0;
    this.size = this.random(1, 5);
    this.x = this.random(0, width);
    this.y = this.random(0, height);
    if(velocity == 0){
      this.velocity = this.size * .5;
    } else {
      this.velocity = velocity
    }
    this.changed = null;
    this.changedFrame = 0;
    this.maxChangedFrames = 50;
    return this;
  },
  draw() {
    $.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
    $.beginPath();
    $.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    $.stroke();
    this.update();
  },
  update() {
    if (this.changed) {
      this.alpha *= .92;
      this.size += 2;
      this.changedFrame++;
      if (this.changedFrame > this.maxChangedFrames) {
        this.reset();
      }
    } else if (this.distance(point.x, point.y) < 50) {
      this.changed = true;
    } else {
      let dx = point.x - this.x;
      let dy = point.y - this.y;
      let angle = atan2(dy, dx);

      this.alpha += .01;
      this.x += this.velocity * cos(angle);
      this.y += this.velocity * sin(angle);
      this.velocity += .03;
    }
  },
  reset() {
    this.init();
  },
  distance(x, y) {
    return hypot(x - this.x, y - this.y);
  },
  random(min, max) {
    return random() * (max - min) + min;
  },
  trigger(){
    velocity = this.velocity + 3;
    this.velocity = velocity;
  },
  normal(){
    velocity = 0;
    this.velocity -= 3;
  }
  
};


function animate() {
  $.fillStyle = `rgba(0,0,0, .1)`;
  $.fillRect(0, 0, width, height);
  particles.forEach(p => {
    p.draw();
  });
  hue += .3;
  document.getElementById("fa").style.color = 
  document.getElementById("fa1").style.color = 
  document.getElementById("fa2").style.color = `hsla(${hue - 25}, 100%, 50%, 1)`;
  window.requestAnimationFrame(animate);
}

function touches(e) {
  point.x = e.touches ? e.touches[0].clientX : e.clientX;
  point.y = e.touches ? e.touches[0].clientY : e.clientY;
}

function reformat() {
  width = canvas.width = body.style.width = window.innerWidth;
  height = canvas.height = body.style.height =  window.innerHeight;
  point = { x: width / 2, y: height / 2 };
}

function setup() {
  
  toggle.addEventListener("click", () => {

    if(check==0){
      menu.style.transform="scale(3)";
      plus.style.transition="0.7s";
      plus.style.transform="rotate(225deg)";
      plus.style.color="rgba(0, 0, 0, 0.5)";
      check=1;
      particles.forEach(p => { p.trigger(); });
    }
    else{
      menu.style.transform="scale(0)";
      plus.style.transform="rotate(0deg)";
      plus.style.color="black";
      check=0;
      particles.forEach(p => { p.normal(); });
    }
  });


  for (let i = 0; i < max; i++) {
    setTimeout(() => {
      let p = new Particle().init();
      particles.push(p);
    }, i * 10);
  }

  setTimeout(function() {
    reformat();
  }, 250);

  setTimeout(function() {
    canvas.addEventListener("mousemove", touches);
    canvas.addEventListener("touchmove", touches);
  }, 4000);
  
  canvas.addEventListener("mouseleave", () => {
    point = { x: width / 2, y: height / 2 };
  });

  window.addEventListener("resize", reformat);
  animate();

}

setup();
