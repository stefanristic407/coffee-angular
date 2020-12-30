// AUTHOR : Sindhuja
// PAGE DESCRIPTION : This page contains functions of Order Pre-Book.
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RemoteSensoringService } from './remote-sensoring.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/services/globals.service';
import { RoasteryProfileService } from 'src/app/features/roastery-profile/roastery-profile.service';
import { OrderBookedService } from '../order-booked/order-booked.service';

declare var $: any;

@Component({
  selector: 'app-remote-sensoring',
  templateUrl: './remote-sensoring.component.html',
  styleUrls: ['./remote-sensoring.component.scss'],
})
export class RemoteSensoringComponent implements OnInit, AfterViewInit {
  appLanguage?: any;

  constructor(
    public prebookService: RemoteSensoringService,
    private route: ActivatedRoute,
    public router: Router,
    public cookieService: CookieService,
    public bookedService: OrderBookedService,
    public globals: GlobalsService,
    public profileservice: RoasteryProfileService
  ) {}

  ngOnInit(): void {
    // Auth checking
    if (this.cookieService.get('Auth') === '') {
      this.router.navigate(['/auth/login']);
    }
    this.appLanguage = this.globals.languageJson;
  }

  // Click on harvest button scrolls to harvest div
  ngAfterViewInit() {}
}
