import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "../../../environments/environment";

import { debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";

import { fuseAnimations } from "@fuse/animations";

import { ObjectNominatorComponent } from "app/main/datatable/dialogs/object-nominator/object-nominator.component";

import { SharedService } from "../shared.service";
import { HighlightPipe } from "../../pipe/highlight.pipe";

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
    providers: [HighlightPipe],
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
    str: string =
        "is a Angular component for presenting large and complex data.\
            It has all the features you would expect from any other table but in a light package with no external\
            dependencies. The table was designed to be extremely flexible and light; it doesn't make any assumptions\
            about your data or how you: filter, sort or page it.";
    searchStr: string;
    value = "";

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     * @param {MatDialog} _matDialog
     * @param {SharedService} _sharedService
     * @param {HighlightPipe} highlight
     *
     */
    constructor(
        private _httpClient: HttpClient,
        private _matDialog: MatDialog,
        private _sharedService: SharedService,
        private highlight: HighlightPipe
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
            .get(`${this.apiBaseUrl}/object-nominator?coi=${this.selectedCoi}`)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((coiObjects: any) => {
                this.rows = coiObjects;
                this.loadingIndicator = false;
            });

        this.str = this.highlight.transform(this.str, null);
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

        let objectTypes = ["Organization", "Person", "Event", "Place"];

        this.selectedObjects = [];
        this.selected.forEach((record) => {
            this.selectedObjects.push({
                name: record.name,
                type: record.entity_type,
                // type:
                //     objectTypes[Math.floor(Math.random() * objectTypes.length)],
                source: record.source,
            });
        });
    }

    updateSearchHighlight(value: string) {
        this.searchStr = value;
    }

    onActivate(event) {
        // console.log("Activate Event", event);
    }

    createObj() {
        console.log("createObj");
    }

    testChange(obj) {
        console.log(obj);
    }

    /**
     *
     * @param candidateObj
     */
    discardObj(candidateObj: any): void {
        this.selectedObjects = this.selectedObjects.filter(
            (obj) => obj !== candidateObj
        );

        let selected = this.selected.filter((obj) => {
            obj.name !== candidateObj.name &&
                obj.entity_type != candidateObj.type &&
                obj.source != candidateObj.source;
        });
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
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
                    classification: "U",
                },
            },
        });
    }
}
