import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

@Injectable({
    providedIn: "root",
})
export class CytoscapeService {
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
            Promise.all([this.getGraphData(this.threshold)]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get deconfliction result
     *
     * @returns {Promise<any>}
     */
    getGraphData(thresh): Promise<any> {
        const headers = new HttpHeaders()
            .set("cache-control", "no-cache")
            .set("content-type", "application/json");

        return new Promise((resolve, reject) => {
            this._httpClient
                .get(`${this.apiBaseUrl}/graph/${thresh}`)
                .subscribe((response: any) => {
                    // let mappedData = this.mapResponse(response);
                    // console.log(response);
                    resolve(response.data);

                    // this.loadingIndicator = false;
                });
        });
    }

    mapResponse(response) {
        let graphData = {
            elements: {
                nodes: [1],
                edges: [2],
                layout: {
                    name: "grid",
                    rows: 1,
                },

                // so we can see the ids
                style: [
                    {
                        selector: "node",
                        style: {
                            label: "data(id)",
                        },
                    },
                ],
            },
        };
        let nodesAndEdges = {
            nodes: {},
            edges: {},
        };

        nodesAndEdges = response.data.forEach((obj) => {
            let nodeData = [
                {
                    data: {
                        id: obj.Title,
                    },
                },
                {
                    data: {
                        id: obj.Doubled,
                    },
                },
            ];
            let edgeData = [
                {
                    data: {
                        id: obj.Title + "-" + obj.Doubled,
                        source: obj.Title,
                        target: obj.Doubled,
                        weight: 1 - obj.Similarity,
                    },
                },
            ];

            return { nodes: nodeData, edges: edgeData };
        });
        // console.log(nodesAndEdges);
        // graphData.elements.nodes = nodesAndEdges.nodes;
        // graphData.elements.edges = nodesAndEdges.edges;
        return graphData;
    }
}
