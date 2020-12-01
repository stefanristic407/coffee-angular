import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generate-cupping-report',
  templateUrl: './generate-cupping-report.component.html',
  styleUrls: ['./generate-cupping-report.component.css']
})
export class GenerateCuppingReportComponent implements OnInit {
  @Output() next = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  goNext(){
    this.next.emit('screen3');
  }

}
