// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    // Local env
//    apiBaseUrl: "http://127.0.0.1:5001",
    intelbookBaseUrl: "https://kubemaster-trunk-1.udev.six3/services",

      // On lambda-quad-2
//    apiBaseUrl: "http://127.0.0.1:5001",
    apiBaseUrl: "http://172.19.32.249:5001",
//    intelbookBaseUrl: "https://kubemaster-trunk-1.udev.six3:32217/uom-core",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
