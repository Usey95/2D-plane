import Sprite from "../base/sprite";
import { ctx, screenWidth, screenHeight } from "../main";
import DataBus from "../databus";
import { Bullet, BULLET_WIDTH } from "./bullet";

const PLANE_SRC = require('../images/hero.png');
const PLANE_WIDTH = 80;
const PLANE_HEIGHT = 80;

export enum DIRECTION {
  up = 0,
  down = 1,
  left = 2,
  right = 3,
  stop = 5,
}

export default class Player extends Sprite {
  public canvas:HTMLCanvasElement;
  public databus:DataBus;
  private _direction:DIRECTION;

  constructor(databus:DataBus) {
    super(PLANE_SRC, PLANE_WIDTH, PLANE_HEIGHT);

    this.x = screenWidth / 2 - PLANE_WIDTH / 2;
    this.y = screenHeight / 2;

    this._direction = DIRECTION.stop;

    this.databus = databus;
    this.bindEvent();
  }

  public render = () => {
    this.handleMove();
    this.drawToCanvas(ctx);
  }

  public handleMove = () => {
    switch(this._direction) {
      case DIRECTION.left: this.x -= 4;break;
      case DIRECTION.up: this.y -= 4;break;
      case DIRECTION.right: this.x += 4;break;
      case DIRECTION.down: this.y += 4;break;
      default:break;
    }

    if(this.x < 0) {
      this.x = 0;
    }
    if(this.x > screenWidth - PLANE_WIDTH) {
      this.x = screenWidth - PLANE_WIDTH;
    }
    if(this.y < 0) {
      this.y = 0;
    }
    if(this.y > screenHeight - PLANE_HEIGHT) {
      this.y = screenHeight - PLANE_HEIGHT;
    }
  }

  public shoot = () => {
    let bullet = new Bullet(this.x + PLANE_WIDTH / 2 - BULLET_WIDTH / 2, this.y, this.databus);
    this.databus.bullets.push(bullet)
  }

  private _setDirection = (direction:DIRECTION) => {
    this._direction = direction;
  }

  public bindEvent = () => {
    window.addEventListener('keydown', (e) => {
      if(e.keyCode === 37 || e.keyCode === 65) {
        this._setDirection(DIRECTION.left);
      }
      if(e.keyCode === 39 || e.keyCode === 68) {
        this._setDirection(DIRECTION.right);
      }
      if(e.keyCode === 38 || e.keyCode === 87) {
        this._setDirection(DIRECTION.up);
      }
      if(e.keyCode === 40 || e.keyCode === 83) {
        this._setDirection(DIRECTION.down);
      }
    });

    window.addEventListener('keyup', (e) => {
      if((e.keyCode === 37 || e.keyCode === 65) && this._direction === DIRECTION.left) {
        this._setDirection(DIRECTION.stop);
      }
      if((e.keyCode === 39 || e.keyCode === 68) && this._direction === DIRECTION.right) {
        this._setDirection(DIRECTION.stop);
      }
      if((e.keyCode === 38 || e.keyCode === 87) && this._direction === DIRECTION.up) {
        this._setDirection(DIRECTION.stop);
      }
      if((e.keyCode === 40 || e.keyCode === 83) && this._direction === DIRECTION.down) {
        this._setDirection(DIRECTION.stop);
      }
    });
  }
}