import { Component, OnInit } from '@angular/core';
import { HorecaOrderDetailsService } from '../horeca-order-details.service';

@Component({
  selector: 'app-details-order',
  templateUrl: './details-order.component.html',
  styleUrls: ['./details-order.component.css']
})
export class DetailsOrderComponent implements OnInit {

  constructor(public horecaDetailService : HorecaOrderDetailsService) { }

  ngOnInit(): void {
  }

}
