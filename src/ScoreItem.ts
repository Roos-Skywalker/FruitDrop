import CanvasRenderer from './CanvasRenderer.js';
export default abstract class ScoreItem {
  protected image: HTMLImageElement;

  protected score: number;

  protected posX: number;

  protected posY: number;

  /**
   * constructor
   */
  public constructor(maxX: number) {
    this.image = new Image();
    this.score = 0;
    this.posX = Math.random() * maxX;
    this.posY = 0;
  }

  /**
   * render
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
  }

  /**
   * getScore
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * getPosX
   */
  public getPosX(): number {
    return this.posX;
  }

  /**
   * getPosY
   */
  public getPosY(): number {
    return this.posY;
  }

  /**
   * getWidth
   */
  public getWidth(): number {
    return this.image.width;
  }

  /**
   * getHeight
   */
  public getHeight(): number {
    return this.image.height;
  }
}
