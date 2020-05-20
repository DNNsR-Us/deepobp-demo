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
import { MatSnackBar } from "@angular/material/snack-bar";

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
    typeIdMap: {} = {
        Event: "199_38615",
        Organization: "196_38669",
        Person: "195_38675",
        Venue: "194_38683",
    };

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
        private _objectNominatorService: ObjectNominatorService,
        private _snackBar: MatSnackBar
    ) {}

    /**
     * On init
     */
    ngOnInit(): void {
        // Reactive Form
        this.form = this._formBuilder.group({
            name: [""],
            firstName: [""],
            middleName: [""],
            lastName: [""],
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
        let ibObject = new IbObject();
        ibObject.name = this.form.value.name;

        let objectType = `${this.form.value.objectType}`;

        ibObject.typeId = this.typeIdMap[objectType];

        // ibObject.coi['name'] = "Deep OBP " + this.coi.toUpperCase();

        ibObject.coi["name"] = "Deep OBP NFL";

        let res = {};
        let message = "";
        try {
            res = await this._objectNominatorService.postObject(ibObject);
            message = "Succes - Object created in Intelbook";
        } catch (error) {
            console.log(error);
            message = error.message;
        }
        this._snackBar.open(message, null, {
            duration: 3000,
            horizontalPosition: "center",
            verticalPosition: "top",
        });
        setTimeout(() => {
            this.matDialogRef.close();
        }, 4000);
    }
}
