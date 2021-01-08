import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { RoasterserviceService } from 'src/services/roasters/roasterservice.service';

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})
export class AssignUserComponent implements OnInit {

  orderID: string = '';
  searchFilter: string = '';
  userDetails: any;
  roasterId: string = '';
  userList: any = [];
  disputeID: string = '';
  constructor(private route: ActivatedRoute, private roasterService: RoasterserviceService,
    public cookieService: CookieService, private router: Router, private toasterService: ToastrService) {

  }

  ngOnInit(): void {
    this.orderID = decodeURIComponent(this.route.snapshot.queryParams['id']);
    this.disputeID = decodeURIComponent(this.route.snapshot.queryParams['disputeID']);
    this.roasterId = this.cookieService.get('roaster_id');
  }
  onSearch(event) {
    this.userDetails = undefined;
    if (event.query == '') {
      this.userList = [];
    } else {
      this.roasterService.getRoasterUserList(this.roasterId, event.query).subscribe(res => {
        console.log(res);
        this.userList = [];
        if (res['success'] && res['result']) {
          res['result'].forEach(ele => {
            ele['name'] = ele['firstname'] + ele['lastname'];
          });
          this.userList = [...res['result']];
        }
      }, err => {
        this.userList = [];
        console.log(err);
      });
    }
  }
  onSelectUser(event) {
    this.userDetails = event;
  }
  onAssign() {
    console.log();

    let user = { 'user_id': this.userDetails['id'] };
    this.roasterService.assignUserDispute(this.roasterId, this.disputeID, user).subscribe(res => {
      console.log(res);
      if (res && res['success']) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            id: this.orderID
          }
        };
        this.toasterService.success("Sucessfully assigned");
        this.router.navigate(["/ordermanagement/order-chat"], navigationExtras);
      }
    }, err => {
      this.userList = [];
      this.toasterService.error("Error while assigning user");
      console.log(err);
    });
  }

}
