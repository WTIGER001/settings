import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/mergeMap';

import { Data, User, Provider } from './data';

@Injectable()
export class DataService {

  providers: ReplaySubject<Array<Provider>> = new ReplaySubject();
  selection: ReplaySubject<Provider> = new ReplaySubject(); 

  constructor(http: Http) {
    http.get('http://localhost:3000/suppliers').subscribe(res => {
      this.providers.next( res.json());
    })
  }

}
