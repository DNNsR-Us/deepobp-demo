import { Injectable, Optional, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
    providedIn: "root",
})
export class DeconflictService {
    apiBaseUrl: string = environment.apiBaseUrl;
    currentUrl: string = "";
    useUrl: string;
    threshold: number = 40;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {}

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> | Promise<any> | any {
        return new Promise(async (resolve, reject) => {
            Promise.all([this.getDecon(this.threshold)]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get list of movies - Async function
     *
     * @returns {Promise<any>}
     */
    getMovies(): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders()
                .set("cache-control", "no-cache")
                .set("content-type", "application/json");

            this._httpClient
                .get(`${this.apiBaseUrl}/movies`)
                .subscribe((response: any) => {
                    resolve(response);
                });
        });
    }

    /**
     * Get deconfliction result
     *
     * @returns {Promise<any>}
     */
    getDecon(thresh): Promise<any> {
        const headers = new HttpHeaders()
            .set("cache-control", "no-cache")
            .set("content-type", "application/json");

        return new Promise((resolve, reject) => {
            this._httpClient
                .get(`${this.apiBaseUrl}/deconflict_demo/${thresh}`)
                .subscribe((response: any) => {
                    // console.log(response);
                    resolve(response);

                    // this.loadingIndicator = false;
                });
        });
    }
}
