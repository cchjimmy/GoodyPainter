class Brush {
  constructor(grayScaled, quantized, alpha = 255, size = 10) {
    this.pos = new Vec2();
    this.speed = 5;
    this.vel = new Vec2();
    this.vel = this.vel.setMag(this.speed);

    this.size = size;
    this.alpha = alpha;
    this.averageColor;
    this.col;
    this.cols = [];
    this.path = [];
    this.paths = [];
    this.angle;

    this.grayScaled = grayScaled;
    this.quantized = quantized;


    this.count = 0;
    this.lifeSpan = random(1, 10);


    this.randomize();
  }

  update() {
    for (let i = 0; i < this.lifeSpan; i++) {
      this.averageColor = this.grayScaled.get(this.pos.x, this.pos.y);
      this.angle = map(this.averageColor[0], 0, 255, TWO_PI, 0);
      this.vel = this.vel.setDirn(this.angle);
      this.pos = this.pos.add(this.vel);
      this.path.push(new Vec2(Math.floor(this.pos.x), Math.floor(this.pos.y)));
    }

    this.show();

    this.randomize();
  }

  show() {
    push();
    strokeWeight(this.size);
    stroke(this.col);

    beginShape();
    for (let i = 0; i < this.path.length; i++) {
      vertex(this.path[i].x, this.path[i].y);
    }
    endShape();

    pop();
  }

  randomize() {
    this.count = 0;
    this.pos.x = random(this.quantized.width);
    this.pos.y = random(this.quantized.height);

    this.col = this.quantized.get(this.pos.x, this.pos.y);
    this.col[3] = this.alpha;
    this.path = [];
  }

  reset() {
    this.cols = [];
    this.paths = [];
  }
}