import { Vec2D } from "../utils";
import { Direction2D } from "../utils";
import { Game } from "../main"

export enum TileType {
    Empty,
    Floor,
    Sand,
    Water
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class WalkerObject {
    position: Vec2D;
    direction: Vec2D;
    chanceToChange: number;
    constructor(position: Vec2D, direction: Vec2D, chanceToChange: number) {
        this.position = position;
        this.direction = direction;
        this.chanceToChange = chanceToChange;
    }
}

export class WalkerGenerator {
    mapDimensions: Vec2D;
    map: TileType[][];
    ctx: CanvasRenderingContext2D;
    walkers: WalkerObject[];
    maxWalkers: number;
    fillPercentage: number;
    waitTime: number; 
    tileCount: number;
    visualise: boolean;
    running: boolean;
    game: Game;
    constructor(mapDimensions: Vec2D, ctx: CanvasRenderingContext2D, maxWalkers: number, fillPercentage: number, waitTime: number, visualise: boolean = false, game: Game) {
        this.mapDimensions = mapDimensions;
        this.maxWalkers = maxWalkers;
        this.fillPercentage = fillPercentage;
        this.waitTime = waitTime;
        this.ctx = ctx;
        this.visualise = visualise;
        this.running = false;
        this.game = game;
    }
    // Initialize the map
    initMap() {
        this.map = [];
        this.walkers = [];
        this.tileCount = 0;
        // Initialize map
        for (let i = 0; i < this.mapDimensions.x; i++) {
            this.map[i] = [];
            for (let j = 0; j < this.mapDimensions.y; j++) {
                this.map[i][j] = TileType.Empty;
            }
        }
        // Initial walker
        this.walkers.push(new WalkerObject(new Vec2D(Math.floor(this.mapDimensions.x / 2), Math.floor(this.mapDimensions.y / 2)), Direction2D.getRandomDirection(), 0.5));
        let curWalker = this.walkers[0];
        this.map[curWalker.position.x][curWalker.position.y] = TileType.Floor;
        this.tileCount++;
        this.running = true;
        if(!this.visualise)
            this.loading();
        this.tick();
    }
    // Tick the map generation
    tick() {
        // Tick every waitTime milliseconds
            /*console.log("tick")*/
            // If the map is not filled
            if(!(this.tileCount / (this.mapDimensions.x * this.mapDimensions.y) < this.fillPercentage)) {
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
                this.running = false;
                this.makeSand(this.ctx);
                this.makeWater(this.ctx);
                this.draw(this.ctx);
                console.log("done");
                return;
            }
            // For every walker
            for(let walker of this.walkers) {
                // Make the walker create a floor tile where it is
                if(this.map[walker.position.x][walker.position.y] == TileType.Empty) {
                    this.map[walker.position.x][walker.position.y] = TileType.Floor;
                    this.tileCount++;
                }
            }

            // Update walkers
            this.chanceToRemove();
            this.changeDirection();
            this.chanceToCreate();
            this.updatePosition();

            if(this.visualise)
                this.draw(this.ctx);
            sleep(this.waitTime).then(()=>this.tick());
    }
    // Draw the map
    draw(ctx) {
        //console.log("draw")
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < this.mapDimensions.x; i++) {
            for (let j = 0; j < this.mapDimensions.y; j++) {
                let position = new Vec2D(
                    Math.floor(this.ctx.canvas.width / (this.mapDimensions.x) * i), 
                    Math.floor(this.ctx.canvas.height / (this.mapDimensions.y) * j));
                let dimensions = new Vec2D(
                    Math.ceil(this.ctx.canvas.width / this.mapDimensions.x),
                    Math.ceil(this.ctx.canvas.height / this.mapDimensions.y));
                if (this.map[i][j] == TileType.Floor) {
                    if(this.running) {
                        this.game.draw(position, dimensions, document.getElementById("tilesheet"), new Vec2D(0, 32), new Vec2D(32, 32)) 
                        continue;
                    }
                    let rand = Math.random();
                    rand < 0.1 ? 
                    this.game.draw(position, dimensions, document.getElementById("tilesheet"), new Vec2D(32, 0), new Vec2D(32, 32)) :
                    rand < 0.25 ? 
                    this.game.draw(position, dimensions, document.getElementById("tilesheet"), new Vec2D(0, 0), new Vec2D(32, 32)) 
                    :
                    this.game.draw(position, dimensions, document.getElementById("tilesheet"), new Vec2D(0, 32), new Vec2D(32, 32));
                    continue;
                    //this.ctx.fillStyle = "#68b547";
                } else if (this.map[i][j] == TileType.Sand) {
                    this.game.draw(position, new Vec2D(32, 32), document.getElementById("tilesheet"), new Vec2D(32, 32), new Vec2D(32, 32));
                    continue;
                    //this.ctx.fillStyle = "#bab473";
                } else if (this.map[i][j] == TileType.Water) {
                    this.ctx.fillStyle = "#377";
                } else {
                    this.ctx.fillStyle = "#000"
                }
                
                this.game.draw(position, dimensions)
            }
        }
    }
    // Check if surrounding tiles are floor tiles
    checkSurroundingTiles(x: number, y: number) {
        for(let i = -1; i < 2; i++) {
            for(let j = -1; j < 2; j++) {
                if(this.map[x + i] != undefined && this.map[x + i][y + j] != undefined) {
                    if(this.map[x + i][y + j] == TileType.Floor) {
                        return true;
                    }
                }
            }
        }
    }
    makeSand(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        /* let add = (lhs, rhs) => {return lhs + rhs} */
        for (let i = 0; i < this.mapDimensions.x; i++) {
            for (let j = 0; j < this.mapDimensions.y; j++) {
                if (this.map[i][j] != TileType.Empty) {
                    continue;
                }
                
                if(this.checkSurroundingTiles(i, j)) {
                    this.map[i][j] = TileType.Sand;
                }
            }
        }
    }
    makeWater(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < this.mapDimensions.x; i++) {
            for (let j = 0; j < this.mapDimensions.y; j++) {
                if (this.map[i][j] == TileType.Empty) {
                    this.map[i][j] = TileType.Water;
                    
                }
            }
        }
    }
    // Move the walker one step in the direction it's facing
    updatePosition() { 
        //console.log("updateposition")
        for (let i = 0; i < this.walkers.length; i++) {
            let walker = this.walkers[i];
            // Move walker
            walker.position.x += walker.direction.x;
            walker.position.y += walker.direction.y;
                // Check if walker is out of bounds
            walker.position.x = walker.position.x > this.mapDimensions.x - 1 ? 0 : walker.position.x < 0 ? (this.mapDimensions.x - 1) : walker.position.x;
            walker.position.y = walker.position.y > this.mapDimensions.y - 1 ? 0 : walker.position.y < 0 ? (this.mapDimensions.y - 1) : walker.position.y;  
        }
    }
    // Chance to change the direction that the walker is facing
    changeDirection() {
        //console.log("changedirection")
        // For every walker
        for(let walker of this.walkers) {
            // If the walker is going to change direction
            if (Math.random() < walker.chanceToChange) {
                /* 0 = up, 1 = right, 2 = down, 3 = left */
                // Change direction
                walker.direction = Direction2D.getRandomDirection();
            }
        }   
    }
    // Chance to create a new walker
    chanceToCreate() {
        //console.log("chancetocreate")
        for(let walker of this.walkers) {
            if(Math.random() < walker.chanceToChange && this.walkers.length < this.maxWalkers) {
                // Set new walker's position and direction
                let newPosition = new Vec2D(walker.position.x, walker.position.y);
                let newDirection = Direction2D.getRandomDirection();

                // Add new walker
                this.walkers.push(new WalkerObject(newPosition, newDirection, walker.chanceToChange))
            }
        }
    }
    // Chance to remove a walker
    chanceToRemove() {
        //console.log("chancetoremove")
        for(let walker of this.walkers) {
            if(Math.random() < walker.chanceToChange && this.walkers.length > 1) {
                this.walkers.splice(this.walkers.indexOf(walker), 1);
            }
        }
    }
    loading() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.font = "30px Roboto Mono";
        this.ctx.fillStyle = "#cbb";
        this.ctx.fillText("Generating map...", 25, 50);
    }
}