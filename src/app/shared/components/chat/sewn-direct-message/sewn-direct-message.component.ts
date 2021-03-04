/* tslint:disable no-string-literal */
import { debounce, first, filter } from 'rxjs/operators';
import { Subscription, fromEvent, interval, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { UserserviceService, SocketService, ChatHandlerService, ChatUtil, GlobalsService } from '@services';

import {
    WSResponse,
    ThreadListItem,
    ThreadMember,
    ResponseUserStatus,
    ChatMessage,
    IncomingChatMessage,
    UserListItem,
    OpenChatThread,
    RecentUserListItem,
} from '@models';
import { ThreadActivityType, OrganizationType, ThreadType, ServiceCommunicationType, ChatMessageType } from '@enums';

const badwordsRegExp = require('badwords/regexp') as RegExp;
@Component({
    selector: 'app-sewn-direct-message',
    templateUrl: './sewn-direct-message.component.html',
    styleUrls: ['./sewn-direct-message.component.scss'],
})
export class SewnDirectMessageComponent implements OnInit, OnDestroy, AfterViewInit {
    private UPDATE_USER_STATUS_INTERVAL = 1000 * 45; // Update  last seen and online status on every 45 sec
    private UPDATE_UNREAD_INTERVAL = 1000 * 60 * 4; // Update unread on every 4 min or when a message receive.

    private SM: { [SubscriptionName: string]: Subscription } = {}; // Subscrition MAP object
    public threadList: ThreadListItem[] = [];
    private TIMESTAMP_MAP: { [K in ChatMessageType]: string } = {} as { [K in ChatMessageType]: string };
    private userStatusTimerRef = 0;
    private unReadTimerRef = 0;
    public usersList: UserListItem[] = [];
    public recentUserList: RecentUserListItem[] = [];
    public userSearchKeywords = '';
    public selectedUser: ThreadMember | null = null;
    private threadListConfig = {
        perPage: 200,
        activePage: 1,
    };
    private messageListConfig = {
        perPage: 300,
        activePage: 1,
    };
    public messageList: ChatMessage[] = [];
    public openedThread: ThreadListItem | null = null;

    public threadSearchKeyword = '';

    private chatMessageHeadElement: HTMLElement | null = null;
    private chatMessageBodyElement: HTMLElement | null = null;
    private chatMessageFormElement: HTMLElement | null = null;

    private messageInputElement: HTMLTextAreaElement | null = null;
    public messageInput = '';

    public showOffensiveMessageError = false;
    private offensiveTimeout = 0;

    public lastMessageRendered = new Subject();
    public chatBoxpanelRendered = new Subject<'EXPAND' | 'COLLAPSE'>();
    public userSearchPanelRendered = new Subject();
    public threadFinderReturned = new Subject();
    public chatVisibilityRendered = new Subject<boolean>();

    constructor(
        public globals: GlobalsService,
        private render: Renderer2,
        private elRef: ElementRef,
        private socket: SocketService,
        public chatService: ChatHandlerService,
        private userService: UserserviceService,
        private chatUtil: ChatUtil,
    ) {}

    ngOnInit(): void {
        this.SM['WSState'] = this.socket.socketState.subscribe((value) => {
            if (value === 'CONNECTED') {
                this.initializeWebSocket();
            }
        });
        this.SM['ChatHandlerService'] = this.chatService.chatSubject.subscribe(this.chatServiceRequestHandling);
    }

    ngAfterViewInit() {
        this.SM['ResizeEvent'] = fromEvent(window, 'resize')
            .pipe(debounce(() => interval(500)))
            .subscribe(this.viewPortSizeChanged);
        this.viewPortSizeChanged();
    }

    initializeWebSocket() {
        if (this.SM['WSSubscription'] && this.SM['WSSubscription'].unsubscribe) {
            this.SM['WSSubscription'].unsubscribe();
        }
        this.SM['WSSubscription'] = this.socket.chatReceive.subscribe((WSmsg: WSResponse<unknown>) => {
            if (WSmsg.type === ChatMessageType.threads) {
                if (this.TIMESTAMP_MAP[WSmsg.type] === WSmsg.timestamp) {
                    this.handleThreadsResponse(WSmsg as WSResponse<ThreadListItem[]>);
                }
            } else if (WSmsg.type === ChatMessageType.unread) {
                if (this.TIMESTAMP_MAP[WSmsg.type] === WSmsg.timestamp) {
                    this.handleUnReadResponse(WSmsg as WSResponse<null>);
                }
            } else if (WSmsg.type === ChatMessageType.users) {
                if (this.TIMESTAMP_MAP[WSmsg.type] === WSmsg.timestamp) {
                    this.handleUserDetailResponse(WSmsg as WSResponse<ResponseUserStatus[]>);
                }
            } else if (WSmsg.type === ChatMessageType.history) {
                if (this.TIMESTAMP_MAP[WSmsg.type] === WSmsg.timestamp) {
                    this.handleThreadHistory(WSmsg as WSResponse<ChatMessage[]>);
                }
            } else if (WSmsg.type === ChatMessageType.message) {
                this.handleIncomingMessages(WSmsg as WSResponse<IncomingChatMessage>);
            } else if (WSmsg.type === ChatMessageType.getCreate) {
                if (this.TIMESTAMP_MAP[WSmsg.type] === WSmsg.timestamp) {
                    this.handleFindThreadRequest(WSmsg as WSResponse<ThreadListItem[]>);
                }
            } else if (WSmsg.type === ChatMessageType.thread) {
                if (this.TIMESTAMP_MAP[WSmsg.type] === WSmsg.timestamp) {
                    this.handleRequestedThreadDetails(WSmsg as WSResponse<ThreadListItem>);
                }
            }
        });

        this.SM['WSAuthentication'] = this.socket.authenticate().subscribe((res) => {
            if (res === 'SUCCESS') {
                this.socket.chatSent.next(this.getCurrentThreadPayload());
                this.updateUserStatus();
                this.updateUnRead();
            }
        });
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
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.users] = timestamp;
        return {
            timestamp,
            type: ChatMessageType.users,
            data: {
                members: Object.values(userPayload),
            },
        };
    }

    getCurrentThreadPayload() {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.threads] = timestamp;
        return {
            timestamp,
            type: ChatMessageType.threads,
            data: {
                user_id: this.chatUtil.USER_ID,
                org_type: this.chatUtil.ORGANIZATION_TYPE,
                org_id: this.chatUtil.ORGANIZATION_ID,
                // page: this.threadListConfig.activePage,
                // per_page: this.threadListConfig.perPage,
            },
        };
    }

    getUnReadPayload() {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.unread] = timestamp;
        return {
            timestamp,
            type: ChatMessageType.unread,
        };
    }

    getMessagePayload(message: string) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.message] = timestamp;
        return {
            type: ChatMessageType.message,
            timestamp,
            data: {
                thread_id: this.openedThread.id,
                content: message,
                meta_data: '',
            },
        };
    }

    getHistoryPayload(thread: ThreadListItem) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.history] = timestamp;
        return {
            timestamp,
            type: ChatMessageType.history,
            data: {
                thread_id: thread.id,
                // from_time: moment().add(2, 'year').utc().format('YYYY-MM-DD HH:mm:ss'),
                // to_time: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
                page: this.messageListConfig.activePage,
                per_page: this.messageListConfig.perPage,
            },
        };
    }

    findThread(payload: OpenChatThread) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.getCreate] = timestamp;
        console.log('Open chat request payload', payload);
        this.socket.chatSent.next({
            timestamp,
            type: ChatMessageType.getCreate,
            data: payload,
        });
    }

    threadRequestByNewMessage(threadId: number) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.thread] = timestamp;
        this.socket.chatSent.next({
            timestamp,
            type: ChatMessageType.thread,
            data: {
                thread_id: threadId,
            },
        });
    }

    processChatMessages(
        message: ChatMessage | IncomingChatMessage,
        thread: ThreadListItem,
    ): ChatMessage | IncomingChatMessage {
        message.computed_date = this.chatUtil.getReadableTime(message.updated_at || message.created_at);
        if (thread.computed_targetedUser.id === message.member.id) {
            message.computed_author = thread.computed_targetedUser;
            message.isActiveUser = false;
        } else if (thread.computed_activeUser.id === message.member.id) {
            message.computed_author = thread.computed_activeUser;
            message.isActiveUser = true;
        }
        return message;
    }
    processThreadUser(threadUser: ThreadMember): ThreadMember {
        threadUser.last_seen = threadUser.last_seen || '';
        threadUser.computed_lastseen = this.chatUtil.getReadableTime(threadUser.last_seen || '');
        threadUser.computed_organization_name = this.chatUtil.getOrganization(threadUser.org_type);
        threadUser.computed_fullname = threadUser.first_name + ' ' + threadUser.last_name;
        threadUser.computed_profile_dp = this.getProfileImageBgStyle(threadUser.profile_pic);
        threadUser.computed_profile_direct_url = this.getProfileImageDirectURL(threadUser.profile_pic);
        return threadUser;
    }

    processThreads(thread: ThreadListItem): ThreadListItem {
        const activeUser: ThreadMember[] = [];
        const targtedUserList: ThreadMember[] = [];
        thread.members.forEach((mem) => {
            this.processThreadUser(mem);
            if (!mem.is_removed) {
                if (
                    mem.org_type === this.chatUtil.ORGANIZATION_TYPE &&
                    mem.org_id === this.chatUtil.ORGANIZATION_ID &&
                    mem.user_id === this.chatUtil.USER_ID
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
        thread.computed_createdAt = this.chatUtil.getReadableTime(thread.activity_created_at || '');
        thread.computed_thread_createdAt = this.chatUtil.getReadableTime(thread.created_at || '');
        thread.computed_lastActivityText =
            thread.content.length > 100 ? thread.content.slice(0, 100) + '...' : thread.content;
        return thread;
    }

    handleIncomingMessages(WSmsg: WSResponse<IncomingChatMessage>) {
        let message = WSmsg.data;
        if (WSmsg.code === 201 && (message?.content || '').trim() !== '') {
            if (message.activity_type === ThreadActivityType.message) {
                const inThread = this.threadList.find((thread) => thread.id === message.thread_id);
                if (inThread) {
                    message = this.processChatMessages(message, inThread) as IncomingChatMessage;
                    const user = message?.member?.user;
                    if (user) {
                        this.processThreadUser(user);
                    }
                    if (this.openedThread && this.openedThread.id === message.thread_id) {
                        this.updateChatMessageBodyElRef();
                        if (this.SM['lastRender'] && this.SM['lastRender'].unsubscribe) {
                            this.SM['lastRender'].unsubscribe();
                        }
                        this.SM['lastRender'] = this.lastMessageRendered.pipe(first()).subscribe((x) => {
                            this.scrollbottom();
                        });
                        const lastMessage = this.messageList[this.messageList.length - 1];
                        message.showUserBadge = lastMessage.isActiveUser && !message.isActiveUser;
                        this.messageList.push(message);
                        this.openedThread.computed_lastActivityText = message.content;
                        this.sendReadToken(message.id);
                    } else {
                        inThread.computed_lastActivityText = message.content;
                        if (!inThread.computed_mute) {
                            // The play sound is'nt playing for sender since his chat open
                            this.chatUtil.playNotificationSound('INCOMING');
                        }
                    }
                    const threadIndex = this.threadList.findIndex((thread) => thread.id === inThread.id);
                    this.threadList.splice(threadIndex, 1);
                    this.threadList.unshift(inThread); // Pushing into top
                    this.updateUnRead();
                } else {
                    this.threadRequestByNewMessage(message.thread_id);
                }
            } else {
                console.log('Incoming message not correct message type');
            }
        } else {
            console.log('Incoming message incorrect status/content');
        }
    }

    isCurrentlyBottom() {
        if (this.chatMessageBodyElement) {
            return (
                this.chatMessageBodyElement.scrollTop + this.chatMessageBodyElement.clientHeight ===
                this.chatMessageBodyElement.scrollHeight
            );
        }
        return false;
    }

    handleThreadHistory(WSmsg: WSResponse<ChatMessage[]>) {
        if (WSmsg.code === 200) {
            this.messageList = WSmsg.data
                .filter((x) => x.activity_type === ThreadActivityType.message && x.content.trim() !== '')
                .reverse();
            let showUserBadge = true; // Set true on To message, and false after first From message
            // Need different logic for group chat
            for (let index = 0, len = this.messageList.length; index < len; index++) {
                this.messageList[index] = this.processChatMessages(this.messageList[index], this.openedThread);
                if (!this.messageList[index].isActiveUser) {
                    this.messageList[index].showUserBadge = showUserBadge;
                    showUserBadge = false;
                } else {
                    this.messageList[index].showUserBadge = false; // always false on TO message
                    showUserBadge = true;
                }
            }
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
            const userStatusMap: {
                [uniqueKey: string]: ResponseUserStatus;
            } = {};
            WSmsg.data.forEach((userStatus) => {
                userStatusMap[`${userStatus.user_id}_${userStatus.org_type}_${userStatus.org_id}`] = userStatus;
            });
            this.threadList.forEach((thread) => {
                thread.members.forEach((member) => {
                    member.last_seen =
                        userStatusMap[`${member.user_id}_${member.org_type}_${member.org_id}`]?.last_seen || '';
                    member.online = userStatusMap[`${member.user_id}_${member.org_type}_${member.org_id}`].online;
                    member.computed_lastseen = this.chatUtil.getReadableTime(member.last_seen || '');
                });
            });
        } else {
            console.log('Websocket:User Details: Failure');
        }
    }

    handleUnReadResponse(WSmsg: WSResponse<{ threads: { [threadId: number]: number } }>) {
        if (WSmsg.code === 200) {
            let totalCount = 0;
            this.threadList.forEach((x) => {
                const count = WSmsg?.data?.threads?.[x.id] || 0;
                x.unread = count;
                totalCount += count;
            });
            this.chatService.unReadCount.next(totalCount);
        } else {
            console.log('Websocket:Unread: Failure');
        }
    }

    handleThreadsResponse(WSmsg: WSResponse<ThreadListItem[]>) {
        if (WSmsg.code === 200) {
            this.threadList = (WSmsg.data || []).filter((thread) => thread.type === ThreadType.normal);
            this.threadList.forEach((thread) => {
                this.processThreads(thread);
            });
            this.updateUserStatus();
            this.updateUnRead();
        } else {
            console.log('Websocket:Thread: Failure');
        }
    }

    handleFindThreadRequest(WSmsg: WSResponse<ThreadListItem[]>) {
        if (WSmsg.code === 200 || WSmsg.code === 201) {
            let thread = WSmsg.data[0];
            if (thread.type === ThreadType.normal) {
                this.threadFinderReturned.next('done');
                thread = this.processThreads(thread);
                const existingThread = this.threadList.find((t) => t.id === thread.id);
                this.openPanel();
                if (existingThread) {
                    this.openThreadChat(existingThread);
                } else {
                    this.threadList.unshift(thread);
                    this.openThreadChat(thread);
                }
            } else {
                console.error('Find Thread: Received non direct message thread ');
            }
        } else {
            console.log('Websocket:Find Thread: Failure');
        }
    }

    handleRequestedThreadDetails(WSmsg: WSResponse<ThreadListItem>) {
        if (WSmsg.code === 200) {
            let thread = WSmsg.data;
            if (thread.type === ThreadType.normal) {
                thread = this.processThreads(thread);
                const existingThread = this.threadList.find((t) => t.id === thread.id);
                if (!existingThread) {
                    this.threadList.unshift(thread);
                }
                if (!thread.computed_mute) {
                    this.chatUtil.playNotificationSound('INCOMING');
                }
                this.updateUserStatus();
                this.updateUnRead();
            } else {
                console.error('Websocket:Requested-thread: Received non direct message thread ');
            }
        } else {
            console.log('Websocket:Requested-thread Thread: Failure');
        }
    }

    updateUserStatus = () => {
        // Fetch last_seen and online
        if (this.threadList.length > 0) {
            this.socket.chatSent.next(this.getMultipleUserDetailsPayload());
        }
        if (this.userStatusTimerRef) {
            clearTimeout(this.userStatusTimerRef);
        }
        this.userStatusTimerRef = window.setTimeout(this.updateUserStatus, this.UPDATE_USER_STATUS_INTERVAL);
    };
    updateUnRead = () => {
        // Fetch unread
        if (this.threadList.length > 0) {
            this.socket.chatSent.next(this.getUnReadPayload());
        }
        if (this.unReadTimerRef) {
            clearTimeout(this.unReadTimerRef);
        }
        this.unReadTimerRef = (window.setTimeout(this.updateUnRead, this.UPDATE_UNREAD_INTERVAL) as unknown) as number;
    };

    ngOnDestroy() {
        for (const name in this.SM) {
            if (this.SM[name] && this.SM[name].unsubscribe) {
                this.SM[name].unsubscribe();
            }
        }
        if (this.userStatusTimerRef) {
            clearTimeout(this.userStatusTimerRef);
        }
        if (this.unReadTimerRef) {
            clearTimeout(this.unReadTimerRef);
        }
    }

    chatServiceRequestHandling = (req: { requestType: ServiceCommunicationType; payload?: any }) => {
        if (req.requestType === ServiceCommunicationType.SHOW_CHAT) {
            this.openPanel();
        } else if (req.requestType === ServiceCommunicationType.CLOSE_CHAT) {
            this.closePanel();
        } else if (req.requestType === ServiceCommunicationType.TOGGLE) {
            if (this.chatService.isOpen.value) {
                this.closePanel();
            } else {
                this.openPanel();
            }
        } else if (req.requestType === ServiceCommunicationType.OPEN_THREAD) {
            this.findThread(req.payload as OpenChatThread);
        }
    };

    viewPortSizeChanged = () => {
        const expandBackDrop =
            (this.elRef?.nativeElement?.querySelector('[data-element="expand-backdrop"]') as HTMLElement) || null;
        const chat = (this.elRef?.nativeElement?.querySelector('[data-element="chat"]') as HTMLElement) || null;
        const chatBox = (this.elRef?.nativeElement?.querySelector('[data-element="chat-box"]') as HTMLElement) || null;
        const header = (document.querySelector('header') as HTMLElement) || null;
        const footer = (document.querySelector('footer') as HTMLElement) || null;
        const chatHead =
            (this.elRef?.nativeElement?.querySelector('[data-element="chat-head"]') as HTMLElement) || null;
        const chatAccountHead =
            (this.elRef?.nativeElement?.querySelector('[data-element="chat-account-head"]') as HTMLElement) || null;
        const liveChat =
            (this.elRef?.nativeElement?.querySelector('[data-element="live-chat"]') as HTMLElement) || null;
        const chatbodyExpand =
            (this.elRef?.nativeElement?.querySelector('[data-element="chat-body-expand"]') as HTMLElement) || null;
        const accountSetting =
            (this.elRef?.nativeElement?.querySelector('[data-element="account-setting"]') as HTMLElement) || null;
        const accountBody =
            (this.elRef?.nativeElement?.querySelector('[data-element="account-body"]') as HTMLElement) || null;

        let diff = footer?.offsetHeight || 0;
        if (diff === 0) {
            diff = header?.offsetHeight || 0;
        }
        let chatHeadHeight = 0;
        if (this.chatService.isExpand.value && chatHead) {
            chatHeadHeight = chatHead.offsetHeight;
        }

        if (this.chatService.isExpand.value && expandBackDrop) {
            this.render.setStyle(expandBackDrop, 'top', `${chatHeadHeight}px`);
        }

        const chatBoxCalculatedHeight = window.innerHeight - diff;
        const chatBodyCalculatedHeight = chatBoxCalculatedHeight - chatHeadHeight;
        const panelHeight = chatBodyCalculatedHeight - (chatAccountHead?.offsetHeight || 0);

        this.render.setStyle(chat, 'height', `${chatBoxCalculatedHeight}px`);
        this.render.setStyle(chatBox, 'height', `${chatBodyCalculatedHeight}px`);
        this.render.setStyle(liveChat, 'height', `${panelHeight}px`);
        this.render.setStyle(accountSetting, 'height', `${chatBodyCalculatedHeight}px`);
        this.render.setStyle(accountBody, 'height', `${panelHeight}px`);

        if (window.innerWidth <= 767) {
            this.render.removeStyle(chatbodyExpand, 'height');
            if (this.chatService.isExpand.value) {
                this.closeExapndView();
            }
        } else {
            this.render.setStyle(chatbodyExpand, 'height', `${chatBodyCalculatedHeight}px`);
        }
        // this.chatBodyHeightAdjust();
    };

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
                this.render.setStyle(this.messageInputElement, 'height', Math.min(scrollHeight, 80) + 'px');
            }
        }
        if (this.chatMessageBodyElement && this.chatMessageFormElement && this.chatMessageHeadElement) {
            const diff = this.chatMessageFormElement.offsetHeight + this.chatMessageHeadElement.offsetHeight;
            this.render.setStyle(this.chatMessageBodyElement, 'height', `calc( 100% - ${diff}px)`);
        }
    }

    updateChatMessageBodyElRef() {
        if (!this.chatMessageBodyElement) {
            const refPrefix = this.chatService.isExpand.value
                ? '[data-element="chat-body-expand"]'
                : '[data-element="live-chat"]';
            const query = `${refPrefix} [data-element="live-chat-message-body"]`;
            this.chatMessageBodyElement = (this.elRef?.nativeElement?.querySelector(query) as HTMLElement) || null;
        }
    }
    updateMessageInputElRef() {
        if (!this.messageInputElement) {
            const refPrefix = this.chatService.isExpand.value
                ? '[data-element="chat-body-expand"]'
                : '[data-element="live-chat"]';
            const query = `${refPrefix} [data-element="messag-text-area"]`;
            this.messageInputElement = (this.elRef?.nativeElement?.querySelector(query) as HTMLTextAreaElement) || null;
        }
    }

    updateChatHeadRef() {
        if (!this.chatMessageHeadElement) {
            const refPrefix = this.chatService.isExpand.value
                ? '[data-element="chat-body-expand"]'
                : '[data-element="live-chat"]';
            const query = `${refPrefix} [data-element="live-chat-head"]`;
            this.chatMessageHeadElement = (this.elRef?.nativeElement?.querySelector(query) as HTMLElement) || null;
        }
    }

    updateChatFormRef() {
        if (!this.chatMessageFormElement) {
            const refPrefix = this.chatService.isExpand.value
                ? '[data-element="chat-body-expand"]'
                : '[data-element="live-chat"]';
            const query = `${refPrefix} [data-element="message-form"]`;
            this.chatMessageFormElement = (this.elRef?.nativeElement?.querySelector(query) as HTMLElement) || null;
        }
    }

    getProfileImageBgStyle(profileImageUrl: string) {
        if (profileImageUrl) {
            return `url(${profileImageUrl})`;
        } else {
            return `url(assets/images/profile.svg)`; // Placeholder image
        }
    }
    getProfileImageDirectURL(profileImageUrl: string) {
        if (profileImageUrl) {
            return profileImageUrl;
        } else {
            return 'assets/images/profile.svg';
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
        let msg = this.messageInput.trim();
        if (msg !== '') {
            badwordsRegExp.lastIndex = 0;
            if (badwordsRegExp.test(msg)) {
                this.showOffensiveMessageError = true;
                this.offensiveTimeout = window.setTimeout(this.offensiveTimeoutHandler, 5000);
                msg = msg.replace(badwordsRegExp, '****');
            }
            this.socket.chatSent.next(this.getMessagePayload(msg));
            this.chatUtil.playNotificationSound('OUTGOING');
            this.messageInput = '';
            this.chatBodyHeightAdjust();
            if (this.SM['lastRender'] && this.SM['lastRender'].unsubscribe) {
                this.SM['lastRender'].unsubscribe();
            }
            this.SM['lastRender'] = this.lastMessageRendered.pipe(first()).subscribe((x) => {
                this.chatBodyHeightAdjust();
            });
        }
    }

    initUserSearchInput() {
        if (this.SM['userPanelRendered'] && this.SM['userPanelRendered'].unsubscribe) {
            this.SM['userPanelRendered'].unsubscribe();
        }
        this.SM['userPanelRendered'] = this.userSearchPanelRendered.pipe(first()).subscribe((x) => {
            const userSearchInput =
                (this.elRef?.nativeElement?.querySelector('[data-element="user-search-input"]') as HTMLElement) || null;
            if (userSearchInput) {
                if (this.SM['userSearchInputEvents'] && this.SM['userSearchInputEvents'].unsubscribe) {
                    this.SM['userSearchInputEvents'].unsubscribe();
                }
                this.SM['userSearchInputEvents'] = fromEvent(userSearchInput, 'input')
                    .pipe(debounce(() => interval(500)))
                    .subscribe((event: InputEvent) => {
                        const searchQuery = this.userSearchKeywords.trim();
                        if (searchQuery) {
                            this.fetchUserList(searchQuery);
                        }
                    });
            }
        });
    }

    startNewChat() {
        this.recentUserList = [];
        this.usersList = [];
        this.userSearchKeywords = '';
        this.generateRecentUserList();
        this.chatService.userSearch.next(true);
        if (this.SM['userPanelRendered'] && this.SM['userPanelRendered'].unsubscribe) {
            this.SM['userPanelRendered'].unsubscribe();
        }
        this.SM['userPanelRendered'] = this.userSearchPanelRendered.pipe(first()).subscribe(() => {
            this.initUserSearchInput();
        });
    }

    backToListFromUsers() {
        this.recentUserList = [];
        this.usersList = [];
        this.userSearchKeywords = '';
        this.chatService.userSearch.next(false);
    }

    generateRecentUserList() {
        const recentListMap: { [key: string]: RecentUserListItem } = {};
        this.threadList.forEach((thread) => {
            const target = thread.computed_targetedUser;
            const user: RecentUserListItem = {
                computed_fullname: target.computed_fullname,
                computed_organization_name: target.computed_organization_name,
                computed_profile_dp: target.computed_profile_dp,
                firstname: target.first_name,
                lastname: target.last_name,
                organization_id: target.org_id,
                organization_type: target.org_type,
                profile_pic: target.profile_pic,
                id: target.id,
                user_id: target.user_id,
            };
            const key = `${user.user_id}_${user.organization_type}_${user.organization_id}`;
            if (!recentListMap[key]) {
                recentListMap[key] = user;
            }
        });
        this.recentUserList = Object.values(recentListMap);
    }

    fetchUserList = (searchQuery: string) => {
        if (this.SM['userListSubscription'] && this.SM['userListSubscription'].unsubscribe) {
            this.SM['userListSubscription'].unsubscribe();
        }
        this.SM['userListSubscription'] = this.userService.searchUser(searchQuery).subscribe((data) => {
            let list = [];
            if (data && data.success && data.result && data.result.length > 0) {
                list = data.result || [];
            }
            this.usersList = list.map((x) => {
                const processedItem: UserListItem = {
                    email_verified: x.email_verified || false,
                    firstname: x.firstname || '',
                    id: x.id || 0,
                    language: x.language || 'en',
                    lastname: x.lastname || '',
                    organization_id: x.organization_id || 0,
                    organization_name: x.organization_name || '',
                    profile_pic: x.profile_pic || '',
                    organization_type: ((x.organization_type || '') as string).toLowerCase() as OrganizationType,
                    timezone: x.timezone || '',
                    user_id: x.id || 0,
                    computed_fullname: x.firstname + ' ' + x.lastname,
                    computed_profile_dp: this.getProfileImageBgStyle(x.profile_pic),
                    computed_profile_direct_url: this.getProfileImageDirectURL(x.profile_pic),
                    computed_organization_name: '',
                };
                processedItem.computed_organization_name = this.chatUtil.getOrganization(
                    processedItem.organization_type,
                );
                return processedItem;
            });
        });
    };

    openThreadWithUser(item: UserListItem | RecentUserListItem) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.getCreate] = timestamp;
        this.socket.chatSent.next({
            timestamp,
            type: ChatMessageType.getCreate,
            data: {
                org_id: item.organization_id,
                user_id: item.user_id,
                org_type: item.organization_type,
            },
        });
        if (this.SM['threadFinderReturned'] && this.SM['threadFinderReturned'].unsubscribe) {
            this.SM['threadFinderReturned'].unsubscribe();
        }
        this.SM['threadFinderReturned'] = this.threadFinderReturned.pipe(first()).subscribe(() => {
            this.backToListFromUsers();
        });
    }

    sendReadToken(lastMessageId: number) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.read] = timestamp;
        this.socket.chatSent.next({
            type: ChatMessageType.read,
            timestamp,
            data: {
                thread_id: this.openedThread.id,
                last_read_id: lastMessageId,
            },
        });
    }

    offensiveTimeoutHandler = () => {
        this.showOffensiveMessageError = false;
    };

    openThreadChat(thread: ThreadListItem) {
        this.messageList = [];
        this.openedThread = thread;
        this.socket.chatSent.next(this.getHistoryPayload(thread));
        if (this.SM['lastRender'] && this.SM['lastRender'].unsubscribe) {
            this.SM['lastRender'].unsubscribe();
        }
        this.SM['lastRender'] = this.lastMessageRendered.pipe(first()).subscribe((x) => {
            this.chatBodyHeightAdjust();
            this.scrollbottom();
        });
    }
    scrollbottom() {
        this.updateChatMessageBodyElRef();
        // console.log('scrollbottom trace out: Last render close closeExapndView');
        this.chatMessageBodyElement.scrollTop = this.chatMessageBodyElement.scrollHeight;
    }

    backToAccountListing() {
        this.openedThread = null;
        this.messageList = [];
    }

    closePanel() {
        this.openedThread = null;
        this.messageList = [];
        this.chatService.isOpen.next(false);
        this.chatService.isExpand.next(false);
    }

    openExapndView() {
        if (!this.openedThread) {
            if (this.threadList[0]) {
                this.openThreadChat(this.threadList[0]);
            } else {
                return;
            }
        }
        this.chatMessageHeadElement = null;
        this.chatMessageBodyElement = null;
        this.chatMessageFormElement = null;
        this.messageInputElement = null;
        if (this.SM['lastRender'] && this.SM['lastRender'].unsubscribe) {
            this.SM['lastRender'].unsubscribe();
        }
        this.SM['lastRender'] = this.lastMessageRendered.pipe(first()).subscribe((x) => {
            // console.log('Last render on openExapndView');
            this.chatBodyHeightAdjust();
            this.viewPortSizeChanged();
            this.scrollbottom();
        });

        if (this.SM['chatBoxpanelRendered'] && this.SM['chatBoxpanelRendered'].unsubscribe) {
            this.SM['chatBoxpanelRendered'].unsubscribe();
        }
        this.SM['chatBoxpanelRendered'] = this.chatBoxpanelRendered
            .pipe(
                filter((x) => x === 'EXPAND'),
                first(),
            )
            .subscribe(() => {
                console.log('expand rendered');
                this.chatBodyHeightAdjust();
                this.viewPortSizeChanged();
            });
        this.chatService.isExpand.next(true);
    }
    closeExapndView() {
        this.chatMessageHeadElement = null;
        this.chatMessageBodyElement = null;
        this.chatMessageFormElement = null;
        this.messageInputElement = null;
        if (this.SM['lastRender'] && this.SM['lastRender'].unsubscribe) {
            this.SM['lastRender'].unsubscribe();
        }
        this.SM['lastRender'] = this.lastMessageRendered.pipe(first()).subscribe((x) => {
            // console.log('Last render close closeExapndView');
            this.chatBodyHeightAdjust();
            this.scrollbottom();
            this.viewPortSizeChanged();
        });

        if (this.SM['chatBoxpanelRendered'] && this.SM['chatBoxpanelRendered'].unsubscribe) {
            this.SM['chatBoxpanelRendered'].unsubscribe();
        }
        this.SM['chatBoxpanelRendered'] = this.chatBoxpanelRendered
            .pipe(
                filter((x) => x === 'COLLAPSE'),
                first(),
            )
            .subscribe(() => {
                console.log('Collapse rendered');
                this.chatBodyHeightAdjust();
                this.viewPortSizeChanged();
            });
        this.chatService.isExpand.next(false);
    }

    toggleExpandView() {
        if (this.chatService.isExpand.value) {
            this.closeExapndView();
        } else {
            this.openExapndView();
        }
    }

    openUserInfoPanel(thread: ThreadListItem) {
        this.selectedUser = thread?.computed_targetedUser || null;
    }
    closeUserInfoPanel() {
        this.selectedUser = null;
    }

    openPanel() {
        this.openedThread = null;
        this.messageList = [];
        this.selectedUser = null;
        if (this.SM['lastRender'] && this.SM['lastRender'].unsubscribe) {
            this.SM['lastRender'].unsubscribe();
        }
        this.SM['lastRender'] = this.lastMessageRendered.pipe(first()).subscribe((x) => {
            this.chatBodyHeightAdjust();
            this.scrollbottom();
        });

        if (this.SM['chatVisibilityRendered'] && this.SM['chatVisibilityRendered'].unsubscribe) {
            this.SM['chatVisibilityRendered'].unsubscribe();
        }
        this.SM['chatVisibilityRendered'] = this.chatVisibilityRendered
            .pipe(
                filter((x) => x),
                first(),
            )
            .subscribe((x) => {
                this.viewPortSizeChanged();
                this.chatBodyHeightAdjust();
                this.scrollbottom();
            });
        this.chatService.isExpand.next(false);
        this.chatService.isOpen.next(true);
    }
}
