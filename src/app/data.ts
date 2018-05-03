/**
 * A Preference Owner is the class that owns a set or profiles. The current types 
 * for a profile are: user, team or application. Users and Teams share the same schemas
 * but each application has different schemas
 */
export class PreferenceOwner {
    id: string
    name: string
    description: string
    type: string
    activeProfile: string;
    profiles: Array<Profile>;
}

/**
 * Represents the currently logged in user. 
 */
export class User {
    id: string;
    owners: Array<PreferenceOwner>;
}

export class Config {
    // All the types of preference owners available. This is expected to be
    // user, team(s), application(s)
    ownerTypes: Array<PreferenceOwnerType>;

    // All avaialable preference definitions
    definitions: Array<PreferenceDefinition>;
}

export class PreferenceOwnerType {
    type: string;
    category: string;
    description: string;
    definitions: Array<string>
}

export class PreferenceDefinition {
    name: string;
    order: number;
    schemas: Array<Specification>;
}

export class Specification {
    name: string;
    description: string;
    order: number;
    schema: any;
    layout: any;
}

export class Profile {
    name: string;
    settings: Array<Setting>;
}

export class Setting {
    provider_ref: string;
    schema_ref: string;
    data: any;
}

export class ExportPackage {
    ownerName: string
    ownerType: string
    profileName: string;
    settings: Array<Setting>;
}

export class ChangedSetting {
    spec: Specification;
    data: any;
    setting: Setting
}