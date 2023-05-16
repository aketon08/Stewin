import { System } from '../ecs';
import { Entity } from '../ecs';
import { PositionComponent } from '../components';

export class Move extends System {
    speed: number = 3;
    constructor() {
        super([], (_, __, game) => {
            if(keys['w']||keys['ArrowUp']) {
                if(keys['a']||keys['ArrowLeft']||keys['d']||keys['ArrowRight'])
                    game.mapOffset.y += Math.sqrt(this.speed)
                else
                    game.mapOffset.y += this.speed;
            }
            if(keys['s']||keys['ArrowDown']) {
                if(keys['a']||keys['ArrowLeft']||keys['d']||keys['ArrowRight'])
                    game.mapOffset.y -= Math.sqrt(this.speed)
                else
                    game.mapOffset.y -= this.speed;
            }
            if(keys['a']||keys['ArrowLeft']) {
                if(keys['w']||keys['ArrowUp']||keys['s']||keys['ArrowDown'])
                    game.mapOffset.x += Math.sqrt(this.speed)
                else
                    game.mapOffset.x += this.speed;
            }
            if(keys['d']||keys['ArrowRight']) {
                if(keys['w']||keys['ArrowUp']||keys['s']||keys['ArrowDown'])
                    game.mapOffset.x -= Math.sqrt(this.speed)
                else
                    game.mapOffset.x -= 2;
            }
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