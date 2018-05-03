import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  _items = []
  _selected = []


  @Input() helpText = "Select Items"

  @Input() checklist: any[];
  @Output() checked = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit() {
  }

  @Input() set items(items: any[]) {
    this._items = items;
  }

  get items(): any[] {
    return this._items
  }

  @Input() set checklistValues(value: any[]) {
    this._selected.splice(0, this._selected.length)
    this._selected.push(...value)
  }

  get checklistValues(): any[] {
    return this._selected
  }

  toggle(item: any) {
    let index = this._selected.findIndex(s => s === item)
    if (index >= 0) {
      this._selected.splice(index, 1)
    } else {
      this._selected.push(item)
    }
    this.checked.emit(this._selected);

  }

  isChecked(item: any): boolean {
    return this._selected.findIndex(s => s === item) >= 0
  }

  checkAll(v: boolean) {
    if (this.isAllChecked()) {
      this._selected.splice(0, this._selected.length)
    } else {
      this._selected.splice(0, this._selected.length)
      this._selected.push(...this.items)
    }
    this.checked.emit(this._selected);
  }

  isAllChecked(): boolean {
    return this._selected.length == this._items.length
  }

  ngOnChanges() {
    console.log("ONCHANGES");

  }

}
