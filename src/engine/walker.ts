import { Vec2D } from "../utils";
import { Direction2D } from "../utils";
import { Game } from "../main"
import * as utils from "../utils";

export enum TileType {
    Empty,
    FloorEmpty,
    FloorFlower,
    FloorGrass,
    Sand,
    Water
}

// Sleep function, takes in ms to sleep for
/* const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
} */

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
    generated: boolean;
    game: Game;
    floorConstraints: Vec2D = new Vec2D(0.1, 0.25);
    constructor(mapDimensions: Vec2D, ctx: CanvasRenderingContext2D, maxWalkers: number, fillPercentage: number, waitTime: number, visualise: boolean = false, game: Game) {
        this.mapDimensions = mapDimensions;
        this.maxWalkers = maxWalkers;
        this.fillPercentage = fillPercentage;
        this.waitTime = waitTime;
        this.ctx = ctx;
        this.visualise = visualise;
        this.generated = false;
        this.game = game;
    }
    // Initialize the map
    initMap() {
        this.map = [];
        this.walkers = [];
        this.tileCount = 0;
        this.generated = false;
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
        this.createRandomFloorTile(curWalker.position, this.floorConstraints);

        if(!this.visualise)
            this.loading();
        this.tick()
    }
    // Tick the map generation
    tick() {
        // Tick every waitTime milliseconds
        // If the map is filled
        if(this.tileCount / (this.mapDimensions.x * this.mapDimensions.y) >= this.fillPercentage) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.generated = true;
            this.makeSand(this.ctx);
            this.makeWater(this.ctx);
            this.draw(this.ctx);
            console.log("done");
            return
        }
        // For every walker
        for(let walker of this.walkers) {
            // Make the walker create a floor tile where it is
            if(this.map[walker.position.x][walker.position.y] == TileType.Empty) {
                this.createRandomFloorTile(walker.position, new Vec2D(0.1, 0.25));
            }
        }

        // Update walkers
        this.chanceToRemove();
        this.changeDirection();
        this.chanceToCreate();
        this.updatePosition();

        if(this.visualise)
            this.draw(this.ctx);
        utils.sleep(this.waitTime).then(()=>this.tick());
    }
    // Draw the map
    draw(ctx: CanvasRenderingContext2D, mapOffset: Vec2D = new Vec2D(0, 0)) {
        //console.log("draw")
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < this.mapDimensions.x; i++) {
            for (let j = 0; j < this.mapDimensions.y; j++) {
                let position: Vec2D
                let dimensions: Vec2D
                if(this.generated) {
                    position = new Vec2D(
                        Math.floor((this.game.playerSize.x * i)) + mapOffset.x, 
                        Math.floor((this.game.playerSize.y * j)) + mapOffset.y
                    );
                    dimensions = new Vec2D(
                        (this.game.playerSize.x + 1),
                        (this.game.playerSize.y + 1)
                    );
                } else {
                    position = new Vec2D(
                        Math.floor((this.game.canvas.width / this.mapDimensions.x * i)), 
                        Math.floor((this.game.canvas.height / this.mapDimensions.y * j))
                    );
                    dimensions = new Vec2D(
                        (this.game.canvas.width / this.mapDimensions.x),
                        (this.game.canvas.height / this.mapDimensions.y)
                    );
                }
                // Current tile
                let tile = this.map[i][j];
                let floorTile = false;
                if([1, 2, 3].includes(tile)) floorTile = true
                // Visualise the map
                if(!this.generated) {
                    if (floorTile) { // 1, 2, 3 correspond to floor tile variants
                        this.game.draw(position, dimensions, document.getElementById("tilesheet"), new Vec2D(0, 32), new Vec2D(32, 32)) 
                        continue;
                    } else {
                        this.ctx.fillStyle = "#000";
                        this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y);
                    }
                }
                
                // Check if we should draw the tile
                if(!(position.x > -dimensions.x && position.x < this.game.canvas.width + dimensions.x && position.y > -dimensions.y && position.y < this.game.canvas.height + dimensions.y && this.generated)) {
                    continue;
                }
                if(floorTile) {
                    if(tile == TileType.FloorEmpty) {
                        this.game.draw(position, dimensions, document.getElementById("tilesheet"), new Vec2D(0, 32), new Vec2D(32, 32))
                    } else if(tile == TileType.FloorGrass) {
                        this.game.draw(position, dimensions, document.getElementById("tilesheet"), new Vec2D(0, 0), new Vec2D(32, 32))
                    } else if(tile == TileType.FloorFlower) {
                        this.game.draw(position, dimensions, document.getElementById("tilesheet"), new Vec2D(32, 0), new Vec2D(32, 32))
                    }
                    continue;
                    //this.ctx.fillStyle = "#68b547";
                } else if (tile == TileType.Sand) {
                    this.game.draw(position, dimensions, document.getElementById("tilesheet"), new Vec2D(32, 32), new Vec2D(32, 32));
                    continue;
                    //this.ctx.fillStyle = "#bab473";
                } else if (tile == TileType.Water) {
                    this.ctx.fillStyle = "#377";
                } else {
                    this.ctx.fillStyle = "#000";
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
                    if([1, 2, 3].includes(this.map[x + i][y + j])) {
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
    // Create a floor tile at the given position
    createRandomFloorTile(position: Vec2D, constraints: Vec2D) {
        let rand = Math.random()
        // constraints.x chance to create a flower tile
        rand < constraints.x ? 
        this.map[position.x][position.y] = TileType.FloorFlower :
        // constraints.y - constraints.x chance to create a grass tile
        rand < constraints.y ?
        this.map[position.x][position.y] = TileType.FloorGrass :
        this.map[position.x][position.y] = TileType.FloorEmpty;
        this.tileCount++;
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
        for(let i = 0; i < this.walkers.length; i++) {
            let walker = this.walkers[i];
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
        for(let i = 0; i < this.walkers.length; i++) {
            let walker = this.walkers[i]
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
        for(let walker of this.walkers) {
            if(Math.random() < walker.chanceToChange && this.walkers.length > 1) {
                this.walkers.splice(this.walkers.indexOf(walker), 1);
            }
        }
    }
    // Loading screen
    loading() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.font = "30px Roboto Mono";
        this.ctx.fillStyle = "#cbb";
        this.ctx.fillText("Generating map...", 25, 50);
    }
}