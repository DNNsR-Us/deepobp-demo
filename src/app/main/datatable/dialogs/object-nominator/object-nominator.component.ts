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
    selector: "object-nominator",
    templateUrl: "./object-nominator.component.html",
    styleUrls: ["./object-nominator.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ObjectNominatorComponent implements OnInit, OnDestroy {
    // dialogRef: any;
    rows: any[];
    form: FormGroup;

    todayDate: Date = new Date();

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ObjectNominatorComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<ObjectNominatorComponent>,
        @Inject(MAT_DIALOG_DATA) public _data: any,
        private _formBuilder: FormBuilder
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Reactive Form
        this.form = this._formBuilder.group({

            firstName: ["", Validators.required],
            middleName: [""],
            lastName: ["", Validators.required],
            objectType: ["", Validators.required],
            dateOfBirth: [""],
            source: ["", Validators.required],
            classification: ["", Validators.required],
        });

        this.setValue();
    }

    setValue() {
        const name = this._data.article.name.split(" ");
        this.form.setValue({
            firstName: name[0],
            middleName: this._data.extra.middle,
            lastName: name[1],
            objectType: this._data.article.type,
            dateOfBirth: this._data.extra.dob,
            source: this._data.article.source,
            classification: this._data.extra.classification,
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
