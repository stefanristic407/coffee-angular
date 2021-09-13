import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrganizationType } from '@enums';
import { AuthService, ChatHandlerService, UserService } from '@services';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    readonly OrgType = OrganizationType;
    @ViewChild('myOp', { static: false }) myOp: OverlayPanel;
    @Input() userId: number;
    @Input() orgType: OrganizationType;
    @Input() size: number;
    @Input() imageUrl: string;
    @Input() name: string;
    @Input() shape: 'rectangle' | 'circle' = 'circle';
    @Input() type: 'text' | 'contact' | 'atatar' = 'atatar';
    @Input() hasBorder: boolean;
    @Input() isMessage: boolean;
    data: any;
    isOpened = false;
    hiding = false;
    showMore: boolean;
    public defaultProfileImage = 'assets/images/profile.svg';

    constructor(
        private authService: AuthService,
        private chatHandler: ChatHandlerService,
        private userService: UserService,
    ) {}

    ngOnInit(): void {}

    getUserData() {
        if (this.userId && this.orgType && !this.data) {
            this.orgType = this.orgType.toLowerCase() as OrganizationType;
            this.userService.getUserDetail(this.userId, this.orgType).subscribe((res) => {
                if (res.success) {
                    this.data = res.result;
                    this.imageUrl = this.imageUrl || this.data?.profile_image_thumb_url || this.data?.profile_image_url;
                    this.name = `${this.data?.firstname} ${this.data?.lastname}`;
                }
            });
        }
    }

    openChat(): void {
        this.chatHandler.openChatThread({
            user_id: this.userId,
            org_type: this.data.organization_type.toLowerCase(),
            org_id: this.data.organization_id,
        });
    }

    show(event) {
        this.hiding = false;
        if (!this.isOpened && this.userId) {
            this.getUserData();
            this.myOp.show(event);
            this.showMore = false;
            setTimeout(() => (this.showMore = true), 800);
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
