import Sprite from "../base/sprite";
import DataBus from "../databus";
import { screenHeight, ctx } from "../main";

const ENEMY_IMG_SRC = require('../images/enemy.png');

export const ENEMY_WIDTH   = 60;
const ENEMY_HEIGHT  = 60;

const EXPLO_FRAME_COUNT = 19;

export class Enemy extends Sprite {
  public count:number = 0;
  public imgList:HTMLImageElement[] = [];
  public databus:DataBus;
  public speed:number = 10;
  public timer:number;
  public isExploding:boolean = false;

  constructor(databus:DataBus, x:number) {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT, x);
    this.databus = databus;
    this.initExplosion();

  }

  public initExplosion = () => {
    for ( let i = 1; i <= EXPLO_FRAME_COUNT; i++ ) {
      let img = new Image();
      img.src = require(`../images/explosion${i}.png`);

      this.imgList.push(img);
    }
  }

  public playExplosion = () => {
    this.visible = false;
    this.isExploding = true;
  }

  public render = (ctx:CanvasRenderingContext2D) => {
    if(this.isExploding && this.count !== EXPLO_FRAME_COUNT - 1) {
      ctx.drawImage(
        this.imgList[this.count],
        this.x,
        this.y,
        this.width * 1.2,
        this.height * 1.2,
      );

      this.count ++;
      return;
    }
    this.drawToCanvas(ctx);
  }

  public update = () => {
    this.y += this.speed;

    if ( this.y > screenHeight ) {
      this.databus.enemies.shift();
    }
  }
}