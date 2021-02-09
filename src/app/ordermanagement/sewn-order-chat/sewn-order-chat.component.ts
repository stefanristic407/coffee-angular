import { Subscription } from 'rxjs';
import { ThreadMembers, ChatMessage, IncomingChatMessage } from './../../../models/message';
/* tslint:disable no-string-literal */

import { ChatService } from './../../components/sewn-direct-message/chat.service';
import { GlobalsService, SocketService, UserserviceService } from '@services';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WSOrganizationType, ThreadListItem } from '@models';
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

    messageList: ChatMessage[] = [];
    SM: { [SubscriptionName: string]: Subscription } = {}; // Subscrition MAP object

    audioPlayer = new Audio('assets/sounds/notification.mp3');
    constructor(
        private cookieService: CookieService,
        public globals: GlobalsService,
        private socket: SocketService,
        public chatService: ChatService,
        private userService: UserserviceService,
    ) {}

    ngOnInit(): void {
        this.ORGANIZATION_ID = parseInt(this.cookieService.get('roaster_id'), 10) || null; // NOTE : Please check this on each portal;
        this.USER_ID = parseInt(this.cookieService.get('user_id'), 10) || null; // NOTE : Please check this on each portal;

        if (!this.USER_ID) {
            console.log('Order chat Message: USER_ID is missing');
        }

        if (!this.ORGANIZATION_ID) {
            console.log('Order chat Message: ORGANIZATION_ID is missing');
        }
        this.audioPlayer.load();
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
    handleIncomingMessages(WSmsg: WSResponse<IncomingChatMessage>) {
        console.log('incoming', WSmsg);
        const message = WSmsg.data;
        if (WSmsg.code === 201 && (message?.content || '').trim() !== '') {
            if (message.activity_type === ThreadActivityType.message) {
                const inThread = this.threadList.find((thread) => thread.id === message.thread_id);
                if (inThread) {
                    this.processChatMessages(message, inThread);
                    const user = message?.member?.user;
                    if (user) {
                        this.processThreadUser(user);
                        console.log('incoming processed msg', user);
                    }
                    let isCurrentlyBottom = false;
                    if (this.SM['lastRender'] && this.SM['lastRender'].unsubscribe) {
                        this.SM['lastRender'].unsubscribe();
                    }
                    this.SM['lastRender'] = this.lastMessageRendered.pipe(first()).subscribe((x) => {
                        if (isCurrentlyBottom) {
                            this.scrollbottom();
                        }
                    });
                    this.messageList.push(message);
                } else {
                    // get thread add it into  list
                }
            }
        } else {
            console.log('Websocket:Incoming Message : Failure');
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
}
