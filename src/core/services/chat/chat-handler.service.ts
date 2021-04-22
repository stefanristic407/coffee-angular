import { OpenChatThread } from '@models';
import { ServiceCommunicationType, OrganizationType } from '@enums';
import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ChatHandlerService {
    public chatSubject = new Subject<{
        requestType: ServiceCommunicationType;
        payload?: any;
    }>();

    public isOpen = new BehaviorSubject<boolean>(false);
    public isExpand = new BehaviorSubject<boolean>(false);
    public isMobileView = new BehaviorSubject<boolean>(false);
    public unReadCount = new BehaviorSubject<number>(0);

    constructor() {}

    public showChatPanel() {
        this.chatSubject.next({
            requestType: ServiceCommunicationType.SHOW_CHAT,
        });
    }
    public closeChatPanel() {
        this.chatSubject.next({
            requestType: ServiceCommunicationType.CLOSE_CHAT,
        });
    }
    /**
     * @desc Open chat with a specific user
     * @param payload - Targeted user details
     * @param payload.user_id - User id of targeted user
     * @param payload.org_type - Organization type of targted user; OrganizationType enum value or
     * valid string value such as 'fc', 'ro', 'es'
     * @param payload.org_id - Organization id of targted user; provide 0 for admin users
     */
    public openChatThread(payload: OpenChatThread) {
        if (payload.org_type === OrganizationType.SEWN_ADMIN) {
            delete payload.org_id;
        }
        this.chatSubject.next({
            requestType: ServiceCommunicationType.OPEN_THREAD,
            payload,
        });
    }

    public toggle() {
        this.chatSubject.next({
            requestType: ServiceCommunicationType.TOGGLE,
        });
    }
}
