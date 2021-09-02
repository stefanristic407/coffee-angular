import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { OrganizationType } from '@enums';
import { CommonService, UserService, ChatHandlerService, AuthService, GlobalsService } from '@services';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnChanges {
    @ViewChild('myOp', { static: false }) myOp: OverlayPanel;
    @Input() userId: any;
    @Input() orgType: OrganizationType;
    @Input() size: any;
    @Input() imageUrl: any;
    @Input() shape: any;
    @Input() type: any;
    @Input() hasBorder: any;
    @Input() isMessage: any;
    data: any;
    name: any;
    isOpened = false;
    hiding = false;
    public defaultProfileImage = 'assets/images/profile.svg';

    constructor(
        public commonService: CommonService,
        private userService: UserService,
        private chatHandler: ChatHandlerService,
        private authService: AuthService,
        public globalService: GlobalsService,
    ) {}

    ngOnChanges(): void {
        if (this.userId && this.orgType) {
            this.userService.getUserDetail(this.userId, this.orgType).subscribe((res) => {
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

    show(event) {
        const userId = +this.authService.currentUser.id;
        this.hiding = false;
        if (!this.isOpened && this.data?.id !== userId) {
            this.myOp.show(event);
        }
    }

    hide() {
        if (this.isOpened) {
            this.hiding = true;
            setTimeout(() => {
                if (this.hiding) {
                    this.myOp.hide();
                    this.hiding = false;
                }
            }, 300);
        }
    }
}
