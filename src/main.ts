/* main.ts
    * Main game file
*/

import { Vec2D } from "./utils"
import { MapGenerator } from "./engine/map"
import * as ECS from "./ecs/ecs"
import { Entity } from "./ecs/ecs"
import { Render } from "./ecs/systems/render"
import { MovePlayer } from "./ecs/systems/playermove"
import { DimensionComponent, ImageComponent, PositionComponent, MoveComponent } from "./ecs/components"
import * as utils from "./utils"
import { AssetLoader, AssetType, AssetReturn } from "./engine/assetloader"
import * as pack from "../package.json"

const $ = document.querySelector.bind(document);   // Who needs jquery

export enum GameState {
    Loading,
    Running,
    Paused,
    Menu,
    Settings,
    Info
};

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    map: MapGenerator;
    mapDimensions: Vec2D;
    mapOffset: Vec2D;
    dimensions: Vec2D;
    playerSize: Vec2D;

    ecs: ECS.ECS;

    state: GameState;
    loadingStatus: string;
    frames: number = 0;
    stop: boolean = false;

    visualiseMap: boolean;
    onlyMap: boolean;

    assets: AssetReturn;

    constructor(dimensions: Vec2D, assets: AssetReturn, visualiseMap: boolean = false, onlyMap: boolean = visualiseMap) {
        this.dimensions = dimensions;

        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.dimensions.x;
        this.canvas.height = this.dimensions.y;

        this.playerSize = new Vec2D(this.canvas.width / 10)
        this.assets = assets;
        this.state = GameState.Menu;
        this.loadingStatus = ""
        this.ctx.imageSmoothingEnabled = false;
        this.visualiseMap = visualiseMap;
        this.onlyMap = onlyMap;
    }
    // Initialize the game
    init() {
        this.frames = 0;
        this.stop = true;
        this.tick();
        this.stop = false;

        this.mapDimensions = new Vec2D(16);

        this.initECS().then(
            () => this.generateMap().then(
                () => {
                    this.mapOffset = new Vec2D((this.canvas.width / 2) - ((this.map.tileSize.x * this.mapDimensions.x) / 2))
                }
            )
        )
    }
    // Initialize ECS and the player entity
    initECS() {
        return new Promise((resolve) => {
            this.ecs = new ECS.ECS();
            this.loadingStatus = "Loading player"
            this.ecs.addEntity(new Entity(this.ecs.entities.length),
                [
                    new ImageComponent(this.assets.images[0], new utils.Vec2D(0, 64), new utils.Vec2D(32, 32)),
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
        /* this.loadingStatus = "Generating map" */
        return new Promise((resolve) => {
            if (this.map != undefined && !this.map.generated) {
                console.warn("Map is already generating")
                return;
            }

            this.map = new MapGenerator(this.mapDimensions, this.ctx, 100, 0.4, this.visualiseMap, 0, this, new Vec2D(this.playerSize.x / 1.5, this.playerSize.y / 1.5));

            this.map.initMap()
            let run = setInterval(() => {
                if (this.map.generated) {
                    resolve('resolved')
                    clearInterval(run)
                }
            })
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
        if (this.state === GameState.Running) {
            if (!this.map.generated) return
            this.frames++;
            this.map.draw(this.ctx, this.mapOffset);
            this.ecs.update(this.ctx, this)
        }
        // Loading screen
        if (this.state === GameState.Loading && this.visualiseMap === false) {
            this.loading();
        }
        if (this.state === GameState.Menu) {
            this.menu();
        }
        if (this.state === GameState.Info) {
            this.info();
        }
        if (this.state === GameState.Settings) {
            this.settings();
        }
        // To prevent multiple calls to tick()
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
        this.draw(new Vec2D(0), this.dimensions, this.assets.images[2], new Vec2D(0), new Vec2D(256));
        this.ctx.globalAlpha = 1;
        if (document.querySelector("div") == null) {
            const START = utils.createHTMLElement("span", "start", "button", "Start Game!");    // Create start button
            const SETTINGS = utils.createHTMLElement("span", "settings", "button", "Settings"); // Create settings button
            const INFO = utils.createHTMLElement("span", "info", "button", "Info");             // Create info button
            document.body.appendChild(utils.createHTMLElement("div", "menu", "menu"));          // Create menu container
            utils.appendElementsById("menu", [START, SETTINGS, INFO]);                                    // Append menu buttons to menu container

            // Add event listeners to menu buttons
            $("#start").addEventListener("click", () => {
                this.state = GameState.Loading;
                utils.removeElementById("menu");
                this.init();
            });

            $("#settings").addEventListener("click", () => {
                this.state = GameState.Settings;
                utils.removeElementById("menu");
            });

            $("#info").addEventListener("click", () => {
                this.state = GameState.Info;
                utils.removeElementById("menu");
                this.assets.audio[0].loop = true
                this.assets.audio[0].play();
            });
        }
    }
    // Info tab
    info(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 0.55;
        this.draw(new Vec2D(0), this.dimensions, this.assets.images[2], new Vec2D(0), new Vec2D(256));
        this.ctx.globalAlpha = 1;
        if (document.querySelector("div") == null) {
            const BACK = utils.createHTMLElement("span", "back", "button", "Back");     // Create start button
            const INFO = utils.createHTMLElement("span", "info", "text", "Info");       // Create info button
            INFO.innerHTML = "This is a game about a guy who walks around and does stuff.<br><br>It's pretty great you should donate to my patreon <br><a>here</a>"
            document.body.appendChild(utils.createHTMLElement("div", "info", "info"));  // Create menu container
            utils.appendElementsById("info", [BACK, INFO]);                             // Append menu buttons to menu container

            // Add event listeners to menu buttons
            $("#back").addEventListener("click", () => {
                this.state = GameState.Menu;
                utils.removeElementById("info");
            });
        }
    }
    // Settings tab
    settings(): void {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.globalAlpha = 0.55;
        this.draw(new Vec2D(0), this.dimensions, this.assets.images[2], new Vec2D(0), new Vec2D(256));
        this.ctx.globalAlpha = 1;
        if (document.querySelector("div") == null) {
            const BACK = utils.createHTMLElement("span", "back", "button", "Back");             // Create Back button
            const SETTINGS = utils.createHTMLElement("span", "settings", "text", "Settings");
            const MAPSETTINGS = utils.createHTMLElement("span", "mapSettings", "text", "Map Settings");
            SETTINGS.innerHTML = "This is where you can change settings and stuff";
            MAPSETTINGS.innerHTML = "<br><input type='checkbox' id='visMap'></input>";


            document.body.appendChild(utils.createHTMLElement("div", "settings", "settings"));
            utils.appendElementsById("settings", [BACK, SETTINGS, MAPSETTINGS]);

            // Add event listeners to menu buttons
            $("#back").addEventListener("click", () => {
                this.state = GameState.Menu;
                utils.removeElementById("settings");
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

let ASSETS: { images: HTMLImageElement[], audio: HTMLAudioElement[] }, DIMENSIONS: Vec2D, GAME: Game;



// Load assets and start game /* Needs to be async to pre-load the assets */
(async () => {
    let style = "color: #cbb; font-size: 15px; font-family: 'Roboto Mono', monospace; font-weight: bold; text-shadow: 0 0 10px #cbb;" // Thanks css for the cool text | github copilot is a god
    console.log("%cVersion: " + pack.version + "\nMade by: " + pack.author, style)
    console.log("%cCheck out the project repo: " + location.href.split('/').slice(0, -1).join('/') + '/github.html', style) // Based on a true story

    ASSETS = await assetLoader.loadAssets();
    DIMENSIONS = new Vec2D(innerHeight / 6 * 5);
    GAME = new Game(DIMENSIONS, ASSETS)
    GAME.tick()
})();

addEventListener('click', e => {
    // @ts-ignore /* TypeScript thinks that tagName doesn't exist on e.target when in fact, it does. */
    if (e.target.tagName == "A")
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")  // hehe funny rickroll
})