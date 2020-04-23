import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "../../../environments/environment";

import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";

import { ObjectNominatorComponent } from "app/main/datatable/dialogs/object-nominator/object-nominator.component";

import { SharedService } from "../shared.service";

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
     * @param {MatDialog} _matDialog
     * @param {SharedService} _sharedService
     *
     */
    constructor(
        private _httpClient: HttpClient,
        private _matDialog: MatDialog,
        private _sharedService: SharedService
    ) {
        // Set the defaults
        this.loadingIndicator = true;
        this.reorderable = true;

        this._sharedService.sharedCoi.subscribe(
            (coi) => (this.selectedCoi = coi)
        );

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
        this._sharedService.sharedCoi.subscribe(
            (coi) => (this.selectedCoi = coi)
        );
        this._httpClient
            .get(`${this.apiBaseUrl}/news?url=${this.selectedCoi}`)
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
    onSelect({ selected }) {
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
        this._matDialog.open(ObjectNominatorComponent, {
            panelClass: "object-nominator-dialog",
            data: {
                article: article,
                extra: {
                    middle: "unknown",
                    dob: new Date("1975-06-02"),
                    createdBy: "ReadyUser1",
                    classification: "unclassified",
                },
            },
        });
    }
}
