export class Vec2D<Type = number> {
    x: any;
    y: any;
    constructor(x: Type, y?: Type) {
        this.x = x;
        // If y is not defined, set y to x
        this.y = y ?? x;
    }

    static add<Type>(vec1: Vec2D<Type>, vec2: Vec2D<Type>) {
        return new Vec2D<Type>(vec1.x + vec2.x, vec1.y + vec2.y);
    }

}

export class Direction2D {
    private static cardinalDirections: Vec2D<number>[] = [new Vec2D(0, 1), new Vec2D(0, -1), new Vec2D(1, 0), new Vec2D(-1, 0)]
    static getRandomDirection() {
        return this.cardinalDirections[Math.ceil((Math.random()*4)-1)]
    }
}