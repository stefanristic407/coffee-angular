import { Component, OnInit } from '@angular/core';
import { AuthService, GlobalsService, UserService } from '@services';
import { CustomerServiceService } from '../customer-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-discount-edit',
    templateUrl: './discount-edit.component.html',
    styleUrls: ['./discount-edit.component.scss'],
})
export class DiscountEditComponent implements OnInit {
    appLanguage?: any;
    roasterId: number;
    constructor(
        public globals: GlobalsService,
        public customerService: CustomerServiceService,
        public userService: UserService,
        public cookieService: CookieService,
        private toastrService: ToastrService,
        public route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
    ) {
        this.roasterId = this.authService.getOrgId();
    }
    ngOnInit(): void {
        this.appLanguage = this.globals.languageJson;
    }
}
