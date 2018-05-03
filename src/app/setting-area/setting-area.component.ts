import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { PreferenceDefinition, Profile, Specification, Setting, ChangedSetting } from '../data';
import { JsonSchemaFormService } from 'angular2-json-schema-form';

@Component({
  selector: 'app-setting-area',
  templateUrl: './setting-area.component.html',
  styleUrls: ['./setting-area.component.css']
})
export class SettingAreaComponent implements OnInit {
  definition: PreferenceDefinition
  profile: Profile;
  items: Array<HoldMe> = []
  public mode = 'form'
  changedData = new Map<Setting, ChangedSetting>()

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.currentProfile.subscribe(p => {
      console.log("Setting Profile " + p.name)
      this.profile = p
      this.sortAndPrep()
    });

    this._data.selection.subscribe(sel => {
      console.log("Selection Made " + sel.name);
      this.definition = sel;
      this.sortAndPrep()
    });
  }

  private sortAndPrep() {

    if (this.definition == undefined || this.profile == undefined) return

    // Get a sorted list
    let a = new Array<HoldMe>()

    console.log("Schemas");
    console.log(this.definition.schemas);

    this.definition.schemas.forEach(schema => {
      let setting = this.profile.settings.find(s => s.schema_ref == schema.name && s.provider_ref == this.definition.name)

      let h = new HoldMe()
      h.setting = setting
      h.spec = schema

      a.push(h)
    })
    a = a.sort((a, b) => b.spec.order - a.spec.order);

    a.forEach(item => {
      console.log(item)
    })
    this.items = a
  }

  changes(changed: ChangedSetting) {
    console.log(changed.data);
    this.changedData.set(changed.setting, changed)
  }
  save() {
    console.log("Saved");
    this.changedData.forEach(v => {
      v.setting.data = v.data
    })

    this._data.save(this.profile);
  }
}



class HoldMe {
  setting: Setting;
  spec: Specification;
}
