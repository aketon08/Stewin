import { Vec } from "../utils";

export enum TileType {
    Empty,
    Floor,
    Water
}

class WalkerObject {
    position: Vec;
    direction: number;
    chanceToChange: number;
    constructor(position: Vec, direction: number, chanceToChange: number) {
        this.position = position;
        this.direction = direction;
        this.chanceToChange = chanceToChange;
    }
}

export class WalkerGenerator {
    mapDimensions: Vec;
    map: TileType[][];
    ctx: CanvasRenderingContext2D;
    walkers: WalkerObject[];
    maxWalkers: number;
    fillPercentage: number;
    waitTime: number; 
    tileCount: number = 0;
    constructor(mapDimensions: Vec, ctx: CanvasRenderingContext2D, maxWalkers: number, fillPercentage: number, waitTime: number) {
        this.mapDimensions = mapDimensions;
        this.maxWalkers = maxWalkers;
        this.fillPercentage = fillPercentage;
        this.waitTime = waitTime;
        this.walkers = [];
        this.map = [];
        this.ctx = ctx;
    }
    // Get a random direction
    getDirection() {
        return Math.ceil(Math.random() * 4) - 1;
    }
    // Initialize the map
    initMap() {
        console.log("initmap - 42")
        // Initialize map
        for (let i = 0; i < this.mapDimensions.x; i++) {
            this.map[i] = [];
            for (let j = 0; j < this.mapDimensions.y; j++) {
                this.map[i][j] = TileType.Empty;
            }
        }
        // Initial walker
        this.walkers.push(new WalkerObject(new Vec(Math.floor(this.mapDimensions.x / 2), Math.floor(this.mapDimensions.y / 2)), this.getDirection(), 0.5));
        let curWalker = this.walkers[0];
        this.map[curWalker.position.x][curWalker.position.y] = TileType.Floor;
        this.tileCount++;
        this.tick();
    }
    // Tick the map generation
    tick() {
        // While the map is not filled

        // Tick every waitTime milliseconds
        let int = setInterval(() => {
            console.log("tick")
            if(this.tileCount / (this.mapDimensions.x * this.mapDimensions.y) < this.fillPercentage) {
                //console.log(JSON.stringify(this.map))
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
                this.draw(this.ctx);
            } else {
                this.makeWater(this.ctx);
                this.draw(this.ctx);
                clearInterval(int);
            }
        }, this.waitTime)
        // After floor tiles have been created
    }
    // Draw the map
    draw(ctx) {
        console.log("draw")
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < this.mapDimensions.x; i++) {
            for (let j = 0; j < this.mapDimensions.y; j++) {
                if (this.map[i][j] == TileType.Floor) {
                    ctx.fillStyle = "#000";
                    ctx.fillRect(ctx.canvas.width / (this.mapDimensions.x) * i, ctx.canvas.height / (this.mapDimensions.y) * j, ctx.canvas.width / this.mapDimensions.x, ctx.canvas.height / this.mapDimensions.y);
                } else if (this.map[i][j] == TileType.Water) {
                    ctx.fillStyle = "#00f";
                    ctx.fillRect(ctx.canvas.width / (this.mapDimensions.x) * i, ctx.canvas.height / (this.mapDimensions.y) * j, ctx.canvas.width / this.mapDimensions.x, ctx.canvas.height / this.mapDimensions.y);
                }
            }
        }
    }
    makeWater(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (let i = 0; i < this.mapDimensions.x; i++) {
            for (let j = 0; j < this.mapDimensions.y; j++) {
                if (this.map[i][j] == TileType.Empty) {
                    this.map[i][j] = TileType.Water
                    ctx.fillStyle = "#00f";
                    ctx.fillRect(ctx.canvas.width / (this.mapDimensions.x) * i, ctx.canvas.height / (this.mapDimensions.y) * j, ctx.canvas.width / this.mapDimensions.x, ctx.canvas.height / this.mapDimensions.y);
                }
            }
        }
    }
    // Move the walker one step in the direction it's facing
    updatePosition() { 
        console.log("updateposition")
        for (let i = 0; i < this.walkers.length; i++) {
            let walker = this.walkers[i];
            // Move walker
            switch (walker.direction)
            {
                case 0:
                    walker.position.y--;
                    break;
                case 1:
                    walker.position.x++;
                    break;
                case 2:
                    walker.position.y++;
                    break;
                case 3:
                    walker.position.x--;
                    break;
            }
                // Check if walker is out of bounds
            console.log("before"+walker.position.x, walker.position.y)
            walker.position.x = walker.position.x > this.mapDimensions.x - 1 ? 0 : walker.position.x < 0 ? (this.mapDimensions.x - 1) : walker.position.x;
            walker.position.y = walker.position.y > this.mapDimensions.y - 1 ? 0 : walker.position.y < 0 ? (this.mapDimensions.y - 1) : walker.position.y;  
            console.log("after"+walker.position.x, walker.position.y)          
        }
    }
    // Chance to change the direction that the walker is facing
    changeDirection() {
        console.log("changedirection")
        // For every walker
        for(let walker of this.walkers) {
            // If the walker is going to change direction
            if (Math.random() < walker.chanceToChange) {
                /* 0 = up, 1 = right, 2 = down, 3 = left */
                // Change direction
                walker.direction = Math.ceil(Math.random() * 4) - 1;
            }
        }   
    }
    // Chance to create a new walker
    chanceToCreate() {
        console.log("chancetocreate")
        for(let walker of this.walkers) {
            if(Math.random() < walker.chanceToChange && this.walkers.length < this.maxWalkers) {
                // Set new walker's position and direction
                let newPosition = new Vec(walker.position.x, walker.position.y);
                let newDirection = this.getDirection();

                // Add new walker
                this.walkers.push(new WalkerObject(newPosition, newDirection, walker.chanceToChange))
            }
        }
    }
    // Chance to remove a walker
    chanceToRemove() {
        console.log("chancetoremove")
        for(let walker of this.walkers) {
            if(Math.random() < walker.chanceToChange && this.walkers.length > 1) {
                this.walkers.splice(this.walkers.indexOf(walker), 1);
            }
        }
    }
}