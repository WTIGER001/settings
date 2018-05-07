import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import { forEach } from 'angular2-json-schema-form';
import { Profile, Category, PreferenceDefinition } from '../api/models';
import { Config } from '../data';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  categories: Array<Category>
  selected: Category;
  config: Config;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.config.subscribe(c => this.config = c)
    this._data.currentProfile.subscribe(profile => {
      console.log("Profile Found " + profile.id);

      // Get a unique list of the categories
      this.categories = this._data.getCategoriesForPrefs(profile.preferences);

      // Auto select the first definition
      if (this.selected == undefined && this.categories.length > 0) {
        this.select(this.categories[0])
      }
    })
  }

  public select(item) {
    this.selected = item;
    this._data.selection.next(this.selected);
  }
}
