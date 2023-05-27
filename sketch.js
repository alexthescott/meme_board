// use instead of width, height
var w = window.innerWidth;
var h = window.innerHeight;

var quote = false
var meme = false
var meme_count = 33
var face_count = 19
let font

// timing vars
var SECONDS_OF_TEXT = 480
var SECONDS_OF_PHOTO = 240
var n_time = 0
var cur_time = Date.now() / 1000
var ph_time = Date.now() / 1000 + SECONDS_OF_TEXT

let imgs = [];
let faces = [];
function preload() {
  for (let i = 0; i < meme_count; i++) {
    if (i < 9) {
      //console.log("00" + i)
      imgs[i] = loadImage("memes/meme_0" + (i + 1).toString() + ".png")
    } else {
      imgs[i] = loadImage("memes/meme_" + (i + 1).toString() + ".png")
    }
  }
  for (let i = 0; i < face_count; i++) {
    if (i < 9) {
      //console.log("00" + i)
      faces[i] = loadImage("faces/face_0" + (i + 1).toString() + ".png")
    } else {
      faces[i] = loadImage("faces/face_" + (i + 1).toString() + ".png")
    }
  }
  font = loadFont("WitchingHour.ttf")
}

var quote = ""
var quotes = ["So glad you're still alive and cake-ing",
  "Have a grate birthday. Hope that’s not too cheesy",
  "Time to par-tea!",
  "You’re not old. You’re aged to perfection",
  "Happy Birthday to Mae!!!",
  "Happy Birthday to Luka!!!",
  "Your birthday cake brings all the boys to the yard",
  "IHave a toad-ally awesome birthday",
  "Oh ship, it's your birthday",
  "I always get emotional on my birthday. Even my cake is in tiers",
  "Miso happy it's your birthday.",
  "Hippo-birthday to you!",
  "Turning 20-something... is nothing to wine about.",
  "Happy birthday, best tea.",
  "Your birthday is kind of a big dill.",
  "Get ready to pod-y.",
  "Wishing my sauciest friend an A1 birthday.",
  "Have an owl-some birthday.",
  "Raisin a toast for your birthday.",
  "Shit Cock Heck Balls Fuck Ass Crap",
  "Hope your birthday is shrimply amazing."
]

function get_quote() {
  if (quote == false) {
    return quotes[Math.floor(Math.random() * quotes.length)]
  }
  let new_quote = quotes[Math.floor(Math.random() * quotes.length)]
  while (quote == new_quote) {
    let new_quote = quotes[Math.floor(Math.random() * quotes.length)]
  }
  return new_quote
}

function get_image() {
  if (meme == false) {
    return imgs[Math.floor(Math.random() * imgs.length)]
  }
  let new_image = imgs[Math.floor(Math.random() * imgs.length)]
  while (meme == false || meme == new_image) {
    new_image = imgs[Math.floor(Math.random() * imgs.length)]
  }
  return new_image
}

function draw_face_circle(radius, count) {
  x = noise(radius / 100 + n_time)
  iterate = 0
  for (let i = x; i < TWO_PI + x/2; i += PI / count) {
    let x = cos(i) * radius
    let y = sin(i) * radius
    image(faces[iterate %(face_count-1)], windowWidth / 2 + x, windowHeight / 2 + y, 100, 100)
    iterate+=1
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(255 * (0.5 + noise(n_time) / 2), 255 * (0.5 + noise(n_time + 32) / 2), 128 * (0.5 + noise(n_time + 64) / 2));
  textFont(font)
  textSize(128)
  textAlign(CENTER)
  quote = get_quote()
  meme = get_image()
  shape = createGraphics(200, 200);
}

function draw() {
  cur_time = Date.now() / 1000
  if (cur_time > ph_time) {
    if (cur_time > SECONDS_OF_PHOTO + ph_time) {
      quote = get_quote()
      meme = get_image()
      ph_time = cur_time + SECONDS_OF_TEXT
      background(255 * (0.7 + noise(n_time) / 2), 255 * (0.7 + noise(n_time + 32) / 2), 128 * (0.5 + noise(n_time + 64) / 2));
    } else {
      image(meme, 0, 0, w, h)
    }
  } else {

    background(255 * (0.5 + noise(n_time) / 2), 255 * (0.5 + noise(n_time + 32) / 2), 128 * (0.5 + noise(n_time + 64) / 2), 32);
    n_time += 0.001
    draw_face_circle(width / 12, 4)
    draw_face_circle(width / 6, 6)
    draw_face_circle(width / 4, 8)
    draw_face_circle(width / 3, 10)
    draw_face_circle(width / 2.38, 14)
    draw_face_circle(width / 1.97, 16)
    draw_face_circle(width / 1.7, 20)
    fill(0)
    text(quote, w / 2 - 600 + 1, h / 2 + 1, 1200, 800)
    fill(255)
    text(quote, w / 2 - 600, h / 2, 1200, 800)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}