import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Fruit extends ScoreItem {
  private speed: number;

  /**
   * constructor
   */
  public constructor(maxX: number) {
    super(maxX);
    const randomNumber: number = Math.random();
    if (randomNumber < 0.1) {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-cherries.png');
      this.score = 10;
    } else if (randomNumber < 0.3) {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-strawberry.png');
      this.score = 7;
    } else if (randomNumber < 0.6) {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-orange.png');
      this.score = 5;
    } else if (randomNumber < 0.8) {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-grapes.png');
      this.score = 3;
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/fruit-banana.png');
      this.score = 1;
    }
    this.speed = 0.1;
  }

  /**
   * update
  delta : void*/
  public update(delta: number): void {
    this.posY += delta * this.speed + (0.001 * delta);
  }
}
