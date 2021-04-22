import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { debounce, first, filter, tap } from 'rxjs/operators';
import { Subscription, fromEvent, interval, Subject, timer } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { Component, OnInit, OnDestroy, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import {
    UserserviceService,
    SocketService,
    ChatHandlerService,
    ChatUtilService,
    GlobalsService,
    GoogletranslateService,
} from '@services';

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
    BlockListItem,
} from '@models';
import { ThreadActivityType, OrganizationType, ThreadType, ServiceCommunicationType, ChatMessageType } from '@enums';
import { ConfirmationService } from 'primeng/api/public_api';

const badwordsRegExp = require('badwords/regexp') as RegExp;

@Component({
    selector: 'app-sewn-direct-message',
    templateUrl: './sewn-direct-message.component.html',
    styleUrls: ['./sewn-direct-message.component.scss'],
})
export class SewnDirectMessageComponent implements OnInit, OnDestroy, AfterViewInit {
    private UPDATE_USER_STATUS_INTERVAL = 1000 * 45; // Update  last seen and online status on every 45 sec
    private UPDATE_UNREAD_INTERVAL = 1000 * 60 * 4; // Update unread on every 4 min or when a message receive.
    private userStatusTimerRef = 0;
    private unReadTimerRef = 0;
    public showInlineLoader = true;
    private SM: { [SubscriptionName: string]: Subscription } = {}; // Subscrition MAP object
    public threadList: ThreadListItem[] = [];
    public usersList: UserListItem[] = [];
    public recentUserList: RecentUserListItem[] = [];
    public blockedUsersList = [];
    public userSearchKeywords = '';
    public selectedUser: ThreadMember | null = null;
    public userListLoading = false;
    public emojiList = [];
    private blockThreadReferance: ThreadListItem | null = null;
    private clearThreadReferance: ThreadListItem | null = null;
    private deleteThreadReferance: ThreadListItem | null = null;

    public chatMenuOpen = false;

    private threadListConfig = {
        perPage: 200,
        activePage: 1,
    };
    private messageListConfig = {
        perPage: 300,
        activePage: 1,
    };

    uploadFileMeta: {
        url: string;
        file_id: number;
    } | null = null;
    uploadProgressing = false;

    public acceptFileTypeArray = ['image/jpeg', 'image/png'];
    public acceptFileTypeString = '';

    public messageList: ChatMessage[] = [];
    public openedThread: ThreadListItem | null = null;
    public threadSearchKeyword = '';

    private messageInputElement: HTMLTextAreaElement | null = null;
    private chatMessageBodyElement: HTMLElement | null = null;

    public messageInput = '';
    public showOffensiveMessageError = false;
    private offensiveTimeout = 0;
    public lastMessageRendered = new Subject();
    public chatBoxpanelRendered = new Subject<'EXPAND' | 'COLLAPSE'>();
    public userSearchPanelRendered = new Subject();
    public threadFinderReturned = new Subject();
    public chatVisibilityRendered = new Subject<boolean>();
    public notificationState = false;
    public contextMenuOpen = false;
    public openEmojiPanel = false;

    public enableReadRecipient = false;
    public enableEmoji = true;
    public notificationSound = true;
    public fontSizeList = [
        { name: 'Small', value: 'SMALL' },
        { name: 'Normal', value: 'NORMAL' },
        { name: 'Large', value: 'LARGE' },
    ];
    public activeFontSize = this.fontSizeList[1];
    public muteforUser = false;

    public panelVisibility: 'THREAD' | 'CHAT' | 'BLOCKED_USERS' | 'SEARCH_USER' | 'USER_DETAILS' = 'THREAD';
    display = true;
    public modelConfig = {
        display: false,
        icon: '' as 'BLOCK' | 'REPORT' | 'DELETE' | '',
        title: '',
        description: '',
        yesAction: 'Yes',
        noAction: 'No',
        actionHandler: (value: 'yes' | 'no') => {},
        actionEventHandler: (value: 'yes' | 'no') => {
            this.modelConfig.actionHandler(value);
            this.modelConfig.reset();
        },
        reset: () => {
            this.modelConfig.display = false;
            this.modelConfig.title = '';
            this.modelConfig.description = '';
            this.modelConfig.yesAction = 'Yes';
            this.modelConfig.noAction = 'No';
            this.modelConfig.actionHandler = (value: 'yes' | 'no') => {};
        },
        onModelHide: () => {
            this.modelConfig.reset();
        },
        showModal: (config: {
            icon?: 'BLOCK' | 'REPORT' | 'DELETE' | '';
            title: string;
            desc: string;
            yesActionLable?: string;
            noActionLable?: string;
            actionHandler: (value: 'yes' | 'no') => void;
        }) => {
            this.modelConfig.icon = config.icon;
            this.modelConfig.title = config.title;
            this.modelConfig.description = config.desc;
            this.modelConfig.yesAction = config.yesActionLable || 'Yes';
            this.modelConfig.noAction = config.noActionLable || 'No';
            this.modelConfig.actionHandler = config.actionHandler;
            this.modelConfig.display = true;
        },
    };

    constructor(
        public globals: GlobalsService,
        private render: Renderer2,
        private elRef: ElementRef,
        private socket: SocketService,
        public chatHandler: ChatHandlerService,
        private userService: UserserviceService,
        private chatUtil: ChatUtilService,
        private toast: ToastrService,
        public gtrans: GoogletranslateService,
        private dialogSrv: DialogService,
    ) {}

    ngOnInit(): void {
        this.acceptFileTypeString = this.acceptFileTypeArray.join(',');
        this.emojiList = this.chatUtil.emojiList;
        this.SM.WSState = this.socket.socketState.subscribe((value) => {
            if (value === 'CONNECTED') {
                this.initializeWebSocket();
            }
        });
        this.SM.ChatHandlerService = this.chatHandler.chatSubject.subscribe(this.chatServiceRequestHandling);
        this.SM.expandStateListner = this.chatHandler.isExpand.subscribe(() => {
            setTimeout(() => {
                this.uiUpdateOnStateChange();
            }, 150);
        });
        this.SM.openStateListener = this.chatHandler.isOpen.subscribe(() => {
            setTimeout(() => {
                this.uiUpdateOnStateChange();
            }, 150);
        });
        this.SM.mobileStateListner = this.chatHandler.isMobileView.subscribe(() => {
            setTimeout(() => {
                this.uiUpdateOnStateChange();
            }, 150);
        });
        this.readSettings();
    }

    saveSettings() {
        const setting: any = {
            enableReadRecipient: this.enableReadRecipient,
            enableEmoji: this.enableEmoji,
            notificationSound: this.notificationSound,
            activeFontSize: this.activeFontSize.value,
        };
        localStorage.setItem('setting', JSON.stringify(setting));
    }

    readSettings() {
        let setting: any = {};
        try {
            setting = JSON.parse(localStorage.getItem('setting')) || {};
        } catch (e) {
            setting = {};
        }
        if (setting.hasOwnProperty('enableReadRecipient')) {
            this.enableReadRecipient = setting.enableReadRecipient;
        } else if (setting.hasOwnProperty('enableEmoji')) {
            this.enableEmoji = setting.enableEmoji;
        } else if (setting.hasOwnProperty('notificationSound')) {
            this.notificationSound = setting.notificationSound;
        } else if (setting.hasOwnProperty('activeFontSize')) {
            this.activeFontSize = this.fontSizeList.find((x) => x.value === setting.activeFontSize);
        }
    }

    menuAction(action: 'BLOCK' | 'CLEAR' | 'DELETE') {
        this.chatMenuOpen = false;
        if (action === 'BLOCK') {
            this.blockUser(this.openedThread.computed_targetedUser);
        } else if (action === 'CLEAR') {
            this.clearChat();
        } else if (action === 'DELETE') {
            this.deleteChat();
        }
    }

    toggleMenu() {
        this.contextMenuOpen = !this.contextMenuOpen;
        if (this.contextMenuOpen) {
            this.readSettings();
            this.listenBodyClickMenuClose();
        } else {
            this.saveSettings();
            if (this.SM.bodyClickMenuClose && this.SM.bodyClickMenuClose.unsubscribe) {
                this.SM.bodyClickMenuClose.unsubscribe();
            }
        }
    }

    toggleChatMenu() {
        this.chatMenuOpen = !this.chatMenuOpen;
        if (this.chatMenuOpen) {
            this.listenBodyClickMenuClose();
        } else {
            if (this.SM.bodyClickMenuClose && this.SM.bodyClickMenuClose.unsubscribe) {
                this.SM.bodyClickMenuClose.unsubscribe();
            }
        }
    }

    listenBodyClickMenuClose() {
        if (this.SM.bodyClickMenuClose && this.SM.bodyClickMenuClose.unsubscribe) {
            this.SM.bodyClickMenuClose.unsubscribe();
        }
        this.SM.bodyClickMenuClose = fromEvent(document.body, 'mousedown').subscribe((event: any) => {
            if (event.target && this.elRef.nativeElement) {
                const target = event.target as HTMLElement;
                const contentMenuPanel = this.elRef.nativeElement.querySelector('[data-element="context-menu-panel"]');
                if (target) {
                    if (contentMenuPanel) {
                        const closest = target.closest('[data-element="context-menu-panel"]');
                        if (target !== contentMenuPanel && closest !== contentMenuPanel) {
                            this.contextMenuOpen = false;
                        }
                    }
                    const chatMenuPanel = this.elRef.nativeElement.querySelector('[data-element="chat-menu-panel"]');
                    if (chatMenuPanel) {
                        const closest = target.closest('[data-element="chat-menu-panel"]');
                        if (target !== chatMenuPanel && closest !== chatMenuPanel) {
                            this.chatMenuOpen = false;
                        }
                    }
                }
            } else {
                console.log('Event target not found');
            }
        });
    }

    ngAfterViewInit() {
        this.SM.ResizeEvent = fromEvent(window, 'resize')
            .pipe(debounce(() => interval(500)))
            .subscribe(this.viewPortSizeChanged);
        this.viewPortSizeChanged();
    }

    initializeWebSocket() {
        this.showInlineLoader = true;
        if (this.SM.WSSubscription && this.SM.WSSubscription.unsubscribe) {
            this.SM.WSSubscription.unsubscribe();
        }
        this.SM.WSSubscription = this.socket.directMessageReceive.subscribe((WSmsg: WSResponse<unknown>) => {
            if (WSmsg.type === ChatMessageType.threads) {
                this.handleThreadsResponse(WSmsg as WSResponse<ThreadListItem[]>);
            } else if (WSmsg.type === ChatMessageType.unread) {
                this.handleUnReadResponse(WSmsg as WSResponse<null>);
            } else if (WSmsg.type === ChatMessageType.users) {
                this.handleUserDetailResponse(WSmsg as WSResponse<ResponseUserStatus[]>);
            } else if (WSmsg.type === ChatMessageType.history) {
                this.handleThreadHistory(WSmsg as WSResponse<ChatMessage[]>);
            } else if (WSmsg.type === ChatMessageType.message) {
                this.handleIncomingMessages(WSmsg as WSResponse<IncomingChatMessage>);
            } else if (WSmsg.type === ChatMessageType.getCreate) {
                this.handleFindThreadRequest(WSmsg as WSResponse<ThreadListItem[]>);
            } else if (WSmsg.type === ChatMessageType.thread) {
                this.handleRequestedThreadDetails(WSmsg as WSResponse<ThreadListItem>);
            } else if (WSmsg.type === ChatMessageType.blocklist) {
                this.handleBlockListResponse(
                    WSmsg as WSResponse<{
                        block_list: BlockListItem[];
                        blocked_list: BlockListItem[];
                    }>,
                );
            } else if (WSmsg.type === ChatMessageType.block) {
                this.handleBlockResponse(WSmsg as WSResponse<any>);
            } else if (WSmsg.type === ChatMessageType.unblock) {
                this.handleUnBlockResponse(WSmsg as WSResponse<any>);
            } else if (WSmsg.type === ChatMessageType.clearChat) {
                this.handleClearChatResponse(WSmsg as WSResponse<any>);
            } else if (WSmsg.type === ChatMessageType.deleteChat) {
                this.handleDeleteChatResponse(WSmsg as WSResponse<any>);
            }
        });

        this.SM.WSAuthentication = this.socket.authenticate().subscribe((res) => {
            if (res === 'SUCCESS') {
                this.showInlineLoader = true;
                this.socket.directMessageSent.next(this.getCurrentThreadPayload());
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
        return {
            timestamp,
            type: ChatMessageType.threads,
            data: {
                user_id: this.chatUtil.USER_ID,
                org_type: this.chatUtil.ORGANIZATION_TYPE,
                org_id: this.chatUtil.ORGANIZATION_ID,
                type: ThreadType.normal,
                // page: this.threadListConfig.activePage,
                // per_page: this.threadListConfig.perPage,
            },
        };
    }

    getUnReadPayload() {
        const timestamp = this.chatUtil.getTimeStamp();
        return {
            timestamp,
            type: ChatMessageType.unread,
        };
    }

    getMessagePayload(message: string) {
        const timestamp = this.chatUtil.getTimeStamp();
        const payload: any = {
            type: ChatMessageType.message,
            timestamp,
            data: {
                thread_id: this.openedThread.id,
                content: message,
                meta_data: '',
            },
        };
        const fileId = this.uploadFileMeta?.file_id || '';
        if (fileId) {
            payload.data.file_id = fileId;
        }
        return payload;
    }

    getBlockListPayload() {
        const timestamp = this.chatUtil.getTimeStamp();
        return {
            timestamp,
            type: ChatMessageType.blocklist,
        };
    }

    getHistoryPayload(thread: ThreadListItem) {
        const timestamp = this.chatUtil.getTimeStamp();
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
        console.log('Open chat request payload', payload);
        this.socket.directMessageSent.next({
            timestamp,
            type: ChatMessageType.getCreate,
            data: payload,
        });
    }

    threadRequestByNewMessage(threadId: number) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.socket.directMessageSent.next({
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
        message.lang = this.gtrans.defaultLang;
        message.translatedText = '';
        message.showTranslation = 'OFF';
        message.computed_date = this.chatUtil.getReadableTime(message.updated_at || message.created_at);
        message.dateString = moment(message.created_at).format('Do MMM YYYY');
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
        if (threadUser.org_type === OrganizationType.SEWN_ADMIN) {
            threadUser.org_id = 0;
        }
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
            thread.content.length > 60 ? thread.content.slice(0, 60) + '...' : thread.content;
        return thread;
    }

    handleIncomingMessages(WSmsg: WSResponse<IncomingChatMessage>) {
        let message = WSmsg.data;
        if (WSmsg.code === 201 && (message?.content || '').trim() !== '' && message.thread.type === ThreadType.normal) {
            if (message.activity_type === ThreadActivityType.message) {
                const inThread = this.threadList.find((thread) => thread.id === message.thread.id);
                if (inThread) {
                    message = this.processChatMessages(message, inThread) as IncomingChatMessage;
                    const user = message?.member?.user;
                    if (user) {
                        this.processThreadUser(user);
                    }
                    if (this.openedThread && this.openedThread.id === message.thread.id) {
                        this.updateChatMessageBodyElRef();
                        if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
                            this.SM.lastRender.unsubscribe();
                        }
                        this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
                            this.scrollbottom();
                        });
                        const lastMessage = this.messageList[this.messageList.length - 1];
                        if (lastMessage) {
                            message.showUserBadge = lastMessage.isActiveUser && !message.isActiveUser;
                        } else {
                            message.showUserBadge = true;
                        }

                        if (!lastMessage) {
                            message.showDateBadge = true;
                        } else {
                            message.showDateBadge = lastMessage.dateString !== message.dateString;
                        }

                        this.messageList.push(message);
                        let messagcontent = message.content || '';
                        messagcontent = messagcontent.length > 60 ? messagcontent.slice(0, 60) + '...' : messagcontent;

                        this.openedThread.computed_lastActivityText = messagcontent;
                        this.sendReadToken(message.id);
                    } else {
                        let messagcontent = message.content || '';
                        messagcontent = messagcontent.length > 60 ? messagcontent.slice(0, 60) + '...' : messagcontent;

                        inThread.computed_lastActivityText = messagcontent;
                        if (!inThread.computed_mute && !message.isActiveUser && this.notificationSound) {
                            this.chatUtil.playNotificationSound('INCOMING');
                        }
                    }
                    const threadIndex = this.threadList.findIndex((thread) => thread.id === inThread.id);
                    this.threadList.splice(threadIndex, 1);
                    this.threadList.unshift(inThread); // Pushing into top
                    this.updateUnRead();
                    this.detectMessageLang(message);
                } else {
                    this.threadRequestByNewMessage(message.thread.id);
                }
            } else {
                console.log('Incoming message not correct message type');
            }
        } else {
            console.log('Incoming message incorrect status/content');
        }
    }

    isCurrentlyBottom() {
        this.updateChatMessageBodyElRef();
        if (this.chatMessageBodyElement) {
            return (
                this.chatMessageBodyElement.scrollTop + this.chatMessageBodyElement.clientHeight ===
                this.chatMessageBodyElement.scrollHeight
            );
        }
        return false;
    }

    handleThreadHistory(WSmsg: WSResponse<ChatMessage[]>) {
        this.showInlineLoader = false;
        if (WSmsg.code === 200) {
            this.messageList = WSmsg.data
                .filter((x) => x.activity_type === ThreadActivityType.message && x.content.trim() !== '')
                .reverse();
            let showUserBadge = true; // Set true on To message, and false after first From message
            // Need different logic for group chat
            for (let index = 0, len = this.messageList.length; index < len; index++) {
                this.messageList[index] = this.processChatMessages(this.messageList[index], this.openedThread);
                const prevMessage = this.messageList[index - 1];
                const activeMessage = this.messageList[index];
                if (!this.messageList[index].isActiveUser) {
                    this.messageList[index].showUserBadge = showUserBadge;
                    showUserBadge = false;
                } else {
                    this.messageList[index].showUserBadge = false; // always false on TO message
                    showUserBadge = true;
                }
                if (!prevMessage) {
                    activeMessage.showDateBadge = true;
                } else {
                    activeMessage.showDateBadge = prevMessage.dateString !== activeMessage.dateString;
                }
            }
            const lastMessage = this.messageList[this.messageList.length - 1];
            if (lastMessage) {
                if (lastMessage && lastMessage.content) {
                    let messagcontent = lastMessage.content || '';
                    messagcontent = messagcontent.length > 60 ? messagcontent.slice(0, 60) + '...' : messagcontent;
                    this.openedThread.computed_lastActivityText = messagcontent;
                }
                this.sendReadToken(lastMessage.id);
            }
            this.updateUnRead();
            this.detectMessageLang();
        } else {
            console.log('Websocket:Thread History: Failure');
        }
    }

    detectMessageLang(message?: ChatMessage) {
        if (message) {
            if (this.gtrans.validateMessage(message.content)) {
                this.gtrans.detect(message.content).subscribe((lang) => {
                    message.lang = lang || this.gtrans.defaultLang;
                });
            } else {
                message.lang = this.gtrans.defaultLang;
            }
        } else {
            const contentArray = [];
            this.messageList.forEach((msgListItem: ChatMessage) => {
                if (this.gtrans.validateMessage(msgListItem.content)) {
                    contentArray.push(msgListItem.content);
                } else {
                    msgListItem.lang = this.gtrans.defaultLang;
                    contentArray.push('');
                }
            });
            if (contentArray.length) {
                this.gtrans.detectBatch(contentArray).subscribe((outPut) => {
                    this.messageList.forEach((msgListItem, index) => {
                        msgListItem.lang = outPut[index] || this.gtrans.defaultLang;
                    });
                });
            }
        }
    }

    translateMessage(message: ChatMessage) {
        if (message.translatedText !== '') {
            message.showTranslation = 'ON';
        } else {
            message.showTranslation = 'IP';
            this.gtrans.translate(message.content).subscribe((translatedOutput) => {
                message.translatedText = translatedOutput;
                message.showTranslation = 'ON';
            });
        }
    }
    showOrginal(message: ChatMessage) {
        message.showTranslation = 'OFF';
    }

    handleUserDetailResponse(WSmsg: WSResponse<ResponseUserStatus[]>) {
        if (WSmsg.code === 200) {
            const userStatusMap: {
                [uniqueKey: string]: ResponseUserStatus;
            } = {};
            WSmsg.data.forEach((userStatus) => {
                if (userStatus.org_type === OrganizationType.SEWN_ADMIN) {
                    userStatus.org_id = 0;
                }
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
            this.chatHandler.unReadCount.next(totalCount);
        } else {
            console.log('Websocket:Unread: Failure');
        }
    }

    handleBlockListResponse(
        WSmsg: WSResponse<{
            block_list: BlockListItem[];
            blocked_list: BlockListItem[];
        }>,
    ) {
        this.showInlineLoader = false;
        if (WSmsg.code === 200 && WSmsg.data && WSmsg.data.block_list) {
            this.blockedUsersList = (WSmsg.data.block_list || []).map((blockedUser: BlockListItem) => {
                if (blockedUser.org_type === OrganizationType.SEWN_ADMIN) {
                    blockedUser.org_id = 0;
                }
                blockedUser.computed_organization_name = this.chatUtil.getOrganization(blockedUser.org_type);
                blockedUser.computed_fullname = blockedUser.first_name + ' ' + blockedUser.last_name;
                blockedUser.computed_profile_dp = this.getProfileImageBgStyle(blockedUser.profile_pic);
                blockedUser.computed_profile_direct_url = this.getProfileImageDirectURL(blockedUser.profile_pic);
                return blockedUser;
            });
        } else {
            console.log('Websocket:Block list: Failure');
        }
    }
    handleClearChatResponse(WSmsg: WSResponse<any>) {
        this.showInlineLoader = false;
        if (WSmsg.success && WSmsg.code === 200) {
            const index = this.threadList.findIndex((thread) => thread.id === this.clearThreadReferance.id);
            if (index > -1) {
                if (this.clearThreadReferance.id === this.openedThread?.id) {
                    this.messageList = [];
                }
            }
            this.toast.success('Successfully clear the conversation', 'Clear Conversation');
        } else {
            this.toast.error('Unable to clear the conversation', 'Clear Conversation');
        }
        this.clearThreadReferance = null;
    }

    handleDeleteChatResponse(WSmsg: WSResponse<any>) {
        this.showInlineLoader = false;
        if (WSmsg.success && WSmsg.code === 200) {
            const index = this.threadList.findIndex((thread) => thread.id === this.deleteThreadReferance.id);
            if (index > -1) {
                this.threadList.splice(index, 1);
                if (this.deleteThreadReferance.id === this.openedThread?.id) {
                    if (this.chatHandler.isExpand.value) {
                        this.openedThread = this.threadList[0] || null;
                    } else {
                        this.openedThread = null;
                    }
                }
            }
            this.toast.success('Successfully deleted the conversation', 'Delete Conversation');
        } else {
            this.toast.error('Unable to delete the conversation', 'Delete Conversation');
        }
        this.deleteThreadReferance = null;
    }

    handleBlockResponse(WSmsg: WSResponse<any>) {
        this.showInlineLoader = false;
        if (WSmsg.success && WSmsg.code === 201) {
            const index = this.threadList.findIndex((thread) => thread.id === this.blockThreadReferance.id);
            if (index > -1) {
                this.threadList.splice(index, 1);
                if (this.blockThreadReferance.id === this.openedThread?.id) {
                    if (this.chatHandler.isExpand.value) {
                        this.openedThread = this.threadList[0] || null;
                    } else {
                        this.openedThread = null;
                    }
                }
            }
            this.toast.success('Successfully blocked the user', 'Block');
            this.openBlockedListPanel();
        } else if (WSmsg.code === 409) {
            this.toast.error('The user is already blocked', 'Block');
            this.openBlockedListPanel();
        } else {
            this.toast.error('Unable to block the user', 'Block');
        }
        this.blockThreadReferance = null;
    }

    handleUnBlockResponse(WSmsg: WSResponse<any>) {
        if (WSmsg.success && WSmsg.code === 200) {
            this.toast.success('Successfully unblocked the user', 'Un Block');
            this.fetchBlockUserList();
        } else {
            this.toast.error('Unable to unblock the user', 'Un Block');
        }
    }

    handleThreadsResponse(WSmsg: WSResponse<ThreadListItem[]>) {
        this.showInlineLoader = false;
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
        this.showInlineLoader = false;
        if (WSmsg.code === 200 || WSmsg.code === 201) {
            let thread = WSmsg.data.find((thrd) => thrd.type === ThreadType.normal);
            if (thread && thread.type === ThreadType.normal) {
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
                if (!thread.computed_mute && this.notificationSound) {
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
            this.socket.directMessageSent.next(this.getMultipleUserDetailsPayload());
        }
        if (this.userStatusTimerRef) {
            clearTimeout(this.userStatusTimerRef);
        }
        this.userStatusTimerRef = window.setTimeout(this.updateUserStatus, this.UPDATE_USER_STATUS_INTERVAL);
    };
    updateUnRead = () => {
        // Fetch unread
        if (this.threadList.length > 0) {
            this.socket.directMessageSent.next(this.getUnReadPayload());
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
        if (this.offensiveTimeout) {
            clearTimeout(this.offensiveTimeout);
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
            if (this.chatHandler.isOpen.value) {
                this.closePanel();
            } else {
                this.openPanel();
            }
        } else if (req.requestType === ServiceCommunicationType.OPEN_THREAD) {
            this.showInlineLoader = true;
            this.findThread(req.payload as OpenChatThread);
        }
    };

    viewPortSizeChanged = () => {
        if (window.innerWidth <= 767) {
            this.chatHandler.isMobileView.next(true);
            if (this.chatHandler.isExpand.value) {
                this.closeExapndView();
            }
            const header = (document.querySelector('header') as HTMLElement) || null;
            const headerHeight = header?.offsetHeight || 0;
            const footer = (document.querySelector('footer') as HTMLElement) || null;
            const footerHeight = footer?.offsetHeight || 0;
            const collapsePanel =
                (this.elRef?.nativeElement?.querySelector('[data-element="collapse-panel"]') as HTMLElement) || null;
            if (collapsePanel) {
                this.render.setStyle(collapsePanel, 'height', `calc( 100% - ${headerHeight + footerHeight}px )`);
                this.render.setStyle(collapsePanel, 'top', `${headerHeight}px`);
            }
        } else {
            this.chatHandler.isMobileView.next(false);
            const header = (document.querySelector('header') as HTMLElement) || null;
            const headerHeight = header?.offsetHeight || 0;
            const collapsePanel =
                (this.elRef?.nativeElement?.querySelector('[data-element="collapse-panel"]') as HTMLElement) || null;
            if (collapsePanel) {
                this.render.setStyle(collapsePanel, 'height', `calc( 100% - ${headerHeight}px )`);
                this.render.setStyle(collapsePanel, 'top', `${headerHeight}px`);
            }
        }
        this.chatBodyHeightAdjust();
    };

    uiUpdateOnStateChange = () => {
        const header = (document.querySelector('header') as HTMLElement) || null;
        const headerHeight = header?.offsetHeight || 0;
        if (this.chatHandler.isExpand.value) {
            const expandBackDrop =
                (this.elRef?.nativeElement?.querySelector('[data-element="expand-backdrop"]') as HTMLElement) || null;
            if (expandBackDrop) {
                this.render.setStyle(expandBackDrop, 'height', `calc( 100% - ${headerHeight}px )`);
            }
        } else {
            if (window.innerWidth <= 767) {
                const footer = (document.querySelector('footer') as HTMLElement) || null;
                const footerHeight = footer?.offsetHeight || 0;
                const collapsePanel =
                    (this.elRef?.nativeElement?.querySelector('[data-element="collapse-panel"]') as HTMLElement) ||
                    null;
                if (collapsePanel) {
                    this.render.setStyle(collapsePanel, 'height', `calc( 100% - ${headerHeight + footerHeight}px )`);
                    this.render.setStyle(collapsePanel, 'top', `${headerHeight}px`);
                }
            } else {
                const collapsePanel =
                    (this.elRef?.nativeElement?.querySelector('[data-element="collapse-panel"]') as HTMLElement) ||
                    null;
                if (collapsePanel) {
                    this.render.setStyle(collapsePanel, 'height', `calc( 100% - ${headerHeight}px )`);
                    this.render.setStyle(collapsePanel, 'top', `${headerHeight}px`);
                }
            }
        }
    };

    chatBodyHeightAdjust() {
        this.updateMessageInputElRef();
        if (this.messageInputElement) {
            this.render.removeStyle(this.messageInputElement, 'height');
            const inputHeight = this.messageInputElement.offsetHeight;
            const scrollHeight = this.messageInputElement.scrollHeight;
            if (inputHeight < scrollHeight) {
                this.render.setStyle(this.messageInputElement, 'height', Math.min(scrollHeight, 80) + 'px');
            }
        }
    }

    updateChatMessageBodyElRef() {
        if (!this.chatMessageBodyElement) {
            const query = `[data-element="live-chat-message-body"]`;
            this.chatMessageBodyElement = (this.elRef?.nativeElement?.querySelector(query) as HTMLElement) || null;
        }
    }
    updateMessageInputElRef() {
        if (!this.messageInputElement) {
            const query = `[data-element="messag-text-area"]`;
            this.messageInputElement = (this.elRef?.nativeElement?.querySelector(query) as HTMLTextAreaElement) || null;
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
    insertEmoji(emoji) {
        const span = document.createElement('span');
        span.innerHTML = this.getEmojiRender(emoji);
        this.messageInput += ' ' + span.innerText + ' ';
        this.chatBodyHeightAdjust();
    }
    inputChanges(event: InputEvent) {
        this.chatBodyHeightAdjust();
    }

    replaceOffensiveWord(message: string) {
        const badWordArray = message.match(badwordsRegExp);
        for (const badWord of badWordArray) {
            message = message.replace(badWord, '*'.repeat(badWord.length));
        }
        return message;
    }

    sendMessage() {
        clearTimeout(this.offensiveTimeout);
        this.showOffensiveMessageError = false;
        let msg = this.messageInput.trim();
        if (msg !== '') {
            badwordsRegExp.lastIndex = 0;
            if (badwordsRegExp.test(msg)) {
                this.showOffensiveMessageError = true;
                this.offensiveTimeout = window.setTimeout(this.offensiveTimeoutHandler, 3500);
                msg = this.replaceOffensiveWord(msg);
            }
            this.socket.directMessageSent.next(this.getMessagePayload(msg));
            if (this.notificationSound) {
                this.chatUtil.playNotificationSound('OUTGOING');
            }
            this.messageInput = '';
            this.uploadFileMeta = null;
            this.chatBodyHeightAdjust();
            if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
                this.SM.lastRender.unsubscribe();
            }

            this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
                this.chatBodyHeightAdjust();
            });
            this.SM.timeoutTextSend = timer(600).subscribe((x) => {
                this.chatBodyHeightAdjust();
            });
        } else {
            this.toast.warning('Message text can not be blank', 'Unable to sent', { timeOut: 800 });
        }
    }

    removeFile() {
        this.uploadFileMeta = null;
    }

    uploadFile($event: any) {
        const file = (event.target as HTMLInputElement).files[0];
        (event.target as HTMLInputElement).value = null;
        if (this.acceptFileTypeArray.includes(file.type)) {
            this.uploadFileMeta = null;
            this.uploadProgressing = true;
            this.chatUtil.uploadFile(file, this.openedThread.id).subscribe(
                (res: any) => {
                    this.uploadProgressing = false;
                    if (res.success) {
                        this.uploadFileMeta = {
                            file_id: res.result.id,
                            url: res.result.url,
                        };
                    } else {
                        this.toast.error('Unable to sent files, please try aftersome time', 'Uploading failed', {
                            timeOut: 400,
                        });
                    }
                },
                (error) => {
                    this.uploadProgressing = false;
                    console.log('upload error', error);
                },
            );
        } else {
            this.toast.error('Please choose a valid file type', 'Invalid File type', { timeOut: 400 });
        }
        return false;
    }

    initUserSearchInput() {
        if (this.SM.userPanelRendered && this.SM.userPanelRendered.unsubscribe) {
            this.SM.userPanelRendered.unsubscribe();
        }
        this.SM.userPanelRendered = this.userSearchPanelRendered.pipe(first()).subscribe((x) => {
            const userSearchInput =
                (this.elRef?.nativeElement?.querySelector('[data-element="user-search-input"]') as HTMLElement) || null;
            if (userSearchInput) {
                if (this.SM.userSearchInputEvents && this.SM.userSearchInputEvents.unsubscribe) {
                    this.SM.userSearchInputEvents.unsubscribe();
                }
                this.SM.userSearchInputEvents = fromEvent(userSearchInput, 'input')
                    .pipe(
                        tap(() => {
                            this.userListLoading = true;
                        }),
                        debounce(() => interval(500)),
                    )
                    .subscribe((event: InputEvent) => {
                        const searchQuery = this.userSearchKeywords.trim();
                        if (searchQuery) {
                            this.userListLoading = true;
                            this.usersList = [];
                            this.fetchUserList(searchQuery);
                        }
                    });
            }
        });
    }

    generateRecentUserList() {
        const recentListMap: { [key: string]: RecentUserListItem } = {};
        this.threadList.forEach((thread) => {
            const target = thread.computed_targetedUser;
            const user: RecentUserListItem = {
                computed_fullname: target.computed_fullname,
                computed_organization_name: target.computed_organization_name,
                computed_profile_direct_url: target.computed_profile_direct_url,
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
        if (this.SM.userListSubscription && this.SM.userListSubscription.unsubscribe) {
            this.SM.userListSubscription.unsubscribe();
        }
        this.SM.userListSubscription = this.userService.searchUser(searchQuery).subscribe((data) => {
            this.userListLoading = false;
            let list = [];
            if (data && data.success && data.result && data.result.length > 0) {
                list = data.result || [];
            }
            this.usersList = list
                .filter((x) => {
                    return !(
                        x.organization_id === this.chatUtil.ORGANIZATION_ID &&
                        x.organization_name === this.chatUtil.ORGANIZATION_TYPE &&
                        x.user_id === this.chatUtil.USER_ID
                    );
                })
                .map((x) => {
                    const processedItem: UserListItem = {
                        email_verified: x.email_verified || false,
                        firstname: x.firstname || '',
                        id: x.id || 0,
                        language: x.language || this.gtrans.defaultLang,
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
        this.showInlineLoader = true;
        const timestamp = this.chatUtil.getTimeStamp();
        this.socket.directMessageSent.next({
            timestamp,
            type: ChatMessageType.getCreate,
            data: {
                org_id: item.organization_id,
                user_id: item.user_id,
                org_type: item.organization_type,
            },
        });
        if (this.SM.threadFinderReturned && this.SM.threadFinderReturned.unsubscribe) {
            this.SM.threadFinderReturned.unsubscribe();
        }
        this.SM.threadFinderReturned = this.threadFinderReturned.pipe(first()).subscribe(() => {
            this.closeNewChatPanel();
        });
    }

    sendReadToken(lastMessageId: number) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.socket.directMessageSent.next({
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
        this.showInlineLoader = true;
        this.chatMenuOpen = false;
        this.openedThread = thread;
        this.socket.directMessageSent.next(this.getHistoryPayload(thread));
        if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
            this.SM.lastRender.unsubscribe();
        }
        this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
            this.chatBodyHeightAdjust();
            this.scrollbottom();
        });
    }
    scrollbottom() {
        this.updateChatMessageBodyElRef();
        this.chatMessageBodyElement.scrollTop = this.chatMessageBodyElement.scrollHeight;
    }
    getEmojiRender(emoji: string) {
        return '&#x' + emoji + ';';
    }

    clearChat() {
        this.modelConfig.showModal({
            icon: 'DELETE',
            title: 'Clear conversation?',
            desc: 'Do you really want to clear this conversation?',
            actionHandler: (value) => {
                if (value === 'yes') {
                    this.clearThreadReferance = this.openedThread;
                    this.showInlineLoader = true;
                    const timestamp = this.chatUtil.getTimeStamp();
                    this.socket.directMessageSent.next({
                        timestamp,
                        data: {
                            thread_id: this.openedThread.id,
                        },
                        type: ChatMessageType.clearChat,
                    });
                }
            },
        });
    }

    deleteChat() {
        this.modelConfig.showModal({
            icon: 'DELETE',
            title: 'Delete conversation?',
            desc: 'Do you really want to delete this conversation?',
            actionHandler: (value) => {
                if (value === 'yes') {
                    this.deleteThreadReferance = this.openedThread;
                    this.showInlineLoader = true;
                    const timestamp = this.chatUtil.getTimeStamp();
                    this.socket.directMessageSent.next({
                        timestamp,
                        data: {
                            thread_id: this.openedThread.id,
                        },
                        type: ChatMessageType.deleteChat,
                    });
                }
            },
        });
    }

    reportUser(dataPayload: ThreadMember) {
        this.modelConfig.showModal({
            icon: 'REPORT',
            title: 'Report user?',
            desc: 'Do you really want to report this user?',
            actionHandler: (value) => {
                if (value === 'yes') {
                    this.showInlineLoader = true;
                    this.userService
                        .reportUser(dataPayload.user_id, dataPayload.org_type, dataPayload.org_id)
                        .subscribe(
                            (res) => {
                                this.showInlineLoader = false;
                                if (res.success) {
                                    this.toast.success('Successfully reported the user', 'Report');
                                } else {
                                    this.toast.success('Failed to report the user', 'Report');
                                }
                            },
                            () => {
                                this.showInlineLoader = false;
                                this.toast.success('Failed to report the user', 'Report');
                            },
                        );
                }
            },
        });
    }

    blockUser(dataPayload: ThreadMember) {
        this.modelConfig.showModal({
            icon: 'BLOCK',
            title: 'Block user?',
            desc: 'Do you really want to block this user?',
            actionHandler: (value) => {
                if (value === 'yes') {
                    this.blockThreadReferance = this.openedThread;
                    this.showInlineLoader = true;
                    const timestamp = this.chatUtil.getTimeStamp();
                    this.socket.directMessageSent.next({
                        timestamp,
                        data: {
                            user_id: dataPayload.user_id,
                            org_type: dataPayload.org_type,
                            org_id: dataPayload.org_id,
                        },
                        type: ChatMessageType.block,
                    });
                }
            },
        });
    }

    unblockUser(dataPayload: BlockListItem) {
        this.modelConfig.showModal({
            icon: 'BLOCK',
            title: 'Unblock user?',
            desc: 'Do you really want to Unblock this user?',
            actionHandler: (value) => {
                if (value === 'yes') {
                    this.showInlineLoader = true;
                    const timestamp = this.chatUtil.getTimeStamp();
                    this.socket.directMessageSent.next({
                        timestamp,
                        data: {
                            user_id: dataPayload.user_id,
                            org_type: dataPayload.org_type,
                            org_id: dataPayload.org_id,
                        },
                        type: ChatMessageType.unblock,
                    });
                }
            },
        });
    }

    openExapndView() {
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        if (!this.openedThread) {
            if (this.threadList[0]) {
                this.openThreadChat(this.threadList[0]);
            } else {
                return;
            }
        }
        this.messageInputElement = null;
        if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
            this.SM.lastRender.unsubscribe();
        }
        this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
            // console.log('Last render on openExapndView');
            this.chatBodyHeightAdjust();
            this.viewPortSizeChanged();
            this.scrollbottom();
        });

        if (this.SM.chatBoxpanelRendered && this.SM.chatBoxpanelRendered.unsubscribe) {
            this.SM.chatBoxpanelRendered.unsubscribe();
        }
        this.SM.chatBoxpanelRendered = this.chatBoxpanelRendered
            .pipe(
                filter((x) => x === 'EXPAND'),
                first(),
            )
            .subscribe(() => {
                console.log('expand rendered');
                this.chatBodyHeightAdjust();
                this.viewPortSizeChanged();
            });
        this.chatHandler.isExpand.next(true);
    }

    closeExapndView() {
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
            this.SM.lastRender.unsubscribe();
        }
        this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
            this.chatBodyHeightAdjust();
            this.scrollbottom();
            this.viewPortSizeChanged();
        });

        if (this.SM.chatBoxpanelRendered && this.SM.chatBoxpanelRendered.unsubscribe) {
            this.SM.chatBoxpanelRendered.unsubscribe();
        }
        this.SM.chatBoxpanelRendered = this.chatBoxpanelRendered
            .pipe(
                filter((x) => x === 'COLLAPSE'),
                first(),
            )
            .subscribe(() => {
                console.log('Collapse rendered');
                this.chatBodyHeightAdjust();
                this.viewPortSizeChanged();
            });
        this.chatHandler.isExpand.next(false);
    }

    toggleExpandView() {
        if (this.chatHandler.isExpand.value) {
            this.closeExapndView();
        } else {
            this.openExapndView();
        }
    }

    startNewChat() {
        this.recentUserList = [];
        this.usersList = [];
        this.userListLoading = false;
        this.userSearchKeywords = '';
        this.panelVisibility = 'SEARCH_USER';
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        this.chatMenuOpen = false;
        this.contextMenuOpen = false;
        this.generateRecentUserList();
        if (this.SM.userPanelRendered && this.SM.userPanelRendered.unsubscribe) {
            this.SM.userPanelRendered.unsubscribe();
        }
        this.SM.userPanelRendered = this.userSearchPanelRendered.pipe(first()).subscribe(() => {
            this.initUserSearchInput();
        });
    }

    closeBlockedListPanel() {
        this.showInlineLoader = false;
        this.userListLoading = false;
        this.chatMenuOpen = false;
        this.panelVisibility = 'THREAD';
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        this.contextMenuOpen = false;
    }

    fetchBlockUserList() {
        this.showInlineLoader = true;
        this.socket.directMessageSent.next(this.getBlockListPayload());
    }

    openBlockedListPanel() {
        this.chatMenuOpen = false;
        this.panelVisibility = 'BLOCKED_USERS';
        this.blockedUsersList = [];
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        this.contextMenuOpen = false;
        this.fetchBlockUserList();
    }

    closeNewChatPanel() {
        this.chatMenuOpen = false;
        this.showInlineLoader = false;
        this.recentUserList = [];
        this.usersList = [];
        this.userListLoading = false;
        this.userSearchKeywords = '';
        this.panelVisibility = 'THREAD';
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        this.contextMenuOpen = false;
    }

    closeChatPanel() {
        this.openedThread = null;
        this.messageList = [];
        this.chatMenuOpen = false;
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        this.contextMenuOpen = false;
    }

    openUserInfoPanel(thread: ThreadListItem) {
        this.chatMenuOpen = false;
        this.selectedUser = thread?.computed_targetedUser || null;
        this.panelVisibility = 'USER_DETAILS';
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        this.contextMenuOpen = false;
    }
    closeUserInfoPanel() {
        this.chatMenuOpen = false;
        this.panelVisibility = 'THREAD';
        this.selectedUser = null;
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        this.contextMenuOpen = false;
    }

    closePanel() {
        this.showInlineLoader = false;
        this.panelVisibility = 'THREAD';
        this.openedThread = null;
        this.chatMenuOpen = false;
        this.messageList = [];
        this.chatHandler.isOpen.next(false);
        this.chatHandler.isExpand.next(false);
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        this.contextMenuOpen = false;
    }

    openPanel() {
        this.closeNewChatPanel();
        this.closeUserInfoPanel();
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
        this.openedThread = null;
        this.chatMenuOpen = false;
        this.messageList = [];
        this.selectedUser = null;
        this.contextMenuOpen = false;
        if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
            this.SM.lastRender.unsubscribe();
        }
        this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
            this.chatBodyHeightAdjust();
            this.scrollbottom();
        });

        if (this.SM.chatVisibilityRendered && this.SM.chatVisibilityRendered.unsubscribe) {
            this.SM.chatVisibilityRendered.unsubscribe();
        }
        this.SM.chatVisibilityRendered = this.chatVisibilityRendered
            .pipe(
                filter((x) => x),
                first(),
            )
            .subscribe((x) => {
                this.viewPortSizeChanged();
                this.chatBodyHeightAdjust();
                this.scrollbottom();
            });
        this.chatHandler.isExpand.next(false);
        this.chatHandler.isOpen.next(true);
    }
}
