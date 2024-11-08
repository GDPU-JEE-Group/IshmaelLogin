import bgAtlasRaw from '../assets/bg.atlas';
import bgSkelRaw from '../assets/bg.json';
import bgTexRaw from '../assets/bg.png';

import roleAtlasRaw from '../assets/role.atlas';
import roleSkelRaw from '../assets/role.json';
import roleTexRaw1 from '../assets/role1.png';
import roleTexRaw2 from '../assets/role2.png';

import decode from './decode';

export const MANIFEST = {
    bundles: [
        {
            name: 'bg',
            assets: [
                { alias: 'bgSkel', src: decode(bgSkelRaw) },
                { alias: 'bgAtlas', src: decode(bgAtlasRaw) },
                { alias: 'bgTex', src: decode(bgTexRaw) }
            ]
        },
        {
            name: 'role',
            assets: [
                { alias: 'roleSkel', src: decode(roleSkelRaw) },
                { alias: 'roleAtlas', src: decode(roleAtlasRaw) },
                { alias: 'roleTex1', src: decode(roleTexRaw1) },
                { alias: 'roleTex2', src: decode(roleTexRaw2) }
            ]
        }
    ]
};
