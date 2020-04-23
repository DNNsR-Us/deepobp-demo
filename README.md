# DeepOBP with Fuse Angular and Docker
Dependencies: 
   * for local development Docker Desktop must be installed and running
   * To see data, the back end must be running (see https://github.com/DNNsR-Us/deepobp-demo-backend/tree/feature/obp-35)
   * Edit src/environments/environment.ts and set the apiBaseUrl to match your back end url

In a terminal cd to the root directory of the repo.
Windows only - may need to run `set COMPOSE_CONVERT_WINDOWS_PATHS=1`
Run `docker-compose up -d --build`
Allow a few minutes the first time for build to complete.
Run `docker logs deepobp` to check the logs in the container.

You should see something like:
Time: 4497ms
: Compiled successfully.

Navigate to `http://localhost:4201/datatable`

########################################################################################
The instructions below are for running the application outside of the container and for
ongoing development as well as generating a production build.

# Fuse - Angular

Material Design Admin Template with Angular 8 and Angular Material

## The Community

Share your ideas, discuss Fuse and help each other.

[Click here](http://fusetheme.com/community) to see our Community page.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
