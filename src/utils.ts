/* utils.ts
    * Helper functions
*/

export class Vec2D<Type = number> {
    x: any;
    y: any;
    constructor(x: Type, y?: Type) {
        this.x = x;
        // If y is not defined, set y to x
        this.y = y ?? x;
    }

    static add<Type>(vec1: Vec2D<Type>, vec2: Vec2D<Type>): Vec2D<Type> {
        return new Vec2D<Type>(vec1.x + vec2.x, vec1.y + vec2.y);
    }

    static multiply<Type>(vec1: Vec2D<Type>, vec2?: Vec2D<Type>, num?: number): Vec2D<Type> {
        if (num) {
            return new Vec2D(vec1.x * num, vec1.y * num);
        } else if (vec2) {
            return new Vec2D(vec1.x * vec2.x, vec1.y * vec2.y);
        }
    }

}

export class Direction2D {
    private static cardinalDirections: Vec2D<number>[] = [new Vec2D(0, 1), new Vec2D(0, -1), new Vec2D(1, 0), new Vec2D(-1, 0)]

    static getRandomDirection(): Vec2D<number> {
        return this.cardinalDirections[Math.ceil((Math.random() * 4) - 1)]
    }
}

export const createHTMLElement = (elName: string, id?: string, className?: string, innerText?: string): HTMLElement => {
    const el = document.createElement(elName);
    if (id) el.id = id;
    if (className) el.className = className;
    if (innerText) el.innerText = innerText;
    return el;
}

export const removeElementById = (id: string): void => {
    document.getElementById(id).remove();
}

export const appendElementsById = (parent: string, children: HTMLElement[]): void => {
    children.map(e => document.getElementById(parent).appendChild(e))
}

export const sleep = (ms: number): Promise<unknown> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}