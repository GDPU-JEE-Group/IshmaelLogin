import {
    Application,
    Assets,
    DisplayObject,
    Filter,
    IApplicationOptions
} from 'pixi.js';

import Component from './components/base';
import { MANIFEST } from './manifest';

export default class {
    private app: Application<HTMLCanvasElement>;

    constructor(options?: Partial<IApplicationOptions>) {
        this.app = new Application<HTMLCanvasElement>(
            options ?? {
                powerPreference: 'high-performance',
                resolution: window.devicePixelRatio || 1,
                resizeTo: window,
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundAlpha: 0,
                autoStart: true
            }
        );

        document.body.appendChild(this.app.view);
    }

    public async init() {
        await Assets.init({ manifest: MANIFEST });
        Assets.backgroundLoadBundle(['bg', 'role']);
    }

    public start() {
        this.app.start();
    }

    public setup(component: Component) {
        component.setup(this);
    }

    public addChild<C extends DisplayObject[]>(...children: C) {
        this.app.stage.addChild(...children);
    }

    get view() {
        return this.app.view;
    }

    get ticker() {
        return this.app.ticker;
    }

    get filters() {
        return this.app.stage.filters;
    }

    set filters(value: Filter[]) {
        this.app.stage.filters = value;
    }
}
