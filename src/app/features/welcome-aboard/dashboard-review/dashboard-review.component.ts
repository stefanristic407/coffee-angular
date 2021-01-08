import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalsService } from 'src/services/globals.service';
import { WelcomeService } from '../welcome.service';

@Component({
  selector: 'app-dashboard-review',
  templateUrl: './dashboard-review.component.html',
  styleUrls: ['./dashboard-review.component.scss'],
})
export class DashboardReviewComponent implements OnInit, OnDestroy {
  roasterId: string;
  totalstar = 5;
  reviewsSummary: any;
  reviewsSummarySub: Subscription;
  reviewStars: any[] = [];
  colors = ['#ff1e5a', '#ffa001', '#649a2b'];

  constructor(public globals: GlobalsService, private welcomeSrv: WelcomeService) {}

  ngOnInit(): void {
    this.reviewsSummarySub = this.welcomeSrv.reviewsSummary$.subscribe((res: any) => {
      this.reviewsSummary = res;
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
    });
  }

  ngOnDestroy() {
    this.reviewsSummarySub.unsubscribe();
  }
}
