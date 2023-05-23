import { Component, DimensionComponent, ImageComponent, PositionComponent } from "./components";
import { Render } from "./systems/render";
import * as utils from "../utils";
import { Game } from "../main";

export class ECS {
    entities: Entity[];
    systemManager: SystemManager;
    constructor() {
        this.entities = [];
        this.systemManager = new SystemManager();
    }
    addEntity(entity: Entity) {
        this.entities.push(entity);
    }
    addSystem(system: System) {
        this.systemManager.systems.push(system);
    }
    update(ctx?: CanvasRenderingContext2D, game?: Game) {
        this.systemManager.updateSystems(this.entities, ctx, game);
    }
}

class SystemManager {
    systems: System[];
    constructor() {
        this.systems = [];
    }
    // Add a system to the system manager
    addSystem(system: System) {
        this.systems.push(system);
    }
    // Run all systems on all entities, if the entities have the required components
    updateSystems(entities: Entity[], ctx?: CanvasRenderingContext2D, game?: Game) {
        for(let i = 0; i < this.systems.length; i++) {
            const system = this.systems[i]
            for(let j = 0; j < entities.length; j++) {
                const entity = entities[j]
                // console.log("Updating systems")
                /* if(entity.components.every((c, i) => Object.getPrototypeOf(c).constructor == system.components[i])) {
                    system.func(entity, ctx);
                } else {
                    console.warn("Entity does not have the required components")
                    //console.log(Object.getPrototypeOf(entity.components[0]).constructor == system.components[0])
                } */
                let match = 0;
                for(let k = 0; k < entity.components.length; k++) {
                    for(let l = 0; l < system.components.length; l++) {
                        if(Object.getPrototypeOf(entity.components[k]).constructor == system.components[l]) {
                            match++;
                        }
                    }
                }
                if(match == system.components.length) {
                    system.func(entity, ctx, game);
                }
            }
        }
    }
}

export class Entity {
    id: number
    components: Component[];
    constructor(id: number) {
        this.id = id;
        this.components = [];
    }
    // Get a component by it's name
    getComponent<T extends Component>(name: string): T {
        // Loop through all components
        for(let c of this.components) {
            // If the component's name matches the name we're looking for, return it
            if(c.name == name) return c as T;
        }
    }
}

type systemFunc = (entity: Entity, ctx?: CanvasRenderingContext2D, game?: Game) => void;

export class System {
    components: Component[];
    // Function to run on entities that match the system's components
    func: systemFunc;
    constructor(components: Component[], func: systemFunc) {
        this.components = components;
        this.func = func;
    }
}

