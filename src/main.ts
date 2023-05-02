import { Vec } from "./utils"
import { TileType } from "./engine/mapgen"
import { WalkerGenerator } from "./engine/mapgen"

class Game {
    dimensions: Vec;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    map;
    constructor(dimensions: Vec) {
        this.dimensions = dimensions;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.dimensions.x;
        this.canvas.height = this.dimensions.y;
        this.map = new WalkerGenerator(new Vec(10, 10), this.ctx, 10, 0.7, 100);
    }
    test() {
        this.map.initMap();
    }
}

const DIMENSIONS = new Vec(innerHeight / 6 * 5);
const GAME = new Game(DIMENSIONS);
GAME.test();