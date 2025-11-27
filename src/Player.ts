import Fruit from './Fruit.js';
import Spider from './Spider.js';
import CanvasRenderer from './CanvasRenderer.js';

export default class Player {
  private image: HTMLImageElement;

  private posX: number;

  private posY: number;

  private maxX: number;

  private speed: number;

  private movingLeft: boolean;

  private movingRight: boolean;

  /**
   * constructor
   */
  public constructor(maxX: number, maxY: number) {
    this.image = CanvasRenderer.loadNewImage('./assets/basket.png');
    this.posX = maxX / 2;
    this.posY = maxY - 100;
    this.maxX = maxX;
    this.speed = 0.1;
    this.movingLeft = false;
    this.movingRight = false;
  }

  /**
   * moveLeft
   */
  public moveLeft(): void {
    this.movingLeft = true;
  }

  /**
   * moveRight
   */
  public moveRight(): void {
    this.movingRight = true;
  }

  /**
   * isCollidingFruit
   */
  public isCollidingFruit(fruit: Fruit): boolean {
    return (fruit.getPosX() + fruit.getWidth() > this.posX
    && fruit.getPosX() < this.posX + this.image.width
    && fruit.getPosY() + fruit.getHeight() > this.posY
    && fruit.getPosY() < this.posY + this.image.height);
  }

  /**
   * isCollidingSpider
   */
  public isCollidingSpider(spider: Spider): boolean {
    return (spider.getPosX() + spider.getWidth() > this.posX
      && spider.getPosX() < this.posX + this.image.width
      && spider.getPosY() + spider.getHeight() > this.posY
      && spider.getPosY() < this.posY + this.image.height);
  }

  /**
   * update
   */
  public update(delta: number): void {
    if (this.movingLeft) {
      this.movingLeft = false;
      this.posX -= this.speed * delta;
      if (this.posX < 0) {
        this.posX = 0;
      }
    }

    if (this.movingRight) {
      this.movingRight = false;
      this.posX += this.speed * delta;
      if (this.posX > this.maxX - this.image.width) {
        this.posX = this.maxX - this.image.width;
      }
    }
  }

  /**
   * render
   */
  public render(canvas: HTMLCanvasElement): void {
    CanvasRenderer.drawImage(canvas, this.image, this.posX, this.posY);
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
