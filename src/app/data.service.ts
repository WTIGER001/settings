import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/flatMap';
import 'rxjs/add/operator/map';
import { UUID } from 'angular2-uuid';
import { ToastrService } from 'ngx-toastr';

// import { User, PreferenceDefinition, Config, PreferenceOwner, Profile, Setting } from './data';
import { User, Config } from './data';
import { OwnerType, Preference, PreferenceDefinition, PreferenceOwner, Profile, ProfileVersion, ProfileVersions, Category } from './api/models';
import { CommonDialogService } from './dialogs/common-dialog.service';
import { ConfigurationService, PreferencesService } from './api/services';

@Injectable()
export class DataService {

  // Current User
  user: ReplaySubject<User> = new ReplaySubject();

  // Current configuration
  config: ReplaySubject<Config> = new ReplaySubject();
  definitions: ReplaySubject<Array<PreferenceDefinition>> = new ReplaySubject();
  types: ReplaySubject<Array<OwnerType>> = new ReplaySubject();
  categories: ReplaySubject<Array<Category>> = new ReplaySubject();

  // Current Preference Owner
  currentOwner: ReplaySubject<PreferenceOwner> = new ReplaySubject();

  // Available Providers
  providers: ReplaySubject<Array<PreferenceDefinition>> = new ReplaySubject();

  // Profiles for the Current Owner
  profiles: ReplaySubject<Array<Profile>> = new ReplaySubject()

  // Selected Profile
  currentProfile: ReplaySubject<Profile> = new ReplaySubject()

  // Currently Selected Provider (for editing)
  selection: ReplaySubject<Category> = new ReplaySubject();

  // Not sure how to make this better.
  owner: PreferenceOwner
  cfg: Config
  defs: Array<PreferenceDefinition>
  tps: Array<OwnerType>
  cats: Array<Category>

  constructor(
    private http: Http,
    private dialog: CommonDialogService,
    private configSvc: ConfigurationService,
    private prefSvc: PreferencesService, 
    private toast: ToastrService) {

    console.log("Requesting Preference Definitions")
    this.configSvc.getDefinitions()
      .subscribe(d => {
        this.defs = d;
        this.definitions.next(d);
        this.processConfig()
      }, err => {
        console.log(err);
        this.dialog.errorMsg(err, "Error Requesting Preference Definitions")
      })

    console.log("Requesting Owner Types")
    this.configSvc.getOwnerTypes()
      .subscribe(t => {
        this.tps = t;
        this.types.next(t);
        this.processConfig()
      }, err => {
        this.dialog.errorMsg(err, "Error Requesting Owner Types")
      })

    console.log("Requesting Categories")
    this.configSvc.getCategories()
      .subscribe(cat => {
        this.cats = cat;
        this.categories.next(cat);
        this.processConfig()
      }, err => {
        this.dialog.errorMsg(err, "Error Requesting Categories")
      })

    console.log("Getting User");
    let u = new User()
    u.id = "me";
    this.user.next(u)

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
      .flatMap(owner => {
        console.log("OWNER SET to " + owner.id);
        this.owner = owner
        console.log("OWNER")
        console.log(this.owner)

        return this.prefSvc.getProfiles({ownerid:owner.id})
      })
      .subscribe(profiles => {
        console.log("PROFILES count:" + profiles.length)
        this.profiles.next(profiles)
      })

    // Auto select the active profile when the user changes the current owner
    this.profiles.subscribe(p => {
      console.log(p);

      let found = p.find(profile => profile.id == this.owner.active)
      if (found != undefined) {
        this.currentProfile.next(found);
      } else {
        //ERROR-TODO
      }
    })
  }

  public findMe(usr: User): Observable<PreferenceOwner> {
    return this.prefSvc.getOwner(usr.id)
  }

  // public static findOwner(usr: User, type: string): Array<PreferenceOwner> {
  //   if (usr == undefined || usr.owners == undefined) return [];
  //   return usr.owners.filter(owner => owner.type == type)
  // }

  public static findDefinition(name: string, config: Config): PreferenceDefinition {
    return config.definitions.find(me => me.name == name)
  }

  public save(profile: Profile) {
    let type = this.owner.type
    let id = this.owner.id

    let params = {
      id: id,
      body: profile
    }
    this.prefSvc.updateProfile(params).subscribe(success => {

    }, error => {
      this.dialog.errorMsg(error, "Error Updating Profile")
    })
  }

  public getCategories(profile: Profile): Array<PreferenceDefinition> {
    console.log("Profile Found " + profile.id);

    // Get a unique list of the providers
    let nameMap = new Map<string, string>()
    profile.preferences.forEach(setting => nameMap.set(setting.definitionId, setting.definitionId));

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

  public CreateProfile(owner: PreferenceOwner, name: string, copyFrom: Profile): Profile {
    // let dup = this.checkDuplicateNames(name,)
    // if (dup) {
    //   this.dialog.errorMsg("You cannot have the same name for 2 profiles", "Duplicate Names")
    //   return;
    // }

    let newProfile: Profile = {};
    if (copyFrom) {
      newProfile = JSON.parse(JSON.stringify(copyFrom));
    } else {
      newProfile.preferences = []
    }
    newProfile.id = UUID.UUID();
    newProfile.name = name;
    newProfile.owner = owner.id
    
    let type = owner.type;
    console.log("Type: " + type);
    
    let ownerType = this.cfg.ownerTypes.find(ot => {
      console.log("--->" + ot.id + " - " + ot.name)
      let result = ot.id == type
      console.log(ot.id + "  " + type + " " + result)
      return result
    })
    console.log("Owner Type (out of): " + ownerType +  " " + this.cfg.ownerTypes.length);
    console.log("Defintiions: "  +  this.cfg.definitions.length);
    console.log("Owner Defintiions: "  +  ownerType.definitions.length);

    let defs = this.cfg.definitions.filter(def => ownerType.definitions.includes(def.id));
    console.log("Defintiions Found : " + defs.length );
    // defs = this.cfg.definitions.filter(def => {
    //    ownerType.definitions.forEach(dName => {
    //      if (dName == def.)
    //    })
    // })

    defs.forEach(d => {
      let setting: Preference = {}
      setting.value = {}
      setting.definitionId = d.id

      // add the setting if needed
      let found = newProfile.preferences.find(s => s.definitionId == setting.definitionId)
      if (!found) {
        newProfile.preferences.push(setting)
      }
    })


    // Save the profile
    this.prefSvc.updateProfile({id: newProfile.id, body: newProfile})
    .flatMap(ok => this.prefSvc.getProfiles({ownerid:this.owner.id}))
    .subscribe(profiles => {
      this.profiles.next(profiles)
    })

    return newProfile;
  }

  public renameProfile(p: Profile, name: string) {
    if (p.id == name) {
      return;
    }

    // let dup = this.checkDuplicateNames(name, this.owner.profileIds, p)
    // if (dup) {
    //   this.dialog.errorMsg("You cannot have the same name for 2 profiles", "Duplicate Names")
    //   return;
    // }
    if (p.id == this.owner.active) {
      this.owner.active = name
    }
    p.id = name;
  }

  public checkDuplicateNames(name: string, profileIds: Array<String>, exclude: Profile = undefined): boolean {
    return (profileIds.findIndex(id => {
      if (exclude && id == exclude.id) {
        return false
      }
      return id == name
    }) >= 0)
  }

  public deleteProfile(idToDelete: string) {
    if (idToDelete == this.owner.active) {
      this.dialog.errorMsg("You cannot delete the active profile", "Error")
      return;
    }

    this.prefSvc.deleteProfile(idToDelete).subscribe(
      ok => { console.log("TOAST HERE"), this.refreshProfiles()}, 
      err => { this.dialog.errorMsg("oops", "Error Deleting Profile")}
    )
  }

  public processConfig() {
    if (this.defs == undefined || this.tps == undefined || this.categories == undefined) {
      return;
    }

    let defMap = new Map<string, PreferenceDefinition>()
    this.defs.forEach(d => defMap.set(d.id, d))

    this.cfg = {
      definitions: this.defs,
      ownerTypes: this.tps,
      categories: this.cats,
      defMap: defMap
    }
    this.config.next(this.cfg);
  }

  public getDefinitions(cat: Category): Array<PreferenceDefinition> {
    let defs = this.cfg.definitions.filter(d => d.category == cat.name);
    return defs.sort((a, b) => b.order - a.order)
  }

  public getCategoriesForPrefs(preferences: Array<Preference>): Array<Category> {
    // Create a bogus category
    let unknown: Category = {
      name: "Unknown",
      order: 99999999999
    }

    // Map all the categories that we need
    let catsNeeded = new Map<string, Category>()
    console.log("Pref count " + preferences.length);

    preferences.forEach(pref => {
      console.log(pref)
      let cat = unknown
      console.log("Pref id  " + pref.definitionId);
      if (pref.definitionId != undefined) {
        cat = this.cfg.defMap.get(pref.definitionId)
        console.log("Cat " + cat);
        if (cat == undefined) {
          cat = unknown
        }
      }
      catsNeeded.set(cat.name, cat);
    });

    // now put them all into a list
    let cats = new Array<Category>()
    catsNeeded.forEach(cat => {
      cats.push(cat)
    })

    // Sort
    cats = cats.sort((a, b) => b.order - a.order)

    return cats
  }

  public refreshProfiles() {
    this.prefSvc.getProfiles({ownerid:this.owner.id}).subscribe( profiles => this.profiles.next(profiles))
  }

  public saveOwner(owner: PreferenceOwner) {
    this.prefSvc.updateOwner({id:owner.id, body:owner}).subscribe(ok=>{
      this.toast.success('Saved', 'Owner was updated')
    }, err=> {
      this.toast.error('FAILED', 'FAILED')

      this.dialog.errorMsg("Could not save owner")})
  }
}
