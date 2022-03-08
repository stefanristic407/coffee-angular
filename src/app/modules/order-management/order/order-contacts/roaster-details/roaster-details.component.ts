import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrganizationType } from '@enums';
import { ChatHandlerService } from '@services';

@Component({
    selector: 'app-roaster-details',
    templateUrl: './roaster-details.component.html',
    styleUrls: ['./roaster-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoasterDetailsComponent {
    @Input() companyImageThumbnailUrl: string;
    @Input() companyName: string;
    @Input() rating: number;
    @Input() orgType: OrganizationType;
    @Input() orderId: number;
    @Input() userId: number;
    @Input() estateId: number;

    constructor(private chatHandler: ChatHandlerService, private router: Router) {}

    openChat(): void {
        this.chatHandler.openChatThread({
            user_id: this.userId,
            org_type: this.orgType,
            org_id: this.estateId,
        });
    }

    routeToOrgProfile() {
        this.router.navigate([`/profile/${this.orgType}/${this.estateId}`]);
    }
}
