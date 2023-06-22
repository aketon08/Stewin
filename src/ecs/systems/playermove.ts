/* playermove.ts
    * Move the player around the screen
*/

import { System } from '../ecs';
import { Vec2D } from '../../utils';
import * as utils from "../../utils";
import { ImageComponent } from '../components';
import { MoveComponent } from '../components';

export class MovePlayer extends System {
    speed: number = 2;
    moveX: number;
    moveY: number;
    foot: number = 1;
    frame: Vec2D = new Vec2D(0, 0)
    constructor() {
        super([
            MoveComponent
        ], "move", (_, __, game) => {
            //this.speed = 0.03 * game.mapDimensions.x
            this.moveX = 0;
            this.moveY = 0;

            let moving = Array(4).fill(false) // [up, left, down, right]

            // Key checking
            if (keys['w'] || keys['ArrowUp']) {
                moving[0] = true;
                if (keys['a'] || keys['ArrowLeft'] || keys['d'] || keys['ArrowRight'])
                    this.moveY += Math.sin(45) * (this.speed);
                else
                    this.moveY += this.speed;
            }
            if (keys['s'] || keys['ArrowDown']) {
                moving[2] = true;
                if (keys['a'] || keys['ArrowLeft'] || keys['d'] || keys['ArrowRight'])
                    this.moveY -= Math.sin(45) * (this.speed);
                else
                    this.moveY -= this.speed;
            }
            if (keys['a'] || keys['ArrowLeft']) {
                moving[1] = true;
                if (keys['w'] || keys['ArrowUp'] || keys['s'] || keys['ArrowDown'])
                    this.moveX += Math.sin(45) * (this.speed);
                else
                    this.moveX += this.speed;
            }
            if (keys['d'] || keys['ArrowRight']) {
                moving[3] = true;
                if (keys['w'] || keys['ArrowUp'] || keys['s'] || keys['ArrowDown'])
                    this.moveX -= Math.sin(45) * (this.speed);
                else
                    this.moveX -= this.speed;
            }

            // Bounds checking
            if (game.mapOffset.x >= 0) {
                game.mapOffset.x = 0;
                this.moveX = this.moveX > 0 ? 0 : this.moveX;
            }
            if (game.mapOffset.x <= -Math.floor((game.mapDimensions.x * game.playerSize.x) - game.canvas.width)) {
                game.mapOffset.x = -Math.floor((game.mapDimensions.x * game.playerSize.x) - game.canvas.width);
                this.moveX = this.moveX < 0 ? 0 : this.moveX;
            }
            if (game.mapOffset.y >= 0) {
                game.mapOffset.y = 0;
                this.moveY = this.moveY > 0 ? 0 : this.moveY;
            }
            if (game.mapOffset.y <= -Math.floor((game.mapDimensions.y * game.playerSize.y) - game.canvas.height)) {
                game.mapOffset.y = -Math.floor((game.mapDimensions.y * game.playerSize.y) - game.canvas.height);
                this.moveY = this.moveY < 0 ? 0 : this.moveY;
            }

            for (let i = 0; i < 4; i++) {
                // If holding opposite direction key, cancel
                moving[i] ? moving[(i + 2) % 4] ? (moving[i] = false, moving[(i + 2) % 4] = false) : null : null;
                i == 0 ? moving[i] ? moving[i + 1] || moving[i + 3] ? (moving[i + 1] = false, moving[i + 3] = false) : null : null :
                    //its not illegal to think im have fat butt
                    i == 2 ? moving[i] ? moving[i - 1] || moving[i + 1] ? (moving[i - 1] = false, moving[i + 1] = false) : null : null : null;
            }

            // Set the direction of the player to the truthy value
            let moveDir = moving.indexOf(true)


            moveDir = moveDir == -1 ? 2 : moveDir;

            //console.log(moveDir)

            if (!moving.every(move => move === false)) {
                // set the sprite row to the direction
                // every 12 frames
                if (game.frames % 12 == 0) {
                    switch (moveDir) {
                        case 0:         // up
                        case 2:         // down
                            if (this.frame.x == 0) {        // if it's the first frame
                                this.frame.x = this.foot;
                            } else {
                                this.foot == 1 ? this.foot = 2 : this.foot = 1;
                                this.frame.x = 0;
                            }
                            break;
                        case 1:         // left
                        case 3:         // right
                            this.frame.x == 0 ? this.frame.x = 1 : this.frame.x = 0;
                            break;
                    }
                }
            } else this.frame.x = 0
            this.frame.y = moveDir;
            game.ecs.entities[0].setComponent(new ImageComponent(game.assets[0], Vec2D.multiply(this.frame, null, 32), new Vec2D(32)))
            // game.mapOffset.x >= -1 ? this.moveX > 0 ? 0 : this.moveX : game.mapOffset.x <= -Math.floor((game.mapDimensions.x*game.playerSize.x)-game.canvas.width) ? this.moveX < 0 ? 0 : this.moveX : this.moveX;
            game.mapOffset = Vec2D.add(game.mapOffset, new Vec2D(this.moveX, this.moveY))
        })
    }
}
const keys = [];
document.addEventListener("keydown", e => {
    keys[e.key] = true;
})
document.addEventListener("keyup", e => {
    keys[e.key] = false;
})