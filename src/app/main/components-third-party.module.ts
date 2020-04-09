import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { FuseSharedModule } from "@fuse/shared.module";

import { KnowledgeBaseService } from "./datatable/knowledge-base.service";

// import { GoogleMapsModule } from 'app/main/documentation/components-third-party/google-maps/google-maps.module';
import { ObjDatatableComponent } from "app/main/datatable/obj-datatable.component";
import { KnowledgeBaseArticleComponent } from "./datatable/dialogs/article/article.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
// import { DemoComponent } from './demo/demo.component';

const routes = [
    {
        path: "datatable",
        component: ObjDatatableComponent,
        resolve: {
            knowledgeBase: KnowledgeBaseService,
        },
    },
    // {
    //     path     : 'demo',
    //     component: DemoComponent
    // },
];

@NgModule({
    declarations: [ObjDatatableComponent, KnowledgeBaseArticleComponent],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatCheckboxModule,
        MatIconModule,
        MatToolbarModule,

        NgxDatatableModule,

        FuseSharedModule,

        MatSelectModule,
        MatDatepickerModule,

        // GoogleMapsModule
    ],
    providers: [KnowledgeBaseService],
    entryComponents: [KnowledgeBaseArticleComponent],
})
export class ComponentsThirdPartyModule {}
