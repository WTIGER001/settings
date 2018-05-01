export class Data {
    user: User;
    providers: Array<Provider>;
}

export class Provider {
    name: string;
    schemas: Array<Schema>;
}

export class Schema {
    name: string;
    schema: any;
    layout: any;
}

export class User {
    id: string;
    profiles: Array<Profile>;
}

export class Profile {
    name: string;
    settings: Array<Setting>;
}

export class Setting {
    data: any;
}