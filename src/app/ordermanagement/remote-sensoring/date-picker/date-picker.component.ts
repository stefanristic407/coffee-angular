import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
declare var $: any;
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @ViewChild('calendar') calendar: any;
  @Input()
  set value(val: any) {
    if (moment(val).isValid) {
      this.date = new Date(val);
    }
  }
  @Output() valueChange = new EventEmitter<any>();

  opened = false;
  date: Date = new Date();

  constructor() {}

  ngOnInit(): void {}

  onSelect(value: Date) {
    this.valueChange.emit(value);
  }

  openCalendar(event: any) {
    this.calendar.showOverlay(this.calendar.inputfieldViewChild.nativeElement);
    event.stopPropagation();
  }
}
