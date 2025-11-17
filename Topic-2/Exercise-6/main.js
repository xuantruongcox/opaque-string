let sliderLowPassFreq;
let sliderLowPassRes;
let sliderHighPassFreq;
let sliderHighPassRes;
let sliderReverbDryWet;
let sliderVolume;
let inputFreqLow;
let inputFreqHigh;
let playBtn;
let mySound;
let reverb;
let highPass;    
let lowPass;
let dryWet;
let fft;
function preload() {
  mySound = loadSound(
    "./sounds/320952__kevcio__amen-break-f-180-bpm-16-bars.wav"
  );
  reverb = new p5.Reverb();
  highPass = new p5.HighPass();
  lowPass = new p5.LowPass();
  fft = new p5.FFT();
}

function setup() {
  createCanvas(900, 600);

  mySound.disconnect();
  lowPass.disconnect();
  highPass.disconnect();

  mySound.connect(highPass);
  highPass.connect(lowPass);;
  reverb.process(lowPass);

  playBtn = createButton("play sound");
  playBtn.position(200, 20);
  playBtn.mousePressed(playStopSound);

  // HighPass Req/Res and LowPass Req/Res
  sliderHighPassFreq = createSlider(0,20000,0,1);
  sliderHighPassFreq.position(20, 80);
  sliderHighPassRes = createSlider(0, 100, 0, 1);
  sliderHighPassRes.position(20, 120);
  // LowPass
  sliderLowPassFreq = createSlider(0, 20000, 20000, 1);
  sliderLowPassFreq.position(20, 160);
  sliderLowPassRes = createSlider(0, 100, 0, 1);
  sliderLowPassRes.position(20, 200);
  // Reverb
  sliderReverbDryWet = createSlider(0, 10, 0, 0.1);
  sliderReverbDryWet.position(20, 240);
  // Volume
  sliderVolume = createSlider(0, 2, 1, 0.01);
  sliderVolume.position(20, 25);
  mySound.loop();
}

function playStopSound() {
  if (mySound.isPlaying()) {
    mySound.stop();
    playBtn.html("play sound");
  } else {
    mySound.play();
    playBtn.html("stop sound");
  }
}



function draw() {
  background(120);
  text('HighPass Frequency',20,80);
  text('HighPass Resonance',20,120);
  text('LowPass Frequency',20,160);
  text('LowPass Resonance',20,200);
  text('Reverb Dry/Wet',20,240);
  text('Volume',20,25)


  highPass.set(sliderHighPassFreq.value(), sliderHighPassRes.value());
  lowPass.set(sliderLowPassFreq.value(), sliderLowPassRes.value());
  reverb.drywet(sliderReverbDryWet.value()/10);
  mySound.setVolume(sliderVolume.value());


  // Draw FFT Spectrum
  let spectrum = fft.analyze();
  noStroke();
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
}
