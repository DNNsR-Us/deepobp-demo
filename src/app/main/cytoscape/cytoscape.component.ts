import {
    Component,
    OnChanges,
    Renderer2,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    AfterViewInit,
} from "@angular/core";
import { CytoscapeService } from "./cytoscape.service";
// import * as cytoscape from 'cytoscape';

declare var cytoscape: any;

import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

@Component({
    selector: "app-cytoscape",
    // selector: "ng2-cytoscape",
    templateUrl: "./cytoscape.component.html",
    styleUrls: ["./cytoscape.component.scss"],
})
export class CytoscapeComponent implements AfterViewInit {
    @Input() public elements: any;
    @Input() public style: any;
    @Input() public layout: {};
    @Input() public zoom: any;

    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild("cy") element: ElementRef;
    node_name: string;

    threshold: number = 20;

    // layout = {
    //     name: "dagre",
    //     rankDir: "LR",
    //     directed: true,
    //     padding: 0,
    // };

    graphData = {};

    /**
     * @param {CytoscapeService} _cytoscapeService
     */
    // constructor(private _cytoscapeService: CytoscapeService) {}
    public constructor(
        private _cytoscapeService: CytoscapeService,
        private renderer: Renderer2,
        private el: ElementRef
    ) {
        this.layout = this.layout || {
            name: "grid",
            directed: true,
            padding: 0,
        };

        this.zoom = this.zoom || {
            min: 0.1,
            max: 1.5,
        };
    }

    ngAfterViewInit() {
        // this.getGraphData();
        let cy = cytoscape({
            container: document.getElementById("cy"), // container to render in

            elements: this.getGraphData(),

            style: [
                // the stylesheet for the graph
                {
                    selector: "node",
                    style: {
                        "background-color": "#666",
                        label: "data(label)",
                        "text-outline-color": "blue",
                    },
                },

                {
                    selector: "edge",
                    style: {
                        width: 3,
                        "line-color": "#ccc",
                        "target-arrow-color": "#ccc",
                        "target-arrow-shape": "triangle",
                        "curve-style": "bezier",
                    },
                },
            ],

            layout: {
                // name: "row"
                name: "grid",
                // rows: 1,
            },
        });
        this.style =
            this.style ||
            cy
                .style()

                .selector("node")
                .css({
                    shape: "data(shapeType)",
                    width: "mapData(weight, 40, 80, 20, 60)",
                    content: "data(name)",
                    "text-valign": "center",
                    "text-outline-width": 1,
                    "text-outline-color": "data(colorCode)",
                    "background-color": "data(colorCode)",
                    color: "#fff",
                    "font-size": 10,
                })
                .selector(":selected")
                .css({
                    "border-width": 1,
                    "border-color": "black",
                })
                .selector("edge")
                .css({
                    "curve-style": "bezier",
                    opacity: 0.666,
                    width: "mapData(strength, 70, 100, 2, 6)",
                    "target-arrow-shape": "triangle",
                    "line-color": "data(colorCode)",
                    "source-arrow-color": "data(colorCode)",
                    "target-arrow-color": "data(colorCode)",
                })
                .selector("edge.questionable")
                .css({
                    "line-style": "dotted",
                    "target-arrow-shape": "diamond",
                })
                .selector(".faded")
                .css({
                    opacity: 0.25,
                    "text-opacity": 0,
                });
    }

    async getGraphData() {
        try {
            const res = await this._cytoscapeService.getGraphData(
                this.threshold
            );

            if (!this.isEmpty(res.elements)) {
                return res.elements;
            } else {
                return this.getDefaultGraphData();
            }
        } catch (error) {
            console.log(error);
        }
    }
    nodeChange(event) {
        this.node_name = event;
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    getDefaultGraphData() {
        return {
            nodes: [
                {
                    data: {
                        id: "a",
                        name: "Signup",
                        weight: 100,
                        colorCode: "blue",
                        shapeType: "roundrectangle",
                    },
                },
                {
                    data: {
                        id: "b",
                        name: "User Profile",
                        weight: 100,
                        colorCode: "magenta",
                        shapeType: "roundrectangle",
                    },
                },
                {
                    data: {
                        id: "c",
                        name: "Billing",
                        weight: 100,
                        colorCode: "magenta",
                        shapeType: "roundrectangle",
                    },
                },
                {
                    data: {
                        id: "d",
                        name: "Sales",
                        weight: 100,
                        colorCode: "orange",
                        shapeType: "roundrectangle",
                    },
                },
                {
                    data: {
                        id: "e",
                        name: "Referral",
                        weight: 100,
                        colorCode: "orange",
                        shapeType: "roundrectangle",
                    },
                },
                {
                    data: {
                        id: "f",
                        name: "Loan",
                        weight: 100,
                        colorCode: "orange",
                        shapeType: "roundrectangle",
                    },
                },
                {
                    data: {
                        id: "j",
                        name: "Support",
                        weight: 100,
                        colorCode: "red",
                        shapeType: "ellipse",
                    },
                },
                {
                    data: {
                        id: "k",
                        name: "Sink Event",
                        weight: 100,
                        colorCode: "green",
                        shapeType: "ellipse",
                    },
                },
            ],
            edges: [
                {
                    data: {
                        source: "a",
                        target: "b",
                        colorCode: "blue",
                        strength: 10,
                    },
                },
                {
                    data: {
                        source: "b",
                        target: "c",
                        colorCode: "blue",
                        strength: 10,
                    },
                },
                {
                    data: {
                        source: "c",
                        target: "d",
                        colorCode: "blue",
                        strength: 10,
                    },
                },
                {
                    data: {
                        source: "c",
                        target: "e",
                        colorCode: "blue",
                        strength: 10,
                    },
                },
                {
                    data: {
                        source: "c",
                        target: "f",
                        colorCode: "blue",
                        strength: 10,
                    },
                },
                {
                    data: {
                        source: "e",
                        target: "j",
                        colorCode: "red",
                        strength: 10,
                    },
                },
                {
                    data: {
                        source: "e",
                        target: "k",
                        colorCode: "green",
                        strength: 10,
                    },
                },
            ],
        };
    }
}
