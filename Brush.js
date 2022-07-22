class Brush {
  constructor() {
    this.pos = new Vec2(random(img.width), random(img.height));
    this.speed = 5;
    this.vel = new Vec2();
    this.vel.setMag(this.speed);

    this.count = 0;
    this.lifeSpan = random(1, 2);
    this.size = 2;
    
    this.col = quantized.get(this.pos.x, this.pos.y);
    // this.col1 = desaturated.get(this.pos.x, this.pos.y);
    // this.col2 = desaturated2.get(this.x, this.y);
    this.averageColor = grayScaled.get(this.pos.x, this.pos.y);

    this.angle = map(this.averageColor[0], 0, 255, TWO_PI, 0);

    this.maxStrand = 5;
    this.strandOffset = 1

    this.strandY = [];
    for (let i = 0; i < this.maxStrand; i++) {
      let y = random(-this.strandOffset, this.strandOffset);
      this.strandY[i] = y;
    }

    this.path = [];
  }

  update() {
    if (this.count < this.lifeSpan && (this.pos.x >= 0 && this.pos.x <= img.width && this.pos.y >= 0 && this.pos.y <= img.height)) {
      this.averageColor = grayScaled.get(this.pos.x, this.pos.y);
      this.angle = map(this.averageColor[0], 0, 255, TWO_PI, 0);
      this.vel.setDirn(this.angle);
      this.pos.add(this.vel);
      let vertex = new Vec2(Math.floor(this.pos.x), Math.floor(this.pos.y));
      this.addToPath(vertex);
      this.count++;
    } else {
      this.show();
      this.reset();
    }
    return;
  }

  addToPath(vec2) {
    // if (!this.path[0]) {
    //   this.path.push(vec2);
    // } else if (this.path[this.path.length-1].dist(vec2) <= 5) {
      this.path.push(vec2);
    // }
    return;
  }

  show() {
    push();
    // translate(this.pos.x, this.pos.y);
    // rotate(this.angle);
    // scale(this.size);

    // for (let i = 0; i < this.maxStrand; i++) {
    //   let y = this.strandY[i];
    //   // if (y < 0) {
    //   //   fill(this.col2);
    //   // } else { fill(this.col1); }
    //   fill(this.col);
    //   ellipse(0, y, 1);
    // }

    stroke(this.col);
    strokeWeight(this.size);
    beginShape();
    for (let i = 0; i < this.path.length; i ++) {
      // console.log(this.path[i]);
      vertex(this.path[i].x, this.path[i].y);
    }
    endShape();
    pop();
    return;
  }

  reset() {
    maxStrokes--;
    this.count = 0;
    this.pos.x = random(img.width);
    this.pos.y = random(img.height);
    this.col = quantized.get(this.pos.x, this.pos.y);

    
    
    this.path = [];
    // this.col2 = desaturated2.get(this.x, this.y);
    return;
  }
}