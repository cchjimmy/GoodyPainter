// paint everything black and white except red.
// fill(averageColor(col));
// if (col[0] - col[1] >= 20 && col[0] - col[2] >= 20) {
//   col[0] = 255;
//   fill(col);
// }

//   for (let i = 0; i < 10; i++) {
//     let y = random(-5, 5);
//     if (y < 0) {
//       fill(color1);
//     } else {
//       fill(color2);
//     }
//     ellipse(0, y, 30, 2);
//   }
// }

function averageColor(col) {
  return (col[0] + col[1] + col[2]) / 3;
}

function invertColor(col) {
  return [abs(col[0] - 255), abs(col[1] - 255), abs(col[2] - 255)];
}

function find_closest_palette_color(oldpixel, factor = 1) {
  return round(oldpixel * factor / 255) * floor(255 / factor);
}

function quantizeImage(img, factor = 1, alpha = 255) {
  let newImage = createImage(img.width, img.height);
  newImage.loadPixels();
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let a = img.pixels[index + 3];

      if (a) {
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];

        r = find_closest_palette_color(r, factor);
        g = find_closest_palette_color(g, factor);
        b = find_closest_palette_color(b, factor);
        a = alpha;

        newImage.pixels[index] = r;
        newImage.pixels[index + 1] = g;
        newImage.pixels[index + 2] = b;
        newImage.pixels[index + 3] = a;
      }
    }
  }
  newImage.updatePixels();
  img.updatePixels();
  return newImage;
}

function grayScale(img, alpha = 255) {
  let newImage = createImage(img.width, img.height);
  newImage.loadPixels();
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let a = img.pixels[index + 3];

      if (a) {
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];

        let average = averageColor([r, g, b]);

        r = average;
        g = average;
        b = average;
        a = alpha;

        newImage.pixels[index] = r;
        newImage.pixels[index + 1] = g;
        newImage.pixels[index + 2] = b;
        newImage.pixels[index + 3] = a;
      }
    }
  }
  newImage.updatePixels();
  img.updatePixels();
  return newImage;
}

function desaturateImage(img, threshold = 100, gain = 0, alpha = 255) {
  let newImage = createImage(img.width, img.height);
  newImage.loadPixels();
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let a = img.pixels[index + 3];

      if (a) {
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];

        let average = averageColor([r, g, b]);

        r -= (average / 255) * threshold - gain;
        g -= (average / 255) * threshold - gain;
        b -= (average / 255) * threshold - gain;
        a = alpha;

        newImage.pixels[index] = r;
        newImage.pixels[index + 1] = g;
        newImage.pixels[index + 2] = b;
        newImage.pixels[index + 3] = a;
      }
    }
  }
  newImage.updatePixels();
  img.updatePixels();
  return newImage;
}

function contrastImage(img, threshold = 100, gain = 0, alpha = 255) {
  let newImage = createImage(img.width, img.height);
  newImage.loadPixels();
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let a = img.pixels[index + 3];

      if (a) {
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];

        let average = averageColor([r, g, b]);

        r -= (1 - (average / 255)) * threshold - gain;
        g -= (1 - (average / 255)) * threshold - gain;
        b -= (1 - (average / 255)) * threshold - gain;
        a = alpha;

        newImage.pixels[index] = r;
        newImage.pixels[index + 1] = g;
        newImage.pixels[index + 2] = b;
        newImage.pixels[index + 3] = a;
      }
    }
  }
  newImage.updatePixels();
  img.updatePixels();
  return newImage;
}