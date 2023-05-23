import { System } from "../ecs";
import * as cs from "../components"     // cs = components

export class Render extends System {
    constructor() {
        super([
            cs.ImageComponent, 
            cs.PositionComponent,
            cs.DimensionComponent
        ], (entity, ctx) => {
            const image = entity.getComponent<cs.ImageComponent>("image").image;
            const srcPos = entity.getComponent<cs.ImageComponent>("image").srcPos;
            const srcDim = entity.getComponent<cs.ImageComponent>("image").srcDim;
            const pos = entity.getComponent<cs.PositionComponent>("position").position;
            const dim = entity.getComponent<cs.DimensionComponent>("dimensions").dimensions;
            //console.log("Rendering entity")
            ctx.drawImage(image, srcPos.x, srcPos.y, srcDim.x, srcDim.y, pos.x, pos.y, dim.x, dim.y);
        });
    }
}