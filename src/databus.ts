import { Bullet } from "./player/bullet";
import { Enemy } from "./player/enemy";

export default class DataBus {
  public frame:number;
  public score:number;
  public bullets:Bullet[];
  public enemies:Enemy[];

  public gameOver:boolean;
  constructor() {
    this.reset();
  }

  public reset = () => {
    this.frame = 0;
    this.score = 0;
    this.bullets = [];
    this.enemies = [];

    this.gameOver = false;
  }
}