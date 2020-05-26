export class IbObject {
    coi: {} = {
        id: 41874,
        name: "",
    };
    name: string;
    classification: string = "U";
    typeId: string = "196_38669"; // default - 'Organization' object type
    countries: [{}] = [
        {
            country: {
                id: 227,
                name: "United States",
                capital: "Washington DC",
                region: "North America",
            },
            classification: "U",
            disseminationOrgs: [],
        },
    ];
}
