import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DeconflictService } from "./deconflict.service";

@Component({
    selector: "app-deconflict",
    templateUrl: "./deconflict.component.html",
    styleUrls: ["./deconflict.component.scss"],
})
export class DeconflictComponent implements OnInit {
    movies: {};
    result: any;
    threshold: number = 40;

    /**
     * @param {DeconflictService} _deconflictService
     */
    constructor(private _deconflictService: DeconflictService) {}

    ngOnInit(): void {
        // this.getMovieList();
    }

    onSliderChange(evt) {
        this.threshold = evt.value;
    }

    async getMovieList() {
        try {
            this.movies = await this._deconflictService.getMovies();
        } catch (error) {
            console.log(error);
        }
    }

    async getDeconflictionResults() {
        try {
            this.result = await this._deconflictService.getDecon(
                this.threshold
            );
        } catch (error) {
            console.log(error);
        }
    }
}
