/* components.ts
    * All ECS components
*/

import * as utils from "../utils";

export abstract class Component {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

export class MoveComponent extends Component {
    speed: number;
    constructor() {
        super("move");
    }
}

export class ImageComponent extends Component {
    image: HTMLImageElement;
    srcPos: utils.Vec2D;
    srcDim: utils.Vec2D;
    constructor(image: HTMLImageElement, srcPos?: utils.Vec2D, srcDim?: utils.Vec2D) {
        super("image");
        this.image = image;
        this.srcPos = srcPos;
        this.srcDim = srcDim;
    }
}

export class PositionComponent extends Component {
    position: utils.Vec2D;
    constructor(position: utils.Vec2D) {
        super("position");
        this.position = position;
    }
}

export class DimensionComponent extends Component {
    dimensions: utils.Vec2D;
    constructor(dimensions: utils.Vec2D) {
        super("dimensions");
        this.dimensions = dimensions;
    }
}