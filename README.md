# TO TEST
    in first window: json-server ./samples/db.json
    next window: npm start
    go to http://localhost:4200

# Settings

Provides a simple ui for providing user settings. Core concepts: 
- Setting - A JSON Document
- Schema - A JSON Schema for a settings document
- Owner - A thing that owns settings
- Supplier - A thing that supplies Settings
- Profile - An instance of a Settings document

In general a `Suppler` provides a set of `Schemas`





This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## API
/config
    - get
/${type}/${id}
/${type}/${id}/${profile.name}

/user/jbauer/default

## TODO

### UI
- Replace Models with Swagger Versions?
- Progress indicators on loads
- Schema validation with ajv
- JWT integration (https://github.com/auth0/angular2-jwt)
- Widgets
-- JSON
- Versioning of profiles
-- Version tree
-- Compare versions
-- Switch versions
- Management Features
-- Add new Application and schemas
-- Validate that a JSON Schema is valid
-- Assume the role of another user  (maybe?)
- Tests (yuck!)

### Service
- Build a go service impl
- Determine storage approach
- Determine eventing approach
- Config REST
-- get
-- post
- Types Rest
-- Get
-- Post
- Schema validation with ajv
- Swagger definitions
- Tests (yuck!)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
