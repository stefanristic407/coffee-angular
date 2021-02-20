/* tslint:disable no-string-literal */
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderCharThreadListItem } from '@models';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
    WSOrganizationType,
    ThreadListItem,
    ThreadMembers,
    ChatMessage,
    IncomingChatMessage,
    ServiceChatTypes,
} from '@models';
import { ChatHandlerService, GlobalsService, SocketService, UserserviceService } from '@services';
@Component({
    selector: 'app-sewn-order-chat',
    templateUrl: './sewn-order-chat.component.html',
    styleUrls: ['./sewn-order-chat.component.scss'],
})
export class SewnOrderChatComponent implements OnInit {
    ORGANIZATION_TYPE = WSOrganizationType.ROASTER;
    ORGANIZATION_ID: number | null = null;
    USER_ID: number | null = null;
    ORDER_ID: number | null = null;
    SERVICE_CHAT_TYPE: ServiceChatTypes = null;

    orderDetails: any;
    threadList: OrderCharThreadListItem[] = [];
    viewTickets = false;

    messageList: ChatMessage[] = [];
    SM: { [SubscriptionName: string]: Subscription } = {}; // Subscrition MAP object

    orderTypes = {
        GC_ORDER: {
            color: '#f19634',
            name: 'Booked',
        },
        GC_ORDER_SAMPLE: {
            color: '#629b20',
            name: 'Sample',
        },
        PREBOOK_LOT: {
            color: '#8872ef',
            name: 'Prebook',
        },
    };

    audioPlayer = new Audio('assets/sounds/notification.mp3');
    constructor(
        private cookieService: CookieService,
        public globals: GlobalsService,
        public chatService: ChatHandlerService,
        private userService: UserserviceService,
        private activateRoute: ActivatedRoute,
        private socket: SocketService,
    ) {}

    ngOnInit(): void {
        this.SM['resolvedData'] = this.activateRoute.data.subscribe((res) => {
            this.threadList = res.threadList;
            this.orderDetails = res.orderDetails;
        });
        this.SM['routeParam'] = this.activateRoute.params.subscribe((param) => {
            this.ORDER_ID = parseInt(param.orderId, 10);
            this.SERVICE_CHAT_TYPE = param.chatType;
        });

        this.ORGANIZATION_ID = parseInt(this.cookieService.get('roaster_id'), 10) || null; // NOTE : Please check this on each portal;
        this.USER_ID = parseInt(this.cookieService.get('user_id'), 10) || null; // NOTE : Please check this on each portal;

        if (!this.USER_ID) {
            console.log('Order chat Message: USER_ID is missing');
        }

        if (!this.ORGANIZATION_ID) {
            console.log('Order chat Message: ORGANIZATION_ID is missing');
        }
        this.audioPlayer.load();
        this.
    }

    getReadableTime(tTime: string = '') {
        const todayDate = moment();
        const messageDate = moment(tTime);
        if (messageDate.isValid || tTime) {
            const isSameYear = todayDate.year() === messageDate.year();
            const isSameMonth = isSameYear && todayDate.month() === messageDate.month();
            const isSameDay = isSameMonth && todayDate.date() === messageDate.date();
            const isYesterDay = !isSameDay && todayDate.isSame(messageDate.clone().add(1, 'day'), 'date');
            if (isSameDay) {
                return messageDate.format('hh.mm a');
            } else if (isYesterDay) {
                return messageDate.format('[Yesterday] hh.mm a');
            } else if (isSameYear) {
                return messageDate.format('MMM DD, hh.mm a');
            } else {
                return messageDate.format('YYYY MMM DD, hh.mm a');
            }
        } else {
            console.log('Date Parse error');
            return '';
        }
    }

    getOrganization(orgType: WSOrganizationType) {
        if (orgType === WSOrganizationType.EMPTY || orgType === WSOrganizationType.SEWN_ADMIN) {
            return 'SEWN Admin';
        } else if (orgType === WSOrganizationType.ROASTER) {
            return 'Roaster';
        } else if (orgType === WSOrganizationType.MICRO_ROASTER) {
            return 'Micro Roaster';
        } else if (orgType === WSOrganizationType.FACILITATOR) {
            return 'Facilitator';
        } else if (orgType === WSOrganizationType.ESTATE) {
            return 'Coffee Estate';
        } else if (orgType === WSOrganizationType.HORECA) {
            return 'HoReCa';
        } else {
            return 'Unknown';
        }
    }

    processChatMessages(message: ChatMessage | IncomingChatMessage, thread: ThreadListItem) {
        message.computed_date = this.getReadableTime(message.updated_at || message.created_at);
        if (thread.computed_targetedUser.id === message.member.id) {
            message.computed_author = thread.computed_targetedUser;
            message.isActiveUser = false;
        } else if (thread.computed_activeUser.id === message.member.id) {
            message.computed_author = thread.computed_activeUser;
            message.isActiveUser = true;
        }
    }
    processThreadUser(threadUser: ThreadMembers) {
        threadUser.last_seen = threadUser.last_seen || '';
        threadUser.computed_lastseen = this.getReadableTime(threadUser.last_seen || '');
        threadUser.computed_organization_name = this.getOrganization(threadUser.org_type);
        threadUser.computed_fullname = threadUser.first_name + ' ' + threadUser.last_name;
        threadUser.computed_profile_dp = this.getProfileImageBgStyle(threadUser.profile_pic);
    }
    playNotificationSound() {
        this.audioPlayer.play();
    }
    getProfileImageBgStyle(profileImageUrl: string) {
        if (profileImageUrl) {
            return `url(${profileImageUrl})`;
        } else {
            return `url(assets/images/profile.svg)`; // Placeholder image
        }
    }

    ngOnDestroy() {
        for (const name in this.SM) {
            if (this.SM[name] && this.SM[name].unsubscribe) {
                this.SM[name].unsubscribe();
            }
        }
    }
}
