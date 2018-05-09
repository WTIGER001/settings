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
 
    this.schema = JSON.parse(<string>this.spec.schema)
    this.layout = JSON.parse(<string>this.spec.layout)
  }

  get code() {
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
    setting.data = event
  }
}
