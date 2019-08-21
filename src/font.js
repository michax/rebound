export default class Font {
  constructor(ctx) {
    this.ctx = ctx;
    this.img = document.getElementById('font');
    const width = 128;
    const height = 85;

    this.size = 8;
    this.vGap = 3;
    this.hGap = 3;

    this.columns = Math.floor(width / this.size);
    this.rows = Math.floor(height / this.size);

    this.fillStyle = '#000000';
  }

  posFromIndex(index) {
    return [
      Math.floor(index % this.columns) * this.size,
      Math.floor(index / this.columns) * this.size,
    ];
  }

  print(text, x, y, fillStyle) {
    // set composite mode
    // this.ctx.globalCompositeOperation = 'source-in';

    this.ctx.fillStyle = fillStyle;

    // fill background in canvas itself
    //this.ctx.globalCompositeOperation = 'destination-over';

    text.split('').forEach((char, i) => {
      const [sx, sy] = this.posFromIndex(char.charCodeAt(0));
      this.ctx.drawImage(
        this.img,
        sx,
        sy,
        this.size,
        this.size,
        x + i * (this.size - this.hGap),
        y,
        this.size,
        this.size,
        fillStyle,
      );
    });
  }
}
