import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-remote-sensoring',
  templateUrl: './remote-sensoring.component.html',
  styleUrls: ['./remote-sensoring.component.scss'],
})
export class RemoteSensoringComponent implements OnInit {
  @Input() polygonId: string;

  constructor() {}

  ngOnInit(): void {}
}
