import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import * as moment from 'moment';
import Viewer from 'viewerjs';
import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    SimpleChanges,
    OnChanges,
    ElementRef,
    Renderer2,
    EventEmitter,
} from '@angular/core';
import {
    ThreadListItem,
    ThreadMember,
    ChatMessage,
    IncomingChatMessage,
    WSResponse,
    DisputeChatThreadListItem,
    OrderChatThreadListItem,
    MessageMeta,
} from '@models';
import { ThreadType, ThreadActivityType, ChatMessageType, MessageMetaTypes } from '@enums';
import { ChatHandlerService, GlobalsService, SocketService, ChatUtilService } from '@services';
const badwordsRegExp = require('badwords/regexp') as RegExp;
@Component({
    selector: 'app-sewn-order-chat',
    templateUrl: './sewn-order-chat.component.html',
    styleUrls: ['./sewn-order-chat.component.scss'],
})
export class SewnOrderChatComponent implements OnInit, OnDestroy, OnChanges {
    @Input() orderThread: OrderChatThreadListItem;
    @Input() orderDisputes: any;
    @Input() roasterName: string;
    @Input() orderDetails: any;
    @Output() threadUsers: EventEmitter<ThreadMember[]> = new EventEmitter<ThreadMember[]>();
    @Output() escalateTicket: EventEmitter<any> = new EventEmitter<any>();
    messageList: ChatMessage[] = [];
    organizedMessages: any[] = [];
    threadDetails: ThreadListItem = null;
    SM: { [SubscriptionName: string]: Subscription } = {}; // Subscrition MAP object
    messageInput = '';
    TIMESTAMP_MAP: { [K in ChatMessageType]: string } = {} as { [K in ChatMessageType]: string };
    activeThreadId: number = null;
    activeThreadType: 'ORDER' | 'DISPUTE' | 'UNSET' = 'UNSET';
    showOffensiveMessageError = false;
    offensiveTimeout = 0;

    messageListConfig = {
        perPage: 400,
        activePage: 1,
    };
    uploadFileMeta: {
        url: string;
        file_id: number;
    } | null = null;
    uploadProgressing = false;

    public acceptFileTypeArray = ['image/jpeg', 'image/png'];
    public acceptFileTypeString = '';
    private viewerRef: Viewer | null = null;

    messageInputElement: HTMLTextAreaElement;
    chatMessageBodyElement: HTMLElement;
    lastMessageRendered = new Subject();
    sentTokenDelayTimeOut = 0;

    constructor(
        public globals: GlobalsService,
        public chatService: ChatHandlerService,
        private socket: SocketService,
        private elRef: ElementRef,
        public chatUtil: ChatUtilService,
        private render: Renderer2,
        private router: Router,
        private toast: ToastrService,
    ) {}

    ngOnInit(): void {
        this.acceptFileTypeString = this.acceptFileTypeArray.join(',');
        this.SM.WSState = this.socket.socketState.subscribe((value) => {
            if (value === 'CONNECTED') {
                this.initializeWebSocket();
            }
        });
    }

    get isClosedDispute() {
        return this.orderDisputes && this.orderDisputes.dispute_status === 'Resolved';
    }

    initializeWebSocket() {
        if (this.SM.WSSubscription && this.SM.WSSubscription.unsubscribe) {
            this.SM.WSSubscription.unsubscribe();
        }
        this.SM.WSSubscription = this.socket.orderChatReceive.subscribe((WSmsg: WSResponse<unknown>) => {
            if (WSmsg.type === ChatMessageType.threads) {
                // this.handleThreadsResponse(WSmsg as WSResponse<ThreadListItem[]>);
            } else if (WSmsg.type === ChatMessageType.unread) {
                // this.handleUnReadResponse(WSmsg as WSResponse<null>);
            } else if (WSmsg.type === ChatMessageType.users) {
                // this.handleUserDetailResponse(WSmsg as WSResponse<ResponseUserStatus[]>);
            } else if (WSmsg.type === ChatMessageType.history) {
                this.handleThreadHistory(WSmsg as WSResponse<ChatMessage[]>);
            } else if (WSmsg.type === ChatMessageType.message) {
                this.handleIncomingMessages(WSmsg as WSResponse<IncomingChatMessage>);
            } else if (WSmsg.type === ChatMessageType.getCreate) {
                // this.handleFindThreadRequest(WSmsg as WSResponse<ThreadListItem[]>);
            } else if (WSmsg.type === ChatMessageType.thread) {
                this.handleRequestedThreadDetails(WSmsg as WSResponse<ThreadListItem>);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        setTimeout(() => {
            if (this.socket.authenticationState.value === 'SUCCESS') {
                this.checkInputs();
            }
        });
    }

    checkInputs() {
        if (this.orderDisputes && this.orderDisputes.chat_thread_id) {
            // Checking if order dispute is available
            this.activeThreadId = this.orderDisputes.chat_thread_id;
            this.activeThreadType = 'DISPUTE';
            this.openThread();
        } else if (this.orderThread && this.orderThread.thread_id) {
            // Checking for order thread
            this.activeThreadId = this.orderThread.thread_id;
            this.activeThreadType = 'ORDER';
            this.openThread();
        } else {
            this.activeThreadId = null;
            this.activeThreadType = 'UNSET';
            this.messageList = [];
            this.organizedMessages = [];
            this.threadDetails = null;
            this.threadUsers.emit([]);
        }
    }

    openThread() {
        if (this.socket.authenticationState.value === 'SUCCESS') {
            this.getThreadDetails(this.activeThreadId);
        }
    }

    getThreadHistory(threadId: number) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.history] = timestamp;
        this.socket.orderChatSent.next({
            timestamp,
            type: ChatMessageType.history,
            data: {
                thread_id: threadId,
                page: this.messageListConfig.activePage,
                per_page: this.messageListConfig.perPage,
            },
        });
    }

    getThreadDetails(threadId: number) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.thread] = timestamp;
        this.socket.orderChatSent.next({
            timestamp,
            type: ChatMessageType.thread,
            data: {
                thread_id: threadId,
            },
        });
    }

    processThreads(thread: ThreadListItem): ThreadListItem {
        const activeUser: ThreadMember[] = [];
        const targtedUserList: ThreadMember[] = [];
        thread.members = (thread.members || []).map((mem: any) => {
            mem = this.processThreadUser(mem);
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
            return mem;
        });
        thread.blockedDetails = {
            blockedMe: false,
            myBlock: false,
        };
        thread.content = thread.content || '';
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

    handleRequestedThreadDetails(WSmsg: WSResponse<ThreadListItem>) {
        if (WSmsg.code === 200) {
            const thread = WSmsg.data;
            if (thread.type !== ThreadType.normal && thread.type !== ThreadType.service_request) {
                this.threadDetails = this.processThreads(thread);
                const memberList = this.threadDetails.members || [];
                const users: { [key: string]: ThreadMember } = {};
                for (const member of memberList) {
                    let isRemoved = false;
                    if (member.hasOwnProperty('is_removed')) {
                        isRemoved = member.is_removed;
                    } else {
                        isRemoved = (member as any).removed_at !== '0001-01-01T00:00:00Z';
                    }
                    if (!isRemoved) {
                        const key = member.user_id + '_' + (member.org_id || 0) + '_' + member.org_type;
                        users[key] = member;
                    }
                }
                this.threadUsers.emit(Object.values(users));
                if (this.threadDetails.computed_activeUser) {
                    if (this.activeThreadId && this.activeThreadType !== 'UNSET') {
                        this.getThreadHistory(this.activeThreadId);
                    }
                } else {
                    console.log('User is not authorized to view this chat');
                }
            } else {
                console.error('Websocket:Requested-thread: Received non direct message thread ');
            }
        } else {
            console.log('Websocket:Requested-thread Thread: Failure');
        }
    }

    handleThreadHistory(WSmsg: WSResponse<ChatMessage[]>) {
        if (WSmsg.code === 200) {
            if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
                this.SM.lastRender.unsubscribe();
            }
            this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
                this.scrollbottom();
            });

            this.messageList = WSmsg.data.filter((x) => x.activity_type === ThreadActivityType.message).reverse();
            for (let index = 0, len = this.messageList.length; index < len; index++) {
                this.messageList[index] = this.processChatMessages(this.messageList[index], this.threadDetails);
                const prevMessage = this.messageList[index - 1];
                const activeMessage = this.messageList[index];
                if (!activeMessage.isActiveUser) {
                    if (prevMessage) {
                        activeMessage.showUserBadge = !(
                            prevMessage.computed_author?.user_id === activeMessage.computed_author?.user_id &&
                            (prevMessage.computed_author?.org_id || 0) ===
                                (activeMessage.computed_author?.org_id || 0) &&
                            prevMessage.computed_author?.org_type === activeMessage.computed_author?.org_type
                        );
                    } else {
                        activeMessage.showUserBadge = true;
                    }
                } else {
                    activeMessage.showUserBadge = false;
                }
                if (!prevMessage) {
                    activeMessage.showDateBadge = true;
                } else {
                    activeMessage.showDateBadge = prevMessage.dateString !== activeMessage.dateString;
                }
            }
            const lastMessage = this.messageList[this.messageList.length - 1];
            if (lastMessage) {
                this.sendReadToken(lastMessage.id);
            }
        } else {
            console.log('Websocket:Thread History: Failure');
        }
    }

    handleIncomingMessages(WSmsg: WSResponse<IncomingChatMessage>) {
        const message = WSmsg.data;
        if (
            WSmsg.code === 201 &&
            (message.thread.type === ThreadType.dispute ||
                message.thread.type === ThreadType.gc_order ||
                message.thread.type === ThreadType.mr_order)
        ) {
            if (
                message.activity_type === ThreadActivityType.message &&
                this.threadDetails &&
                this.threadDetails.id === message.thread.id
            ) {
                this.processChatMessages(message, this.threadDetails);
                const user = message?.member?.user;
                if (user) {
                    this.processThreadUser(user);
                }
                if (this.SM.lastRender && this.SM.lastRender.unsubscribe) {
                    this.SM.lastRender.unsubscribe();
                }
                this.SM.lastRender = this.lastMessageRendered.pipe(first()).subscribe((x) => {
                    this.scrollbottom();
                });
                const lastMessage = this.messageList[this.messageList.length - 1];
                if (!message.isActiveUser) {
                    if (lastMessage) {
                        message.showUserBadge = !(
                            lastMessage.computed_author?.user_id === message.computed_author?.user_id &&
                            (lastMessage.computed_author?.org_id || 0) === (message.computed_author?.org_id || 0) &&
                            lastMessage.computed_author?.org_type === message.computed_author?.org_type
                        );
                    } else {
                        message.showUserBadge = true;
                    }
                    this.chatUtil.playNotificationSound('INCOMING');
                } else {
                    message.showUserBadge = false;
                }
                if (!lastMessage) {
                    message.showDateBadge = true;
                } else {
                    message.showDateBadge = lastMessage.dateString !== message.dateString;
                }
                this.messageList.push(message);
                this.sendReadToken(message.id);
            } else {
                console.log('Websocket:Incoming Message : Failure');
            }
        }
    }

    processChatMessages(message: ChatMessage | IncomingChatMessage, thread: ThreadListItem) {
        message.dateString = moment(message.created_at).format('Do MMM YYYY');
        message.computed_date = this.chatUtil.getReadableTime(message.updated_at || message.created_at);
        const meta = { type: MessageMetaTypes.TEXT_ONLY };
        try {
            message.meta = (JSON.parse(message.meta_data) || meta) as MessageMeta;
        } catch (e) {
            message.meta = meta as MessageMeta;
        }
        if (thread.computed_targetedUserList.find((tuser) => tuser.id === message.member.id)) {
            message.computed_author = thread.computed_targetedUser;
            message.isActiveUser = false;
        } else if (thread.computed_activeUser.id === message.member.id) {
            message.computed_author = thread.computed_activeUser;
            message.isActiveUser = true;
        } else {
            console.log('Error: nable to find message owner');
        }
        return message;
    }
    processThreadUser(threadUser: ThreadMember) {
        threadUser.last_seen = threadUser.last_seen || '';
        threadUser.computed_lastseen = this.chatUtil.getReadableTime(threadUser.last_seen);
        threadUser.computed_organization_name = this.chatUtil.getOrganization(threadUser.org_type);
        threadUser.computed_fullname = threadUser.first_name + ' ' + threadUser.last_name;
        threadUser.computed_profile_dp = this.chatUtil.getProfileImageBgStyle(threadUser.profile_pic);
        threadUser.computed_profile_direct_url = this.chatUtil.getProfileImageDirectURL(threadUser.profile_pic);
        return threadUser;
    }

    sendReadToken(lastMessageId: number) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.read] = timestamp;
        this.socket.orderChatSent.next({
            type: ChatMessageType.read,
            timestamp,
            data: {
                thread_id: this.threadDetails.id,
                last_read_id: lastMessageId,
            },
        });
    }

    chatInputHeightAdjust(resetFlag = false) {
        this.updateMessageInputElRef();
        this.updateChatMessageBodyElRef();
        if (resetFlag) {
            this.messageInputElement.value = '';
        }
        if (this.messageInputElement) {
            this.render.removeStyle(this.messageInputElement, 'height');
            const inputHeight = this.messageInputElement.offsetHeight;
            const scrollHeight = this.messageInputElement.scrollHeight;
            const calculatedHeight = Math.min(scrollHeight, 80);
            if (inputHeight < scrollHeight) {
                this.render.setStyle(this.messageInputElement, 'height', `${calculatedHeight}px`);
                if (this.chatMessageBodyElement) {
                    this.render.setStyle(
                        this.chatMessageBodyElement,
                        'height',
                        `calc(100% - ${calculatedHeight + 45}px)`,
                    );
                }
            } else {
                this.render.removeStyle(this.chatMessageBodyElement, 'height');
            }
        }
    }

    updateMessageInputElRef() {
        if (!this.messageInputElement) {
            const query = `[data-element="messag-text-area"]`;
            this.messageInputElement = (this.elRef?.nativeElement?.querySelector(query) as HTMLTextAreaElement) || null;
        }
    }
    updateChatMessageBodyElRef() {
        const query = `[data-element="live-chat-message-body"]`;
        this.chatMessageBodyElement = (this.elRef?.nativeElement?.querySelector(query) as HTMLElement) || null;
    }
    scrollbottom() {
        this.updateChatMessageBodyElRef();
        this.chatMessageBodyElement.scrollTop = this.chatMessageBodyElement.scrollHeight;
    }

    inputkeyPress(event: KeyboardEvent) {
        if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    inputChanges(event: InputEvent) {
        this.chatInputHeightAdjust();
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
    offensiveTimeoutHandler = () => {
        this.showOffensiveMessageError = false;
    };

    sendMessage() {
        clearTimeout(this.offensiveTimeout);
        this.showOffensiveMessageError = false;
        let msg = this.messageInput.trim();
        const hasContent = !!msg;
        const hasImage = !!this.uploadFileMeta?.file_id;
        const payload = {
            thread_id: this.threadDetails.id,
            content: '',
            meta_data: '',
            file_id: undefined,
        };
        if (hasContent && hasImage) {
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
        this.socket.orderChatSent.next(this.getMessagePayload(payload));
        this.chatUtil.playNotificationSound('OUTGOING');
        this.messageInput = '';
        this.uploadFileMeta = null;
        this.chatInputHeightAdjust();
        if (this.SM.lastRender2 && this.SM.lastRender2.unsubscribe) {
            this.SM.lastRender2.unsubscribe();
        }
        this.SM.lastRender2 = this.lastMessageRendered.pipe(first()).subscribe((x) => {
            this.chatInputHeightAdjust(true);
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
            this.chatUtil.uploadFile(file, this.threadDetails.id).subscribe(
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

    getMessagePayload(data: any) {
        const timestamp = this.chatUtil.getTimeStamp();
        this.TIMESTAMP_MAP[ChatMessageType.message] = timestamp;
        return {
            type: ChatMessageType.message,
            timestamp,
            data,
        };
    }
    escalate() {
        this.escalateTicket.emit();
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

    ngOnDestroy() {
        if (this.viewerRef) {
            this.viewerRef.destroy();
        }
        for (const name in this.SM) {
            if (this.SM[name] && this.SM[name].unsubscribe) {
                this.SM[name].unsubscribe();
            }
        }
        if (this.sentTokenDelayTimeOut) {
            clearTimeout(this.sentTokenDelayTimeOut);
        }
        if (this.offensiveTimeout) {
            clearTimeout(this.offensiveTimeout);
        }
    }
    viewDispute(chatMeta) {
        if (chatMeta?.dispute_details?.id) {
            const path = this.router.url.split('?')[0];
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    disputeID: chatMeta.dispute_details.id,
                },
            };
            this.router.navigate([path], navigationExtras).then(() => {
                window.location.href = window.location.href;
            });
        }
    }
}
