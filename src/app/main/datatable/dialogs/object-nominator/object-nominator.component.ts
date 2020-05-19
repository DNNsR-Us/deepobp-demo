import {
    Component,
    ViewEncapsulation,
    Inject,
    OnInit,
    OnDestroy,
    Injectable,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { ObjectNominatorService } from "./object-nominator.service";
import { IbObject } from "../../../../models/ibobject";

@Injectable({
    providedIn: "root",
})
@Component({
    selector: "object-nominator",
    templateUrl: "./object-nominator.component.html",
    styleUrls: ["./object-nominator.component.scss"],
    encapsulation: ViewEncapsulation.None,
    // providers: [IbObject],
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
        private _formBuilder: FormBuilder,
        private _objectNominatorService: ObjectNominatorService
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Reactive Form
        this.form = this._formBuilder.group({
            name: [""],
            firstName: ["", ],
            middleName: [""],
            lastName: ["", ],
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
            name: this._data.article.name,
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

    async createObject() {
        console.log(this.form);
        let ibObject = new IbObject();
        ibObject.name = this.form.value.name;
        // ibObject.typeId = this.form.value.objectType; get typeId values
        // ibObject.coi['name'] = "Deep OBP " + this.coi.toUpperCase();

        ibObject.coi['name'] = "Deep OBP NFL";
        console.log(ibObject);

        try {
            await this._objectNominatorService.postObject(ibObject);
        } catch (error) {
            console.log(error);
        }
    }
}
