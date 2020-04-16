import {
    Component,
    ViewEncapsulation,
    Inject,
    OnInit,
    OnDestroy,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";

@Component({
    selector: "knowledge-base-article",
    templateUrl: "./article.component.html",
    styleUrls: ["./article.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class KnowledgeBaseArticleComponent implements OnInit, OnDestroy {
    // dialogRef: any;
    rows: any[];
    form: FormGroup;

    todayDate: Date = new Date();

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<KnowledgeBaseArticleComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<KnowledgeBaseArticleComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private _formBuilder: FormBuilder
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // form fields
        // Reactive Form
        this.form = this._formBuilder.group({
            createdDate: [
                {
                    value: new Date(),
                    disabled: true,
                },
                Validators.required,
            ],
            createdBy: [
                {
                    value: "ReadyUser1",
                    disabled: true,
                },
                Validators.required,
            ],
            firstName: ["", Validators.required],
            middleName: [""],
            lastName: ["", Validators.required],
            objectType: ["", Validators.required],
            dateOfBirth: [""],
            source: ["", Validators.required],
            classification: ["", Validators.required],
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        // this._unsubscribeAll.next();
        // this._unsubscribeAll.complete();
    }
}
