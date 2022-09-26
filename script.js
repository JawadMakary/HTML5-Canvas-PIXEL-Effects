window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");
  // getContext is used for HTML element canvas return instance of obj canvasrenderingcontext2d
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // particle system is a collection of small system

  class Particle {
    constructor(effect, x, y, color) {
      this.effect = effect;
      this.x =x;
      this.y = y;
      this.originX = Math.floor(x);
      this.originY = Math.floor(y);
      this.color = color;
      this.size = 10;
      // velocity
      this.vx = Math.random()*2-1;
      this.vy =  Math.random()*2-1;
    }
    draw(context) {
      context.fillRect(this.x, this.y, this.size, this.size);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
    }
  }
  class Effect {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.particleArray = [];
      this.image = document.getElementById("image1");
      this.centerX = this.width * 0.5;
      this.centerY = this.height * 0.5;
      this.x = this.centerX - this.image.width * 0.5;
      this.y = this.centerY - this.image.height * 0.5;
      // higher gap bigger performance but more pixelated
      this.gap = 6;
    }
    init(context) {
      // for (let i = 0; i < 100; i++) {
      //   this.particleArray.push(new Particle(this));
      // }
      context.drawImage(this.image, this.x, this.y);
      // to return image data analysis
      const pixels = context.getImageData(0, 0, this.width, this.height).data;
      for (let i = 0; i < this.height; i += this.gap) {
        for (let j = 0; j < this.width; j += this.gap) {
          const index = (i * this.width + j) * 4;
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const alpha = pixels[index + 3];
          const color = "rgb(" + red + "," + green + "," + blue + ")";
          if (alpha > 0) {
            this.particleArray.push(new Particle(this, j, i, color));
          }
        }
      }
    }
    draw(context) {
      this.particleArray.forEach((particle) => particle.draw(context));
    }
    update() {
      this.particleArray.forEach((particle) => particle.update());
    }
  }
  const effect = new Effect(canvas.width, canvas.height);
  effect.init(ctx);
  function animate() {
    // we need to clear it
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // to make it interactive
    effect.draw(ctx);
    effect.update();
    // built in
    requestAnimationFrame(animate);
    // usually 60fps
  }
  animate();
});

// fillRect is built in
// ctx.fillRect(120,100,100,200)
// img,x,y,width,height
// ctx.drawImage(image1,100,100,500,500)
