import { Component, OnInit, Input } from '@angular/core';
import { Setting, Specification } from '../data';

@Component({
  selector: 'app-setting-editor',
  templateUrl: './setting-editor.component.html',
  styleUrls: ['./setting-editor.component.css']
})
export class SettingEditorComponent implements OnInit {
  @Input() setting: Setting
  @Input() spec: Specification
  @Input() mode: string

  constructor() { }

  ngOnInit() {

  }

  get code() {
    return JSON.stringify(this.setting.data, null, 2);
  }

  set code(v) {
    try {
      this.setting.data = JSON.parse(v);
    }
    catch (e) {
      console.log('error occored while you were typing the JSON');
    };
  }

  save(event, setting) {
    console.log("SAVING DATA")
    console.log(event)
    setting.data = event
  }
}
