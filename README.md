# GoodyPainter
This program was written in Javascript with the aid of an external graphics library named P5.js.

## Features
* It can 'paint' an image provided by the user
* Brush size, brush alpha, number of brushes and brushstrokes can be modified
* The 'Number of brushes' parameter dictates the speed of the program finishing the painting, meaning more brushes = faster completion. However, with more brushes, it can become performance heavy.

## Limitations
* Brush size and alpha are constant throughout the painting process
* It can only paint in 1 style
* Only circular brush shape is available
* Slow

Here is an example of a painting by the program with 150000 brushstrokes and a brush radius of 10px. This took about 50s.
![result painting](https://github.com/cchjimmy/GoodyPainter/blob/main/resultPainting.png)
