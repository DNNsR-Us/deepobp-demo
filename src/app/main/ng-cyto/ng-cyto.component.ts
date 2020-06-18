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

// import * as cytoscape from "cytoscape";
declare var cytoscape: any;

import dagre from "cytoscape-dagre";

cytoscape.use(dagre);

@Component({
    selector: "ng2-cytoscape",
    template: '<div id="cy" class="cy"></div>',
    // templateUrl: "../cytoscape/cytoscape.component.html",
    styles: [
        `
            #cy {
                height: 90%;
                width: 90%;
                position: relative;
                left: 0;
                top: 0;
            }
        `,
    ],
})
export class NgCytoComponent implements OnChanges, AfterViewInit {
    @Input() public elements: any;
    @Input() public style: any;
    @Input() public layout: {};
    @Input() public zoom: any;

    @Output() select: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild("cy") element: ElementRef;

    public constructor(private renderer: Renderer2, private el: ElementRef) {
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
        let cy = cytoscape({
            container: document.getElementById("cy"), // container to render in

            elements: [
                // list of graph elements to start with
                {
                    // node a
                    data: { id: "a" },
                },
                {
                    // node b
                    data: { id: "b" },
                },
                {
                    // edge ab
                    data: { id: "ab", source: "a", target: "b" },
                },
            ],

            style: [
                // the stylesheet for the graph
                {
                    selector: "node",
                    style: {
                        "background-color": "#666",
                        label: "data(id)",
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
                name: "grid",
                rows: 1,
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

    public ngOnChanges(): any {
        this.render();
        console.log(this.el.nativeElement);
    }

    public render() {
        // let cy_container = this.renderer.selectRootElement("#cy");
        let cy_container = document.getElementById("cy");
        let localselect = this.select;
        let cy = cytoscape({
            container: cy_container,
            layout: this.layout,
            minZoom: this.zoom.min,
            maxZoom: this.zoom.max,
            style: this.style,
            elements: this.elements,
        });

        // cy.on("tap", "node", function (e) {
        //     var node = e.target;
        //     var neighborhood = node.neighborhood().add(node);

        //     cy.elements().addClass("faded");
        //     neighborhood.removeClass("faded");
        //     localselect.emit(node.data("name"));
        // });

        // cy.on("tap", function (e) {
        //     if (e.target === cy) {
        //         cy.elements().removeClass("faded");
        //     }
        // });
    }
}
