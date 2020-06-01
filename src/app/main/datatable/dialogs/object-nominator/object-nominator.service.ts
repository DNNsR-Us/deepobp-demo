import { Injectable, Optional, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { IbObject } from "../../../../models/ibobject";

@Injectable({
    providedIn: "root",
})
export class ObjectNominatorService {
    intelbookBaseUrl: string = environment.intelbookBaseUrl;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        @Inject("body") @Optional() public body?: IbObject
    ) {
        if (body) {
            this.body = body;
        }
    }

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
            Promise.all([this.postObject(this.body)]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Create an object in Intelbook - Async function
     *
     * @returns {Promise<any>}
     */
    postObject(body): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders()
                .set("cache-control", "no-cache")
                .set("content-type", "application/json");

            this._httpClient
                .post(`${this.intelbookBaseUrl}/uom_v2.1/objects`, body, {
                    headers,
                })
                .subscribe((response: any) => {
                    // console.log(response);
                    resolve(response);

                    // this.loadingIndicator = false;
                });
        });
    }

    /**
     * Create an object in Intelbook - Async function
     *
     * @returns {Promise<any>}
     */
    postReport(objectId, body): Promise<any> {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders()
                .set("cache-control", "no-cache")
                .set("content-type", "application/json");

            this._httpClient
                .post(`${this.intelbookBaseUrl}/uom_v2.1/objects/${objectId}/reports`, body, {
                    headers,
                })
                .subscribe((response: any) => {
                    console.log(response);
                    resolve(response);

                    // this.loadingIndicator = false;
                });
        });
    }

    /**
     * Get objects in Intelbook - Async function
     *
     * @returns {Promise<any>}
     */
    getObjects(): Promise<any> {
        const headers = new HttpHeaders()
            .set("cache-control", "no-cache")
            .set("content-type", "application/json");

        return new Promise((resolve, reject) => {
            this._httpClient
                .get(
                    `${this.intelbookBaseUrl}/uom_v2.1/objects?includeHierarchy=false&inherited=true`
                )
                .subscribe((response: any) => {
                    console.log(response);
                    resolve(response);

                    // this.loadingIndicator = false;
                });
        });
    }
}
