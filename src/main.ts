/* main.ts
    * Main game file
*/

import { Vec2D } from "./utils"
import { WalkerGenerator } from "./engine/walker"
import * as ECS from "./ecs/ecs"
import { Entity } from "./ecs/ecs"
import { Render } from "./ecs/systems/render"
import { MovePlayer } from "./ecs/systems/playermove"
import { DimensionComponent, ImageComponent, PositionComponent, MoveComponent } from "./ecs/components"
import * as utils from "./utils"
import { AssetLoader, AssetType } from "./engine/assetloader"
import * as pack from "../package.json"

enum GameState {
    Loading,
    Running,
    Menu,
    Info
};

export class Game {
    dimensions: Vec2D;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    simpleMap: WalkerGenerator;
    mapOffset: Vec2D = new Vec2D(0, 0);
    ecs: ECS.ECS;
    state: GameState;
    playerSize: Vec2D;
    mapDimensions: Vec2D;
    frames: number = 0;
    stop: boolean = false;
    loadingStatus: string;
    assets: { images: HTMLImageElement[], audio: HTMLAudioElement[] };

    constructor(dimensions: Vec2D, assets) {
        this.dimensions = dimensions;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.dimensions.x;
        this.canvas.height = this.dimensions.y;
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.playerSize = new Vec2D(this.canvas.width / 10)
        this.mapDimensions = new Vec2D(45);
        this.assets = assets;
        this.state = GameState.Menu;
        this.loadingStatus = ""
        this.ctx.imageSmoothingEnabled = false;
    }
    // Initialize the game
    run() {
        this.frames = 0;
        this.stop = true;
        this.tick();
        this.stop = false;
        this.initECS().then(() => this.generateMap())
    }
    // Initialize ECS and the player entity
    initECS() {
        return new Promise((resolve) => {
            this.ecs = new ECS.ECS();
            this.loadingStatus = "Loading player"
            this.ecs.addEntity(new Entity(this.ecs.entities.length),
                [
                    new ImageComponent(this.assets[0], new utils.Vec2D(0, 64), new utils.Vec2D(32, 32)),
                    new PositionComponent(new utils.Vec2D((this.canvas.width / 2) - (this.playerSize.x / 2), (this.canvas.height / 2) - (this.playerSize.y / 2))),
                    new DimensionComponent(this.playerSize),
                    new MoveComponent()
                ]
            )
            this.ecs.addSystem(new Render())
            this.ecs.addSystem(new MovePlayer())
            resolve('resolved')
        })

    }
    // Generate the map
    generateMap() {
        this.loadingStatus = "Generating map"
        return new Promise((resolve) => {
            if (this.simpleMap != undefined && !this.simpleMap.generated) {
                console.warn("Map is already generating")
                return;
            }
            this.simpleMap = new WalkerGenerator(this.mapDimensions, this.ctx, 100, 0.4, false, 0, this);
            this.simpleMap.initMap()
            this.mapOffset = new Vec2D((this.canvas.width / 2) - ((this.playerSize.x * this.mapDimensions.x) / 2))
            let run = setInterval(() => {
                if (this.simpleMap.generated) {
                    this.state = GameState.Running;
                    this.ecs.addTrigger("render");
                    this.ecs.addTrigger("move");
                    clearInterval(run)
                }
            }, 100)
            resolve('resolved')
        })
    }
    // Draw an image / rectangle to the screen
    draw(position: Vec2D, dimensions: Vec2D, image?: CanvasImageSource, imgSrcPos?: Vec2D, imgSrcDim?: Vec2D): void {
        //this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        image == null ?
            this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y) :
            this.ctx.drawImage(image, imgSrcPos.x, imgSrcPos.y, imgSrcDim.x, imgSrcDim.y, position.x, position.y, dimensions.x, dimensions.y);
    }
    // Main game loop
    tick(): void {
        /* console.time("loop") */
        if (this.state == GameState.Running) {
            if (this.simpleMap.generated) {
                this.frames++;
                this.simpleMap.draw(this.ctx, this.mapOffset);
                this.ecs.update(this.ctx, this)
            }
        }
        // Loading screen
        if (this.state == GameState.Loading) {
            this.loading();
        }
        if (this.state == GameState.Menu) {
            this.menu()
        }
        if (this.state == GameState.Info) {
            this.info()
        }
        if (!this.stop)
            utils.sleep(1000 / 60).then(() => { this.tick();/*console.timeEnd("loop")*/ })
    }
    // Loading screen
    loading(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.font = "30px Roboto Mono";
        this.ctx.fillStyle = "#cbb";
        this.ctx.fillText(`${this.loadingStatus}...`, 25, 50);
    }
    // Menu screen
    menu(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 0.55;
        this.draw(new Vec2D(0), this.dimensions, this.assets[2], new Vec2D(0), new Vec2D(256));
        this.ctx.globalAlpha = 1;
        if (document.querySelector("div") == null) {
            const START = utils.createHTMLElement("span", "start", "button", "Start Game!");    // Create start button
            const INFO = utils.createHTMLElement("span", "info", "button", "Info");             // Create info button
            document.body.appendChild(utils.createHTMLElement("div", "menu", "menu"));          // Create menu container
            utils.appendElementsById("menu", [START, INFO]);                                    // Append menu buttons to menu container

            // Add event listeners to menu buttons
            document.getElementById("start").addEventListener("click", () => {
                this.state = GameState.Loading;
                utils.removeElementById("menu");
                this.run();
            });

            document.getElementById("info").addEventListener("click", () => {
                this.state = GameState.Info;
                utils.removeElementById("menu");
            });
        }
    }
    // Info tab
    info(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 0.55;
        this.draw(new Vec2D(0), this.dimensions, this.assets[2], new Vec2D(0), new Vec2D(256));
        this.ctx.globalAlpha = 1;
        if (document.querySelector("div") == null) {
            const BACK = utils.createHTMLElement("span", "back", "button", "Back");     // Create start button
            const INFO = utils.createHTMLElement("span", "info", "text", "Info");       // Create info button
            INFO.innerHTML = "This is a game about a guy who walks around and does stuff.<br><br>It's pretty great you should donate to my patreon <br><a>here</a>"
            document.body.appendChild(utils.createHTMLElement("div", "info", "info"));  // Create menu container
            utils.appendElementsById("info", [BACK, INFO]);                             // Append menu buttons to menu container

            // Add event listeners to menu buttons
            document.getElementById("back").addEventListener("click", () => {
                this.state = GameState.Menu;
                utils.removeElementById("info");
            });
        }
    }
}

const assetLoader = new AssetLoader([
    { type: AssetType.image, path: "resources/images/StewieSpriteSheet.png" },
    { type: AssetType.image, path: "resources/images/TileSheet.png" },
    { type: AssetType.image, path: "resources/images/Placeholder.png" },
    { type: AssetType.audio, path: "resources/audio/TitleLong.wav" }
]);

let ASSETS: (HTMLImageElement | HTMLAudioElement)[], DIMENSIONS: Vec2D, GAME: Game;

// Load assets and start game /* Needs to be async to pre-load the assets */
(async () => {
    console.log("%cVersion: " + pack.version, "color: #cbb; font-size: 20px; font-family: Roboto Mono; font-weight: bold; text-shadow: 0 0 10px #cbb;") // Thanks console.log for the cool text | copilot is a god
    ASSETS = await assetLoader.loadAssets();
    DIMENSIONS = new Vec2D(innerHeight / 6 * 5);
    GAME = new Game(DIMENSIONS, ASSETS)
    GAME.tick()
})();


window.addEventListener('click', e => {
    // @ts-ignore /* TypeScript thinks that tagName doesn't exist on e.target when in fact, it does. */
    if (e.target.tagName == "A") {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    }
})

//const VERSION = fs.readFile('../version')
//console.log(`Version: ${VERSION}`)