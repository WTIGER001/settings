import { Component, OnInit } from '@angular/core';
import { Profile, Config, PreferenceDefinition } from '../data';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { forEach } from 'angular2-json-schema-form';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  profile: Observable<Profile>
  definitions: Array<PreferenceDefinition> = []
  selected: any;
  config: Config;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this.profile = this._data.currentProfile;

    this._data.config.subscribe(c => this.config = c)

    this.profile.subscribe(profile => {
      console.log("Profile Found " + profile.name);

      // Get a unique list of the providers
      let nameMap = new Map<string, string>()
      profile.settings.forEach(setting => nameMap.set(setting.provider_ref, setting.provider_ref));

      // Get the Preference PreferenceDefinition
      let defs = new Array<PreferenceDefinition>()
      nameMap.forEach(name => {
        let a = DataService.findDefinition(name, this.config);
        if (a !== undefined) {
          defs.push(a)
        } else {
          // errors
        }
      })

      // Sort the list
      this.definitions = defs.sort((a: PreferenceDefinition, b: PreferenceDefinition) => {
        return b.order - a.order;
      })

      // Auto select the first definition
      if (this.selected == undefined && this.definitions.length > 0) {
        this.select(this.definitions[0])
      }
    })
  }

  public select(item) {
    this.selected = item;
    this._data.selection.next(this.selected);
  }


}
