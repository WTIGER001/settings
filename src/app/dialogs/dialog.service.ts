import { Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PreferenceOwner } from '../data';
import { NewProfileDialogComponent } from './new-profile-dialog/new-profile-dialog.component'

@Injectable()
export class DialogService {

  constructor(private modalSvc: NgbModal) {

  }

  public newProfile(owner: PreferenceOwner) {
    const modalRef = this.modalSvc.open(NewProfileDialogComponent);
    modalRef.componentInstance.owner = owner;
  }
}
