import { Component } from "./components";
import { Game } from "../main";

type Trigger = "audio" | "render" | "move";

export class ECS {
    entities: Entity[];
    systemManager: SystemManager;
    constructor() {
        this.entities = [];
        this.systemManager = new SystemManager();
    }
    addEntity(entity: Entity, components?: Component[]) {
        this.entities.push(entity);
        components != null ? entity.components = components : null;
    }
    addSystem(system: System) {
        this.systemManager.systems.push(system);
    }
    addTrigger(trigger: Trigger) {
        if (this.systemManager.triggers.includes(trigger)) return;
        this.systemManager.addTrigger(trigger)
    }
    update(ctx?: CanvasRenderingContext2D, game?: Game) {
        this.systemManager.updateSystems(this.entities, ctx, game);
    }
}

class SystemManager {
    systems: System[];
    triggers: Trigger[];
    constructor() {
        this.systems = [];
        this.triggers = [];
    }
    // Add a system to the system manager
    addSystem(system: System): void {
        this.systems.push(system);
    }
    // Add a trigger
    addTrigger(trigger: Trigger): void {
        this.triggers.push(trigger)
        console.log(this.triggers)
    }
    // Remove a trigger
    removeTrigger(trigger: Trigger) {
        this.triggers.splice(this.triggers.indexOf(trigger), 1)
    }
    // Run all systems on all entities, if the entities have the required components
    updateSystems(entities: Entity[], ctx?: CanvasRenderingContext2D, game?: Game): void {
        for (let i = 0; i < this.systems.length; i++) {
            const system = this.systems[i]
            if (!this.triggers.includes(system.trigger)) continue;   // Skip if the system's trigger is not active
            for (let j = 0; j < entities.length; j++) {
                const entity = entities[j]
                // console.log("Updating systems")
                /* if(entity.components.every((c, i) => Object.getPrototypeOf(c).constructor == system.components[i])) {
                    system.func(entity, ctx);
                } else {
                    console.warn("Entity does not have the required components")
                    //console.log(Object.getPrototypeOf(entity.components[0]).constructor == system.components[0])
                } */
                let match = 0;
                for (let k = 0; k < entity.components.length; k++) {
                    for (let l = 0; l < system.components.length; l++) {
                        if (Object.getPrototypeOf(entity.components[k]).constructor == system.components[l]) {
                            match++;
                        }
                    }
                }
                if (match == system.components.length) {
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
        for (let c of this.components) {
            // If the component's name matches the name we're looking for, return it
            if (c.name == name) return c as T;
        }
    }
}

// Function to run on entities that match the system's components
type systemFunc = (entity: Entity, ctx?: CanvasRenderingContext2D, game?: Game) => void;

// Systems have an array of components, which run on entities with the same components
export class System {
    components: Component[];
    func: systemFunc;
    trigger: Trigger;
    constructor(components: Component[], trigger: Trigger, func: systemFunc) {
        this.components = components;
        this.trigger = trigger;
        this.func = func;
    }
}