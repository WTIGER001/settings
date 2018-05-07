import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DataService } from '../../data.service';
import { PreferenceOwner, Profile } from '../../api/models';

@Component({
  selector: 'new-profile-dialog',
  templateUrl: './new-profile-dialog.component.html',
  styleUrls: ['./new-profile-dialog.component.css']
})
export class NewProfileDialogComponent implements OnInit {
  private _owner: PreferenceOwner
  newName: string = "New Profile"
  profiles: Array<Profile> = []
  copyFrom: Profile
  constructor(public activeModal: NgbActiveModal, private _dataSvc: DataService) { }

  ngOnInit() {
    this._dataSvc.profiles.subscribe(ps => this.profiles = ps)
    this._dataSvc.currentOwner.subscribe(o => this._owner = o);
  }

  @Input() set owner(ownIn: PreferenceOwner) {

  }

  save() {
    // Create a new Profile
    let newProfile = this._dataSvc.CreateProfile(this._owner, this.newName, this.copyFrom);

    if (newProfile) {
      this._dataSvc.currentProfile.next(newProfile)
    }

    this.activeModal.close("complete")
  }
}
