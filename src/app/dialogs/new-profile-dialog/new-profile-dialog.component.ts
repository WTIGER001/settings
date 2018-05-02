import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile, PreferenceOwner } from '../../data';
import { DataService } from '../../data.service';

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

  }

  @Input() set owner(ownIn: PreferenceOwner) {
    this._owner = ownIn;
    this.profiles = this._owner.profiles

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
