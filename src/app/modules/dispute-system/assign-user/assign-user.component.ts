import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RoasterserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ServiceChatTypes } from '@models';

@Component({
    selector: 'app-assign-user',
    templateUrl: './assign-user.component.html',
    styleUrls: ['./assign-user.component.scss'],
})
export class AssignUserComponent implements OnInit {
    orderID: any;
    searchFilter = '';
    userDetails: any;
    roasterId = '';
    userList: any = [];
    disputeID = '';
    SERVICE_TYPE = ServiceChatTypes.RO_ES;
    constructor(
        private route: ActivatedRoute,
        private roasterService: RoasterserviceService,
        public cookieService: CookieService,
        private router: Router,
        private toasterService: ToastrService,
    ) {}

    ngOnInit(): void {
        this.orderID = decodeURIComponent(this.route.snapshot.queryParams.id);
        this.disputeID = decodeURIComponent(this.route.snapshot.queryParams.disputeID);
        this.roasterId = this.cookieService.get('roaster_id');
    }
    onSearch(event) {
        this.userDetails = undefined;
        if (event.query === '') {
            this.userList = [];
        } else {
            this.roasterService.getRoasterUserList(this.roasterId, event.query).subscribe(
                (res: any) => {
                    this.userList = [];
                    if (res.success && res.result) {
                        res.result.forEach((ele) => {
                            ele.name = ele.firstname + ele.lastname;
                        });
                        this.userList = [...res.result];
                    }
                },
                (err) => {
                    this.userList = [];
                    console.log(err);
                },
            );
        }
    }
    onSelectUser(event) {
        this.userDetails = event;
    }
    onAssign() {
        const user = { user_id: this.userDetails.id };
        this.roasterService.assignUserDispute(this.roasterId, this.disputeID, user).subscribe(
            (res: any) => {
                console.log(res);
                if (res && res.success) {
                    this.toasterService.success('Sucessfully assigned');
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            disputeID: this.disputeID,
                        },
                    };
                    this.router.navigate(
                        ['/dispute-system/order-chat', this.SERVICE_TYPE, this.orderID],
                        navigationExtras,
                    );
                }
            },
            (err) => {
                this.userList = [];
                this.toasterService.error('Error while assigning user');
                console.log(err);
            },
        );
    }
}
