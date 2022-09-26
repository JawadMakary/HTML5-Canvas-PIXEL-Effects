window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  var ctx = canvas.getContext("2d");
  // getContext is used for HTML element canvas return instance of obj canvasrenderingcontext2d
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // particle system is a collection of small system

  class Particle {
    constructor(effect) {
      this.effect=effect
      this.x = Math.random()*this.effect.width;
      this.y = Math.random()*this.effect.height;
      this.size = 10;
      // velocity
      this.vx=1
      this.vy=1
    }
    draw(context) {
        context.fillRect(this.x, this.y, this.size, this.size);
    }
    update(){
      this.x+=this.vx;
      this.y+=this.vy
    }
  }
  class Effect {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.particleArray = [];
      this.image=document.getElementById('image1')
      this.centerX=this.width*0.5
      this.centerY=this.height*0.5
      this.x=this.centerX-this.image.width*0.5
      this.y=this.centerY-this.image.height*0.5
    }
    init() {
      for(let i=0;i<100;i++){
        this.particleArray.push(new Particle(this));
      }
    }
    draw(context) {
      this.particleArray.forEach((particle) => particle.draw(context));
      context.drawImage(this.image,this.x,this.y)
    }
    update(){
      this.particleArray.forEach((particle) => particle.update());

    }
  }


 
  const effect = new Effect(canvas.width, canvas.height);
  effect.init();


  function animate() {
    // we need to clear it 
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // to make it interactive
    effect.draw(ctx);
    effect.update()
    // built in
    requestAnimationFrame(animate);
    // usually 60fps
  }
  animate()
});

// fillRect is built in
// ctx.fillRect(120,100,100,200)
// img,x,y,width,height
// ctx.drawImage(image1,100,100,500,500)
