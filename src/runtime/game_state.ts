import { screenWidth, screenHeight, ctx } from "../main";

let atlas = new Image()
atlas.src = require('../images/Common.png');

export default class GameState {
  public btnArea = {
    startX: screenWidth / 2 - 40,
    startY: screenHeight / 2 - 100 + 180,
    endX  : screenWidth / 2  + 50,
    endY  : screenHeight / 2 - 100 + 255
  }

  public renderGameScore = (score:number) => {
    ctx.fillStyle = "#ffffff"
    ctx.font      = "20px Arial"

    ctx.fillText(
      '得分：' + score,
      10,
      30
    )
  }

  public renderGameOver = (score:number) => {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300);

    ctx.fillStyle = "#ffffff";
    ctx.font    = "20px Arial";

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    );

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    );

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    );

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    );
  }
}

