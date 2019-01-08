import Sprite from "../base/sprite";
import { ctx, screenHeight, screenWidth } from "../main";

const BG_WIDTH = 512;
const BG_HEIGHT = 512;

const BG_SRC = require('../images/bg.jpg');

export default class BackGround extends Sprite {
  private _top:number;

  constructor() {
    super(BG_SRC, BG_WIDTH, BG_HEIGHT);

    this._top = 0;
  }

  update() {
    if(this._top > screenHeight) {
      this._top = 0;
    } else {
      this._top += 2;
    }
  }

  render = () => {
    ctx.drawImage(this.img, 0, 0, BG_WIDTH, BG_HEIGHT, 0, -screenHeight + this._top, screenWidth, screenHeight);
    ctx.drawImage(this.img, 0, 0, BG_WIDTH, BG_HEIGHT, 0, this._top, screenWidth, screenHeight);
  }
}