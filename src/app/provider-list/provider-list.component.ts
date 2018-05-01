import { Component, OnInit } from '@angular/core';
import { Provider } from '../data';
import { Observable} from 'rxjs/Observable';
import { DataService } from '../data.service';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
  providers: Observable<Array<Provider>>;
  selected: any;
  constructor(private _data: DataService) { }

  ngOnInit() {
    this.providers = this._data.providers;
  }

  public select(item) {
    this.selected = item;
    this._data.selection.next(this.selected);
  }
}
