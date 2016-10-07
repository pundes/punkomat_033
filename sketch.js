// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 3: Separation

// Via Reynolds: http://www.red3d.com/cwr/steer/

// A list of vehicles
var vehicles = [];
var noise;
var filter, filterFreq, filterWidth, reverb;

function setup() {

  createCanvas(windowWidth,windowHeight);
  // We are now making random vehicles and storing them in an array
  for (var i = 0; i < 250; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }

  //sound
  filter = new p5.LowPass();
  reverb = new p5.Reverb();
  noise = new p5.Noise();
  noise.disconnect();
  filter.process(noise);
  reverb.process(noise, 6, 0.2);
  noise.start();
  noise.amp(0.05);
  reverb.amp(0.1);
}

function draw() {
  background(0);

  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].separate(vehicles);
    vehicles[i].update();
    vehicles[i].borders();

    //vehicles[i].lines(vehicles);
    vehicles[i].display(vehicles);
  }

  //sound
  filterFreq = 200;
  filterWidth = 47.5;
  filter.set(filterFreq, filterWidth);
}
