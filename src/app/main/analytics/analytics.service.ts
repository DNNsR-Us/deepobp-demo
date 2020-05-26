import { Injectable, Optional, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { SharedService } from "../shared.service";

@Injectable()
export class AnalyticsDashboardService {
    public widgets = {
        widget2: {
            coi: {
                value: "",
                type: "dictionary",
            },
            chartType: "bar",
            datasets: [
                {
                    label: "Count",
                    data: [],
                },
            ],
            labels: [],
            colors: [
                {
                    borderColor: "#42a5f5",
                    backgroundColor: "#42a5f5",
                },
            ],
            options: {
                spanGaps: false,
                legend: {
                    display: false,
                },
                maintainAspectRatio: false,
                layout: {
                    padding: {
                        top: 24,
                        left: 16,
                        right: 16,
                        bottom: 16,
                    },
                },
                scales: {
                    xAxes: [
                        {
                            display: true,
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                min: 0,
                                max: 200,
                            },
                        },
                    ],
                },
            },
        },
    };
    apiBaseUrl: string = environment.apiBaseUrl;
    frequencyData: any;
    // inputData: {
    //     coi: string;
    //     useDictionary: boolean;
    // };

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _sharedService: SharedService,
        @Inject("coi") @Optional() public coi?: string,
        @Inject("useFad") @Optional() public useFad?: boolean
    ) {
        if (coi) {
            this.coi = coi;
        } else {
            this._sharedService.sharedCoi.subscribe((coi) => (this.coi = coi));
        }
        this.useFad = useFad || true;
        this.widgets.widget2.coi.value = coi;
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
            Promise.all([this.getWidgets(this.coi, this.useFad)]).then(() => {
                resolve();
            }, reject);
        });
    }

    /**
     * Get widgets - Async function
     *
     * @returns {Promise<any>}
     */
    getWidgets(coi, fad): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient
                .get(
                    `${this.apiBaseUrl}/term-frequency?coi=${coi}&use-fad=${fad}`
                )
                .subscribe((response: any) => {
                    this.frequencyData = response;
                    this.widgets[
                        "widget2"
                    ].datasets[0].data = this.frequencyData.data;
                    this.widgets["widget2"].labels = this.frequencyData.labels;
                    resolve(this.widgets);

                    // this.loadingIndicator = false;
                });
        });
    }
}
