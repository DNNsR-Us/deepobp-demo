import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSharedModule } from '@fuse/shared.module';

import { KnowledgeBaseService } from 'app/main/datatable/knowledge-base.service';
// import { NgxDatatableComponent } from 'app/main/datatable/ngx-datatable.component';
import { KnowledgeBaseArticleComponent } from 'app/main/datatable/dialogs/article/article.component';

const routes = [
    // {
    //     path     : 'datatable',
    //     component: NgxDatatableComponent,
    //     resolve  : {
    //         knowledgeBase: KnowledgeBaseService
    //     }
    // }
];

@NgModule({
    declarations   : [
        // NgxDatatableComponent,
        KnowledgeBaseArticleComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,

        FuseSharedModule
    ],
    providers      : [
        KnowledgeBaseService
    ],
    entryComponents: [
        KnowledgeBaseArticleComponent
    ]
})
export class KnowledgeBaseModule
{
}
