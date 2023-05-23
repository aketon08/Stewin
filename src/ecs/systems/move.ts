import { System } from '../ecs';
import { Vec2D } from '../../utils';

export class Move extends System {
    speed: number = 3;
    moveX: number;
    moveY: number;
    constructor() {
        super([], (_, __, game) => {
            this.moveX = 0;
            this.moveY = 0;
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