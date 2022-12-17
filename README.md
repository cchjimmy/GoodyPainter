# GoodyPainter
This program was written in Javascript with the aid of an external graphics library named P5.js. Feel free to try it out on https://cchjimmy.github.io/GoodyPainter/

## Features
* It can 'paint' an image provided by the user
* Brush size, brush alpha, number of brushes and number of brushstrokes can be modified

## Limitations
* Brush size and alpha are constant throughout the painting process (1 style)
* Only circular brush shape is available
* The UI is not very appealing
* Performance heavy with high number of brushes, large image files
* Unable to change the output painting size

Here is an example of a painting by the program with 150000 brushstrokes and a brush radius of 10px. This took about 50s (reference image size: 254 KB).
![result painting](https://github.com/cchjimmy/GoodyPainter/blob/main/resultPainting.png)
