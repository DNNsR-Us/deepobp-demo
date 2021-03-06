import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "navigation",
        title: "Navigation",
        // translate: 'NAV.APPLICATIONS',
        type: "group",
        children: [
            {
                id: "dashboard",
                title: "Dashboard",
                // translate: 'NAV.SAMPLE.TITLE',
                type: "item",
                icon: "dashboard", // or bar_chart
                url: "/",
                // badge    : {
                //     title    : '25',
                //     translate: 'NAV.SAMPLE.BADGE',
                //     bg       : '#F44336',
                //     fg       : '#FFFFFF'
                // }
            },
            {
                id: "dictionary",
                title: "FA Dictionary",
                type: "item",
                icon: "library_books",
                url: "/fad",
            },
            {
                id: "datatable",
                title: "Object Nominator",
                // translate: 'NAV.DEMO.TITLE',
                type: "item",
                icon: "list", // or collections
                url: "/datatable",
            },
            {
                id: "readbook",
                title: "Create Readbook",
                // translate: 'NAV.DEMO.TITLE',
                type: "item",
                icon: "book",
                url: "/readbook",
            },
            // {
            //     id: "graph",
            //     title: "Graph",
            //     // translate: 'NAV.DEMO.TITLE',
            //     type: "item",
            //     icon: "book",
            //     url: "/graph",
            // },
            {
                id: "deconflict",
                title: "Deconfliction Example",
                // translate: 'NAV.DEMO.TITLE',
                type: "item",
                icon: "book",
                url: "/deconflict",
            },
            {
                id: "cytoscape",
                title: "Deconfliction Graph",
                // translate: 'NAV.DEMO.TITLE',
                type: "item",
                icon: "book",
                url: "/cytoscape",
            },
        ],
    },
];
