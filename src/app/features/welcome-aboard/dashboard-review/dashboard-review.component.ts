import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/services/globals.service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
  selector: 'app-dashboard-review',
  templateUrl: './dashboard-review.component.html',
  styleUrls: ['./dashboard-review.component.scss'],
})
export class DashboardReviewComponent implements OnInit {
  roasterId: string;
  totalstar = 5;
  reviewsSummary: any;
  reviewStars: any[] = [];
  colors = ['#ff1e5a', '#ffa001', '#649a2b'];

  constructor(
    private cookieService: CookieService,
    public globals: GlobalsService,
    private userSrv: UserserviceService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.roasterId = this.cookieService.get('roaster_id');
    this.getReviewsSummary();
  }

  getReviewsSummary() {
    this.userSrv.getReviewsSummary(this.roasterId).subscribe((res: any) => {
      if (res.success) {
        this.reviewsSummary = res.result.summary;
        if (this.reviewsSummary) {
          this.reviewStars = [];
          for (let idx = 5; idx > 0; idx--) {
            const percent = (this.reviewsSummary[idx + '_star'] * 100) / this.reviewsSummary.total_review;
            this.reviewStars.push({
              label: idx + '.0',
              value: this.reviewsSummary[idx + '_star'],
              percent,
              color: this.colors[Math.floor(percent / 34)],
            });
          }
        }
        console.log('Reviews:', this.reviewsSummary);
      } else {
        this.toastrService.error('Error while getting reviews');
      }
    });
  }
}
