import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ChangedSetting } from '../data';
import { JsonSchemaFormService } from 'angular2-json-schema-form';
import { PreferenceDefinition, Profile, Preference, Category } from '../api/models';

@Component({
  selector: 'app-setting-area',
  templateUrl: './setting-area.component.html',
  styleUrls: ['./setting-area.component.css']
})
export class SettingAreaComponent implements OnInit {
  category: Category
  profile: Profile;
  items: Array<HoldMe> = []
  public mode = 'form'
  changedData = new Map<Preference, ChangedSetting>()

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentProfile.subscribe(p => {
      console.log("Setting Profile " + p.id)
      this.profile = p
      this.sortAndPrep()
    });

    this._data.selection.subscribe(sel => {
      console.log("Selection Made " + sel.name);
      this.category = sel;
      this.sortAndPrep()
    });
  }

  private sortAndPrep() {
    if (this.category == undefined || this.profile == undefined) return

    // Get a sorted list
    let a = new Array<HoldMe>()

    console.log("Schemas");

    let defs = this._data.getDefinitions(this.category)

    defs.forEach(d => {
      let preference = this.profile.preferences.find(s => s.definitionId == d.id)

      let h = new HoldMe()
      h.setting = preference
      h.spec = d

      a.push(h)
    })
    // a = a.sort((a, b) => b.spec.order - a.spec.order);

    a.forEach(item => {
      console.log(item)
    })
    this.items = a
  }

  changes(changed: ChangedSetting) {
    this.changedData.set(changed.setting, changed)
  }
  save() {
    console.log("Saved");
    this.changedData.forEach(v => {
      v.setting.value = v.data
    })

    this._data.save(this.profile);
  }
}

class HoldMe {
  setting: Preference;
  spec: PreferenceDefinition;
}
