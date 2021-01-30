import { ChatService } from './chat.service';
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
  ThreadActivityType,
  serviceCommunicationType
} from '@models/message';
@Component({
  selector: 'app-sewn-direct-message',
  templateUrl: './sewn-direct-message.component.html',
  styleUrls: ['./sewn-direct-message.component.scss']
})
export class SewnDirectMessageComponent implements OnInit, OnDestroy, AfterViewInit {

  ORGANIZATION_TYPE = WSOrganizationType.ROASTER;
  ORGANIZATION_ID: number | null = null;
  USER_ID: number | null = null;
  UPDATE_USER_STATUS_INTERVAL = 1000 * 60; // Update  last seen and online status on every minute
  UPDATE_UNREAD_INTERVAL = 1000 * 30; // Update unread 30 sec

  WSSubject: WebSocketSubject<any> | null = null;
  WSSubscription: Subscription | null = null;
  SubscriptionMap: { [SubscriptionName: string]: Subscription } = {}
  threadList: ThreadListItem[] = [];
  authenticationState = new BehaviorSubject<'IP' | 'FAIL' | 'SUCCESS'>('IP');
  userStatusTimerRef = 0;
  unReadTimerRef = 0;
  threadListConfig = { // Add pagination
    perPage: 100,
    activePage: 1,
  };
  openedThread: ThreadListItem | null = null;
  expandView = false;
  showChat = false;


  constructor(
    private cookieService: CookieService,
    public globals: GlobalsService,
    public render: Renderer2,
    private elRef: ElementRef,
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.ORGANIZATION_ID = parseInt(this.cookieService.get('roaster_id'), 10) || null;  // NOTE : Please check this on each portal;
    this.USER_ID = parseInt(this.cookieService.get('user_id'), 10) || null;  // NOTE : Please check this on each portal;

    if (!this.USER_ID) {
      console.log('Direct Message: USER_ID is missing');
    }

    if (!this.ORGANIZATION_ID) {
      console.log('Direct Message: ORGANIZATION_ID is missing');
    }
    this.initializeWebSocket();
    this.updateUserStatus();
    this.updateUnRead();
    this.SubscriptionMap['ChatService'] = this.chatService.chatSubject.subscribe(this.chatServiceRequestHandling)
  }

  ngAfterViewInit() {
    this.SubscriptionMap['ResizeEvent'] = fromEvent(window, 'resize')
      .pipe(debounce(() => interval(500)))
      .subscribe(this.viewPortSizeChanged);
    this.viewPortSizeChanged();

  }

  initializeWebSocket() {
    this.authenticationState.next('IP');
    this.WSSubject = webSocket(`${environment.wsEndpoint}/${this.ORGANIZATION_TYPE}/${this.ORGANIZATION_ID}/messaging`);
    this.SubscriptionMap['WSSubscription'] =
      this.WSSubject.pipe(
        catchError((err: any, caught: Observable<any>) => {
          console.log('Error in WebScoket ', err);
          return caught;
        }),
        // retry(5), // REVIEW  Retry if the connection failed due to packet missing errors
      )
        .subscribe((WSmsg: WSResponse<unknown>) => {
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
      }
    } = {};
    this.threadList.forEach(x => {
      x.members.forEach(m => {
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
      }
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
      }
    };
  }

  getUnReadPayload() {
    return {
      timestamp: this.getTimeStamp(),
      type: WSCommunicationType.unread,
    };
  }

  getAuthenicationPayload() {
    const userToken = this.cookieService
      .get('Auth')
      .replace(/\r/g, '')
      .split(/\n/)[0]; // Not sure about the replace/split found same in old code
    return {
      timestamp: this.getTimeStamp(),
      type: WSCommunicationType.auth,
      data: {
        user_token: userToken,
      }
    };
  }

  handleUserDetailResponse(WSmsg: WSResponse<ResponseUserStatus[]>) {
    if (WSmsg.code === 200) {
      console.log('User Details', WSmsg);
      const userStatusMap: {
        [uniqueKey: string]: ResponseUserStatus
      } = {};
      WSmsg.data.forEach(userStatus => {
        userStatusMap[`${userStatus.user_id}_${userStatus.org_type}_${userStatus.org_id}`] = userStatus;
      });
      this.threadList.forEach(thread => {
        thread.members.forEach(member => {
          member.last_seen = userStatusMap[`${member.user_id}_${member.org_type}_${member.org_id}`].last_seen;
          member.online = userStatusMap[`${member.user_id}_${member.org_type}_${member.org_id}`].online;
          member.computed_lastseen = this.getReadableTime(member.last_seen || '');
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
        x.unread = (WSmsg?.data?.threads?.[x.id]) || 0;
      });
    } else {
      console.log('Websocket:Unread: Failure');
    }
  }

  handleThreadsResponse(WSmsg: WSResponse<ThreadListItem[]>) {
    if (WSmsg.code === 200) {
      this.threadList = WSmsg.data.filter(thread => thread.type === 'normal');
      this.threadList.forEach(thread => {
        const activeUser: ThreadMembers[] = [];
        const targtedUserList: ThreadMembers[] = [];
        thread.members.forEach(mem => {
          mem.computed_lastseen = this.getReadableTime(mem.last_seen || '');
          mem.computed_organization_name = this.getOrganization(mem.org_type);
          mem.computed_fullname = mem.first_name + ' ' + mem.last_name;
          mem.computed_profile_dp = this.getProfileImageBgStyle(mem.profile_pic);
          if (!mem.is_removed) {
            if (
              mem.org_type === this.ORGANIZATION_TYPE &&
              mem.org_id === this.ORGANIZATION_ID &&
              mem.user_id === this.USER_ID
            ) {
              activeUser.push(mem);
            } else {
              targtedUserList.push(mem);
            }
          }
        });
        thread.computed_activeUser = activeUser[0];
        thread.computed_targetedUser = targtedUserList[0];
        thread.computed_targetedUserList = targtedUserList;
        thread.computed_createdAt = this.getReadableTime(thread.activity_created_at || '');
        thread.computed_thread_createdAt = this.getReadableTime(thread.created_at || '');
        thread.computed_lastActivityText = thread.content.length > 100 ? thread.content.slice(0, 100) + '...' : thread.content;
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

  updateUserStatus = () => {
    // Fetch last_seen and online
    console.log('timeoutTick User Details Request');
    if (this.threadList.length > 0) {
      console.log('Sending User Details Request');
      this.WSSubject.next(this.getMultipleUserDetailsPayload());
    }
    if (this.userStatusTimerRef) {
      clearTimeout(this.userStatusTimerRef);
    }
    this.userStatusTimerRef = window.setTimeout(this.updateUserStatus, this.UPDATE_USER_STATUS_INTERVAL)
  }
  updateUnRead = () => {
    // Fetch unread
    console.log('timeoutTick User Unread Request');
    if (this.threadList.length > 0) {
      console.log('Sending unread Details Request');
      this.WSSubject.next(this.getUnReadPayload());
    }
    if (this.unReadTimerRef) {
      clearTimeout(this.unReadTimerRef);
    }
    this.unReadTimerRef = window.setTimeout(this.updateUnRead, this.UPDATE_UNREAD_INTERVAL) as unknown as number;
  }

  getTimeStamp(): string {
    return moment.utc().format();
  }

  ngOnDestroy() {
    for (const name in this.SubscriptionMap) {
      if (this.SubscriptionMap[name] && this.SubscriptionMap[name].unsubscribe) {
        this.SubscriptionMap[name].unsubscribe();
      }
    }
    this.destorySocket();
    if (this.userStatusTimerRef) {
      clearTimeout(this.userStatusTimerRef);
    }
    if (this.unReadTimerRef) {
      clearTimeout(this.unReadTimerRef);
    }
  }

  chatServiceRequestHandling = (req: {
    requestType: serviceCommunicationType;
    payload?: any;
  }) => {
    if (req.requestType === serviceCommunicationType.SHOW_CHAT) {
      this.showChat = true;
    } else if (req.requestType === serviceCommunicationType.CLOSE_CHAT) {
      this.showChat = false;
    } else if (req.requestType === serviceCommunicationType.TOGGLE) {
      this.showChat = !this.showChat;
    }
  }

  viewPortSizeChanged = () => {

    const chat = (this.elRef?.nativeElement?.querySelector('[data-element="chat"]')) as HTMLElement || null;
    const chatBox = (this.elRef?.nativeElement?.querySelector('[data-element="chat-box"]')) as HTMLElement || null;
    const header = (document.querySelector('header')) as HTMLElement || null;
    const footer = (document.querySelector('footer')) as HTMLElement || null;


    const chatAccountHead = (this.elRef?.nativeElement?.querySelector('[data-element="chat-account-head"]')) as HTMLElement || null;
    const liveChat = (this.elRef?.nativeElement?.querySelector('[data-element="live-chat"]')) as HTMLElement || null;
    const accountSetting = (this.elRef?.nativeElement?.querySelector('[data-element="account-setting"]')) as HTMLElement || null;
    const accountBody = (this.elRef?.nativeElement?.querySelector('[data-element="account-body"]')) as HTMLElement || null;

    let diff = (footer?.offsetHeight || 0);
    if (diff === 0) {
      diff = (header?.offsetHeight || 0);
    }

    const chatBoxCalculatedHeight = window.innerHeight - diff;
    const panelHeight = chatBoxCalculatedHeight - (chatAccountHead?.offsetHeight || 0);

    this.render.setStyle(chat, 'height', `${chatBoxCalculatedHeight}px`);
    this.render.setStyle(chatBox, 'height', `${chatBoxCalculatedHeight}px`);
    this.render.setStyle(liveChat, 'height', `${panelHeight}px`);
    this.render.setStyle(accountSetting, 'height', `${panelHeight}px`);
    this.render.setStyle(accountBody, 'height', `${panelHeight}px`);

  }

  getReadableTime(tTime: string = '') {
    const todayDate = moment();
    const messageDate = moment(tTime);
    if (messageDate.isValid) {
      const isSameYear = (todayDate.year() === messageDate.year());
      const isSameMonth = isSameYear && (todayDate.month() === messageDate.month());
      const isSameDay = isSameMonth && (todayDate.date() === messageDate.date());
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
    } else {
      return 'Unknown';
    }
  }

  getProfileImageBgStyle(profileImageUrl: string) {
    if (profileImageUrl) {
      return `url(${profileImageUrl})`;
    } else {
      return `url(assets/images/profile.svg)`; // Placeholder image
    }
  }

  closePanel() {
    this.showChat = false;
    // if adding custom functionalities => also add in chatServiceRequestHandling
  }
  openPanel() {
    this.showChat = true;
    // if adding custom functionalities => also add in chatServiceRequestHandling
  }


}
