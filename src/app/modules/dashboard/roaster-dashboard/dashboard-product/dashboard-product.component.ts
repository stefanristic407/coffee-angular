import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService } from 'src/services/globals.service';

@Component({
  selector: 'app-dashboard-product',
  templateUrl: './dashboard-product.component.html',
  styleUrls: ['./dashboard-product.component.scss'],
})
export class DashboardProductComponent implements OnInit {
  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {}
}
