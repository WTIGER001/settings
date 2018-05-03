import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Profile, PreferenceOwner, PreferenceDefinition } from '../data';
import { DataService } from '../data.service';
import { DialogService } from '../dialogs/dialog.service';
import { CommonDialogService } from '../dialogs/common-dialog.service';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.css']
})
export class ProfileSelectorComponent implements OnInit {
  owner: PreferenceOwner
  selected: Profile
  closeResult: string;

  constructor(private _dataSvc: DataService,
    private modalService: NgbModal,
    private dialog: DialogService,
    private commonDialog: CommonDialogService) { }

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

  exportProfile() {
    this.dialog.exportProfile(this.selected);
  }

  importProfile() {
    this.dialog.importProfile();
  }

  deleteProfile() {
    if (this.owner.activeProfile == this.selected.name) {
      return;
    }

    this.commonDialog.confirm(`Are you sure you want to delete ${this.selected.name}`, "Delete Profile").subscribe(result => {
      if (result) {
        this._dataSvc.deleteProfile(this.selected.name);
      }
    })
  }

  makeActive() {
    this.owner.activeProfile = this.selected.name
  }

  public newName() {
    console.log("Renamiing");

    let newName = this.commonDialog.inputDialog(
      "Enter New Name",
      "Rename Profile",
      this.selected.name,
      "Enter New Name", "You may not have duplicate names", "edit")
    newName.subscribe((name: string) => {
      this._dataSvc.renameProfile(this.selected, name)
    })
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
