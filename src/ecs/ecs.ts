/* ecs.ts
    * Setup the ECS architecture
*/

import { Component } from "./components";
import { Game } from "../main";

// Triggers for systems
type Trigger = "audio" | "render" | "move" | "narrator";

// Function to run on entities that match the system's components
type systemFunc = (entity: Entity, ctx?: CanvasRenderingContext2D, game?: Game) => void;

// Systems have an array of components, which run on entities with the same components when a trigger is set
export abstract class System {
    requiredComponents: Component[];
    func: systemFunc;
    trigger: Trigger;
    constructor(requiredComponents: Component[], trigger: Trigger, func: systemFunc) {
        this.requiredComponents = requiredComponents;
        this.trigger = trigger;
        this.func = func;
    }
}

// ECS functions
export class ECS {
    entities: Entity[];
    systemManager: SystemManager;
    constructor() {
        this.entities = [];
        this.systemManager = new SystemManager();
    }
    addEntity(entity: Entity, components?: Component[]): void {
        this.entities.push(entity);
        components != null ? entity.components = components : null;
    }
    addSystem(system: System): void {
        this.systemManager.systems.push(system);
    }
    addTrigger(trigger: Trigger): void {
        if (this.systemManager.triggers.includes(trigger)) return;
        this.systemManager.addTrigger(trigger)
    }
    update(ctx?: CanvasRenderingContext2D, game?: Game): void {
        this.systemManager.updateSystems(this.entities, ctx, game);
    }
}

// Manages systems, updates them when a trigger is set
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
    }
    // Remove a trigger
    removeTrigger(trigger: Trigger): void {
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
                let match = 0;
                for (let k = 0; k < entity.components.length; k++) {
                    for (let l = 0; l < system.requiredComponents.length; l++) {
                        if (Object.getPrototypeOf(entity.components[k]).constructor == system.requiredComponents[l]) {
                            match++;
                        }
                    }
                }
                if (match == system.requiredComponents.length) {
                    system.func(entity, ctx, game);
                }
            }
        }
    }
}

// Entities have ids and components, and certain systems run on entities with the same components
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
    setComponent(component: Component): void {
        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i].name == component.name) {
                this.components[i] = component;
            }
        }
    }
}