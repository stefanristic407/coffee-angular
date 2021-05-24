import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import Viewer from 'viewerjs';
import { debounce, first, filter, tap } from 'rxjs/operators';
import { Subscription, fromEvent, interval, Subject, timer } from 'rxjs';
import { Component, OnInit, OnDestroy, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import {
    SocketService,
    ChatHandlerService,
    ChatUtilService,
    GlobalsService,
    ChatApiServices,
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
    ResponseSearchMessageRow,
    SearchChatMessagResult,
    MessageMeta,
    StickerListItem,
    ResponseReadUpdate,
} from '@models';
import {
    ThreadActivityType,
    OrganizationType,
    ThreadType,
    ServiceCommunicationType,
    ChatMessageType,
    MessageMetaTypes,
} from '@enums';
import { trigger, transition, state, animate, style } from '@angular/animations';

const badwordsRegExp = require('badwords/regexp') as RegExp;

@Component({
    selector: 'app-sewn-direct-message',
    templateUrl: './sewn-direct-message.component.html',
    styleUrls: ['./sewn-direct-message.component.scss'],
    animations: [
        trigger('buttonFade', [
            transition(':enter', [style({ opacity: 0 }), animate('.5s', style({ opacity: 1 }))]),
            transition(':leave', [style({ opacity: 1 }), animate('.5s', style({ opacity: 0 }))]),
        ]),
    ],
})
export class SewnDirectMessageComponent implements OnInit, OnDestroy, AfterViewInit {
    private UPDATE_USER_STATUS_INTERVAL = 1000 * 45; // Update  last seen and online status on every 45 sec
    private UPDATE_UNREAD_INTERVAL = 1000 * 60 * 4; // Update unread on every 4 min or when a message receive.
    private userStatusTimerRef = 0;
    private unReadTimerRef = 0;
    private SM: { [SubscriptionName: string]: Subscription } = {}; // Subscrition MAP object
    public threadList: ThreadListItem[] = [];
    public usersList: UserListItem[] = [];
    public recentUserList: RecentUserListItem[] = [];
    public myBlockList: BlockListItem[] = [];
    public whoBlockedMe: BlockListItem[] = [];
    private viewerRef: Viewer | null = null;
    public blockMap: {
        myBlock: { [key: string]: BlockListItem };
        blockedMe: { [key: string]: BlockListItem };
    } = {
        myBlock: {},
        blockedMe: {},
    };
    public userSearchKeywords = '';
    public selectedUser: ThreadMember | null = null;
    public emojiList = [];
    public stickerList: StickerListItem[] = [];
    private muteList: Set<number> = new Set<number>();

    private unblockUserReferance: BlockListItem | null = null;
    private blockThreadReferance: ThreadListItem | null = null;
    private clearThreadReferance: ThreadListItem | null = null;
    private deleteThreadReferance: ThreadListItem | null = null;
    public defaultProfileImage = 'assets/images/dm-default-profile.svg';
    public bokenImage = 'assets/images/dm-broken-image.svg';
    public chatListScrollEventSubject = new Subject<Event>();

    public loader = {
        auth: false,
        chatSearch: false,
        threadHistoryFetch: false,
        threadListFetch: false,
        threadDetailsFetch: false,
        blockListFetch: false,
        muteFetch: false,
        userListFetchFetch: false,
        openOrCreateThreadAction: false,
        blockAction: false,
        unblockAction: false,
        muteAction: false,
        unMuteAction: false,
        clearChatAction: false,
        deleteChatAction: false,
        reportAction: false,
    };

    public chatSearch = {
        // ANCHOR chatSearch
        keyword: '',
        expand: false,
        inputSubject: new Subject<InputEvent>(),
        page: 1,
        activeResultIndex: 0,
        searchResult: [] as SearchChatMessagResult[],
        lastSentTimeStamp: '',
        config: {
            perPage: 99,
            rows: 7,
        },
        get activeResult(): SearchChatMessagResult {
            return this.searchResult[this.activeResultIndex] || { messageUnit: [], activity_id: 0 };
        },
        upNavigation: () => {
            if (this.chatSearch.activeResultIndex > 0) {
                this.chatSearch.activeResultIndex--;
            } else {
                this.chatSearch.activeResultIndex = this.chatSearch.searchResult.length - 1;
            }
            this.focusSearchResult();
        },
        downNavigation: () => {
            if (this.chatSearch.activeResultIndex < this.chatSearch.searchResult.length - 1) {
                this.chatSearch.activeResultIndex++;
            } else {
                this.chatSearch.activeResultIndex = 0;
            }
            this.focusSearchResult();
        },
        escAction: (event: KeyboardEvent) => {
            if (event.key === 'Esc' || event.key === 'Escape') {
                this.chatSearch.reset();
            }
        },
        resetSearchResult: () => {
            this.chatSearch.page = 1;
            this.chatSearch.searchResult = [];
            this.chatSearch.lastSentTimeStamp = '';
            this.chatSearch.activeResultIndex = 0;
        },
        reset: () => {
            this.chatSearch.keyword = '';
            this.chatSearch.expand = false;
            this.chatSearch.page = 1;
            this.chatSearch.searchResult = [];
            this.chatSearch.lastSentTimeStamp = '';
            this.chatSearch.activeResultIndex = 0;
        },
        toggle: () => {
            const openState = !this.chatSearch.expand;
            this.chatSearch.reset();
            this.chatSearch.expand = openState;
        },
    };

    private threadListConfig = {
        perPage: 200,
        activePage: 1,
    };
    private messageListConfig = {
        lastSentTimeStamp: '',
        totalCount: 0,
        perPage: 10,
        activePage: 1,
    };
    selectedSticker: StickerListItem | null = null;
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
    public searchMessageRendered = new Subject();
    public chatBoxpanelRendered = new Subject<'EXPAND' | 'COLLAPSE'>();
    public userSearchInputSubject = new Subject();
    public threadFinderReturned = new Subject();
    public chatVisibilityRendered = new Subject<boolean>();
    public notificationState = false;
    public contextMenuOpen = false;
    public showMessageBoxPanel: 'OFF' | 'EMOJI' | 'STICKER' = 'OFF';

    public chatMenuOpen = false;

    public fontSizeList = [
        { label: 'Small', value: 'small' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large' },
    ];
    public panelVisibility: 'THREAD' | 'CHAT' | 'BLOCKED_USERS' | 'SEARCH_USER' | 'USER_DETAILS' = 'THREAD';
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
        private chatUtil: ChatUtilService,
        private toast: ToastrService,
        public gtrans: GoogletranslateService,
        public chatApi: ChatApiServices,
    ) {}

    ngOnInit(): void {
        this.chatHandler.fetchSettings();
        this.loader.auth = true;

        this.acceptFileTypeString = this.acceptFileTypeArray.join(',');
        this.emojiList = this.chatUtil.emojiList;
        this.stickerList = this.chatUtil.stickerList;
        this.SM.WSState = this.socket.socketState.subscribe((value) => {
            if (value === 'CONNECTED') {
                this.initializeWebSocket();
            }
        });
        this.SM.ChatHandlerService = this.chatHandler.chatSubject.subscribe(this.chatServiceRequestHandling);
        this.SM.settingUpdated = this.chatHandler.settingUpdated.subscribe(this.settingUpdatedHandler);
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
            // FIXME change it into Pipe Delay
            setTimeout(() => {
                this.uiUpdateOnStateChange();
            }, 150);
        });
        this.SM.chatSearchInputChangesSubscription = this.userSearchInputSubject
            .pipe(
                tap(() => {
                    this.loader.userListFetchFetch = true;
                }),
                debounce(() => interval(500)),
            )
            .subscribe(this.userSearchInputChange);

        this.SM.chatSearchInputChangesSubscription = this.chatSearch.inputSubject
            .pipe(
                tap(() => {
                    this.loader.chatSearch = true;
                }),
                debounce(() => interval(500)),
            )
            .subscribe(this.chatSearchChange);

        this.SM.chatListScrollEventSubscription = this.chatListScrollEventSubject
            .pipe(debounce(() => interval(500)))
            .subscribe(this.chatListScrollListener);
    }

    saveSettings() {
        this.settingUpdatedHandler();
        this.SM.saveSetting = this.chatHandler.saveSettings().subscribe((res: boolean) => {
            // if (res) {
            //     this.toast.success('The setting changes saved successfully', 'Settings');
            // } else {
            //     this.toast.error('Failed to save the setting changes', 'Settings');
            // }
        });
        this.chatHandler.settingUpdated.next();
    }

    settingUpdatedHandler = () => {
        if (!this.chatHandler.setting.enable_emoticons && this.showMessageBoxPanel === 'EMOJI') {
            this.showMessageBoxPanel = 'OFF';
        }
    };

    menuAction(action: 'BLOCK' | 'CLEAR' | 'DELETE' | 'MUTE' | 'UNMUTE') {
        this.chatMenuOpen = false;
        if (action === 'BLOCK') {
            this.blockUser(this.openedThread.computed_targetedUser);
        } else if (action === 'CLEAR') {
            this.clearChat();
        } else if (action === 'DELETE') {
            this.deleteChat();
        } else if (action === 'MUTE') {
            this.muteAction(this.openedThread);
        } else if (action === 'UNMUTE') {
            this.unMuteAction(this.openedThread);
        }
    }

    toggleMenu() {
        this.contextMenuOpen = !this.contextMenuOpen;
        if (this.contextMenuOpen) {
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
                            this.saveSettings();
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
            } else if (WSmsg.type === ChatMessageType.searchMessage) {
                this.handleChatSearchResult(
                    WSmsg as WSResponse<
                        {
                            activity_id: number;
                            messages: ResponseSearchMessageRow[];
                        }[]
                    >,
                );
            } else if (WSmsg.type === ChatMessageType.blockUpdate) {
                this.handleBlockUpdateResponse(WSmsg as WSResponse<any>);
            } else if (WSmsg.type === ChatMessageType.unblockUpdate) {
                this.handleUnBlockUpdateResponse(WSmsg as WSResponse<any>);
            } else if (WSmsg.type === ChatMessageType.readUpdate) {
                this.handleReadUpdateResponse(WSmsg as WSResponse<ResponseReadUpdate>);
            } else if (WSmsg.type === ChatMessageType.muteThread) {
                this.handleMuteResponse(WSmsg as WSResponse<any>);
            } else if (WSmsg.type === ChatMessageType.unmuteThread) {
                this.handleUnMuteResponse(WSmsg as WSResponse<any>);
            } else if (WSmsg.type === ChatMessageType.muteList) {
                this.handleMuteListResponse(WSmsg as WSResponse<any>);
            }
        });

        this.SM.WSAuthentication = this.socket.authenticate().subscribe((res) => {
            if (res === 'SUCCESS') {
                this.loader.auth = false;
                this.socket.directMessageSent.next(this.getThreadListPayload());
                this.fetchBlockUserList();
                this.fetchMuteList();
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
                userPayload[`${m.user_id}_${m.org_type}_${m.org_id || 0}`] = {
                    org_id: m.org_id || undefined,
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

    getThreadListPayload() {
        this.loader.threadListFetch = true;
        const timestamp = this.chatUtil.getTimeStamp();
        return {
            timestamp,
            type: ChatMessageType.threads,
            data: {
                user_id: this.chatUtil.USER_ID,
                org_type: this.chatUtil.ORGANIZATION_TYPE,
                org_id: this.chatUtil.ORGANIZATION_ID || undefined,
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

    getMessagePayload(data: any) {
        const timestamp = this.chatUtil.getTimeStamp();
        const payload: any = {
            type: ChatMessageType.message,
            timestamp,
            data,
        };
        return payload;
    }

    getBlockListPayload() {
        this.loader.blockListFetch = true;
        const timestamp = this.chatUtil.getTimeStamp();
        return {
            timestamp,
            type: ChatMessageType.blocklist,
        };
    }

    getHistoryPayload(thread: ThreadListItem) {
        this.loader.threadHistoryFetch = true;
        const timestamp = this.chatUtil.getTimeStamp();
        this.messageListConfig.lastSentTimeStamp = timestamp;
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
        this.loader.openOrCreateThreadAction = true;
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
        message.showUserBadge = false;
        const meta = { type: MessageMetaTypes.TEXT_ONLY } as MessageMeta;
        try {
            message.meta = (JSON.parse(message.meta_data) || meta) as MessageMeta;
        } catch (e) {
            message.meta = meta;
        }
        if (message.meta.type === 'STICKER' && message.meta.sticker) {
            message.meta.sticker.stickerItem = this.stickerList.find((x) => x.name === message.meta.sticker.name);
        }

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
        if (threadUser.org_type === OrganizationType.SEWN_ADMIN || threadUser.org_type === OrganizationType.CONSUMER) {
            threadUser.org_id = 0;
        }
        threadUser.org_name = threadUser.org_name || '';
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
                    (mem.org_id || 0) === this.chatUtil.ORGANIZATION_ID &&
                    mem.user_id === this.chatUtil.USER_ID
                ) {
                    activeUser.push(mem);
                } else {
                    targtedUserList.push(mem);
                }
            }
        });
        thread.blockedDetails = {
            blockedMe: false,
            myBlock: false,
        };
        const meta = { type: MessageMetaTypes.TEXT_ONLY } as MessageMeta;
        try {
            thread.meta = (JSON.parse(thread.meta_data) || meta) as MessageMeta;
        } catch (e) {
            thread.meta = meta;
        }

        thread.computed_mute = false;
        thread.computed_activeUser = activeUser[0];
        thread.computed_targetedUser = targtedUserList[0];
        thread.computed_targetedUserList = targtedUserList;
        thread.computed_createdAt = this.chatUtil.getReadableTime(thread.activity_created_at || '');
        thread.computed_thread_createdAt = this.chatUtil.getReadableTime(thread.created_at || '');
        thread.computed_lastActivityText = this.getLastActivityText(thread, 'THREAD');
        return thread;
    }

    handleIncomingMessages(WSmsg: WSResponse<IncomingChatMessage>) {
        let message = WSmsg.data;
        if (WSmsg.code === 201 && message.thread.type === ThreadType.normal) {
            if (message.activity_type === ThreadActivityType.message) {
                const inThread = this.threadList.find((thread) => thread.id === message.thread.id);
                if (inThread) {
                    message = this.processChatMessages(message, inThread) as IncomingChatMessage;
                    const user = message?.member?.user;
                    if (user) {
                        this.processThreadUser(user);
                    }
                    this.updateSendersOnlineStatus(user, inThread);
                    if (this.openedThread && this.openedThread.id === message.thread.id) {
                        this.updateChatMessageBodyElRef();
                        if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
                            this.SM.lastRender.unsubscribe();
                        }
                        this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
                            this.scrollbottom();
                        });
                        const lastMessage = this.messageList[this.messageList.length - 1];
                        if (!lastMessage) {
                            message.showDateBadge = true;
                        } else {
                            message.showDateBadge = lastMessage.dateString !== message.dateString;
                        }
                        this.messageList.push(message);
                        this.openedThread.computed_lastActivityText = this.getLastActivityText(message, 'MESSAGE');
                        this.sendReadToken(message.id);
                    } else {
                        inThread.computed_lastActivityText = this.getLastActivityText(message, 'MESSAGE');
                        if (
                            !inThread.computed_mute &&
                            !message.isActiveUser &&
                            this.chatHandler.setting.notification_sound
                        ) {
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
            if (WSmsg.code === 409) {
                console.log('the thread should be blocked');
            } else {
                console.log('Incoming message incorrect status/content');
            }
        }
    }

    updateSendersOnlineStatus(sender: ThreadMember, threadOpen: ThreadListItem) {
        if (
            !threadOpen.computed_targetedUser.online &&
            threadOpen.computed_targetedUser.user_id === sender.user_id &&
            threadOpen.computed_targetedUser.org_type === sender.org_type &&
            (threadOpen.computed_targetedUser.org_id || 0) === (sender.org_id || 0)
        ) {
            this.updateUserStatus();
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
        this.loader.threadHistoryFetch = false;
        if (WSmsg.code === 200) {
            this.messageListConfig.totalCount = WSmsg.result_info.total_count;
            this.messageListConfig.activePage = WSmsg.result_info.page;
            const rawMessagesList = WSmsg.data.filter((x) => x.activity_type === ThreadActivityType.message);
            const newProcessedMessages: ChatMessage[] = []; // mainly use for lang detection
            const alreadyExistingMessageID = this.messageList.map((msgItm) => msgItm.id);
            const existingLastMessageId = alreadyExistingMessageID[0];
            if (existingLastMessageId) {
                // Used to preserve already existing position of current message
                if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
                    this.SM.lastRender.unsubscribe();
                }
                this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
                    this.scrollToMessage(existingLastMessageId);
                });
            }
            rawMessagesList.forEach((newMsg) => {
                const cookedMessage = this.processChatMessages(newMsg, this.openedThread);
                if (!alreadyExistingMessageID.includes(cookedMessage.id)) {
                    this.messageList.unshift(cookedMessage);
                    newProcessedMessages.push(cookedMessage);
                }
            });
            this.detectLangBatchMessages(newProcessedMessages);

            for (let index = 0, len = this.messageList.length; index < len; index++) {
                const prevMessage = this.messageList[index - 1];
                const activeMessage = this.messageList[index];
                if (!prevMessage) {
                    activeMessage.showDateBadge = true;
                } else {
                    activeMessage.showDateBadge = prevMessage.dateString !== activeMessage.dateString;
                }
            }
            const lastMessage = this.messageList[this.messageList.length - 1];
            if (lastMessage) {
                this.openedThread.computed_lastActivityText = this.getLastActivityText(lastMessage, 'MESSAGE');
                this.sendReadToken(lastMessage.id);
            }
            this.updateUnRead();
        } else {
            console.log('Websocket:Thread History: Failure');
        }
    }

    detectLangBatchMessages(messageList: ChatMessage[]) {
        if (messageList.length) {
            const contentArray = [];
            messageList.forEach((msgListItem: ChatMessage) => {
                if (this.gtrans.validateMessage(msgListItem.content)) {
                    contentArray.push(msgListItem.content);
                } else {
                    msgListItem.lang = this.gtrans.defaultLang;
                    contentArray.push('');
                }
            });
            if (contentArray.length) {
                this.gtrans.detectBatch(contentArray).subscribe((outPut) => {
                    messageList.forEach((msgListItem, index) => {
                        msgListItem.lang = outPut[index] || this.gtrans.defaultLang;
                    });
                });
            }
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
                if (
                    userStatus.org_type === OrganizationType.SEWN_ADMIN ||
                    userStatus.org_type === OrganizationType.CONSUMER
                ) {
                    userStatus.org_id = 0;
                }
                userStatusMap[`${userStatus.user_id}_${userStatus.org_type}_${userStatus.org_id || 0}`] = userStatus;
            });
            this.filteredThreadList.forEach((thread) => {
                thread.members.forEach((member) => {
                    const key = `${member.user_id}_${member.org_type}_${member.org_id || 0}`;
                    member.last_seen = userStatusMap[key]?.last_seen || '';
                    member.online = userStatusMap[key].online;
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
            this.filteredThreadList.forEach((x) => {
                const count = WSmsg?.data?.threads?.[x.id] || 0;
                x.unread = count;
                totalCount += count;
            });
            this.chatHandler.unReadCount.next(totalCount);
        } else {
            console.log('Websocket:Unread: Failure');
        }
    }

    handleBlockUpdateResponse(WSmsg: WSResponse<any>) {
        if (WSmsg.success && (WSmsg.code === 200 || WSmsg.code === 201)) {
            const newblock = this.processBlockedUserList([WSmsg.data])[0];
            this.whoBlockedMe.push(newblock);
            this.generateBlockMap();
            this.updateBlockStatuOnUserList();
            this.updateBlockStatusOnThreadList();
            this.toast.warning(`You have been blocked by ${newblock.computed_fullname}`, 'Direct Messaging');
        } else {
            console.log('Websocket:Block Update: error');
        }
    }

    handleUnBlockUpdateResponse(WSmsg: WSResponse<any>) {
        if (WSmsg.success && (WSmsg.code === 200 || WSmsg.code === 201)) {
            const unblock = this.processBlockedUserList([WSmsg.data])[0];
            const index = this.whoBlockedMe.findIndex(
                (ub) =>
                    ub.user_id === unblock.user_id &&
                    (ub.org_id || 0) === (unblock.org_id || 0) &&
                    ub.org_type === unblock.org_type,
            );
            if (index > -1) {
                this.whoBlockedMe.splice(index, 1);
                this.generateBlockMap();
                this.updateBlockStatuOnUserList();
                this.updateBlockStatusOnThreadList();
            }
            this.toast.success(`You have been unblocked by ${unblock.computed_fullname}`, 'Direct Messaging');
        } else {
            console.log('Websocket:UnBlock Update: error');
        }
    }

    handleReadUpdateResponse(WSmsg: WSResponse<ResponseReadUpdate>) {
        if (WSmsg.success && WSmsg.code === 200) {
            if (this.openedThread && this.openedThread.id === WSmsg.data.thread.id) {
                const message = this.messageList.find((msg) => msg.id === WSmsg.data.id);
                if (message) {
                    message.is_read = WSmsg.data.is_read;
                }
            }
        } else {
            console.log('Websocket: unread Update: error');
        }
    }

    handleMuteResponse(WSmsg: WSResponse<any>) {
        console.log('Mute response', WSmsg);
        this.loader.muteAction = false;
        if (WSmsg.success && WSmsg.code === 200) {
            this.toast.success('Muted successfully', 'Mute');
            this.muteList.add(WSmsg.data.thread_id);
            this.updateMuteStatusOnThreadList();
        } else {
            if (WSmsg.code === 409) {
                this.toast.warning('Failed to mute, already in mute', 'Mute');
            } else {
                this.toast.error('Failed to mute, please try after sometime', 'Mute');
                console.log('Websocket: Mute: error');
            }
        }
    }

    handleUnMuteResponse(WSmsg: WSResponse<any>) {
        console.log('UnMute response', WSmsg);
        this.loader.unMuteAction = false;
        if (WSmsg.success && WSmsg.code === 200 && WSmsg.data.thread_id) {
            this.muteList.delete(WSmsg.data.thread_id);
            this.updateMuteStatusOnThreadList();
            this.toast.success('Unmuted successfully', 'Unmute');
        } else {
            if (WSmsg.code === 409) {
                this.toast.warning('Failed to unmute, already in unmute', 'Unmute');
            } else {
                this.toast.error('Failed to unmute, please try after sometime', 'Unmute');
                console.log('Websocket: Mute: error');
            }
        }
    }

    handleMuteListResponse(WSmsg: WSResponse<any>) {
        console.log('Mute List', WSmsg);
        this.loader.muteFetch = false;
        if (WSmsg.success && WSmsg.code === 200) {
            this.muteList.clear();
            (WSmsg.data || []).forEach((threadId: number) => {
                this.muteList.add(threadId);
            });
            this.updateMuteStatusOnThreadList();
        }
    }

    muteAction(thread: ThreadListItem) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.loader.muteAction = true;
        this.socket.directMessageSent.next({
            timestamp,
            type: ChatMessageType.muteThread,
            data: {
                thread_id: thread.id,
            },
        });
    }
    unMuteAction(thread: ThreadListItem) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.loader.unMuteAction = true;
        this.socket.directMessageSent.next({
            timestamp,
            type: ChatMessageType.unmuteThread,
            data: {
                thread_id: thread.id,
            },
        });
    }

    toggleMute(event: any) {
        if (event.checked) {
            this.muteAction(this.openedThread);
        } else {
            this.unMuteAction(this.openedThread);
        }
    }

    fetchMuteList() {
        this.loader.muteFetch = true;
        const timestamp = this.chatUtil.getTimeStamp();
        this.socket.directMessageSent.next({
            timestamp,
            type: ChatMessageType.muteList,
            data: null,
        });
    }

    updateMuteStatusOnThreadList() {
        this.threadList.forEach((thread) => {
            thread.computed_mute = this.muteList.has(thread.id);
        });
    }

    handleBlockListResponse(
        WSmsg: WSResponse<{
            block_list: BlockListItem[];
            blocked_list: BlockListItem[];
        }>,
    ) {
        this.loader.blockListFetch = false;
        if (WSmsg.code === 200 && WSmsg.data) {
            this.myBlockList = this.processBlockedUserList(WSmsg.data.block_list);
            this.whoBlockedMe = this.processBlockedUserList(WSmsg.data.blocked_list);
            this.generateBlockMap();
            this.updateBlockStatuOnUserList();
            this.updateBlockStatusOnThreadList();
        } else {
            console.log('Websocket:Block list: Failure');
        }
    }

    generateBlockMap() {
        this.blockMap = {
            blockedMe: {},
            myBlock: {},
        };
        for (const item of this.myBlockList) {
            const key = `${item.user_id}_${item.org_type}_${item.org_id || 0}`;
            this.blockMap.myBlock[key] = item;
        }
        for (const item of this.whoBlockedMe) {
            const key = `${item.user_id}_${item.org_type}_${item.org_id || 0}`;
            this.blockMap.blockedMe[key] = item;
        }
    }

    updateBlockStatusOnThreadList() {
        this.threadList.forEach((thread: ThreadListItem) => {
            const user = thread.computed_targetedUser;
            const key = `${user.user_id}_${user.org_type}_${user.org_id || 0}`;
            thread.blockedDetails.myBlock = !!this.blockMap.myBlock[key];
            thread.blockedDetails.blockedMe = !!this.blockMap.blockedMe[key];
        });
    }
    updateBlockStatuOnUserList() {
        this.usersList.forEach((user: UserListItem) => {
            const key = `${user.user_id}_${user.organization_type}_${user.organization_id || 0}`;
            user.blockedDetails.myBlock = !!this.blockMap.myBlock[key];
            user.blockedDetails.blockedMe = !!this.blockMap.blockedMe[key];
        });
        this.recentUserList.forEach((recentUser: RecentUserListItem) => {
            const key = `${recentUser.user_id}_${recentUser.organization_type}_${recentUser.organization_id || 0}`;
            recentUser.blockedDetails.myBlock = !!this.blockMap.myBlock[key];
            recentUser.blockedDetails.blockedMe = !!this.blockMap.blockedMe[key];
        });
    }

    processBlockedUserList(list: Partial<BlockListItem>[]): BlockListItem[] {
        return (list || []).map((blockedUser: BlockListItem) => {
            if (blockedUser.org_type === OrganizationType.SEWN_ADMIN) {
                blockedUser.org_id = 0;
            }
            blockedUser.computed_organization_name = this.chatUtil.getOrganization(blockedUser.org_type);
            blockedUser.computed_fullname = blockedUser.first_name + ' ' + blockedUser.last_name;
            blockedUser.computed_profile_dp = this.getProfileImageBgStyle(blockedUser.profile_pic);
            blockedUser.computed_profile_direct_url = this.getProfileImageDirectURL(blockedUser.profile_pic);
            return blockedUser;
        }) as BlockListItem[];
    }

    handleBlockResponse(WSmsg: WSResponse<BlockListItem>) {
        this.loader.blockAction = false;
        const isActivityOnThisTab =
            this.openedThread && this.blockThreadReferance && this.openedThread.id === this.blockThreadReferance.id;
        if (WSmsg.success && WSmsg.code === 201) {
            const newBlockedItem = this.processBlockedUserList([WSmsg.data])[0];
            this.myBlockList.push(newBlockedItem);
            this.generateBlockMap();
            this.updateBlockStatuOnUserList();
            this.updateBlockStatusOnThreadList();
            this.updateMuteStatusOnThreadList();
            if (this.openedThread && this.isThreadBlocked(this.openedThread)) {
                if (this.chatHandler.isExpand.value) {
                    this.closeChatPanel();
                    this.closeUserInfoPanel();
                    const newOpendThread = this.filteredThreadList[0];
                    if (newOpendThread) {
                        this.openThreadChat(newOpendThread);
                    }
                } else {
                    this.closeChatPanel();
                    this.closeUserInfoPanel();
                }
            }

            if (isActivityOnThisTab) {
                this.toast.success(`Successfully blocked the user ${newBlockedItem.computed_fullname}`, 'Block');
                this.openBlockedListPanel();
            } else {
                this.toast.info(
                    `You have blocked ${newBlockedItem.computed_fullname} from another logged in session.`,
                    'Direct Messaging',
                );
            }
        } else if (WSmsg.code === 409) {
            if (isActivityOnThisTab) {
                this.toast.error('The user is already blocked', 'Block');
                this.openBlockedListPanel();
            } else {
                console.log('Info: Failed to block the following user from another logged in session', WSmsg.data);
            }
        } else {
            this.toast.error('Unable to block the user', 'Block');
        }
        this.blockThreadReferance = null;
    }

    handleUnBlockResponse(WSmsg: WSResponse<BlockListItem>) {
        this.loader.unblockAction = false;
        if (WSmsg.success && WSmsg.code === 200) {
            const unblockedItem = this.processBlockedUserList([WSmsg.data])[0];

            const isSameTab =
                unblockedItem &&
                this.unblockUserReferance &&
                unblockedItem.user_id === this.unblockUserReferance.user_id &&
                unblockedItem.org_type === this.unblockUserReferance.org_type &&
                (unblockedItem.user_id || 0) === (this.unblockUserReferance.user_id || 0);

            const index = this.myBlockList.findIndex(
                (myBlock) =>
                    myBlock.user_id === unblockedItem.user_id &&
                    myBlock.org_type === unblockedItem.org_type &&
                    (myBlock.org_id || 0) === (unblockedItem.org_id || 0),
            );
            if (index > -1) {
                this.myBlockList.splice(index, 1);
                this.generateBlockMap();
                this.updateBlockStatuOnUserList();
                this.updateBlockStatusOnThreadList();
            }
            if (isSameTab) {
                this.toast.success(`Successfully unblocked the user ${unblockedItem.computed_fullname}`, 'Unblock');
            } else {
                this.toast.info(
                    `You have unblocked ${unblockedItem.computed_fullname} from another logged in session.`,
                    'Direct Messaging',
                );
            }
            this.fetchBlockUserList();
        } else {
            this.toast.error('Unable to unblock the user', 'Unblock');
        }
        this.unblockUserReferance = null;
    }

    handleClearChatResponse(WSmsg: WSResponse<any>) {
        this.loader.clearChatAction = false;
        if (WSmsg.success && WSmsg.code === 200) {
            const index = this.threadList.findIndex((thread) => thread.id === this.clearThreadReferance.id);
            if (index > -1) {
                if (this.clearThreadReferance) {
                    this.clearThreadReferance.computed_lastActivityText = '';
                }
                if (this.clearThreadReferance.id === this.openedThread?.id) {
                    this.openThreadChat(this.openedThread);
                }
            }
            this.toast.success('Successfully clear the conversation', 'Clear Conversation');
        } else {
            this.toast.error('Unable to clear the conversation', 'Clear Conversation');
        }
        this.clearThreadReferance = null;
    }

    handleDeleteChatResponse(WSmsg: WSResponse<any>) {
        this.loader.deleteChatAction = false;
        if (WSmsg.success && WSmsg.code === 200) {
            const index = this.threadList.findIndex((thread) => thread.id === this.deleteThreadReferance.id);
            if (index > -1) {
                this.threadList.splice(index, 1);
                if (this.deleteThreadReferance.id === this.openedThread?.id) {
                    if (this.chatHandler.isExpand.value) {
                        if (this.threadList[0]) {
                            this.openThreadChat(this.threadList[0]);
                        } else {
                            this.closeChatPanel();
                        }
                    } else {
                        this.closeChatPanel();
                    }
                }
            }
            this.toast.success('Successfully deleted the conversation', 'Delete Conversation');
        } else {
            this.toast.error('Unable to delete the conversation', 'Delete Conversation');
        }
        this.deleteThreadReferance = null;
    }

    handleThreadsResponse(WSmsg: WSResponse<ThreadListItem[]>) {
        this.loader.threadListFetch = false;
        if (WSmsg.code === 200) {
            this.threadList = (WSmsg.data || []).filter((thread) => thread.type === ThreadType.normal);
            this.threadList.forEach((thread) => {
                this.processThreads(thread);
            });
            this.updateBlockStatusOnThreadList();
            this.updateMuteStatusOnThreadList();
            this.updateUserStatus();
            this.updateUnRead();
        } else {
            console.log('Websocket:Thread: Failure');
        }
    }

    handleFindThreadRequest(WSmsg: WSResponse<ThreadListItem[]>) {
        this.loader.openOrCreateThreadAction = false;
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
                    this.updateBlockStatusOnThreadList();
                    this.updateMuteStatusOnThreadList();
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
                    this.updateBlockStatusOnThreadList();
                    this.updateMuteStatusOnThreadList();
                }
                if (!thread.computed_mute && this.chatHandler.setting.notification_sound) {
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

    handleChatSearchResult(
        WSmsg: WSResponse<
            {
                activity_id: number;
                messages: ResponseSearchMessageRow[];
            }[]
        >,
    ) {
        this.loader.chatSearch = false;
        if (WSmsg.code === 200 && WSmsg.data && WSmsg.data.length) {
            for (const resResult of WSmsg.data) {
                const processedResultItem: SearchChatMessagResult = {
                    activity_id: resResult.activity_id,
                    messageUnit: [],
                };
                // FIXME  normalizing message make sure this is standards in all message format
                for (const resMessage of resResult.messages) {
                    if (resMessage.activity_type === ThreadActivityType.message) {
                        const preProcessedMessage: any = resMessage;
                        preProcessedMessage.is_read = true;
                        preProcessedMessage.thread = {
                            id: this.openedThread.id,
                            name: this.openedThread.name,
                            status: this.openedThread.status,
                            created_by: '',
                            type: this.openedThread.type,
                            type_id: this.openedThread.type_id,
                            created_at: this.openedThread.created_at,
                        };
                        preProcessedMessage.member = resMessage.member || {};
                        preProcessedMessage.member.user = resMessage.member.user || {};
                        preProcessedMessage.member.user.is_removed = false;
                        const message = this.processChatMessages(preProcessedMessage, this.openedThread);
                        const user = this.processThreadUser(preProcessedMessage.member.user);

                        processedResultItem.messageUnit.push({
                            message,
                            user,
                            isMatch: resResult.activity_id === message.id,
                        });
                    }
                }
                const messsageMap = processedResultItem.messageUnit.map((x) => x.message);
                this.detectLangBatchMessages(messsageMap);

                for (let index = 0, len = processedResultItem.messageUnit.length; index < len; index++) {
                    const prevMessage = (processedResultItem.messageUnit[index - 1] || {}).message;
                    const activeMessage = (processedResultItem.messageUnit[index] || {}).message;
                    if (!prevMessage) {
                        activeMessage.showDateBadge = true;
                    } else {
                        activeMessage.showDateBadge = prevMessage.dateString !== activeMessage.dateString;
                    }
                }
                this.focusSearchResult();
                this.chatSearch.searchResult.push(processedResultItem);
                this.chatSearch.activeResultIndex = 0;
            }
            console.log('handleChatSearchResult', this.chatSearch.searchResult);
        } else {
            console.log('Websocket:Search result: Failure');
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
        if (this.viewerRef) {
            this.viewerRef.destroy();
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
            const pl = req.payload as OpenChatThread;
            const key = `${pl.user_id}_${pl.org_type}_${pl.org_id || 0}`;
            if (!!this.blockMap.blockedMe[key]) {
                this.toast.error('The user has been blocked you', 'Unable to start the chat');
            } else if (!!this.blockMap.myBlock[key]) {
                this.toast.error('Remove the user from block list', 'Unable to start the chat');
            } else {
                this.findThread(req.payload as OpenChatThread);
            }
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
        this.messageInput += ' ' + span.innerText;
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
    detectOffensiveWords(msg) {
        badwordsRegExp.lastIndex = 0;
        if (badwordsRegExp.test(msg)) {
            this.showOffensiveMessageError = true;
            this.offensiveTimeout = window.setTimeout(this.offensiveTimeoutHandler, 3500);
            msg = this.replaceOffensiveWord(msg);
        }
        return msg;
    }

    sendSticker(sticker: StickerListItem) {
        this.selectedSticker = sticker;
        this.sendMessage();
    }

    sendMessage() {
        clearTimeout(this.offensiveTimeout);
        this.showOffensiveMessageError = false;
        let msg = this.messageInput.trim();
        const hasContent = !!msg;
        const hasImage = !!this.uploadFileMeta?.file_id;
        const hasSticker = !!this.selectedSticker?.name;
        const payload = {
            thread_id: this.openedThread.id,
            content: '',
            meta_data: '',
            file_id: undefined,
        };

        if (hasSticker) {
            payload.content = '';
            delete payload.file_id;
            payload.meta_data = JSON.stringify({
                type: MessageMetaTypes.STICKER,
                sticker: {
                    category: 'STANDARD',
                    version: 1,
                    name: this.selectedSticker?.name,
                },
            } as MessageMeta);
        } else if (hasContent && hasImage) {
            msg = this.detectOffensiveWords(msg);
            payload.content = msg;
            payload.file_id = this.uploadFileMeta?.file_id || '';
            payload.meta_data = JSON.stringify({
                type: MessageMetaTypes.PICTURE_CAPTION,
            } as MessageMeta);
        } else if (!hasContent && hasImage) {
            payload.content = '';
            payload.file_id = this.uploadFileMeta?.file_id || '';
            payload.meta_data = JSON.stringify({
                type: MessageMetaTypes.PICTURE_ONLY,
            } as MessageMeta);
        } else if (hasContent && !hasImage) {
            msg = this.detectOffensiveWords(msg);
            payload.content = msg;
            delete payload.file_id;
            payload.meta_data = JSON.stringify({
                type: MessageMetaTypes.TEXT_ONLY,
            } as MessageMeta);
        } else {
            this.toast.warning('Message text can not be blank', 'Unable to sent', { timeOut: 800 });
            return;
        }

        this.socket.directMessageSent.next(this.getMessagePayload(payload));
        if (this.chatHandler.setting.notification_sound) {
            this.chatUtil.playNotificationSound('OUTGOING');
        }
        this.messageInput = '';
        this.uploadFileMeta = null;
        this.selectedSticker = null;
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
    }

    focusSearchResult() {
        if (this.SM.searchMsgRenderSubs && this.SM.searchMsgRenderSubs.unsubscribe) {
            this.SM.searchMsgRenderSubs.unsubscribe();
        }
        this.SM.searchMsgRenderSubs = this.searchMessageRendered.pipe(first()).subscribe((x) => {
            const activeResultId = this.chatSearch.activeResult.activity_id;
            this.scrollToMessage(activeResultId);
        });
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

    userSearchInputClear() {
        this.userSearchKeywords = '';
        this.userSearchInputChange();
    }

    userSearchInputChange = () => {
        const searchQuery = this.userSearchKeywords.trim();
        if (searchQuery) {
            this.usersList = [];
            this.fetchUserList(searchQuery);
        } else {
            this.loader.userListFetchFetch = false;
            this.usersList = [];
        }
    };

    generateRecentUserList() {
        const recentListMap: { [key: string]: RecentUserListItem } = {};
        this.filteredThreadList.forEach((thread) => {
            const target = thread.computed_targetedUser;
            const user: RecentUserListItem = {
                computed_fullname: target.computed_fullname,
                computed_organization_name: target.computed_organization_name,
                computed_profile_direct_url: target.computed_profile_direct_url,
                organization_name: target.org_name || '',
                firstname: target.first_name,
                lastname: target.last_name,
                organization_id: target.org_id || 0,
                organization_type: target.org_type,
                profile_pic: target.profile_pic,
                blockedDetails: {
                    blockedMe: false,
                    myBlock: false,
                },
                id: target.id,
                user_id: target.user_id,
            };
            const key = `${user.user_id}_${user.organization_type}_${user.organization_id || 0}`;
            if (!recentListMap[key]) {
                recentListMap[key] = user;
            }
        });
        this.recentUserList = Object.values(recentListMap);
        this.updateBlockStatuOnUserList();
    }

    fetchUserList = (searchQuery: string) => {
        this.loader.userListFetchFetch = true;
        if (this.SM.userListSubscription && this.SM.userListSubscription.unsubscribe) {
            this.SM.userListSubscription.unsubscribe();
        }

        this.SM.userListSubscription = this.chatApi.searchUser(searchQuery).subscribe((data) => {
            console.log('userService', data);
            this.loader.userListFetchFetch = false;
            let list = [];
            if (data && data.success && data.result && data.result.length > 0) {
                list = data.result || [];
            }
            this.usersList = list
                .filter((x) => {
                    return !(
                        (x.organization_id || 0) === this.chatUtil.ORGANIZATION_ID &&
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
                        blockedDetails: {
                            blockedMe: false,
                            myBlock: false,
                        },
                        computed_fullname: x.firstname + ' ' + x.lastname,
                        computed_profile_dp: this.getProfileImageBgStyle(x.profile_image_url),
                        computed_profile_direct_url: this.getProfileImageDirectURL(x.profile_image_url),
                        computed_organization_name: '',
                    };
                    processedItem.computed_organization_name = this.chatUtil.getOrganization(
                        processedItem.organization_type,
                    );
                    return processedItem;
                });
            this.updateBlockStatuOnUserList();
        });
    };

    chatSearchChange = () => {
        // ANCHOR chatSearchChange
        if (this.chatSearch.keyword.trim()) {
            const timestamp = this.chatUtil.getTimeStamp();
            this.chatSearch.resetSearchResult();
            this.chatSearch.lastSentTimeStamp = timestamp;
            this.socket.directMessageSent.next({
                timestamp,
                type: ChatMessageType.searchMessage,
                data: {
                    thread_id: this.openedThread.id,
                    search_query: this.chatSearch.keyword,
                    rows: this.chatSearch.config.rows,
                    page: this.chatSearch.page,
                    per_page: this.chatSearch.config.perPage,
                },
            });
        } else {
            this.loader.chatSearch = false;
            this.chatSearch.searchResult = [];
        }
    };

    chatListScrollListener = () => {
        this.updateChatMessageBodyElRef();
        if (
            !this.loader.threadHistoryFetch &&
            this.chatMessageBodyElement &&
            this.chatMessageBodyElement.scrollTop === 0 &&
            !this.chatSearch.keyword
        ) {
            const totalPage = Math.ceil(this.messageListConfig.totalCount / this.messageListConfig.perPage);
            if (totalPage > this.messageListConfig.activePage) {
                this.messageListConfig.activePage++;
                this.socket.directMessageSent.next(this.getHistoryPayload(this.openedThread));
            }
        }
    };

    openThreadWithUser(item: UserListItem | RecentUserListItem) {
        this.loader.openOrCreateThreadAction = true;
        const timestamp = this.chatUtil.getTimeStamp();
        this.socket.directMessageSent.next({
            timestamp,
            type: ChatMessageType.getCreate,
            data: {
                org_id: item.organization_id || undefined,
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
        this.chatOpenedMessageReset();
        this.chatUIStateReset();
        this.chatElRefReset();
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
        if (this.chatMessageBodyElement) {
            this.chatMessageBodyElement.scrollTop = this.chatMessageBodyElement.scrollHeight;
        }
    }
    scrollToMessage(elementId: number) {
        this.updateChatMessageBodyElRef();
        if (this.chatMessageBodyElement) {
            const query = `[data-element="messages-item"][data-chat-id="${elementId}"]`;
            const messageElement = this.chatMessageBodyElement.querySelector(query) as HTMLElement;
            if (messageElement) {
                messageElement.scrollIntoView(true);
            }
        }
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
                    this.loader.clearChatAction = true;
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
                    this.loader.deleteChatAction = true;
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
                    this.loader.reportAction = true;
                    this.chatApi
                        .reportUser(dataPayload.user_id, dataPayload.org_type, dataPayload.org_id || undefined)
                        .subscribe(
                            (res) => {
                                this.loader.reportAction = false;
                                if (res.success) {
                                    this.toast.success('Successfully reported the user', 'Report');
                                } else {
                                    this.toast.success('Failed to report the user', 'Report');
                                }
                            },
                            () => {
                                this.loader.reportAction = false;
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
                    this.loader.blockAction = true;
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
                    this.loader.unblockAction = true;
                    const timestamp = this.chatUtil.getTimeStamp();
                    this.unblockUserReferance = dataPayload;
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
        this.chatElRefReset();
        if (!this.openedThread) {
            const thread = this.filteredThreadList[0];
            if (thread) {
                this.openThreadChat(thread);
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
        this.chatElRefReset();
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

    chatOpenedMessageReset() {
        this.messageList = [];
        this.openedThread = null;
        this.messageListConfig.activePage = 1;
        this.messageListConfig.totalCount = 0;
        this.messageListConfig.lastSentTimeStamp = '';
        this.uploadFileMeta = null;
        this.selectedSticker = null;
        this.uploadProgressing = false;
    }

    chatUIStateReset() {
        if (!this.chatHandler.isExpand.value) {
            this.chatSearch.reset();
            this.chatMenuOpen = false;
            this.showMessageBoxPanel = 'OFF';
        }
    }
    chatElRefReset() {
        this.chatMessageBodyElement = null;
        this.messageInputElement = null;
    }

    startNewChat() {
        this.chatElRefReset();
        this.chatUIStateReset();
        this.recentUserList = [];
        this.usersList = [];
        this.loader.userListFetchFetch = false;
        this.userSearchKeywords = '';
        this.panelVisibility = 'SEARCH_USER';
        this.contextMenuOpen = false;
        this.generateRecentUserList();
    }

    closeBlockedListPanel() {
        this.chatElRefReset();
        this.chatUIStateReset();
        this.resetAllLoaders();
        this.loader.userListFetchFetch = false;
        this.panelVisibility = 'THREAD';
        this.contextMenuOpen = false;
    }

    fetchBlockUserList() {
        this.myBlockList = [];
        this.whoBlockedMe = [];
        this.generateBlockMap();
        this.socket.directMessageSent.next(this.getBlockListPayload());
    }

    openBlockedListPanel() {
        this.chatElRefReset();
        this.chatUIStateReset();
        this.panelVisibility = 'BLOCKED_USERS';
        this.contextMenuOpen = false;
        this.fetchBlockUserList();
    }

    closeNewChatPanel() {
        this.chatElRefReset();
        this.chatUIStateReset();
        this.resetAllLoaders();
        this.recentUserList = [];
        this.usersList = [];
        this.loader.userListFetchFetch = false;
        this.userSearchKeywords = '';
        this.panelVisibility = 'THREAD';
        this.contextMenuOpen = false;
    }

    closeChatPanel() {
        this.chatOpenedMessageReset();
        this.chatElRefReset();
        this.chatUIStateReset();
        this.contextMenuOpen = false;
    }

    openUserInfoPanel(thread: ThreadListItem) {
        this.chatElRefReset();
        this.chatUIStateReset();
        this.selectedUser = thread?.computed_targetedUser || null;
        this.panelVisibility = 'USER_DETAILS';
        this.contextMenuOpen = false;
    }

    closeUserInfoPanel() {
        this.chatElRefReset();
        this.chatUIStateReset();
        this.panelVisibility = 'THREAD';
        this.selectedUser = null;
        this.contextMenuOpen = false;
    }

    closePanel() {
        this.chatOpenedMessageReset();
        this.chatElRefReset();
        this.chatUIStateReset();
        this.resetAllLoaders();
        this.panelVisibility = 'THREAD';
        this.chatHandler.isOpen.next(false);
        this.chatHandler.isExpand.next(false);
        this.contextMenuOpen = false;
    }

    openPanel() {
        this.closeNewChatPanel();
        this.closeUserInfoPanel();
        this.chatOpenedMessageReset();
        this.chatElRefReset();
        this.chatUIStateReset();
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

    public get showInlineLoader() {
        return Object.values(this.loader).some((x) => x);
    }
    public resetAllLoaders() {
        for (const key in this.loader) {
            if (Object.prototype.hasOwnProperty.call(this.loader, key)) {
                this.loader[key] = false;
            }
        }
    }

    openImage(messageId: number) {
        if (this.viewerRef) {
            this.viewerRef.destroy();
        }
        const imageEL: HTMLElement = document.querySelector(`[data-image-id="${messageId}"]`);
        if (imageEL) {
            this.viewerRef = new Viewer(imageEL, {
                title: (image) => image.dataset.imageCaption || '',
                toolbar: {
                    zoomIn: true,
                    zoomOut: true,
                    oneToOne: true,
                    reset: true,
                    play: {
                        show: true,
                        size: 'large' as Viewer.ToolbarButtonSize.Large,
                        click: () => {
                            const url = (this.viewerRef as any)?.element?.src || '';
                            if (url) {
                                this.fileDownload(url);
                            } else {
                                this.toast.error('Failed to download the image', 'Chat Download');
                            }
                        },
                    },
                    rotateLeft: true,
                    rotateRight: true,
                    flipHorizontal: true,
                    flipVertical: true,
                },
                navbar: false,
                className: 'dm-image-view',
                loop: false,
            });
            this.viewerRef.show(true);
        } else {
            console.log('ImageView error: image element not found');
        }
    }

    fileDownload(url) {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';
        anchor.download = 'Sewn chat';
        anchor.style.display = 'none';
        document.body.append(anchor);
        anchor.click();
        setTimeout(() => {
            anchor.remove();
        }, 500);
    }

    get filteredThreadList(): ThreadListItem[] {
        return this.threadList.filter((x) => !this.isThreadBlocked(x));
    }
    get filteredUsersList(): UserListItem[] {
        return this.usersList.filter((x) => !this.isUserListItemBlocked(x));
    }
    isUserListItemBlocked(user: RecentUserListItem | UserListItem): boolean {
        return user.blockedDetails.blockedMe || user.blockedDetails.myBlock;
    }
    isThreadBlocked(thread: ThreadListItem): boolean {
        return thread.blockedDetails.blockedMe || thread.blockedDetails.myBlock;
    }

    getLastActivityText(input: ThreadListItem | IncomingChatMessage | ChatMessage, type: 'THREAD' | 'MESSAGE') {
        let thread: ThreadListItem;
        let incomingMessage: ChatMessage;
        let meta: MessageMeta;
        if (type === 'THREAD') {
            thread = input as ThreadListItem;
            incomingMessage = null;
        } else if (type === 'MESSAGE') {
            thread = null;
            incomingMessage = input as ChatMessage;
        }
        if (thread) {
            meta = thread.meta;
        } else if (incomingMessage) {
            meta = incomingMessage.meta;
        }
        if (meta.type === MessageMetaTypes.TEXT_ONLY) {
            if (thread) {
                return thread.content || '';
            } else if (incomingMessage) {
                return incomingMessage.content || '';
            }
        } else if (meta.type === MessageMetaTypes.PICTURE_CAPTION) {
            if (thread) {
                return '\u25A3 ' + (thread.content || '');
            } else if (incomingMessage) {
                return '\u25A3 ' + (incomingMessage.content || '');
            }
        } else if (meta.type === MessageMetaTypes.PICTURE_ONLY) {
            return '\u25A3 Image';
        } else if (meta.type === MessageMetaTypes.STICKER) {
            return '\u25A3 Sticker';
        }
        return '';
    }
    conditionalHypen(str: string) {
        if (str) {
            return ' - ' + str;
        } else {
            return '';
        }
    }
}
