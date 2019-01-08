import Sprite from "../base/sprite";
import DataBus from "../databus";

const BULLET_SRC = require('../images/bullet.png');
export const BULLET_WIDTH   = 16;
export const BULLET_HEIGHT  = 30;

export class Bullet extends Sprite {
  public speed:number = 10;
  public databus:DataBus;
  constructor(x:number, y:number, databus:DataBus) {
    super(BULLET_SRC, BULLET_WIDTH, BULLET_HEIGHT, x, y);

    this.databus = databus;
  }

  public update = () => {
    this.y -= this.speed;
    if ( this.y < -BULLET_HEIGHT ) {
      this.databus.bullets.shift();
    }
  }
}