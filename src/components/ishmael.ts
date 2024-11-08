import Manager from '../manager';
import SpineHelper from '../spine';
import Component from './base';

export default class extends Component {
    async setup(manager: Manager) {
        const bgHelper = await SpineHelper.from('bg', {
            skeleton: 'bgSkel',
            atlas: 'bgAtlas',
            textures: new Map([['Lamiyaloginbg.png', 'bgTex']])
        });

        const roleHelper = await SpineHelper.from('role', {
            skeleton: 'roleSkel',
            atlas: 'roleAtlas',
            textures: new Map([
                ['Lamiyaloginrole.png', 'roleTex1'],
                ['Lamiyaloginrole2.png', 'roleTex2']
            ])
        });

        bgHelper.spine.addChild(roleHelper.spine);
        bgHelper.fitToWindow();

        window.addEventListener('resize', () => {
            bgHelper.fitToWindow();
        });

        manager.addChild(bgHelper.spine);
    }

    updateConfig() {
        throw new Error('Method not implemented.');
    }
}
