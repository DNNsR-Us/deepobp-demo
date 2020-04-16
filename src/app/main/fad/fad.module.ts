import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { FadComponent } from './fad.component';

const routes = [
    {
        path     : 'fad',
        component: FadComponent,
        data: {id: '1', name: 'nfl'}
    }
];

@NgModule({
    declarations: [
        FadComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,

        FuseSharedModule,

        MatButtonModule,
        MatIconModule,
        MatTabsModule
    ],
    exports     : [
        FadComponent
    ]
})

export class FadModule
{
}
