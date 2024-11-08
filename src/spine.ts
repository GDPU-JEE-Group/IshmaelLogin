import { Assets } from 'pixi.js';

import {
    AtlasAttachmentLoader,
    SkeletonJson,
    Spine,
    TextureAtlas
} from '@pixi-spine/all-3.8';

interface SpineLoadOptions {
    skeleton: string;
    atlas: string;
    textures: Map<string, string>;
    defaultMix?: number;
    defaultAnimation?: string;
}

export default class SpineHelper {
    readonly spine: Spine;

    constructor(spine: Spine) {
        this.spine = spine;
    }

    static async from(bundleName: string, options: SpineLoadOptions) {
        await Assets.loadBundle(bundleName);

        const textureAtlas = new TextureAtlas(
            Assets.get(options.atlas),
            (line, callback) => {
                callback(Assets.get(options.textures.get(line)));
            }
        );

        const atlasLoader = new AtlasAttachmentLoader(textureAtlas);
        const jsonParser = new SkeletonJson(atlasLoader);

        const spineData = jsonParser.readSkeletonData(
            Assets.get(options.skeleton)
        );

        const spine = new Spine(spineData);

        spine.state.data.defaultMix = options.defaultMix ?? 0.2;
        spine.state.setAnimation(0, options.defaultAnimation ?? 'idle', true);

        return new this(spine);
    }

    public fitToWindow(width?: number, height?: number) {
        const scaleX = window.innerWidth / (width ?? 3840);
        const scaleY = window.innerHeight / (height ?? 2160);

        this.setScale(Math.max(scaleX, scaleY));

        this.spine.x = window.innerWidth / 2;
        this.spine.y = window.innerHeight / 2;
    }

    public setScale(scale: number) {
        this.scale.set(scale, scale);
    }

    get scale() {
        return this.spine.scale;
    }
}
