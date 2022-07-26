var maxStrokes;
var maxBrushes;
var brushes = [];
var progressIndicator;

function setup() {
  createCanvas();
  noFill();

  let img;
  createDiv('Choose an image to paint');
  createFileInput((file) => {
    if (file.type == 'image') {
      img = loadImage(file.data);
    }
  });

  createDiv(`<br>Number of brushes (> 0):`);
  let maxBrushesInput = createInput(100, 'number');

  createDiv(`<br>Number of brushstrokes (> 0):`);
  let maxStrokesInput = createInput(150000, 'number');

  createDiv(`<br>Brush alpha (0 - 255):`);
  let alphaInput = createInput(50, 'number');

  createDiv(`<br>Brush radius size (> 0):`);
  let sizeInput = createInput(10, 'number');

  progressIndicator = createDiv();

  createDiv('<br>');
  createButton('Paint').mousePressed(() => {
    if (!img) return;
    brushes = [];
    maxBrushes = parseInt(maxBrushesInput.value());
    maxStrokes = parseInt(maxStrokesInput.value());

    resizeCanvas(img.width, img.height)
    background(100);

    const grayScaled = grayScale(img); // for line path
    const contrasted = contrastImage(img);
    const quantized = quantizeImage(contrasted, 10); // limits final image colors

    for (let i = 0; i < maxBrushes; i++) {
      brushes[i] = new Brush(grayScaled, quantized, parseInt(alphaInput.value()), parseInt(sizeInput.value()));
    }
  });
}

function draw() {
  for (let i = 0; i < brushes.length; i++) {
    if (maxStrokes <= 0) break;
    brushes[i].update();
    maxStrokes--;

    progressIndicator.elt.innerHTML = `<br>Progress (brushstrokes left): ${maxStrokes}`
  }
}