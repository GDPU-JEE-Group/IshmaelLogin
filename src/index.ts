import '@pixi-spine/all-3.8';

import BgmComponent from './components/bgm';
import LamiaComponent from './components/lamia';
import WaveComponent from './components/wave';
import Manager from './manager';

import { FXAAFilter } from 'pixi.js';

const manager = new Manager();

(async () => {
    await manager.init();

    manager.filters = [new FXAAFilter()];

    // TODO: apply wallpaper settings here

    manager.setup(new LamiaComponent());
    manager.setup(new WaveComponent());
    manager.setup(new BgmComponent());
})();
