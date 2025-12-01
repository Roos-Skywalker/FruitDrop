import Game from './Game.js';
import CanvasRenderer from './CanvasRenderer.js';
import Fruit from './Fruit.js';
import Spider from './Spider.js';
import Player from './Player.js';
import KeyListener from './KeyListener.js';
import ScoreItem from './ScoreItem.js';

export default class FruitDrop extends Game {
  private canvas: HTMLCanvasElement;

  private fruit: Fruit[];

  private spiders: Spider[];

  private player: Player;

  private score: number;

  private timeLeft: number;

  private timeToNextItem: number;

  private keyListener: KeyListener;

  public constructor(canvas: HTMLCanvasElement) {
    super();
    this.score = 0;
    this.timeLeft = 60000;
    this.canvas = canvas;
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.keyListener = new KeyListener();
    this.fruit = [];
    this.fruit.push(new Fruit(this.canvas.width));
    this.spiders = [];
    this.spiders.push(new Spider(this.canvas.width));
    this.timeToNextItem = Math.random() * 300;
    this.player = new Player(innerWidth, innerHeight);
  }

  /**
   * Process all input. Called from the GameLoop.
   */
  public processInput(): void {
    if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
      this.player.moveLeft();
    }
    if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
      this.player.moveRight();
    }
  }

  /**
   * Update game state. Called from the GameLoop
   *
   * @param delta time in ms elapsed from the GameLoop
   * @returns true if the game should continue
   */
  public update(delta: number): boolean {
    this.timeToNextItem -= delta;
    if (this.timeToNextItem < 0) {
      this.fruit.push(new Fruit(this.canvas.width));
      this.spiders.push(new Spider(this.canvas.width));
      this.timeToNextItem = Math.random() * 300;
    }

    this.player.update(delta);

    for (let i: number = 0; i < this.fruit.length; i++) {
      this.fruit[i].update(delta);
      if (this.player.isCollidingFruit(this.fruit[i])) {
        this.score += this.fruit[i].getScore();
        this.fruit.splice(i, 1);
        // console.log(this.fruit[i].getScore());
      };
    }

    for (const spider of this.spiders) {
      spider.update(delta);
      if (this.player.isCollidingSpider(spider)) {
        this.score += spider.getScore();
        this.spiders.splice(this.spiders.indexOf(spider), 1);
        // console.log(spider.getScore());
      }
    }
    this.timeLeft -= delta;
    return true;
  }

  /**
   * Cool.
   */
  // private millisecondCounter(): number {

  // }

  /**
   * Render all the elements in the screen.
   */
  public render(): void {
    // Clear the canvas
    CanvasRenderer.clearCanvas(this.canvas);
    CanvasRenderer.writeText(this.canvas, `${this.score}`, 100, 200, 'center', 'sans-serif', 50, 'red');
    CanvasRenderer.writeText(this.canvas, `${Math.ceil(this.timeLeft / 1000)}`, 200, 200, 'center', 'sans-serif', 50, 'blue');
    for (const fruit of this.fruit) {
      fruit.render(this.canvas);
    }

    for (const spiders of this.spiders) {
      spiders.render(this.canvas);
    }
    this.player.render(this.canvas);
  }
}
