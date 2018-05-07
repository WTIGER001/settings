import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChangedSetting } from '../data';
import { Preference, PreferenceDefinition } from '../api/models';

@Component({
  selector: 'app-setting-editor',
  templateUrl: './setting-editor.component.html',
  styleUrls: ['./setting-editor.component.css']
})
export class SettingEditorComponent implements OnInit {

  data = {}
  schema = {}
  layout = {}

  @Input() setting: Preference
  @Input() spec: PreferenceDefinition
  @Input() mode: string
  @Output() changes = new EventEmitter<any>();

  changedSetting = new ChangedSetting()

  options = {
    addSubmit: false
  }

  constructor() { }

  ngOnInit() {
    this.data = this.setting.value
    // console.log(this.spec);
    // console.log("schema : " + this.spec.schema)
    let st: string = JSON.stringify(this.spec.schema)
    console.log(this.sch);

    this.schema = this.sch

    // this.schema = this.spec.schema
    // this.layout = this.spec.layout
  }

  get code() {
    // return JSON.stringify(this.setting.data, null, 2);
    return JSON.stringify(this.data, null, 2)
  }

  set code(v) {
    try {
      this.data = JSON.parse(v);
    }
    catch (e) {
      console.log('error occored while you were typing the JSON');
    };
  }

  localChanges(event) {
    this.data = event
    this.changedSetting.data = event
    this.changedSetting.setting = this.setting
    this.changedSetting.spec = this.spec
    this.changes.emit(this.changedSetting);
  }

  save(event, setting) {
    console.log("SAVING DATA")
    console.log(event)
    setting.data = event
  }

  sch = {
    "$schema": "http://json-schema.org/draft-06/schema#",
    "type": "object",
    "properties": {
      "first_name": {
        "type": "string"
      },
      "last_name": {
        "type": "string"
      },
      "address": {
        "type": "object",
        "properties": {
          "street_1": {
            "type": "string"
          },
          "street_2": {
            "type": "string"
          },
          "city": {
            "type": "string"
          },
          "state": {
            "type": "string",
            "enum": [
              "AL",
              "WY"
            ]
          },
          "zip_code": {
            "type": "string"
          }
        }
      },
      "birthday": {
        "type": "string"
      },
      "notes": {
        "type": "string"
      },
      "phone_numbers": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "cell",
                "home",
                "work"
              ]
            },
            "number": {
              "type": "string"
            }
          },
          "required": [
            "type",
            "number"
          ]
        }
      }
    },
    "required": [
      "last_name"
    ]
  }
}
