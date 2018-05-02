import { Component, OnInit } from '@angular/core';
import { PreferenceOwner, User } from '../data';
import { DataService } from '../data.service';

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
    this._dataSvc.user.subscribe(usr => {
      this.me = usr;
      this.mySettings = DataService.findMe(usr);
      this.teams = DataService.findOwner(usr, "team");
      this.others = DataService.findOwner(usr, "other");
      if (this.mySettings != undefined) {
        this.selectMySettings()
      }
      console.log("IN HEADER")
      console.log(this.me)
      console.log(this.mySettings)
      console.log(this.teams)
      console.log(this.others)
    })
  }

  selectMySettings() {
    this.select(this.mySettings)
  }

  select(owner) {
    console.log("Setting Owner to " + owner.id);
    this._dataSvc.currentOwner.next(owner)
  }
}
