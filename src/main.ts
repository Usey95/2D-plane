import BackGround from "./runtime/background"
import Player from "./player/player";
import DataBus from "./databus";
import { Enemy, ENEMY_WIDTH } from "./player/enemy";
import GameState from "./runtime/game_state";
import * as Music from './runtime/music';

export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d');

export const screenWidth:number = canvas.width;
export const screenHeight:number = canvas.height;

class Main {
  public id:number;
  public bg:BackGround;
  public player:Player;
  public databus:DataBus;
  public gameState:GameState;

  constructor() {
    this.id = 0;

    this.databus = new DataBus();
    this.bg = new BackGround();
    this.player = new Player(this.databus);
    this.gameState = new GameState();

    Music.playBgm();

    this.restart();
  }
  
  public restart = () => {
    this.databus.reset();

    canvas.removeEventListener('mousedown', this.restartHandler);
    window.cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(this.loop);
  }
  
  public update = () => {
    if ( this.databus.gameOver ) {
      return;
    }

    this.bg.update();
    
    this.databus.bullets.forEach((item) => item.update());
    this.databus.enemies.forEach((item) => item.update());
    
    if(this.databus.frame % 20 === 0) {
      this.player.shoot();
      Music.playShoot();
    }

    if(this.databus.frame % 60 === 0) {
      const x = Math.random() * (screenWidth - ENEMY_WIDTH);
      const enemy = new Enemy(this.databus, x);
      this.databus.enemies.push(enemy);
    }

    this.collisionDetection();

  }

  public collisionDetection = () => {

    this.databus.bullets.forEach((bullet) => {
      for ( let i = 0, il = this.databus.enemies.length; i < il;i++ ) {
        let enemy = this.databus.enemies[i]

        if ( !enemy.isExploding && enemy.isCollideWith(bullet) ) {
          enemy.playExplosion();
          Music.playExplosion();
          this.databus.score ++;
          bullet.visible = false;
          break;
        }
      }
    })

    for ( let i = 0, il = this.databus.enemies.length; i < il;i++ ) {
      let enemy = this.databus.enemies[i]

      if ( this.player.isCollideWith(enemy) ) {
        this.databus.gameOver = true;
        canvas.addEventListener('mousedown', this.restartHandler);
        break;
      }
    }
  }
  
  public render = () => {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    this.bg.render();
    this.player.render();
    this.gameState.renderGameScore(this.databus.score);

    this.databus.bullets.forEach((item) => item.drawToCanvas(ctx));
    this.databus.enemies.forEach((item) => item.render(ctx));

    if (this.databus.gameOver) {
      this.gameState.renderGameOver(this.databus.score);
    }
  }
  
  public loop = () => {
    this.databus.frame ++;
    this.update();
    this.render();
    this.id = requestAnimationFrame(this.loop);
  }

  public restartHandler = (e:MouseEvent) => {
    e.preventDefault();

    let x = e.offsetX;
    let y = e.offsetY;

    let area = this.gameState.btnArea;

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart();
  }
}

new Main();