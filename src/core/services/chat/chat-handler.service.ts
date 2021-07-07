import { ChatUtilService } from './chat-util.service';
import { ToastrService } from 'ngx-toastr';
import { OpenChatThread } from '@models';
import { ServiceCommunicationType, OrganizationType } from '@enums';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../api';

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
    public settingUpdated = new Subject();

    public setting = {
        chat_text_size: 'normal',
        enable_desktop_notification: true,
        enable_emoticons: true,
        farm_size_unit: 'hectares',
        new_answer_notification: false,
        new_chat_notification: false,
        notification_sound: true,
        order_related_updates: false,
        quantity_unit: 'lb',
        read_recipient: false,
    };

    constructor(private userService: UserService, private util: ChatUtilService, private toast: ToastrService) {}

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
        const NoOrg =
            payload.org_type === OrganizationType.SEWN_ADMIN || payload.org_type === OrganizationType.CONSUMER;

        if (NoOrg) {
            delete payload.org_id;
            payload.user_id = parseInt(payload.user_id + '', 10);
        } else {
            payload.user_id = parseInt(payload.user_id + '', 10);
            payload.org_id = parseInt(payload.org_id + '', 10);
        }
        const sameOrgTypeUserId =
            this.util.USER_ID === payload.user_id && this.util.ORGANIZATION_TYPE === payload.org_type;

        if (
            (NoOrg && sameOrgTypeUserId) ||
            (!NoOrg && sameOrgTypeUserId && payload.org_id === this.util.ORGANIZATION_ID)
        ) {
            this.toast.error(`You can't chat with yourself`);
            return;
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

    updateSetting(setting: any) {
        if (this.setting && setting) {
            for (const key in setting) {
                if (setting.hasOwnProperty(key)) {
                    this.setting[key] = setting[key];
                }
            }
        }
        this.settingUpdated.next();
    }

    public fetchSettings() {
        this.userService.getPreferences().subscribe((res: any) => {
            if (res.success) {
                this.updateSetting(res.result);
            }
        });
    }

    public saveSettings() {
        return this.userService.updatePreferences(this.setting).pipe(
            map((x: any) => x.success),
            catchError(() => of(false)),
        );
    }
}
