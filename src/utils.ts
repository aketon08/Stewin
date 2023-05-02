export class Vec {
    x: any;
    y: any;
    constructor(x: any, y?: any) {
        this.x = x;
        this.y = y ?? x;
    }
}