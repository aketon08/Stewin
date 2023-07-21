/* walker.ts
    * Generates a map using a walker algorithm and "zooms" to add detail
    * // Generates biomes based on temperature and humidity
*/

import { Vec2D } from "../utils";
import { Direction2D } from "../utils";
import { Game, GameState } from "../main"
import * as utils from "../utils";
//import { createNoise2D } from "simplex-noise";

export enum TileType {
    Empty,
    Floor,
    FloorEmpty,
    FloorFlower,
    FloorGrass,
    Sand,
    Water
}

enum BiomeTemp {
    Freezing,
    Cold,
    Temperate,
    Warm,
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

/* class BiomeGenerator {
    map: BiomeTemp[][]

    constructor() { }

    generateBiomeMap(): BiomeTemp[][] {
        let noise = createNoise2D();
        let noise2 = createNoise2D();

        let tempMap = []
        for (let i = 0; i < 256; i++) {
            tempMap[i] = [];
            for (let j = 0; j < 256; j++) {
                let wavelength = 0.5;
                let nx = i / 64 - 0.5, ny = j / 64 - 0.5;
                nx *= wavelength, ny *= wavelength;
                let noiseVal = (((noise(nx, ny) + 1) / 2) + (0.5 * ((noise2(nx * 2, ny * 2) + 1) / 2)) + (0.25 * ((noise2(nx * 4, ny * 4) + 1) / 2))) / 1.75
                noiseVal = noiseVal < 0.1 ? BiomeTemp.Freezing
                    : noiseVal < 0.3 ? BiomeTemp.Cold
                        : noiseVal < 0.7 ? BiomeTemp.Temperate
                            : BiomeTemp.Warm

                //if (mapGen.checkSurroundingTiles(new Vec2D(i, j), [(noiseVal + 3) % 4], -2, 3) > 4 && noiseVal != BiomeTemp.Freezing) {
                //    tempMap[i].push((noiseVal + 3) % 4)
                //} else {
                tempMap[i].push(noiseVal)
                //}
            }
        }
        return tempMap
    }
} */

export class MapGenerator {
    mapDimensions: Vec2D;
    map: TileType[][];
    finalMap: TileType[][];
    ctx: CanvasRenderingContext2D;
    walkers: WalkerObject[];
    maxWalkers: number;
    fillPercentage: number;
    waitTime: number;
    tileCount: number;
    visualise: boolean;                             // Visualise the map generation
    generated: boolean;
    game: Game;
    tileSize: Vec2D<number>;
    floorConstraints: Vec2D = new Vec2D(0.1, 0.25); // Chances to create a flower and grass floor tile, as opposed to an empty one.
    constructor(mapDimensions: Vec2D, ctx: CanvasRenderingContext2D, maxWalkers: number, fillPercentage: number, visualise: boolean, waitTime: number, game: Game, tileSize = game.playerSize) {
        this.mapDimensions = mapDimensions;
        this.maxWalkers = maxWalkers;
        this.fillPercentage = fillPercentage;
        this.visualise = visualise;
        this.waitTime = waitTime;
        this.ctx = ctx;
        this.generated = false;
        this.game = game;
        this.tileSize = tileSize;
    }
    initBiomeMap() {
        //let biomeGenerator = new BiomeGenerator()
        //let tempMap = biomeGenerator.generateBiomeMap()
        //this.draw(this.ctx, new Vec2D(0), tempMap)
    }
    // Initialize the map
    initMap() {
        this.game.loadingStatus = "Generating map (1/5) - Walking"
        this.map = [];
        this.finalMap = [];
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
        this.walkers.push(new WalkerObject(new Vec2D(Math.floor(this.mapDimensions.x / 2), Math.floor(this.mapDimensions.y / 2)), Direction2D.getRandomDirection(), 0.55));
        let curWalker = this.walkers[0];
        this.map[curWalker.position.x][curWalker.position.y] = TileType.Floor;

        if (this.visualise)
            this.draw(this.ctx);
        this.tick()
    }
    // Tick the map generation
    tick(): void {
        // Tick every waitTime milliseconds
        // If the map is filled
        if (this.tileCount / (this.mapDimensions.x * this.mapDimensions.y) >= this.fillPercentage) {
            this.map = this.zoom()
            this.map = this.zoom()
            this.finalMap = [...this.map];

            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

            this.game.loadingStatus = "Generating map (2/5) - Adding water"
            for (let i = 0; i < this.mapDimensions.x; i++) {
                for (let j = 0; j < this.mapDimensions.y; j++) {
                    this.finalMap[i][j] = this.makeWater(this.map[i][j]) ? TileType.Water : this.map[i][j];
                }
            }

            this.game.loadingStatus = "Generating map (3/5) - Removing too much water"
            for (let i = 0; i < this.mapDimensions.x; i++) {
                for (let j = 0; j < this.mapDimensions.y; j++) {
                    if (this.checkSurroundingTiles(new Vec2D(i, j), [TileType.Water]) > 7 && Math.random() < 0.01) {
                        for (let k = -1; k <= 1; k++) {
                            for (let l = -1; l <= 1; l++) {
                                if (this.finalMap[i + k] && this.finalMap[i + k][j + l] && this.finalMap[i + k][j + l] == TileType.Water && Math.random() < 0.3) {
                                    this.finalMap[i + k][j + l] = TileType.Floor;
                                }
                            }
                        }
                    }
                    //this.finalMap[i][j] = this.removeTooMuchWater(new Vec2D(i, j)) ? this.createRandomFloorTile(this.floorConstraints) : this.finalMap[i][j];
                }
            }

            this.map = this.zoom()
            this.map = this.zoom()
            this.finalMap = [...this.map];

            this.game.loadingStatus = "Generating map (4/5) - Randomizing floor tiles"
            for (let i = 0; i < this.mapDimensions.x; i++) {
                for (let j = 0; j < this.mapDimensions.y; j++) {
                    this.finalMap[i][j] = this.map[i][j] == TileType.Floor ? this.createRandomFloorTile(this.floorConstraints) : this.map[i][j];
                }
            }

            this.game.loadingStatus = "Generating map (5/5) - Adding sand"
            for (let i = 0; i < this.mapDimensions.x; i++) {
                for (let j = 0; j < this.mapDimensions.y; j++) {
                    this.finalMap[i][j] = this.makeSand(new Vec2D(i, j)) ? TileType.Sand : this.map[i][j];
                }
            }

            for (let i = 0; i < this.mapDimensions.x; i++) {
                for (let j = 0; j < this.mapDimensions.y; j++) {
                    this.finalMap[i][j] = this.checkSand(new Vec2D(i, j)) ? this.createRandomFloorTile(this.floorConstraints) : this.finalMap[i][j];
                }
            }

            // For debugging
            if (!this.game.onlyMap) {
                this.game.state = GameState.Running;
                this.game.ecs.addTrigger("render");
                this.game.ecs.addTrigger("move");
            } else {
                this.draw(this.ctx)
            }

            this.generated = true;
            //this.initBiomeMap();
            this.game.loadingStatus = "Finished generating map"
            this.game.mapDimensions = this.mapDimensions;
            return;
        }

        // For every walker     /* for let .. of .. performs slower than for let .. < .. */
        for (let i = 0; i < this.walkers.length; i++) {
            let walker = this.walkers[i];
            // Make the walker create a floor tile where it is
            if (this.map[walker.position.x][walker.position.y] == TileType.Empty) {
                this.map[walker.position.x][walker.position.y] = TileType.Floor;
                this.tileCount++;
            }
        }

        // Update walkers
        this.chanceToRemove();
        this.changeDirection();
        this.chanceToCreate();
        this.updatePosition();

        if (this.visualise)
            this.draw(this.ctx);
        utils.sleep(this.waitTime).then(() => this.tick());
    }
    // Draw the map to the canvas
    draw(ctx: CanvasRenderingContext2D, mapOffset: Vec2D = new Vec2D(0, 0), map: number[][] = this.map): void {
        //console.log("draw")
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.ctx.fillStyle = "#000"
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map.length; j++) {
                let position: Vec2D
                let dimensions: Vec2D
                if (this.generated) {
                    if (map == this.map) {
                        position = new Vec2D(
                            Math.floor((this.tileSize.x * j)) + mapOffset.x,
                            Math.floor((this.tileSize.y * i)) + mapOffset.y
                        );
                        dimensions = new Vec2D(
                            (this.tileSize.x + 1),
                            (this.tileSize.y + 1)
                        );
                    } else {
                        position = new Vec2D(
                            Math.floor((this.game.canvas.width / map.length) * j),
                            Math.floor((this.game.canvas.height / map.length) * i)
                        )
                        dimensions = new Vec2D(
                            (this.game.canvas.width / map.length + 1),
                            (this.game.canvas.height / map.length + 1)
                        )
                    }
                } else {
                    position = new Vec2D(
                        Math.floor((this.game.canvas.width / map.length) * j),
                        Math.floor((this.game.canvas.height / map.length) * i)
                    );
                    dimensions = new Vec2D(
                        (this.game.canvas.width / this.mapDimensions.x + 1),
                        (this.game.canvas.height / this.mapDimensions.y + 1)
                    );
                }

                let tile = map[i][j]
                let floorTile = false;

                // Current tile
                if (map == this.map) {
                    if ([1, 2, 3, 4].includes(tile)) floorTile = true  // 2, 3, 4 correspond to floor tile variants
                }

                // Visualise the map
                if (!this.generated) {
                    if (floorTile) {
                        this.game.draw(position, dimensions, this.game.assets.images[1], new Vec2D(0, 32), new Vec2D(32, 32))
                        continue;
                    } else if (tile == TileType.Sand) {
                        this.ctx.fillStyle = "#c2a676";
                    } else if (tile == TileType.Water) {
                        this.ctx.fillStyle = "#2a7fea";
                    }
                    this.ctx.fillRect(position.x, position.y, dimensions.x, dimensions.y);
                }

                // Check if we should draw the tile
                if (!(position.x > -dimensions.x && position.x < this.game.canvas.width + dimensions.x && position.y > -dimensions.y && position.y < this.game.canvas.height + dimensions.y && this.generated)) {
                    continue;
                }

                if (map == this.map) {
                    if (floorTile) {
                        if (tile == TileType.FloorEmpty) {
                            this.game.draw(position, dimensions, this.game.assets.images[1], new Vec2D(0, 32), new Vec2D(32, 32))
                        } else if (tile == TileType.FloorGrass) {
                            this.game.draw(position, dimensions, this.game.assets.images[1], new Vec2D(0, 0), new Vec2D(32, 32))
                        } else if (tile == TileType.FloorFlower) {
                            this.game.draw(position, dimensions, this.game.assets.images[1], new Vec2D(32, 0), new Vec2D(32, 32))
                        } else this.ctx.fillStyle = "#000"
                        continue;
                        //this.ctx.fillStyle = "#68b547";
                    } else if (tile == TileType.Sand) {
                        this.game.draw(position, dimensions, this.game.assets.images[1], new Vec2D(32, 32), new Vec2D(32, 32));
                        continue;
                        //this.ctx.fillStyle = "#bab473";
                    } else if (tile == TileType.Water) {
                        this.ctx.fillStyle = "#377";
                    } else {
                        this.ctx.fillStyle = "#000";
                    }
                } else {
                    if (tile == BiomeTemp.Freezing) {
                        this.ctx.fillStyle = "#fff";
                    } else if (tile == BiomeTemp.Cold) {
                        this.ctx.fillStyle = "#cce";
                    } else if (tile == BiomeTemp.Temperate) {
                        this.ctx.fillStyle = "#49a421";
                    } else if (tile == BiomeTemp.Warm) {
                        this.ctx.fillStyle = "#edb021";
                    }
                    //this.ctx.fillStyle = `rgba(${tile * 255}, ${tile * 255}, ${tile * 255}, 1)`
                }
                this.game.draw(position, dimensions)
            }
        }
    }

    /* 
        *   Walker functions
    */

    // Move the walker one step in the direction it's facing
    updatePosition(): void {
        for (let i = 0; i < this.walkers.length; i++) {
            let walker = this.walkers[i];
            // Move walker
            walker.position.x += walker.direction.x;
            walker.position.y += walker.direction.y;
            // Check if walker is out of bounds
            walker.position.x = walker.position.x > this.mapDimensions.x - 1 ? 0
                : walker.position.x < 0 ? (this.mapDimensions.x - 1)
                    : walker.position.x;

            walker.position.y = walker.position.y > this.mapDimensions.y - 1 ? 0
                : walker.position.y < 0 ? (this.mapDimensions.y - 1)
                    : walker.position.y;
        }
    }
    // Chance to change the direction that the walker is facing
    changeDirection(): void {
        // For every walker
        for (let i = 0; i < this.walkers.length; i++) {
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
    chanceToCreate(): void {
        // For every walker
        for (let i = 0; i < this.walkers.length; i++) {
            let walker = this.walkers[i]
            if (Math.random() < walker.chanceToChange && this.walkers.length < this.maxWalkers) {
                // Set new walker's position and direction
                let newPosition = new Vec2D(walker.position.x, walker.position.y);
                let newDirection = Direction2D.getRandomDirection();
                // Add new walker
                this.walkers.push(new WalkerObject(newPosition, newDirection, walker.chanceToChange))
            }
        }
    }
    // Chance to remove a walker
    chanceToRemove(): void {
        // For every walker
        for (let i = 0; i < this.walkers.length; i++) {
            let walker = this.walkers[i];
            if (Math.random() < walker.chanceToChange && this.walkers.length > 1) {
                this.walkers.splice(this.walkers.indexOf(walker), 1);
            }
        }
    }

    /*
        *   Map functions
    */

    // Make more variance in the map
    removeTooMuchWater(tile: Vec2D): boolean {
        if (this.map[tile.x][tile.y] == TileType.Water && this.checkSurroundingTiles(tile, [TileType.Water]) > 5 && Math.random() < 0.01) {
            return true;
        }
    }
    // Check if surrounding tiles are floor tiles
    checkSurroundingTiles(pos: Vec2D<number>, tiles: number[], from = -1, to = 2, map = this.map): number {
        let count = 0;
        for (let i = from; i < to; i++) {
            for (let j = from; j < to; j++) {
                if (map[pos.x + i] != undefined && map[pos.x + i][pos.y + j] != undefined && !(i == 0 && j == 0)) {
                    if (tiles.includes(map[pos.x + i][pos.y + j])) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    // Check if adjacent tiles are floor tiles
    checkAdjacentTiles(pos: Vec2D<number>, tiles: number[], map = this.map): number {
        let count = 0;
        for (let i = 0; i < 4; i++) {
            if (map[pos.x + Direction2D.cardinalDirections[i].x] != undefined && map[pos.x + Direction2D.cardinalDirections[i].x][pos.y + Direction2D.cardinalDirections[i].y] != undefined) {
                if (tiles.includes(map[pos.x + Direction2D.cardinalDirections[i].x][pos.y + Direction2D.cardinalDirections[i].y])) {
                    count++;
                }
            }
        }
        return count;
    }
    // Make a sand tile after generating
    makeSand(tile: Vec2D): boolean {
        if ([TileType.Empty, TileType.Water].includes(this.map[tile.x][tile.y]) &&
            this.checkSurroundingTiles(
                tile,
                [TileType.Floor, TileType.FloorEmpty, TileType.FloorFlower, TileType.FloorGrass],
                -2,
                3
            )
        ) {
            return true;
        }
    }
    checkSand(tile: Vec2D): boolean {
        if (this.map[tile.x][tile.y] == TileType.Sand) {
            if (this.checkAdjacentTiles(tile, [TileType.Floor, TileType.FloorEmpty, TileType.FloorFlower, TileType.FloorGrass]) > 2) {
                return true;
            }
        }
    }
    // Make a water tile after generating
    makeWater(tile: number): boolean {
        if (tile == TileType.Empty) {
            return true;
        }
    }
    // Create a floor tile at the given position
    createRandomFloorTile(constraints: Vec2D): TileType {
        let rand = Math.random()
        // constraints.x chance to create a flower tile
        return (
            rand < constraints.x ?
                TileType.FloorFlower :
                // constraints.y - constraints.x chance to create a grass tile
                rand < constraints.y ?
                    TileType.FloorGrass :
                    TileType.FloorEmpty
        )
    }
    // Similar to minecraft map gen, upscales resolution of the map and adds variation
    zoom(map: TileType[][] = this.map): TileType[][] {
        // Upscale map
        let newMap = [...map];
        newMap = newMap.map(r => r.map(n => [n, n]).flat(1)).map(r => [[...r], [...r]]).flat(1)
        // Add variation
        for (let i = 0; i < newMap.length; i++) {
            for (let j = 0; j < newMap[i].length; j++) {
                if (newMap[i][j] == TileType.Floor) {
                    let surroundingTiles = this.checkSurroundingTiles(new Vec2D(i, j), [TileType.Floor], -1, 2, newMap)
                    if (surroundingTiles > 4 && Math.random() < 0.07) {
                        newMap[i][j] = TileType.Empty;
                    }
                } else {
                    let closeToFloor = this.checkSurroundingTiles(new Vec2D(i, j), [TileType.Floor], -2, 3, newMap)
                    if (closeToFloor > 1 && Math.random() < 0.14) {
                        newMap[i][j] = TileType.Floor;
                    }
                }
            }
        }

        if (map == this.map) {
            this.mapDimensions.x *= 2;  // Upscale map dimensions (for rendering)
            this.mapDimensions.y *= 2;  // ^
        }

        return newMap;
    }
}

// Long before time had a name, Ninjago was created by the First Spinjitzu Master, by using the Four Elemental Weapons of Spinjitzu; weapons so powerful, no one can handle all of their power at once. When he passed away, his two sons swore to protect them, but the oldest, Lord Garmadon, was consumed by darkness and wanted to possess them all. A battle between brothers broke out and Lord Garmadon was struck down and banished to the Underworld. Peace returned to Ninjago as the younger brother, Sensei Wu, hid the elemental weapons in the far corners of Ninjago. Centuries later, Lord Garmadon has returned with the help of his Skeleton army to collect the Golden Weapons. Sensei Wu turns to the aid of four young Ninja who are to be trained to become the protectors of each of the weapons. Although the Ninja successfully survive a harrowing quest to retrieve the elemental weapons, they fall into Lord Garmadon's master plan, releasing the dark Lord from his prison, and allowing him to escape through a vortex, with hope that he would one day return with the ability to possess all four weapons. Peace returned to Ninjago as the younger brother, Sensei Wu, hid the elemental weapons in the far corners of Ninjago. Centuries later, Lord Garmadon has returned with the help of his Skeleton army to collect the Golden Weapons. Sensei Wu turns to the aid of four young Ninja who are to be trained to become the protectors of each of the weapons. Although the Ninja successfully survive a harrowing quest to retrieve the elemental weapons, they fall into Lord Garmadon's master plan, releasing the dark Lord from his prison, and allowing him to escape through a vortex, with hope that he would one day return with the ability to possess all four weapons.