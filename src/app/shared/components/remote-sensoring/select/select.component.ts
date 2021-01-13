import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() items: any[] = [];
  @Input()
  set value(val: any) {
    this.selectedIndex = this.items.findIndex(
      (element) => element.value === val,
    );
  }
  @Output() valueChange = new EventEmitter<any>();

  opened = false;
  selectedIndex: any;

  constructor() {}

  ngOnInit(): void {}

  secectValue(idx: number = null) {
    this.selectedIndex = idx;
    this.valueChange.emit(this.items[idx]?.value);
  }
}
