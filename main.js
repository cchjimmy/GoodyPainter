var dir = './images';
var name = 'aunt5AndGrandma';
var extension = '.jpeg';
var img;
var quantized;
var grayScaled;
var contrasted;

var maxStrokes = 1000000;
var maxBrushes = 200;
var brushes = [];

function preload() {
  img = loadImage(dir + '/' + name + extension);
}

function setup() {
  // noStroke();

  noFill();
  // blendMode(MULTIPLY);

  createCanvas(img.width, img.height);
  background(100);

  let alpha = 50;

  grayScaled = grayScale(img);
  contrasted = contrastImage(img, 200, 100);
  // desaturated2 = desaturateImage(quantized, 155, 30);
  quantized = quantizeImage(contrasted, 20, alpha);

  // let size = 100;
  // image(img, 0, 0, size, size);
  // image(quantized, size * 1, 0, size, size);
  // image(grayScaled, size * 2, 0, size, size);
  // image(saturated, size * 3, 0, size, size);

  // let path = [];
  // for (let i = 0; i < 5; i++) {
  //   let pos = 100 + 100 * i;
  //   path.push(new Vec2(pos, pos));
  // }
  // strokeWeight(10);
  // stroke(255);
  // beginShape();
  // for (let i =0; i < path.length; i ++) {
  //   vertex(path[i].x, path[i].y);
  // }
  // endShape();

  for (let i = 0; i < maxBrushes; i++) {
    brushes[i] = new Brush();
  }
}

function draw() {
  if (maxStrokes >= 0) {
    brushes.forEach(brush => { brush.update(); })
  } else {
    console.log("press s to save painting");
    if (key == 's') {
      saveCanvas(name + "Painting", extension);
      noLoop();
    }
  }
}