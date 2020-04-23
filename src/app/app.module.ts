import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import "hammerjs";

import { FuseModule } from "@fuse/fuse.module";
import { FuseSharedModule } from "@fuse/shared.module";
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from "@fuse/components";

import { fuseConfig } from "app/fuse-config";

// temporarily use fake-db
import { FakeDbService } from "app/fake-db/fake-db.service";
import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { FadModule } from "app/main/fad/fad.module";

import { ComponentsThirdPartyModule } from "app/main/components-third-party.module";
// import { KnowledgeBaseModule } from 'app/main/datatable/knowledge-base.module'
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { AnalyticsDashboardModule } from "app/main/analytics/analytics.module";
import { MatTreeModule } from "@angular/material/tree";

const appRoutes: Routes = [
    {
        path: "**",
        redirectTo: "/",
    },
    // {
    //     path     : 'datatable',
    //     loadChildren: () => KnowledgeBaseModule
    // },
    {
        path: "datatable",
        loadChildren: () => ComponentsThirdPartyModule,
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true,
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatTreeModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        FadModule,
        ComponentsThirdPartyModule,
        AnalyticsDashboardModule,
        // KnowledgeBaseModule
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
