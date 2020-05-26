import { Injectable, Inject, Optional } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class ObjDatatableService {
    constructor(
        private _httpClient: HttpClient,
        @Inject("coi") @Optional() public coi?: string,
        @Inject("useFad") @Optional() public useFad?: boolean
    ) {
        this.coi = coi || "nfl";
        this.useFad = useFad || true;
    }
}
