import { Component, OnInit } from '@angular/core';
import { HorecaPreviousSubscriptionService } from '../horeca-previous-subscription.service';

@Component({
  selector: 'app-previous-subscription',
  templateUrl: './previous-subscription.component.html',
  styleUrls: ['./previous-subscription.component.css']
})
export class PreviousSubscriptionComponent implements OnInit {

  constructor(public previousSubscriptionService : HorecaPreviousSubscriptionService) { }

  ngOnInit(): void {
  }

}
