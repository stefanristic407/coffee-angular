import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserserviceService } from 'src/services/users/userservice.service';

@Component({
  selector: 'app-order-support-faqs',
  templateUrl: './order-support-faqs.component.html',
  styleUrls: ['./order-support-faqs.component.css']
})
export class OrderSupportFaqsComponent implements OnInit {
  headerValue: any;
  orderID: string = '';
  orderType: string = '';
  roaster_id: string = "";
  questionDetails: any = [];
  constructor(private route: ActivatedRoute, public userService: UserserviceService,
    public cookieService: CookieService) { }

  ngOnInit(): void {
    this.roaster_id = this.cookieService.get('roaster_id');
    this.orderID = decodeURIComponent(this.route.snapshot.queryParams['id']);
    this.orderType = this.route.snapshot.queryParams['orderType'] ? decodeURIComponent(this.route.snapshot.queryParams['orderType']) : '';
    if (this.route.snapshot.queryParams["buttonValue"]) {
      this.headerValue = decodeURIComponent(
        this.route.snapshot.queryParams["buttonValue"]
      );
    }
    this.getFAQList();
  }
  getFAQList() {
    this.userService.getDisputeFAQList(this.roaster_id).subscribe(res => {
      console.log(res);
      if (res['success'] && res['result']) {
        console.log(res['result']);
        this.questionDetails = res['result'].map((ele, index) => {
          ele['element_id'] = 'collapseOne' + index;
          return ele;
        }).filter(item => item['status'] == 'enabled');
      }
    }, err => {
      console.log(err);
    });
  }

}
