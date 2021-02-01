import { ChatService } from './chat.service';
import { GlobalsService } from '@services';
import { retry, catchError, debounce, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subscription, Observable, BehaviorSubject, fromEvent, interval, Subject } from 'rxjs';
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
  serviceCommunicationType,
  ChatMessage,
  IncomingChatMessage
} from '@models/message';

const badwordsRegExp = require('badwords/regexp') as RegExp;
@Component({
  selector: 'app-sewn-direct-message',
  templateUrl: './sewn-direct-message.component.html',
  styleUrls: ['./sewn-direct-message.component.scss']
})
export class SewnDirectMessageComponent implements OnInit, OnDestroy, AfterViewInit {

  ORGANIZATION_TYPE = WSOrganizationType.ROASTER;
  ORGANIZATION_ID: number | null = null;
  USER_ID: number | null = null;
  UPDATE_USER_STATUS_INTERVAL = 1000 * 45; // Update  last seen and online status on every 45 sec
  UPDATE_UNREAD_INTERVAL = 1000 * 60 * 4; // Update unread on every 4 min or when a message receive.

  WSSubject: WebSocketSubject<any> | null = null;
  WSSubscription: Subscription | null = null;
  SubscriptionMap: { [SubscriptionName: string]: Subscription } = {};
  threadList: ThreadListItem[] = [];
  authenticationState = new BehaviorSubject<'IP' | 'FAIL' | 'SUCCESS'>('IP');
  userStatusTimerRef = 0;
  unReadTimerRef = 0;
  threadListConfig = {
    perPage: 100,
    activePage: 1,
  };
  messageListConfig = {
    perPage: 200,
    activePage: 1,
  };
  messageList: ChatMessage[] = [];
  openedThread: ThreadListItem | null = null;
  expandView = false;
  showChat = false;
  threadSearchKeyword = '';

  audioPlayer = new Audio('assets/sounds/notification.mp3');

  chatMessageHeadElement: HTMLElement | null = null;
  chatMessageBodyElement: HTMLElement | null = null;
  chatMessageFormElement: HTMLElement | null = null;

  messageInputElement: HTMLTextAreaElement | null = null;
  messageInput = '';

  showOffensiveMessageError = false;
  offensiveTimeout = 0;
  public lastMessageRendered = new Subject();

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
    this.audioPlayer.load();

    this.initializeWebSocket();
    this.updateUserStatus();
    this.updateUnRead();
    this.SubscriptionMap['ChatService'] = this.chatService.chatSubject.subscribe(this.chatServiceRequestHandling);

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
          } else if (WSmsg.type === WSCommunicationType.threads) {
            this.handleThreadsResponse(WSmsg as WSResponse<ThreadListItem[]>);
          } else if (WSmsg.type === WSCommunicationType.unread) {
            this.handleUnReadResponse(WSmsg as WSResponse<null>);
          } else if (WSmsg.type === WSCommunicationType.users) {
            this.handleUserDetailResponse(WSmsg as WSResponse<ResponseUserStatus[]>);
          } else if (WSmsg.type === WSCommunicationType.history) {
            this.handleThreadHistory(WSmsg as WSResponse<ChatMessage[]>);
          } else if (WSmsg.type === WSCommunicationType.message) {
            this.handleIncomingMessages(WSmsg as WSResponse<IncomingChatMessage>);
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
        // page: this.threadListConfig.activePage,
        // per_page: this.threadListConfig.perPage,
      }
    };
  }

  getUnReadPayload() {
    return {
      timestamp: this.getTimeStamp(),
      type: WSCommunicationType.unread,
    };
  }

  getMessagePayload(message: string) {
    return {
      type: WSCommunicationType.message,
      data: {
        thread_id: this.openedThread.id,
        content: message,
        meta_data: ''
      },
      timestamp: this.getTimeStamp(),
    };
  }

  getHistoryPayload(thread: ThreadListItem) {
    return {
      timestamp: this.getTimeStamp(),
      type: WSCommunicationType.history,
      data: {
        thread_id: thread.id,
        // from_time: moment().add(2, 'year').utc().format('YYYY-MM-DD HH:mm:ss'),
        // to_time: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        page: this.messageListConfig.activePage,
        per_page: this.messageListConfig.perPage
      }
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
    threadUser.computed_lastseen = this.getReadableTime(threadUser.last_seen || '');
    threadUser.computed_organization_name = this.getOrganization(threadUser.org_type);
    threadUser.computed_fullname = threadUser.first_name + ' ' + threadUser.last_name;
    threadUser.computed_profile_dp = this.getProfileImageBgStyle(threadUser.profile_pic);
  }

  handleIncomingMessages(WSmsg: WSResponse<IncomingChatMessage>) {
    console.log('incoming', WSmsg);
    const message = WSmsg.data;
    if ((WSmsg.code === 201) && ((message?.content || '').trim() !== '')) {
      if (message.activity_type === ThreadActivityType.message) {
        const inThread = this.threadList.find(thread => thread.id === message.thread_id);
        if (inThread) {
          this.processChatMessages(message, inThread);
          const user = message?.member?.user;
          if (user) {
            this.processThreadUser(user);
            console.log('incoming processed msg', user);
          }
          if (this.openedThread && (this.openedThread.id === message.thread_id)) {
            this.lastMessageRendered.pipe(first()).subscribe(x => {
              this.scrollbottom();
            });
            this.messageList.push(message);
            this.openedThread.computed_lastActivityText = message.content;
            this.sendReadToken(message.id);
          } else {
            inThread.computed_lastActivityText = message.content;
            this.updateUnRead();
            if (!inThread.computed_mute) {
              this.playNotificationSound();
            }
          }
        } else {
          // get thread add it into  list
        }
      }
    } else {
      console.log('Websocket:Incoming Message : Failure');
    }
  }
  playNotificationSound() {
    this.audioPlayer.play();
  }

  handleThreadHistory(WSmsg: WSResponse<ChatMessage[]>) {
    if (WSmsg.code === 200) {
      this.messageList = WSmsg.data.filter(x => (x.activity_type === ThreadActivityType.message) && (x.content.trim() !== '')).reverse();
      this.messageList.forEach(message => {
        this.processChatMessages(message, this.openedThread);
      });
      const lastMessage = this.messageList[this.messageList.length - 1];
      if (lastMessage) {
        if (lastMessage && lastMessage.content) {
          this.openedThread.computed_lastActivityText = lastMessage.content;

        }
        this.sendReadToken(lastMessage.id);
      }
      this.updateUnRead();
    } else {
      console.log('Websocket:Thread History: Failure');
    }
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
      this.threadList = (WSmsg.data || []).filter(thread => thread.type === 'normal');
      this.threadList.forEach(thread => {
        const activeUser: ThreadMembers[] = [];
        const targtedUserList: ThreadMembers[] = [];
        thread.members.forEach(mem => {
          this.processThreadUser(mem);
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
        thread.computed_mute = false;
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
    if (this.threadList.length > 0) {
      this.WSSubject.next(this.getMultipleUserDetailsPayload());
    }
    if (this.userStatusTimerRef) {
      clearTimeout(this.userStatusTimerRef);
    }
    this.userStatusTimerRef = window.setTimeout(this.updateUserStatus, this.UPDATE_USER_STATUS_INTERVAL);
  }
  updateUnRead = () => {
    // Fetch unread
    if (this.threadList.length > 0) {
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
      this.openPanel();
    } else if (req.requestType === serviceCommunicationType.CLOSE_CHAT) {
      this.closePanel();
    } else if (req.requestType === serviceCommunicationType.TOGGLE) {
      if (this.showChat) {
        this.closePanel();
      } else {
        this.openPanel();
      }
    }
  }



  viewPortSizeChanged = () => {

    const chat = (this.elRef?.nativeElement?.querySelector('[data-element="chat"]')) as HTMLElement || null;
    const chatBox = (this.elRef?.nativeElement?.querySelector('[data-element="chat-box"]')) as HTMLElement || null;
    const header = (document.querySelector('header')) as HTMLElement || null;
    const footer = (document.querySelector('footer')) as HTMLElement || null;


    const chatAccountHead = (this.elRef?.nativeElement?.querySelector('[data-element="chat-account-head"]')) as HTMLElement || null;
    const liveChat = (this.elRef?.nativeElement?.querySelector('[data-element="live-chat"]')) as HTMLElement || null;
    const chatbodyExpand = (this.elRef?.nativeElement?.querySelector('[data-element="chat-body-expand"]')) as HTMLElement || null;
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

    if (window.innerWidth <= 768) {
      if (this.expandView) {
        this.closeExapndView();
      }
      this.render.removeStyle(chatbodyExpand, 'height');
    } else {
      this.render.setStyle(chatbodyExpand, 'height', `${panelHeight}px`);
    }
    // this.chatBodyHeightAdjust();
  }


  chatBodyHeightAdjust() {
    this.updateChatFormRef();
    this.updateChatHeadRef();
    this.updateChatMessageBodyElRef();
    this.updateMessageInputElRef();
    if (this.messageInputElement) {
      this.render.removeStyle(this.messageInputElement, 'height');
      const inputHeight = this.messageInputElement.offsetHeight;
      const scrollHeight = this.messageInputElement.scrollHeight;
      if (inputHeight < scrollHeight) {
        this.render.setStyle(
          this.messageInputElement,
          'height',
          Math.min(scrollHeight, 80) + 'px'
        );
      }
    }
    if (this.chatMessageBodyElement && this.chatMessageFormElement && this.chatMessageHeadElement) {
      const diff = this.chatMessageFormElement.offsetHeight + this.chatMessageHeadElement.offsetHeight;
      this.render.setStyle(this.chatMessageBodyElement, 'height', `calc( 100% - ${diff}px)`);
    }
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

  updateChatMessageBodyElRef() {
    if (!this.chatMessageBodyElement) {
      this.chatMessageBodyElement = (
        this.elRef?.nativeElement?.
          querySelector('[data-element="live-chat-message-body"]')
      ) as HTMLElement || null;
    }
  }
  updateMessageInputElRef() {
    if (!this.messageInputElement) {
      this.messageInputElement = (
        this.elRef?.nativeElement?.
          querySelector('[data-element="messag-text-area"]')
      ) as HTMLTextAreaElement || null;
    }
  }

  updateChatHeadRef() {
    if (!this.chatMessageHeadElement) {
      this.chatMessageHeadElement = (
        this.elRef?.nativeElement?.
          querySelector('[data-element="live-chat-head"]')
      ) as HTMLElement || null;
    }
  }

  updateChatFormRef() {
    if (!this.chatMessageFormElement) {
      this.chatMessageFormElement = (
        this.elRef?.nativeElement?.
          querySelector('[data-element="message-form"]')
      ) as HTMLElement || null;
    }
  }


  getProfileImageBgStyle(profileImageUrl: string) {
    if (profileImageUrl) {
      return `url(${profileImageUrl})`;
    } else {
      return `url(assets/images/profile.svg)`; // Placeholder image
    }
  }

  inputkeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
  inputChanges(event: InputEvent) {
    this.chatBodyHeightAdjust();
  }


  sendMessage() {
    clearTimeout(this.offensiveTimeout);
    this.showOffensiveMessageError = false;
    const msg = this.messageInput.trim();
    if (msg !== '') {
      badwordsRegExp.lastIndex = 0;
      if (badwordsRegExp.test(msg)) {
        this.showOffensiveMessageError = true;
        this.offensiveTimeout = window.setTimeout(this.offensiveTimeoutHandler, 5000);
      } else {
        this.WSSubject.next(this.getMessagePayload(msg));
        this.messageInput = '';
        this.chatBodyHeightAdjust();
      }
    }
  }

  sendReadToken(lastMessageId: number) {
    this.WSSubject.next({
      type: WSCommunicationType.read,
      timestamp: this.getTimeStamp(),
      data: {
        thread_id: this.openedThread.id,
        last_read_id: lastMessageId
      }
    });
  }

  offensiveTimeoutHandler = () => {
    this.showOffensiveMessageError = false;
  }

  openThreadChat(thread: ThreadListItem) {
    this.messageList = [];
    this.openedThread = thread;
    this.WSSubject.next(this.getHistoryPayload(thread));
    this.lastMessageRendered.pipe(first()).subscribe(x => {
      this.chatBodyHeightAdjust();
      this.scrollbottom();
    });
  }
  scrollbottom() {
    this.updateChatMessageBodyElRef();
    this.chatMessageBodyElement.scrollTop = this.chatMessageBodyElement.scrollHeight;
  }

  backToAccountListing() {
    this.openedThread = null;
    this.messageList = [];
  }

  closePanel() {
    this.showChat = false;
  }

  openExapndView() {
    this.chatMessageHeadElement = null;
    this.chatMessageBodyElement = null;
    this.chatMessageFormElement = null;
    this.messageInputElement = null;
    this.expandView = true;
    this.viewPortSizeChanged();
    this.lastMessageRendered.pipe(first()).subscribe(x => {
      this.chatBodyHeightAdjust();
    });
  }
  closeExapndView() {
    this.chatMessageHeadElement = null;
    this.chatMessageBodyElement = null;
    this.chatMessageFormElement = null;
    this.messageInputElement = null;
    this.expandView = false;
    this.viewPortSizeChanged();
    this.lastMessageRendered.pipe(first()).subscribe(x => {
      this.chatBodyHeightAdjust();
    });
  }
  toggleExpandView() {
    if (this.expandView) {
      this.closeExapndView();
    } else {
      this.openExapndView();
    }
  }

  openPanel() {
    this.showChat = true;
    this.lastMessageRendered.pipe(first()).subscribe(x => {
      this.chatBodyHeightAdjust();
    });
  }

}
