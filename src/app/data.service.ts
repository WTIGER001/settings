import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';


import { User, PreferenceDefinition, Config, PreferenceOwner, Profile } from './data';

@Injectable()
export class DataService {

  // Current User
  user: ReplaySubject<User> = new ReplaySubject();

  // Current configuration
  config: ReplaySubject<Config> = new ReplaySubject();

  // Current Preference Owner
  currentOwner: ReplaySubject<PreferenceOwner> = new ReplaySubject();

  // Available Providers
  providers: ReplaySubject<Array<PreferenceDefinition>> = new ReplaySubject();

  // Profiles for the Current Owner
  profiles: ReplaySubject<Array<Profile>> = new ReplaySubject()

  // Selected Profile
  currentProfile: ReplaySubject<Profile> = new ReplaySubject()

  // Currently Selected Provider (for editing)
  selection: ReplaySubject<PreferenceDefinition> = new ReplaySubject();

  // Not sure how to make this better.
  private owner: PreferenceOwner
  private cfg: Config

  constructor(private http: Http) {


    console.log("Getting Config");
    http.get('http://localhost:3000/config')
      .subscribe(res => {
        this.cfg = res.json()
        this.config.next(this.cfg);
      });

    console.log("Getting User");
    http.get('http://localhost:3000/users/jbauer')
      .subscribe(res => {
        let usr = new User();
        usr.id = "jbauer"
        usr.owners = []
        usr.owners.push(res.json())
        this.user.next(usr)
      });

    this.user.subscribe(usr => {
      console.log("USER RECEIVED " + usr.id);
      console.log(usr);
    });
    this.config.subscribe(cfg => {
      console.log("config RECEIVED")
      console.log(cfg);
    });

    // Keep the 'profiles' field up to date
    this.currentOwner
      .subscribe(own => {
        console.log("OWNER SET to " + own.id);
        this.owner = own
        this.profiles.next(own.profiles)
      })

    // Auto select the active profile when the user changes the current owner
    this.profiles.subscribe(p => {
      console.log(p);

      let found = p.find(profile => profile.name == this.owner.activeProfile)
      if (found != undefined) {
        this.currentProfile.next(found);
      } else {
        //ERROR-TODO
      }
    })
  }

  public static findMe(usr: User): PreferenceOwner {
    let found = this.findOwner(usr, "users");
    return found.length == 1 ? found[0] : undefined;
  }

  public static findOwner(usr: User, type: string): Array<PreferenceOwner> {
    if (usr == undefined || usr.owners == undefined) return [];
    return usr.owners.filter(owner => owner.type == type)
  }

  // public getProfiles(owner: PreferenceOwner): Observable<Array<Profile>> {
  //   let type = owner.type
  //   let id = owner.id
  //   let url = `http://localhost:3000/${type}/${id}`
  //   console.log(url);

  //   return this.http.get(url).map(res => res.json());
  // }

  public static findDefinition(name: string, config: Config): PreferenceDefinition {
    return config.definitions.find(me => me.name == name)
  }

  public save(profile: Profile) {
    let type = this.owner.type
    let id = this.owner.id
    // let url = `http://localhost:3000/${type}/${id}/${profile.name}`
    // this.http.post(url, profile)
    //   .subscribe(res => {
    //     console.log("Success" + res.status)
    //   },
    //     error => {
    //       console.log("Error" + error)
    //     })
  }

  public getCategories(profile: Profile): Array<PreferenceDefinition> {
    console.log("Profile Found " + profile.name);

    // Get a unique list of the providers
    let nameMap = new Map<string, string>()
    profile.settings.forEach(setting => nameMap.set(setting.provider_ref, setting.provider_ref));

    // Get the Preference PreferenceDefinition
    let defs = new Array<PreferenceDefinition>()
    nameMap.forEach(name => {
      let a = DataService.findDefinition(name, this.cfg);
      if (a !== undefined) {
        defs.push(a)
      } else {
        // errors
      }
    })

    // Sort the list
    let definitions = defs.sort((a: PreferenceDefinition, b: PreferenceDefinition) => {
      return b.order - a.order;
    })

    return definitions
  }

  public CreateProfile(ownder: PreferenceOwner, name: string, copyFrom: Profile): Profile {
    let newProfile = new Profile();
    if (copyFrom) {
      newProfile = JSON.parse(JSON.stringify(copyFrom));
    } else {
      newProfile.settings = []
    }
    newProfile.name = name;

    this.owner.profiles.push(newProfile);
    return newProfile;
  }
}
