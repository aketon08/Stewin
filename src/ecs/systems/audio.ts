/* audio.ts
    * Purpose: Plays audio
*/

import { System } from "../ecs";
import { AudioComponent } from "../components"

export class Audio extends System {
    audio: HTMLAudioElement;
    constructor() {
        super([AudioComponent], "audio", (entity) => {
            this.audio = entity.getComponent<AudioComponent>("audio").audio;
            this.audio.play()
        })
    }
    play(): void {
    }
}