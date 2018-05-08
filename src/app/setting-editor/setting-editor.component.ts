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
  layout = []

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
    // // convert the schema to a real object
    // let st: string = JSON.stringify(this.spec.schema)
    // let mySch = JSON.parse(st);

    // console.log("Schema 1");
    // this.schema = mySch
    // // console.log(this.schema);

    // console.log("Schema 2");
    // this.schema = this.sch
    // // console.log(this.schema);

    // this.layout = this.spec.layout

    this.schema = JSON.parse(<string>this.spec.schema)

    this.layout = JSON.parse(<string>this.spec.layout)

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
    // console.log("SAVING DATA")
    // console.log(event)
    setting.data = event
  }

  exampleJsonObject = {
    "first_name": "Jane", "last_name": "Doe", "age": 25, "is_company": false,
    "address": {
      "street_1": "123 Main St.", "street_2": null,
      "city": "Las Vegas", "state": "NV", "zip_code": "89123"
    },
    "phone_numbers": [
      { "number": "702-123-4567", "type": "cell" },
      { "number": "702-987-6543", "type": "work" }
    ],
    "notes": ""
  };

  sch = {
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

  lay = [
    {
      "type": "flex",
      "flex-flow": "row wrap",
      "items": [
        "first_name",
        "last_name"
      ]
    },
    {
      "key": "address.street_1",
      "title": "Address",
      "placeholder": "Street"
    },
    {
      "key": "address.street_2",
      "notitle": true
    },
    {
      "type": "div",
      "display": "flex",
      "flex-direction": "row",
      "items": [
        {
          "key": "address.city",
          "flex": "3 3 150px",
          "notitle": true,
          "placeholder": "City"
        },
        {
          "key": "address.state",
          "flex": "1 1 50px",
          "notitle": true,
          "placeholder": "State"
        },
        {
          "key": "address.zip_code",
          "flex": "2 2 100px",
          "notitle": true,
          "placeholder": "Zip Code"
        }
      ]
    },
    {
      "key": "birthday",
      "type": "date"
    },
    {
      "key": "phone_numbers",
      "type": "array",
      "listItems": 3,
      "items": [
        {
          "type": "div",
          "displayFlex": true,
          "flex-direction": "row",
          "items": [
            {
              "key": "phone_numbers[].type",
              "flex": "1 1 50px",
              "notitle": true,
              "placeholder": "Type"
            },
            {
              "key": "phone_numbers[].number",
              "flex": "4 4 200px",
              "notitle": true,
              "placeholder": "Phone Number"
            }
          ]
        }
      ]
    },
    {
      "type": "section",
      "title": "Notes",
      "expandable": true,
      "expanded": false,
      "items": [
        {
          "key": "notes",
          "type": "textarea",
          "notitle": true
        }
      ]
    }
  ]
}
