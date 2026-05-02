const Jimp = require('jimp');

async function removeBg() {
  try {
    const image = await Jimp.read('public/logo.png');
    
    // Find the background color from top-left pixel
    const bgPixel = Jimp.intToRGBA(image.getPixelColor(0, 0));
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // If color is very close to background color, make it transparent
      if (Math.abs(r - bgPixel.r) < 15 && Math.abs(g - bgPixel.g) < 15 && Math.abs(b - bgPixel.b) < 15) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0
      }
    });
    
    await image.writeAsync('public/logo.png');
    console.log('Background removed successfully');
  } catch (err) {
    console.error('Error removing background:', err);
  }
}

removeBg();
