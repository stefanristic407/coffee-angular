import { Component, OnInit } from '@angular/core';
import { RoasteryProfileService } from '../roastery-profile.service';

@Component({
  selector: 'sewn-virtual-tour',
  templateUrl: './virtual-tour.component.html',
  styleUrls: ['./virtual-tour.component.css']
})
export class VirtualTourComponent implements OnInit {

  constructor(public roasteryProfileService : RoasteryProfileService) { }

  ngOnInit(): void {
  }

}
