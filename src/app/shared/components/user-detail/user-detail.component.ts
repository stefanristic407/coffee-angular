import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { organizationTypes } from '@constants';
import { GlobalsService, UserService, ChatHandlerService } from '@services';

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
    @Input() shape: any;
    @Input() type: any;
    orgName: any;
    data: any;

    constructor(
        public globalsService: GlobalsService,
        private userService: UserService,
        private chatHandler: ChatHandlerService,
    ) {}
    ngOnChanges(): void {
        this.orgName = organizationTypes.find((item) => item.value === this.orgType?.toUpperCase())?.title;
        if (this.userId && this.orgType) {
            this.userService.getUserDetail(this.userId, this.orgType.toLowerCase()).subscribe((res) => {
                if (res.success) {
                    this.data = res.result;
                }
            });
        }
    }

    ngOnInit(): void {}

    openChat(): void {
        this.chatHandler.openChatThread({
            user_id: this.userId,
            org_type: this.orgType.toLowerCase(),
            org_id: this.data.organization_id,
        });
    }
}
