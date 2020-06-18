import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { FuseSharedModule } from "@fuse/shared.module";

// import { KnowledgeBaseService } from "./datatable/knowledge-base.service";

import { ObjDatatableComponent } from "app/main/datatable/obj-datatable.component";
import { ObjectNominatorComponent } from "./datatable/dialogs/object-nominator/object-nominator.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReadbookComponent } from "./readbook/readbook.component";
import { SharedService } from "./shared.service";
import { HighlightPipe } from "../pipe/highlight.pipe";
import { HtmlTitlePipe } from "app/pipe/html-title.pipe";
import { CytoscapeComponent } from "./cytoscape/cytoscape.component";
import { NgCytoComponent } from "./ng-cyto/ng-cyto.component";

// import { DemoComponent } from './demo/demo.component';

const routes = [
    {
        path: "datatable",
        component: ObjDatatableComponent,
        // resolve: {
        //     knowledgeBase: KnowledgeBaseService,
        // },
    },
    {
        path: "readbook",
        component: ReadbookComponent,
    },
    {
        path: "graph",
        component: NgCytoComponent,
    },
    {
        path: "cytoscape",
        component: CytoscapeComponent,
    },
];

@NgModule({
    declarations: [
        ObjDatatableComponent,
        ObjectNominatorComponent,
        ReadbookComponent,
        HighlightPipe,
        HtmlTitlePipe,
        CytoscapeComponent,
        NgCytoComponent,
    ],
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
    ],
    providers: [
        SharedService,
        HighlightPipe,
        HtmlTitlePipe,
        // KnowledgeBaseService
    ],
    entryComponents: [ObjectNominatorComponent],
})
export class ComponentsThirdPartyModule {}
