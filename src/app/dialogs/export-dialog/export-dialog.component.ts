import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../data.service';
import { Profile, Setting, PreferenceDefinition, ExportPackage } from '../../data';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.css']
})
export class ExportDialogComponent implements OnInit {
  _profile: Profile
  defs: Array<PreferenceDefinition> = []
  selected: Array<PreferenceDefinition> = []

  constructor(public activeModal: NgbActiveModal, private _dataSvc: DataService) { }

  ngOnInit() {
  }

  ok() {
    // Determine which settings are supposed to be exported
    let settings: Array<Setting> = []
    this.selected.forEach(def => {
      def.schemas.forEach(sch => {
        let found = this.profile.settings.find(setting => setting.provider_ref == def.name && setting.schema_ref == sch.name)
        if (found) {
          settings.push(found);
        }
      })
    })

    // Export these to a file
    let pkg = new ExportPackage();
    pkg.ownerName = this._dataSvc.owner.name
    pkg.ownerType = this._dataSvc.owner.type
    pkg.profileName = this.profile.name
    pkg.settings = settings

    let exportString = JSON.stringify(pkg, null, 2);
    this.saveToFileSystem(pkg.profileName, exportString);
  }

  private saveToFileSystem(name: string, content: string) {
    const filename = name + ".settings.json"
    const blob = new Blob([content], { type: 'text/plain' });
    saveAs(blob, filename);
  }


  @Input() set profile(p: Profile) {
    this._profile = p
    this.defs = this._dataSvc.getCategories(p)
    this.selected.push(...this.defs)
  }

  get profile(): Profile {
    return this._profile;
  }

  toggle(item: PreferenceDefinition) {
    let index = this.selected.findIndex(s => s.name == item.name)
    if (index >= 0) {
      this.selected.splice(index, 1)
    } else {
      this.selected.push(item)
    }
  }

  isChecked(item: PreferenceDefinition): boolean {
    return this.selected.findIndex(s => s.name == item.name) >= 0
  }

  checkAll(v: boolean) {
    if (this.isAllChecked()) {
      this.selected.splice(0, this.selected.length)
    } else {
      this.selected.splice(0, this.selected.length)
      this.selected.push(...this.defs)
    }
  }

  isAllChecked(): boolean {
    return this.selected.length == this.defs.length
  }

  changed(event: PreferenceDefinition[]) {
    console.log("CHANGED");
    console.log(event);
  }
}
