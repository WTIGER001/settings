import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportPackage } from '../../data';
import { Preference, Profile } from '../../api/models';

@Component({
  selector: 'app-import-dialog',
  templateUrl: './import-dialog.component.html',
  styleUrls: ['./import-dialog.component.css']
})
export class ImportDialogComponent implements OnInit {
  exportPkg: ExportPackage
  items: Array<String> = []
  selected: Array<String> = []
  constructor(public activeModal: NgbActiveModal, private _dataSvc: DataService) { }

  ngOnInit() {
  }

  loadFile(files: FileList) {
    let reader = new FileReader();
    reader.onload = e => {
      let text = reader.result;
      this.fileLoaded(text);
    }
    reader.readAsText(files[0]);
  }

  fileLoaded(text: string) {
    this.exportPkg = JSON.parse(text);
    let categories = new Map<string, string>();
    this.exportPkg.settings.forEach(s => {
      categories.set(s.definitionId, s.definitionId);
    })
    let items = [];
    categories.forEach(item => {
      items.push(item);
    })
    this.items = items;
    this.selected.push(...items);
  }

  changed(items: string[]) {
    this.selected = items
  }

  ok() {
    if (this.selected.length == 0 || this.exportPkg == undefined) {
      return
    }

    let settings: Array<Preference> = []
    this.selected.forEach(sName => {
      this.exportPkg.settings.forEach(s => {
        if (s.definitionId == sName) {
          settings.push(s);
        }
      })
    })

    let p: Profile = {}
    p.id = this.exportPkg.profileName
    p.preferences = settings;

    this._dataSvc.CreateProfile(this._dataSvc.owner, p.id, p);
    this.activeModal.dismiss("done");
  }
}
