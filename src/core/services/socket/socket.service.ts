import { OrganizationType, ChatMessageType } from '@enums';
import { WSResponse, WSRequest } from '@models';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { CookieService } from 'ngx-cookie-service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Subject, BehaviorSubject, Observable } from 'rxjs';
import { ChatUtil } from '../chat/chat-util.service';
import { distinct, catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class SocketService implements OnDestroy {
    private SM: { [SubscriptionName: string]: Subscription } = {}; // Subscrition MAP object
    private WSSubject: WebSocketSubject<any> | null = null;

    public chatSent = new Subject<WSRequest<unknown>>();
    public chatReceive = new Subject<WSResponse<unknown>>();
    public orderChatSent = new Subject<WSRequest<unknown>>();
    public orderChatReceive = new Subject<WSResponse<unknown>>();

    public authenticationState = new BehaviorSubject<'INIT' | 'IP' | 'FAIL' | 'SUCCESS'>('IP');
    public socketState = new BehaviorSubject<'INIT' | 'IP' | 'CONNECTED' | 'FAILED' | 'CLOSED'>('IP');

    constructor(private cookieService: CookieService, private chatUtil: ChatUtil) {
        this.initSocketService();
    }

    public initSocketService() {
        if (this.socketState.value !== 'CONNECTED' && this.token && this.chatUtil.ORGANIZATION_ID) {
            this.destorySocket(true); // Cleanup
            this.authenticationState.next('IP');
            this.socketState.next('IP');
            this.WSSubject = webSocket<WSResponse<unknown>>({
                url: `${environment.wsEndpoint}/${this.chatUtil.ORGANIZATION_TYPE}/${this.chatUtil.ORGANIZATION_ID}/messaging`,
                openObserver: {
                    next: () => {
                        this.socketState.next('CONNECTED');
                    },
                },
                closeObserver: {
                    next: () => {
                        console.log('SOCKET CLOSED');
                        this.socketState.next('CLOSED');
                        this.authenticationState.next('INIT');
                    },
                },
                closingObserver: {
                    next: () => {
                        console.log('SOCKET closingObserver');
                    },
                },
                binaryType: 'arraybuffer',
            });

            this.SM.WSSubscriptionToken = this.WSSubject.pipe(
                catchError((err: any, caught: Observable<any>) => {
                    console.log('Error in WebScoket ', err);
                    return caught;
                }),
            ).subscribe((WSMessage: WSResponse<unknown>) => {
                if (WSMessage.type === ChatMessageType.auth) {
                    this.handleAuthResponse(WSMessage as WSResponse<null>);
                }
                const arr = Object.values(ChatMessageType);
                if (arr.includes(WSMessage.type)) {
                    // Created Handlers for your message type
                    this.chatReceive.next(WSMessage);
                    this.orderChatReceive.next(WSMessage);
                }
                // console.log('WEBSOCKET::Receiving ...', WSMessage);
            });
            this.SM.chatSentSubscription = this.chatSent.subscribe((payload) => {
                this.WSSubject.next(payload);
            });
            this.SM.orderChatSentSubscription = this.orderChatSent.subscribe((payload) => {
                // console.log('WEBSOCKET::Sending ...', payload);
                this.WSSubject.next(payload);
            });
        } else {
            console.log('Can not establish the socket connection');
        }
    }

    private handleAuthResponse(WSmsg: WSResponse<null>) {
        this.authenticationState.next(WSmsg.code === 200 || WSmsg.code === 409 ? 'SUCCESS' : 'FAIL');
        if (WSmsg.code === 400) {
            console.log('Websocket:Auth: Invalid Input Data Format ');
            this.authenticationState.next('FAIL');
        } else if (WSmsg.code === 401) {
            console.log('Websocket:Auth: Authentication Error');
            this.authenticationState.next('FAIL');
        } else if (WSmsg.code === 409) {
            console.log('Websocket:Auth: Already Authenticated Error');
            this.authenticationState.next('SUCCESS');
        } else if (WSmsg.code === 422) {
            console.log('Websocket:Auth: Validation Error');
            this.authenticationState.next('FAIL');
        } else if (WSmsg.code === 200) {
            this.authenticationState.next('SUCCESS');
            console.log('Websocket:Auth: Success');
        }
    }

    public destorySocket(cleanup = false) {
        // NOTE Call this function on logout
        console.log('Error: Destory called');
        if (this.WSSubject) {
            this.WSSubject.complete();
            this.WSSubject = null;
        }
        for (const name in this.SM) {
            if (this.SM[name] && this.SM[name].unsubscribe) {
                this.SM[name].unsubscribe();
            }
        }

        if (!cleanup) {
            this.authenticationState.next('INIT');
            this.socketState.next('INIT');
        }
    }

    authenticate() {
        if (this.authenticationState.value !== 'FAIL') {
            const payload = {
                timestamp: this.chatUtil.getTimeStamp(),
                type: ChatMessageType.auth,
                data: {
                    user_token: this.token,
                },
            };
            this.WSSubject.next(payload);
        }
        return this.authenticationState.pipe(distinct());
    }

    get token(): string {
        let userToken = this.cookieService.get('Auth')?.replace(/\r/g, '')?.split(/\n/)[0];
        if (!userToken) {
            console.error('User token parese error');
            userToken = '';
        }
        return userToken;
    }
    get ORGANIZATION_ID(): number | null {
        return parseInt(this.cookieService.get('roaster_id'), 10) || null;
    }

    ngOnDestroy() {
        this.destorySocket();
    }
}
