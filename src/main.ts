import { Vec2D } from "./utils"
import { WalkerGenerator } from "./engine/mapgen"

export class Game {
    dimensions: Vec2D;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    simpleMap: WalkerGenerator;
    mapOffset: Vec2D;
    constructor(dimensions: Vec2D) {
        this.dimensions = dimensions;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.width = this.dimensions.x;
        this.canvas.height = this.dimensions.y;
        this.ctx.fillStyle = "#000"
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.simpleMap = new WalkerGenerator(new Vec2D(50, 50), this.ctx, 10, 0.4, 5, true, this);
    }
    draw(position: Vec2D, dimensions: Vec2D, image?, imgSrcPos?: Vec2D, imgSrcDim?: Vec2D) {
        //this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        image==null?
            this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y):
            this.ctx.drawImage(image, imgSrcPos.x, imgSrcPos.y, imgSrcDim.x, imgSrcDim.y, position.x, position.y, dimensions.x, dimensions.y);
    }
}

const DIMENSIONS = new Vec2D(innerHeight / 6 * 5);
const GAME = new Game(DIMENSIONS);

addEventListener("click", e => {
    if(e.target == document.getElementById("generateMap")) {
        GAME.simpleMap.initMap();
    }
})