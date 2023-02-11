// use instead of width, height
var w = window.innerWidth;
var h = window.innerHeight;  


// onscreen vars
var max_walk_size = 200
var num_hearts = 10
var hearts = []
var quote = false
var meme = false
let font

// timing vars
var SECONDS_OF_TEXT = 420
var SECONDS_OF_PHOTO = 300
var n_time = 0
var cur_time = Date.now()/1000
var ph_time = Date.now()/1000 + SECONDS_OF_TEXT

let imgs = [];
function preload() {
  for (let i = 0; i < 34; i++) {
    if(i < 9){
      //console.log("00" + i)
      imgs[i] = loadImage("memes/meme_0"+(i+1).toString()+".png")
    } else{
      imgs[i] = loadImage("memes/meme_"+(i+1).toString()+".png")
    }
  }
  font = loadFont("Cheeky_Rabbit.ttf")
}

var quote = ""
var valentines_quotes = ["I love you more than a squirrel loves nuts", 
                         "You light up my life like the noon sun, but I'd rather see you naked",
                         "Are you a beaver? ‘Cos, DAM!",
                         "If you were a Transformer, you’d be Optimus Fine",
                         "You treat me like a unicorn even though I’m an ass",
                         "I'm not saying you're my everything, but you're definitely my favorite",
                         "You're the peanut butter to my jelly, the cheese to my crackers",
                         "I love you more than a dog loves belly rubs, and that's a lot",
                         "You stole a pizza my heart",
                         "Cuz I'm the biggest bird",
                         "I'm your biggest fan, like a ceiling fan",
                         "You're the pickle to my sandwich",
                         "My heart is gushing—I lava you",
                         "You’re one in a chameleon",
                         "Words can’t espresso how much I love you",
                         "Thou art the rose among the thorns?",
                         "Don’t go bacon my heart",
                         "I love you more than any algorithm can compute",
                         "My love for you is as timeless as cyberspace"
                        ]

class heart {
  constructor() {
    this.x=max_walk_size/2+(Math.random()*(w-max_walk_size))
    this.y=max_walk_size/2+(Math.random()*(h-max_walk_size*1.5))
    this.size=10+(max_walk_size-10)*Math.random()
    this.pos = []
    this.dx = Math.random()<0.5 ? -1 : 1
    this.dx *= Math.random()<0.5 ? 1.2 : 1
    this.dy = Math.random()<0.5 ? -1 : 1
    this.dy *= Math.random()<0.5 ? 1.2 : 1
    this.r = Math.random()*255
    this.g = Math.random()*255
    this.b = Math.random()*255
  }
  
  new_color() {
    this.r = Math.random()*255
    this.g = Math.random()*255
    this.b = Math.random()*255
  }
  
  draw() {
    fill(this.r,this.g,this.b,100)
    this.pos = draw_heart(this.x,this.y,this.size)
  }
  
  update() {
    if (this.pos[0]<=0 || this.pos[2]>=w){
      this.dx*=-1
      this.new_color()
    }
    if (this.pos[1]<=0 || this.pos[3]>=h){
      this.dy*=-1
      this.new_color()
    }
    this.x+=this.dx
    this.y+=this.dy
  }
}

// https://editor.p5js.org/Mithru/sketches/Hk1N1mMQg
function draw_heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
  return [x-0.58*size, y-0.152*size, x+0.58*size, y+0.98*size]
}

function get_quote(){
  if (quote == false){
    return valentines_quotes[Math.floor(Math.random()*valentines_quotes.length)]
  }
  let new_quote = valentines_quotes[Math.floor(Math.random()*valentines_quotes.length)]
  while (quote == new_quote){
    let new_quote = valentines_quotes[Math.floor(Math.random()*valentines_quotes.length)]
  }
  return new_quote
}

function get_image(){
  if (meme == false){
    return imgs[Math.floor(Math.random()*imgs.length)]
  }
  let new_image = imgs[Math.floor(Math.random()*imgs.length)]
  while (meme == false || meme == new_image){
    new_image = imgs[Math.floor(Math.random()*imgs.length)]
  }
  return new_image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255*(0.5+noise(n_time)/2),255*(0.5+noise(n_time+32)/2),128*(0.5+noise(n_time+64)/2));
  textFont(font)
  textSize(128)
  textAlign(CENTER)
  quote = get_quote()
  meme = get_image()
  for (let i=0; i<num_hearts; i++){
    hearts.push(new heart())
  }

}

function draw() {
  cur_time = Date.now()/1000
  if (cur_time > ph_time){
    if (cur_time > SECONDS_OF_PHOTO + ph_time){
      quote = get_quote()
      meme = get_image()
      ph_time = cur_time+SECONDS_OF_TEXT
      background(255*(0.5+noise(n_time)/2),255*(0.5+noise(n_time+32)/2),128*(0.5+noise(n_time+64)/2));
    } else {
      image(meme,0,0,w,h)
    }
  } else{
    
  background(255*(0.5+noise(n_time)/2),255*(0.5+noise(n_time+32)/2),128*(0.5+noise(n_time+64)/2),32);  
  fill(255)
  text(quote, w/2-600+1, h/2-200+1, 1200, 800)
  fill(0)
  text(quote, w/2-600, h/2-200, 1200, 800)
  for (let i=0; i<num_hearts; i++){
    hearts[i].update()
    hearts[i].draw()
  }
  n_time+=0.001  
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}