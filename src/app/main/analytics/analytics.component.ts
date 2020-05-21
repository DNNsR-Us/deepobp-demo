import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { fuseAnimations } from "@fuse/animations";

import { AnalyticsDashboardService } from "app/main/analytics/analytics.service";
import { SharedService } from "../shared.service";

interface Coi {
    value: string;
    viewValue: string;
}

@Component({
    selector: "analytics-dashboard",
    templateUrl: "./analytics.component.html",
    styleUrls: ["./analytics.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AnalyticsDashboardComponent implements OnInit {
    widgets: any;
    widgetData: any;
    widgetMap = {
        nflDict: 2,
        nflNoDict: 3,
        covidDict: 4,
        covidNoDict: 5,
    };
    cois: Coi[] = [
        { value: "covid", viewValue: "COVID" },
        // { value: "tech", viewValue: "Tech" },
        { value: "nfl", viewValue: "NFL" },
        // { value: "top_headlines", viewValue: "Headlines" },
    ];

    useDictionary: boolean;

    selectedCoi: string;
    selectedNumTerms: number;
    selectedTimeRange: string;
    numObjectsNominated: number;
    numObjectsRejected: number;

    /**
     * Constructor
     *
     * @param {AnalyticsDashboardService} _analyticsDashboardService
     * @param {SharedService} _sharedService
     *
     */
    constructor(
        private _analyticsDashboardService: AnalyticsDashboardService,
        private _sharedService: SharedService
    ) {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Hard code some data initially
        this.numObjectsNominated = 30;
        this.numObjectsRejected = 20;

        // Initialize defaults
        this.selectedNumTerms = 10;
        this.selectedTimeRange = "day";
        this.useDictionary = true;

        this._sharedService.sharedCoi.subscribe(
            (coi) => (this.selectedCoi = coi)
        );
        // Get the widgets from the service
        this.widgets = this._analyticsDashboardService.widgets;

        this.setWidgetData();
    }

    async onCoiSelection(event) {
        try {
            this.selectedCoi = event.value;
            this._sharedService.nextCoi(this.selectedCoi);
            if (this.selectedCoi.toLowerCase() == "covid") {
                this.numObjectsNominated = 15;
                this.numObjectsRejected = 35;
            } else if (this.selectedCoi.toLowerCase() == "nfl") {
                this.numObjectsNominated = 30;
                this.numObjectsRejected = 20;
            }

            this.widgets = await this._analyticsDashboardService.getWidgets(
                this.selectedCoi,
                this.useDictionary
            );

            this.setWidgetData();
        } catch (error) {
            console.log(error);
        }
    }

    async onDictionarySelection(event) {
        try {
            this.useDictionary = event.value;
            this.widgets = await this._analyticsDashboardService.getWidgets(
                this.selectedCoi,
                this.useDictionary
            );

            this.setWidgetData();
        } catch (error) {
            console.log(error);
        }
    }

    onNumTermsSelection(event) {
        this.selectedNumTerms = event.value;
        this.setWidgetData();
    }

    onNumDaysSelection(event) {
        this.selectedTimeRange = event.value;
        console.log("time range is " + this.selectedTimeRange);
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private setWidgetData() {
        this.widgetData = {
            ...this.widgets["widget2"],
            labels: { ...this.widgets["widget2"].labels },
        };
        this.widgetData.labels = this.widgets["widget2"].labels.slice(
            0,
            this.selectedNumTerms
        );
    }
    /**
     * Register a custom plugin
     */
    private _registerCustomChartJSPlugin(): void {
        (window as any).Chart.plugins.register({
            afterDatasetsDraw: function (chart, easing): any {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop &&
                        chart.options.plugins.xLabelsOnTop.active === false)
                ) {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function (dataset, i): any {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index): any {
                            // Draw the text in black, with the specified font
                            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                            const fontSize = 13;
                            const fontStyle = "normal";
                            const fontFamily = "Roboto, Helvetica Neue, Arial";
                            ctx.font = (window as any).Chart.helpers.fontString(
                                fontSize,
                                fontStyle,
                                fontFamily
                            );

                            // Just naively convert to string for now
                            const dataString =
                                dataset.data[index].toString() + "k";

                            // Make sure alignment settings are correct
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = "rgba(255,255,255,0.12)";
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            },
        });
    }
}
