/* assetloader.ts
    * Pre-loads all assets
    * Credit to https://github.com/tobyck/goose-chase/blob/master/src/engine/asset_loader.ts for the idea
*/

export interface Asset {
    type: AssetType;
    path: string;
}

export enum AssetType {
    image,
    audio
}

export class AssetLoader {
    #assets: Asset[];
    constructor(assets: Asset[]) {
        this.#assets = assets;
    }
    private loadAsset(asset: Asset): Promise<HTMLImageElement | HTMLAudioElement> {
        return new Promise((resolve, reject) => {
            if (asset.type === AssetType.image) {
                const image = new Image();
                image.src = asset.path;
                image.onload = _ => resolve(image)
                image.onerror = reject
            } else if (asset.type === AssetType.audio) {
                const audio = new Audio();
                audio.src = asset.path;
                audio.oncanplaythrough = _ => resolve(audio)
                audio.onerror = reject
            }
        });
    }
    async loadAssets(): Promise<(HTMLImageElement | HTMLAudioElement)[]> {
        return await Promise.all(this.#assets.map(asset => this.loadAsset(asset)));
    }
}