import { GlobalsService } from '@services';

import { retry, catchError, debounce } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subscription, Observable, BehaviorSubject, fromEvent, interval } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, OnDestroy, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import * as moment from 'moment';
import {
    WSOrganizationType,
    WSCommunicationType,
    WSResponse,
    ThreadListItem,
    ThreadMembers,
    ResponseUserStatus,
} from '@models/message';
@Component({
    selector: 'app-new-direct-message',
    templateUrl: './new-direct-message.component.html',
    styleUrls: ['./new-direct-message.component.scss'],
})
export class NewDirectMessageComponent implements OnInit, OnDestroy, AfterViewInit {
    ORGANIZATION_TYPE = WSOrganizationType.ROASTER;
    ORGANIZATION_ID: number | null = null;
    USER_ID: number | null = null;
    UPDATE_USER_STATUS_INTERVAL = 1000 * 60; // Update  last seen and online status on every minute
    UPDATE_UNREAD_INTERVAL = 1000 * 30; // Update unread 30 sec

    WSSubject: WebSocketSubject<any> | null = null;
    WSSubscription: Subscription | null = null;
    SubscriptionMap: { [SubscriptionName: string]: Subscription } = {};
    threadList: ThreadListItem[] = [];
    authenticationState = new BehaviorSubject<'IP' | 'FAIL' | 'SUCCESS'>('IP');
    userStatusTimerRef = 0;
    unReadTimerRef = 0;
    threadListConfig = {
        // Add pagination
        perPage: 100,
        activePage: 1,
    };

    constructor(
        private cookieService: CookieService,
        public globals: GlobalsService,
        public render: Renderer2,
        private elRef: ElementRef,
    ) {}

    ngOnInit(): void {
        this.ORGANIZATION_ID = parseInt(this.cookieService.get('roaster_id'), 10) || null; // NOTE : Please check this on each portal;
        this.USER_ID = parseInt(this.cookieService.get('user_id'), 10) || null; // NOTE : Please check this on each portal;

        if (!this.USER_ID) {
            console.log('Direct Message: USER_ID is missing');
        }

        if (!this.ORGANIZATION_ID) {
            console.log('Direct Message: ORGANIZATION_ID is missing');
        }
        this.initializeWebSocket();
        this.updateUserStatus();
        this.updateUnRead();
    }

    ngAfterViewInit() {
        this.SubscriptionMap['ResizeEvent'] = fromEvent(document, 'click')
            .pipe(debounce(() => interval(500)))
            .subscribe(this.viewPortSizeChanged);
    }

    initializeWebSocket() {
        this.authenticationState.next('IP');
        this.WSSubject = webSocket(
            `${environment.wsEndpoint}/${this.ORGANIZATION_TYPE}/${this.ORGANIZATION_ID}/messaging`,
        );
        this.SubscriptionMap['WSSubscription'] = this.WSSubject.pipe(
            catchError((err: any, caught: Observable<any>) => {
                console.log('Error in WebScoket ', err);
                return caught;
            }),
            // retry(5), // REVIEW  Retry if the connection failed due to packet missing errors
        ).subscribe((WSmsg: WSResponse<unknown>) => {
            if (WSmsg.type === WSCommunicationType.auth) {
                this.handleAuthResponse(WSmsg as WSResponse<null>);
            }
            if (WSmsg.type === WSCommunicationType.threads) {
                this.handleThreadsResponse(WSmsg as WSResponse<ThreadListItem[]>);
            }
            if (WSmsg.type === WSCommunicationType.unread) {
                this.handleUnReadResponse(WSmsg as WSResponse<null>);
            }
            if (WSmsg.type === WSCommunicationType.users) {
                this.handleUserDetailResponse(WSmsg as WSResponse<ResponseUserStatus[]>);
            }
        });
        this.WSSubject.next(this.getAuthenicationPayload()); // Authenticate
    }

    destorySocket() {
        if (this.WSSubject && this.WSSubject.complete) {
            this.WSSubject.complete(); // Closing connection
        }
    }

    getMultipleUserDetailsPayload() {
        const userPayload: {
            [uniqueKey: string]: {
                org_id: number;
                org_type: string;
                user_id: number;
            };
        } = {};
        this.threadList.forEach((x) => {
            x.members.forEach((m) => {
                userPayload[`${m.user_id}_${m.org_type}_${m.org_id}`] = {
                    org_id: m.org_id,
                    org_type: m.org_type,
                    user_id: m.user_id,
                };
            });
        });
        return {
            timestamp: this.getTimeStamp(),
            type: WSCommunicationType.users,
            data: {
                members: Object.values(userPayload),
            },
        };
    }

    getCurrentThreadPayload() {
        return {
            timestamp: this.getTimeStamp(),
            type: WSCommunicationType.threads,
            data: {
                user_id: this.USER_ID,
                org_type: this.ORGANIZATION_TYPE,
                org_id: this.ORGANIZATION_ID,
                page: this.threadListConfig.activePage,
                per_page: this.threadListConfig.perPage,
            },
        };
    }

    getUnReadPayload() {
        return {
            timestamp: this.getTimeStamp(),
            type: WSCommunicationType.unread,
        };
    }

    getAuthenicationPayload() {
        const userToken = this.cookieService.get('Auth').replace(/\r/g, '').split(/\n/)[0]; // Not sure about the replace/split found same in old code
        return {
            timestamp: this.getTimeStamp(),
            type: WSCommunicationType.auth,
            data: {
                user_token: userToken,
            },
        };
    }

    handleUserDetailResponse(WSmsg: WSResponse<ResponseUserStatus[]>) {
        if (WSmsg.code === 200) {
            console.log('User Details', WSmsg);
            const userStatusMap: {
                [uniqueKey: string]: ResponseUserStatus;
            } = {};
            WSmsg.data.forEach((userStatus) => {
                userStatusMap[`${userStatus.user_id}_${userStatus.org_type}_${userStatus.org_id}`] = userStatus;
            });
            this.threadList.forEach((thread) => {
                thread.members.forEach((member) => {
                    member.last_seen = userStatusMap[`${member.user_id}_${member.org_type}_${member.org_id}`].last_seen;
                    member.online = userStatusMap[`${member.user_id}_${member.org_type}_${member.org_id}`].online;
                });
            });
        } else {
            console.log('Websocket:User Details: Failure');
        }
    }

    handleUnReadResponse(WSmsg: WSResponse<{ threads: { [threadId: number]: number } }>) {
        if (WSmsg.code === 200) {
            console.log('Unread List Details', WSmsg);
            this.threadList.forEach((x) => {
                x.unread = WSmsg?.data?.threads?.[x.id] || 0;
            });
        } else {
            console.log('Websocket:Unread: Failure');
        }
    }

    handleThreadsResponse(WSmsg: WSResponse<ThreadListItem[]>) {
        if (WSmsg.code === 200) {
            this.threadList = WSmsg.data.filter((thread) => thread.type === 'normal');
            this.threadList.forEach((thread) => {
                // thread.members
            });
            console.log('Thread Listing', WSmsg);
            this.updateUserStatus();
            this.updateUnRead();
        } else {
            console.log('Websocket:Thread: Failure');
        }
    }

    handleAuthResponse(WSmsg: WSResponse<null>) {
        this.authenticationState.next(WSmsg.code === 200 ? 'SUCCESS' : 'FAIL');
        if (WSmsg.code === 400) {
            console.log('Websocket:Auth: Invalid Input Data Format ');
        } else if (WSmsg.code === 401) {
            console.log('Websocket:Auth: Authentication Error');
        } else if (WSmsg.code === 409) {
            console.log('Websocket:Auth: Already Authenticated Error');
        } else if (WSmsg.code === 422) {
            console.log('Websocket:Auth: Validation Error');
        } else if (WSmsg.code === 200) {
            this.authenticationState.next('SUCCESS');
            this.WSSubject.next(this.getCurrentThreadPayload());
            console.log('Websocket:Auth: Success');
        }
    }

    updateUserStatus() {
        // Fetch last_seen and online
        if (this.threadList.length > 0) {
            this.WSSubject.next(this.getMultipleUserDetailsPayload());
        }
        if (this.userStatusTimerRef) {
            clearTimeout(this.userStatusTimerRef);
            this.userStatusTimerRef = (setTimeout(
                this.updateUserStatus,
                this.UPDATE_USER_STATUS_INTERVAL,
            ) as unknown) as number;
        }
    }
    updateUnRead() {
        // Fetch unread
        if (this.threadList.length > 0) {
            this.WSSubject.next(this.getUnReadPayload());
        }
        if (this.unReadTimerRef) {
            clearTimeout(this.unReadTimerRef);
            this.unReadTimerRef = (setTimeout(this.updateUnRead, this.UPDATE_UNREAD_INTERVAL) as unknown) as number;
        }
    }

    getTimeStamp(): string {
        return moment.utc().format();
    }

    ngOnDestroy() {
        this.destorySocket();
        for (const name in this.SubscriptionMap) {
            if (this.SubscriptionMap[name] && this.SubscriptionMap[name].unsubscribe) {
                this.SubscriptionMap[name].unsubscribe();
            }
        }
        if (this.userStatusTimerRef) {
            clearTimeout(this.userStatusTimerRef);
        }
        if (this.unReadTimerRef) {
            clearTimeout(this.unReadTimerRef);
        }
    }

    viewPortSizeChanged = () => {
        const chatAccountHead =
            (this.elRef?.nativeElement?.querySelector('[data-element="chat-account-head"]') as HTMLElement) || null;
        const liveChatHead =
            (this.elRef?.nativeElement?.querySelector('[data-element="live-chat-head"]') as HTMLElement) || null;
        const chatMessageForm =
            (this.elRef?.nativeElement?.querySelector('[data-element="message-form"]') as HTMLElement) || null;
        const liveChatBody =
            (this.elRef?.nativeElement?.querySelector('[data-element="live-chat-message-body"]') as HTMLElement) ||
            null;

        const totalHeight =
            (chatAccountHead?.offsetHeight || 0) +
            (liveChatHead?.offsetHeight || 0) +
            (chatMessageForm?.offsetHeight || 0);
        if (liveChatBody) {
            this.render.setStyle(liveChatBody, 'height', `calc(100vh - ${totalHeight}px )`);
            // liveChatBody.scrollTop = liveChatBody.scrollHeight - liveChatBody.clientHeight;
        }
    };
}
