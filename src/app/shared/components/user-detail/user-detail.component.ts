import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { organizationTypes } from '@constants';
import { GlobalsService, UserService, ChatHandlerService, AuthService } from '@services';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnChanges {
    @Input() userId: any;
    @Input() orgType: any;
    @Input() size: any;
    @Input() imageUrl: any;
    @Input() shape: 'rectangle' | 'circle' = 'circle';
    @Input() type: 'text' | 'contact' | 'customerText' | '' = '';
    @Input() hasBorder: boolean;
    @Input() isMessage: any;
    orgName: any;
    data: any;
    name: any;
    public defaultProfileImage = 'assets/images/profile.svg';
    constructor(
        public globalsService: GlobalsService,
        private userService: UserService,
        private chatHandler: ChatHandlerService,
        private cookieService: CookieService,
        private authService: AuthService,
    ) {}
    ngOnChanges(): void {
        this.orgName = organizationTypes.find((item) => item.value === this.orgType?.toUpperCase())?.title;
        if (this.userId && this.orgType) {
            this.userService.getUserDetail(this.userId, this.orgType.toLowerCase()).subscribe((res) => {
                if (res.success) {
                    this.data = res.result;
                    this.name = `${this.data?.firstname} ${this.data?.lastname}`;
                }
            });
        }
    }

    ngOnInit(): void {}

    openChat(): void {
        this.chatHandler.openChatThread({
            user_id: this.userId,
            org_type: this.data.organization_type.toLowerCase(),
            org_id: this.data.organization_id,
        });
    }

    showPopup(element: any, event: any) {
        const userId = this.authService.userId;
        if (this.data?.id !== userId) {
            element.toggle(event);
        }
    }
}
