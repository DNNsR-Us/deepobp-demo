import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import {environment } from '../../../environments/environment'

import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";

import { KnowledgeBaseArticleComponent } from "app/main/datatable/dialogs/article/article.component";

interface Coi {
    value: string;
    viewValue: string;
}

@Component({
    selector: "obj-datatable",
    templateUrl: "./obj-datatable.component.html",
    styleUrls: ["./obj-datatable.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class ObjDatatableComponent implements OnInit, OnDestroy {
    // dialogRef: any;
    rows: any[];

    selected = [];
    loadingIndicator: boolean;
    reorderable: boolean;

    apiBaseUrl: string = environment.apiBaseUrl;

    cois: Coi[] = [
        { value: "covid19", viewValue: "Covid-19 News" },
        { value: "tech", viewValue: "Tech News" },
        { value: "nfl", viewValue: "NFL News" },
        { value: "top_headlines", viewValue: "Headlines" },
    ];

    selectedCoi: string;
    selectedObjects = [];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {KnowledgeBaseService} _knowledgeBaseService
     * @param {MatDialog} _matDialog
     *
     */
    constructor(
        private _httpClient: HttpClient,
        // private _knowledgeBaseService: KnowledgeBaseService,
        private _matDialog: MatDialog
    ) {
        // Set the defaults
        this.loadingIndicator = true;
        this.reorderable = true;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        console.log("in ngOnInit");
        // this.resultType = "covid19";
        this.selectedCoi = "nfl";
        this._httpClient
            .get(
                `${this.apiBaseUrl}/news?url=nfl`
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((articles: any) => {
                this.rows = articles;
                this.loadingIndicator = false;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // Custom functions

    onCoiSelection(event) {
        console.log("in onCoiSelection, event is", event);

        // Reset selections
        this.selected = [];
        this.selectedObjects = [];
        // this.resultType = "covid19";
        this.selectedCoi = event.value;
        this._httpClient
            .get(
                `${this.apiBaseUrl}/news?url=${this.selectedCoi}`
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((articles: any) => {
                this.rows = articles;
                this.loadingIndicator = false;
            });
    }

    onSelect({ selected }) {
        console.log("Select Event", selected, this.selected);

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);

        let objectTypes = ["Person", "Event", "Place"];

        this.selectedObjects = [];
        this.selected.forEach((record) => {
            this.selectedObjects.push({
                name: record.author,
                type: "Person",
                // type:
                //     objectTypes[Math.floor(Math.random() * objectTypes.length)],
                source: record.sourceName,
            });
        });
        console.log("in callback, selectedObjects is", this.selectedObjects);
    }

    onActivate(event) {
        // console.log("Activate Event", event);
    }

    createObj() {
        console.log("createObj");
    }

    discardObj() {
        console.log("discardObj");
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Read article
     *
     * @param article
     */
    readArticle(article): void {
        console.log(article);
        this._matDialog.open(KnowledgeBaseArticleComponent, {
            panelClass: "knowledgebase-article-dialog",
            data: {
                article: article,
                extra: {
                    middle: "Louise",
                    dob: new Date('1975-06-02'),
                    createdBy: "ReadyUser1",
                },
            },
        });
    }
}
