import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "fad",
    templateUrl: "./fad.component.html",
    styleUrls: ["./fad.component.scss"],
})
export class FadComponent {
    coi: any;
    /**
     * Constructor
     *
     * @param {ActivatedRoute} activatedroute
     */
    constructor(private activatedroute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedroute.data.subscribe((data) => {
            this.coi = data;
        });
    }
}
