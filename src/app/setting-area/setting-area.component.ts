import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Provider } from '../data';

@Component({
  selector: 'app-setting-area',
  templateUrl: './setting-area.component.html',
  styleUrls: ['./setting-area.component.css']
})
export class SettingAreaComponent implements OnInit {

  p: Provider;
  constructor(private _data: DataService) { }

  ngOnInit() {
      this._data.selection.subscribe( sel => this.p = sel);
  }

  save(event) {
    console.log(event)
  }

}
