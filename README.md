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

*User Preferences*
/my - Retrieves the active profile for this user, as identified by the JWT

/{user}/{user-id} - Retrieves the user object
OR
/owner/{owner-id}

/profile?id={profile-id}&id={profile-id}&id={profile-id}&id={profile-id}
/profile?id={profile-id}&id=1,2,3,4

/profile/{id}/version            - get the version table for this id
/profile/{id}/versions/1 - get the version identified for this id

Call Stack
 
on init
- get Owners
- get Definitions
(maybe a get config)
- get Owner
- get Profiles
- get Profile Versions

actions: 
- rename -> put profile (new version?)
- delete -> delete profile
- set active -> put owner
- change pref -> put profile (new version)
- new Profile -> put profile, put owner?

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


-----

Owner
{
    id : "sdfasfdasdfasfw-werwer",
    type:"user", 
    active:"default", 
    profiles:[
        {
            profile-id : "default",
            latest : {
                profile-id ="default", 
            }
            versions : [{
                version: 4, 
                date: 12/23/2016T12:34:56
            }, {
                version: 3, 
                date: 12/23/2016T12:34:56
            }, {
                version: 2, 
                date: 12/23/2016T12:34:56
            }, {
                version: 1, 
                date: 12/23/2016T12:34:56
            }]
        }, 
        {
            profile-id : "nicki",
            versions : [{
                version: 4, 
                date: 12/23/2016T12:34:56
            }, {
                version: 3, 
                date: 12/23/2016T12:34:56
            }, {
                version: 2, 
                date: 12/23/2016T12:34:56
            }, {
                version: 1, 
                date: 12/23/2016T12:34:56
            }]
        }
    ]
}

Profile 
{
    id : "wqerqwrqw"



}