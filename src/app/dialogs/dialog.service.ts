import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PreferenceOwner, Profile } from '../data';
import { NewProfileDialogComponent } from './new-profile-dialog/new-profile-dialog.component'
import { ExportDialogComponent } from './export-dialog/export-dialog.component';
import { ImportDialogComponent } from './import-dialog/import-dialog.component';


@Injectable()
export class DialogService {

  constructor(private modalSvc: NgbModal) {

  }

  public newProfile(owner: PreferenceOwner) {
    const modalRef = this.modalSvc.open(NewProfileDialogComponent);
    modalRef.componentInstance.owner = owner;
  }

  public exportProfile(profile: Profile) {
    const modalRef = this.modalSvc.open(ExportDialogComponent);
    modalRef.componentInstance.profile = profile;
  }

  public importProfile() {
    const modalRef = this.modalSvc.open(ImportDialogComponent);
    // modalRef.componentInstance.owner = owner;
  }


}
