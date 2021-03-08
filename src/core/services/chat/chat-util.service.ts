import { OrganizationType } from '@enums';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})
export class ChatUtilService {
    public ORGANIZATION_TYPE = OrganizationType.ROASTER;
    private incomingAudioPlayer = new Audio('assets/sounds/msg-incoming.mp3');
    private outgoingAudioPlayer = new Audio('assets/sounds/msg-outgoing.mp3');
    constructor(private cookieService: CookieService) {
        this.incomingAudioPlayer.load();
        this.outgoingAudioPlayer.load();
    }

    public getTimeStamp(): string {
        return moment.utc().format();
    }
    public getReadableTime(tTime: string = '') {
        const todayDate = moment();
        const messageDate = moment(tTime);
        if (messageDate.isValid() && tTime) {
            const isSameYear = todayDate.year() === messageDate.year();
            const isSameMonth = isSameYear && todayDate.month() === messageDate.month();
            const isSameDay = isSameMonth && todayDate.date() === messageDate.date();
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

    public get ORGANIZATION_ID(): number | null {
        return parseInt(this.cookieService.get('roaster_id'), 10) || null;
    }
    public get USER_ID(): number | null {
        return parseInt(this.cookieService.get('user_id'), 10) || null;
    }

    getOrganization(orgType: OrganizationType) {
        if (orgType === OrganizationType.EMPTY || orgType === OrganizationType.SEWN_ADMIN) {
            return 'SEWN Admin';
        } else if (orgType === OrganizationType.ROASTER) {
            return 'Roaster';
        } else if (orgType === OrganizationType.MICRO_ROASTER) {
            return 'Micro Roaster';
        } else if (orgType === OrganizationType.FACILITATOR) {
            return 'Facilitator';
        } else if (orgType === OrganizationType.ESTATE) {
            return 'Coffee Estate';
        } else if (orgType === OrganizationType.HORECA) {
            return 'HoReCa';
        } else {
            return 'Unknown';
        }
    }

    public getProfileImageBgStyle(profileImageUrl: string) {
        if (profileImageUrl) {
            return `url(${profileImageUrl})`;
        } else {
            return `url(assets/images/profile.svg)`; // Placeholder image
        }
    }
    public playNotificationSound(type: 'INCOMING' | 'OUTGOING') {
        if (type === 'INCOMING') {
            this.incomingAudioPlayer.pause();
            this.incomingAudioPlayer.currentTime = 0;
            this.incomingAudioPlayer.play();
        } else if (type === 'OUTGOING') {
            this.outgoingAudioPlayer.pause();
            this.outgoingAudioPlayer.currentTime = 0;
            this.outgoingAudioPlayer.play();
        }
    }
}
