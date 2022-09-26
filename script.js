window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");
  // getContext is used for HTML element canvas return instance of obj canvasrenderingcontext2d
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const image1 = this.document.getElementById("image1");
  // particle system is a collection of small system

  class Particle {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.size = 30;
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.size, this.size);
    }
  }
  class Effect {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.particleArray = [];
    }
    init() {
      this.particleArray.push(new Particle());
    }
    draw(context) {
      this.particleArray.forEach((particle) => particle.draw(context));
    }
  }


  function animate() {
    // to make it interactive
  }
  const effect = new Effect(canvas.width, canvas.height);
  effect.init();
  effect.draw(ctx);
});

// fillRect is built in
// ctx.fillRect(120,100,100,200)
// img,x,y,width,height
// ctx.drawImage(image1,100,100,500,500)
