/* main.ts
    * Purpose: Main game file
*/

import { Vec2D } from "./utils"
import { WalkerGenerator } from "./engine/walker"
import * as ECS from "./ecs/ecs"
import { Entity } from "./ecs/ecs"
import { Render } from "./ecs/systems/render"
import { MovePlayer } from "./ecs/systems/playermove"
import * as aud from "./ecs/systems/audio" // this has to be imported like this because of the js Audio class
import { DimensionComponent, ImageComponent, PositionComponent, AudioComponent } from "./ecs/components"
import * as utils from "./utils"

export class Game {
    dimensions: Vec2D;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    simpleMap: WalkerGenerator;
    mapOffset: Vec2D = new Vec2D(0, 0);
    ecs: ECS.ECS;
    running: boolean;
    playerSize: Vec2D;
    mapDimensions: Vec2D;
    constructor(dimensions: Vec2D) {
        this.dimensions = dimensions;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.dimensions.x;
        this.canvas.height = this.dimensions.y;
        this.ctx.fillStyle = "#000"
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.playerSize = new Vec2D(this.canvas.width / 10)
        this.mapDimensions = new Vec2D(40);
        this.running = false;
        this.init();
    }
    init() {
        this.ecs = new ECS.ECS();
        this.initAudio();
        this.initPlayer();
        this.ctx.imageSmoothingEnabled = false;
    }
    initAudio() {
        this.ecs.addEntity(new Entity(this.ecs.entities.length),
            [
                new AudioComponent(new Audio("resources/audio/TitleLong.wav"), true)
            ]
        )
        this.ecs.addSystem(new aud.Audio())
    }
    initPlayer() {
        this.ecs.addEntity(new Entity(0),
            [
                new ImageComponent(document.getElementById("spritesheet") as HTMLImageElement, new utils.Vec2D(0, 64), new utils.Vec2D(32, 32)),
                new PositionComponent(new utils.Vec2D((this.canvas.width / 2) - (this.playerSize.x / 2), (this.canvas.height / 2) - (this.playerSize.y / 2))),
                new DimensionComponent(this.playerSize)
            ]
        )
        this.ecs.addSystem(new Render())
        this.ecs.addSystem(new MovePlayer())
    }
    generateMap() {
        if (this.simpleMap != undefined && !this.simpleMap.generated) {
            console.warn("Map is already generating")
            return;
        }
        this.running = false;
        this.simpleMap = new WalkerGenerator(this.mapDimensions, this.ctx, 10, 0.4, 0, true, this);
        this.simpleMap.initMap()
        this.mapOffset = new Vec2D((this.canvas.width / 2) - ((this.playerSize.x * this.mapDimensions.x) / 2))
        let run = setInterval(() => {
            if (this.simpleMap.generated) {
                this.running = true;
                this.ecs.addTrigger("render");
                this.ecs.addTrigger("move");
                this.gameLoop();
                clearInterval(run)
            }
        }, 100)
    }
    draw(position: Vec2D, dimensions: Vec2D, image?, imgSrcPos?: Vec2D, imgSrcDim?: Vec2D) {
        //this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        image == null ?
            this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y) :
            this.ctx.drawImage(image, imgSrcPos.x, imgSrcPos.y, imgSrcDim.x, imgSrcDim.y, position.x, position.y, dimensions.x, dimensions.y);
    }
    gameLoop() {
        /* console.time("loop") */
        if (this.running) {
            if (this.simpleMap.generated) {
                this.simpleMap.draw(this.ctx, this.mapOffset);
                this.ecs.update(this.ctx, this)
            }
            utils.sleep(1000 / 60).then(() => { this.gameLoop();/*console.timeEnd("loop")*/ })
        }
    }
}

const DIMENSIONS = new Vec2D(innerHeight / 6 * 5);
const GAME = new Game(DIMENSIONS);

addEventListener("click", e => {
    if (e.target == document.getElementById("generateMap")) {
        GAME.generateMap();
    }
    GAME.ecs.addTrigger('audio');
})