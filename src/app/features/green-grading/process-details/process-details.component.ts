import { Component, OnInit } from '@angular/core';
import {ProcessDetailsService } from './process-details.service';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.css']
})
export class ProcessDetailsComponent implements OnInit {

  constructor( public processDetailsService : ProcessDetailsService) {
    this.processDetailsService.viewProcessDetails();
   }

  ngOnInit(): void {
  }

}
