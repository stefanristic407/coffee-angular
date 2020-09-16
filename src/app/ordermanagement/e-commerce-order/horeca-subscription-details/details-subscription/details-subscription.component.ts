import { Component, OnInit } from '@angular/core';
import { HorecaSubscriptionDetailsService } from '../horeca-subscription-details.service';

@Component({
  selector: 'app-details-subscription',
  templateUrl: './details-subscription.component.html',
  styleUrls: ['./details-subscription.component.css']
})
export class DetailsSubscriptionComponent implements OnInit {

  constructor(	public horecaSubscriptionService : HorecaSubscriptionDetailsService) { }

  ngOnInit(): void {
  }

}
