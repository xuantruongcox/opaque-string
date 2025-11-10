let mySound;
let playBtn;
let jumpBtn;
let sliderVolume;
let sliderRate;
let sliderPan;
function preload() {
  mySound = loadSound("./sounds/isp-sound1.wav");
}

function setup() {
  createCanvas(400, 200);
  background(180);

  playBtn = createButton("play sound");
  playBtn.position(200,20);
  playBtn.mousePressed(playStopSound);
  jumpBtn = createButton("jump");
  jumpBtn.position(280,20);
  jumpBtn.mousePressed(jumpSound);

  sliderVolume = createSlider(0, 2, 1, 0.01);
  sliderVolume.position(20, 25);
  text('volume',80,20);
  sliderRate = createSlider(-2,2,1,0.01);
  sliderRate.position(20, 70);
  text('rate',80,65);
  sliderPan = createSlider(-1,1,0,0.01);
  sliderPan.position(20,115);
  text('pan',80,110);
}

function jumpSound() {
  let duration = mySound.duration();
  let t = random(duration);
  mySound.jump(t);
}

function playStopSound() {
  if(mySound.isPlaying()) {
    mySound.stop();
    playBtn.html("play sound");
  }else {
    mySound.play();
    playBtn.html("stop sound");
  }
}

function draw() {
  mySound.setVolume(sliderVolume.value());
  mySound.rate(sliderRate.value());
  mySound.pan(sliderPan.value());
}
