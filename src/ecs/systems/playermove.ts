import { System } from '../ecs';
import { Vec2D } from '../../utils';

export class MovePlayer extends System {
    speed: number = 3;
    moveX: number;
    moveY: number;
    constructor() {
        super([], (_, __, game) => {
            this.moveX = 0;
            this.moveY = 0;

            // Key checking
            if(keys['w']||keys['ArrowUp']) {
                if(keys['a']||keys['ArrowLeft']||keys['d']||keys['ArrowRight'])
                    this.moveY += Math.sin(45)*(this.speed);
                else
                    this.moveY += this.speed;
            }
            if(keys['s']||keys['ArrowDown']) {
                if(keys['a']||keys['ArrowLeft']||keys['d']||keys['ArrowRight'])
                    this.moveY -= Math.sin(45)*(this.speed);
                else
                    this.moveY -= this.speed;
            }
            if(keys['a']||keys['ArrowLeft']) {
                if(keys['w']||keys['ArrowUp']||keys['s']||keys['ArrowDown'])
                    this.moveX += Math.sin(45)*(this.speed);
                else
                    this.moveX += this.speed;
            }
            if(keys['d']||keys['ArrowRight']) {
                if(keys['w']||keys['ArrowUp']||keys['s']||keys['ArrowDown'])
                    this.moveX -= Math.sin(45)*(this.speed);
                else
                    this.moveX -= this.speed;
            }

            //Bounds checking
            if(game.mapOffset.x >= 0) {
                game.mapOffset.x = 0;
                this.moveX = this.moveX > 0 ? 0 : this.moveX;
            }
            if(game.mapOffset.x <= -Math.floor((game.mapDimensions.x*game.playerSize.x)-game.canvas.width)) {
                game.mapOffset.x = -Math.floor((game.mapDimensions.x*game.playerSize.x)-game.canvas.width);
                this.moveX = this.moveX < 0 ? 0 : this.moveX;
            }
            if(game.mapOffset.y >= 0) {
                game.mapOffset.y = 0;
                this.moveY = this.moveY > 0 ? 0 : this.moveY;
            }
            if(game.mapOffset.y <= -Math.floor((game.mapDimensions.y*game.playerSize.y)-game.canvas.height)) {
                game.mapOffset.y = -Math.floor((game.mapDimensions.y*game.playerSize.y)-game.canvas.height);
                this.moveY = this.moveY < 0 ? 0 : this.moveY;
            }

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