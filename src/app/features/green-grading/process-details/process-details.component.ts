import { Component, OnInit } from '@angular/core';
import {ProcessDetailsService } from './process-details.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.css']
})
export class ProcessDetailsComponent implements OnInit {

  constructor( public processDetailsService : ProcessDetailsService,private router : Router,private route : ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.processDetailsService.harvest_id = params['harvest_id'];
    this.processDetailsService.viewProcessDetails();
   })
  }

  ngOnInit(): void {
  }
  backRequests(){
    this.router.navigate(['/features/service-request']);
  }

}
