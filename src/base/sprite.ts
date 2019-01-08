export default class Sprite {
  public img:HTMLImageElement;
  public width:number;
  public height:number;
  public x:number;
  public y:number;

  public visible:boolean;

  constructor(imgSrc = '', width=  0, height = 0, x = 0, y = 0) {
    this.img = new Image();
    this.img.src = imgSrc;

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;

    this.visible = true;
  }

  public drawToCanvas = (ctx:CanvasRenderingContext2D) => {
    if ( !this.visible ){
      return;
    }

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  public isCollideWith = (sp:Sprite) => {
    let spX = sp.x + sp.width / 2;
    let spY = sp.y + sp.height / 2;

    if ( !this.visible || !sp.visible )
      return false;

    return !!(   spX >= this.x
              && spX <= this.x + this.width
              && spY >= this.y
              && spY <= this.y + this.height  );
  }
}
