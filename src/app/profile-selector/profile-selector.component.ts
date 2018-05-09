import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from '../data.service';
import { DialogService } from '../dialogs/dialog.service';
import { CommonDialogService } from '../dialogs/common-dialog.service';
import { PreferenceOwner, Profile, PreferenceDefinition } from '../api/models';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.css']
})
export class ProfileSelectorComponent implements OnInit {
  owner: PreferenceOwner
  profiles: Array<Profile> = []
  selected: Profile
  closeResult: string;

  constructor(private _dataSvc: DataService,
    private modalService: NgbModal,
    private dialog: DialogService,
    private commonDialog: CommonDialogService) { }

  ngOnInit() {
    this._dataSvc.currentOwner.subscribe(o => {
      this.owner = o
    });
    this._dataSvc.profiles.subscribe(ps => this.profiles = ps)
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
    if (this.owner.active == this.selected.id) {
      return;
    }

    this.commonDialog.confirm(`Are you sure you want to delete ${this.selected.name}`, "Delete Profile").subscribe(result => {
      if (result) {
        this._dataSvc.deleteProfile(this.selected.id);
      }
    })
  }

  makeActive() {
    this.owner.active = this.selected.id
    this._dataSvc.saveOwner(this.owner);
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
