import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'demo',
                title    : 'Demo',
                translate: 'NAV.DEMO.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/demo',
                badge    : {
                    title    : '25',
                    translate: 'NAV.DEMO.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
            {
                id       : 'datatable',
                title    : 'Datatable',
                // translate: 'NAV.DEMO.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/datatable',
                badge    : {
                    title    : '25',
                    translate: 'NAV.DEMO.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            }
        ]
    }
];
