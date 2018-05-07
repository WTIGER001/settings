import { Component, OnInit } from '@angular/core';
import { User } from '../data';
import { DataService } from '../data.service';
import { PreferenceOwner } from '../api/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  me: User;
  others: Array<PreferenceOwner>
  teams: Array<PreferenceOwner>
  mySettings: PreferenceOwner;

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
    this._dataSvc.user
      .flatMap(usr => this._dataSvc.findMe(usr))
      .subscribe(myOwner =>
        this.mySettings = myOwner
      )
  }

  selectMySettings() {
    this.select(this.mySettings)
  }

  select(owner) {
    console.log("Setting Owner to " + owner.id);
    this._dataSvc.currentOwner.next(owner)
  }
}
