import CanvasRenderer from './CanvasRenderer.js';
import ScoreItem from './ScoreItem.js';

export default class Spider extends ScoreItem {

  /**
   * constructor
   */
  public constructor(maxX: number) {
    super(maxX);
    const randomNumber: number = Math.random();
    if (randomNumber < 0.1) {
      this.image = CanvasRenderer.loadNewImage('./assets/spider01.png');
      this.score = -5;
    } else if (randomNumber < 0.3) {
      this.image = CanvasRenderer.loadNewImage('./assets/spider02.png');
      this.score = -3;
    } else if (randomNumber < 0.6) {
      this.image = CanvasRenderer.loadNewImage('./assets/spider03.png');
      this.score = -2;
    } else {
      this.image = CanvasRenderer.loadNewImage('./assets/spider04.png');
      this.score = -1;
    }
  }

  /**
   * update
   */
  public update(delta: number): void {
    this.posY += delta * 0.1 + (0.001 * delta);
  }
}
