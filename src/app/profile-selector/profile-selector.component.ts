import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Profile, PreferenceOwner, PreferenceDefinition } from '../data';
import { DataService } from '../data.service';
import { DialogService } from '../dialogs/dialog.service';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.css']
})
export class ProfileSelectorComponent implements OnInit {
  owner: PreferenceOwner
  selected: Profile
  closeResult: string;

  constructor(private _dataSvc: DataService, private modalService: NgbModal, private dialog: DialogService) { }

  ngOnInit() {
    this._dataSvc.currentOwner.subscribe(o => {
      this.owner = o
      console.log("Profile Count: " + o.profiles.length);
    });

    this._dataSvc.currentProfile.subscribe(selection => this.selected = selection)
  }

  selectProfile(profile: Profile) {
    this._dataSvc.currentProfile.next(profile)
  }

  getDefs(): Array<PreferenceDefinition> {
    return this._dataSvc.getCategories(this.selected, );
  }

  addProfile() {
    this.dialog.newProfile(this.owner);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
