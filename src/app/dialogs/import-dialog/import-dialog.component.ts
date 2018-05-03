import { Component, OnInit } from '@angular/core';
import { ExportPackage, Setting, Profile } from '../../data';
import { DataService } from '../../data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
      categories.set(s.provider_ref, s.provider_ref);
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

    let settings: Array<Setting> = []
    this.selected.forEach(sName => {
      this.exportPkg.settings.forEach(s => {
        if (s.provider_ref == sName) {
          settings.push(s);
        }
      })
    })

    let p = new Profile();
    p.name = this.exportPkg.profileName
    p.settings = settings;

    this._dataSvc.CreateProfile(this._dataSvc.owner, p.name, p);
    this.activeModal.dismiss("done");
  }
}
