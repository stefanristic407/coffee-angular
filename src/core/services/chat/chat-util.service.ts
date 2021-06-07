import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { OrganizationType } from '@enums';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '@env/environment';
import { StickerListItem } from '@models';
import { AuthService } from '../auth';
@Injectable({
    providedIn: 'root',
})
export class ChatUtilService {
    public ORGANIZATION_TYPE = OrganizationType.ROASTER;
    private incomingAudioPlayer = new Audio('assets/sounds/msg-incoming.mp3');
    private outgoingAudioPlayer = new Audio('assets/sounds/msg-outgoing.mp3');
    public DEFAULT_URL = 'assets/images/profile.svg';
    public stickerFolder = 'assets/images/dm-stickers';

    public emojiList = [
        '1F600',
        '1F603',
        '1F604',
        '1F601',
        '1F606',
        '1F605',
        '1F923',
        '1F602',
        '1F642',
        '1F643',
        '1F609',
        '1F60A',
        '1F607',
        '1F970',
        '1F60D',
        '1F929',
        '1F618',
        '1F617',
        '1F61A',
        '1F619',
        '1F972',
        '1F60B',
        '1F61B',
        '1F61C',
        '1F92A',
        '1F61D',
        '1F911',
        '1F917',
        '1F92D',
        '1F92B',
        '1F914',
        '1F910',
        '1F928',
        '1F610',
        '1F611',
        '1F636',
        '1F60F',
        '1F612',
        '1F644',
        '1F62C',
        '1F62E',
        '1F925',
        '1F60C',
        '1F614',
        '1F62A',
        '1F924',
        '1F634',
        '1F637',
        '1F912',
        '1F915',
        '1F922',
        '1F92E',
        '1F927',
        '1F975',
        '1F976',
        '1F974',
        '1F635',
        '1F92F',
        '1F920',
        '1F973',
        '1F978',
        '1F60E',
        '1F913',
        '1F9D0',
        '1F615',
        '1F61F',
        '1F641',
        '1F62F',
        '1F632',
        '1F633',
        '1F97A',
        '1F626',
        '1F627',
        '1F628',
        '1F630',
        '1F625',
        '1F622',
        '1F62D',
        '1F631',
        '1F616',
        '1F623',
        '1F61E',
        '1F613',
        '1F629',
        '1F62B',
        '1F971',
        '1F624',
        '1F621',
        '1F620',
        '1F92C',
        '1F608',
        '1F47F',
        '1F480',
        '1F4A9',
        '1F921',
        '1F479',
        '1F47A',
        '1F47B',
        '1F47D',
        '1F47E',
        '1F916',
        '1F4A5',
        '1F4AB',
        '1F4A6',
        '1F4A8',
        '1F573',
        '1F4A3',
        '1F4AC',
        '1F441',
        '1F5E8',
        '1F5EF',
        '1F4AD',
        '1F4A4',
        '1F44B',
        '1F91A',
        '1F590',
        '1F596',
        '1F44C',
        '1F90C',
        '1F90F',
        '1F91E',
        '1F91F',
        '1F918',
        '1F919',
        '1F448',
        '1F449',
        '1F446',
        '1F595',
        '1F447',
        '1F44D',
        '1F44E',
        '1F44A',
        '1F91B',
        '1F91C',
        '1F44F',
        '1F64C',
        '1F450',
        '1F932',
        '1F91D',
        '1F64F',
        '1F485',
        '1F933',
        '1F4AA',
        '1F9BE',
        '1F9BF',
        '1F9B5',
        '1F9B6',
        '1F442',
        '1F9BB',
        '1F443',
        '1F9E0',
        '1FAC0',
        '1FAC1',
        '1F9B7',
        '1F9B4',
        '1F440',
        '1F445',
        '1F444',
        '1F64D',
        '1F64E',
        '1F645',
        '1F646',
        '1F481',
        '1F64B',
        '1F9CF',
        '1F647',
        '1F926',
        '1F937',
        '1F9D1',
        '1F468',
        '1F469',
        '1F46E',
        '1F575',
        '1F482',
        '1F477',
        '1F934',
        '1F478',
        '1F473',
        '1F472',
        '1F9D5',
        '1F935',
        '1F470',
        '1F930',
        '1F931',
        '1F47C',
        '1F385',
        '1F936',
        '1F9B8',
        '1F9B9',
        '1F9D9',
        '1F9DA',
        '1F9DB',
        '1F9DC',
        '1F9DD',
        '1F9DE',
        '1F9DF',
        '1F486',
        '1F487',
        '1F6B6',
        '1F9CD',
        '1F9CE',
        '1F3C3',
        '1F483',
        '1F57A',
        '1F574',
        '1F46F',
        '1F9D6',
        '1F9D7',
        '1F93A',
        '1F3C7',
        '1F3C2',
        '1F3CC',
        '1F3C4',
        '1F6A3',
        '1F3CA',
        '1F37C',
        '1F95B',
        '1FAD6',
        '1F375',
        '1F376',
        '1F37E',
        '1F377',
        '1F378',
        '1F379',
        '1F37A',
        '1F37B',
        '1F942',
        '1F943',
        '1F964',
        '1F9CB',
        '1F9C3',
        '1F9C9',
        '1F9CA',
        '1F962',
        '1F37D',
        '1F374',
        '1F944',
        '1F52A',
        '1F3FA',
        '1F30D',
        '1F30E',
        '1F30F',
        '1F310',
        '1F5FA',
        '1F5FE',
        '1F9ED',
        '1F324',
        '1F325',
        '1F326',
        '1F327',
        '1F328',
        '1F329',
        '1F32A',
        '1F32B',
        '1F32C',
        '1F300',
        '1F308',
        '1F302',
        '1F525',
        '1F4A7',
        '1F30A',
    ];

    public stickerList: StickerListItem[] = [
        { title: 'Cafe owner male 1', name: 'cafe-owner-male-1', path: '' },
        { title: 'Cafe owner male 2', name: 'cafe-owner-male-2', path: '' },
        { title: 'Cafe owner male 3', name: 'cafe-owner-male-3', path: '' },
        { title: 'Cafe owner female 1', name: 'cafe-owner-female-1', path: '' },
        { title: 'Cafe owner female 2', name: 'cafe-owner-female-2', path: '' },
        { title: 'Cafe owner female 3', name: 'cafe-owner-female-3', path: '' },
        { title: 'Coffee bag', name: 'coffee-bag', path: '' },
        { title: 'Coffee brand', name: 'coffee-brand', path: '' },
        { title: 'Coffee cherry', name: 'coffee-cherry', path: '' },
        { title: 'Coffee cup', name: 'coffee-cup', path: '' },
        { title: 'Coffee leaves', name: 'coffee-leaves', path: '' },
        { title: 'Estate owner male 1', name: 'estate-owner-male-1', path: '' },
        { title: 'Estate owner male 2', name: 'estate-owner-male-2', path: '' },
        { title: 'Estate owner male 3', name: 'estate-owner-male-3', path: '' },
        { title: 'Estate owner female 1', name: 'estate-owner-female-1', path: '' },
        { title: 'Estate owner female 2', name: 'estate-owner-female-2', path: '' },
        { title: 'Estate owner female 3', name: 'estate-owner-female-3', path: '' },
        { title: 'Green coffee', name: 'green-coffee', path: '' },
        { title: 'Roasted beans', name: 'roasted-beans', path: '' },
        { title: 'Roaster machine', name: 'roaster-machine', path: '' },
    ];

    constructor(private cookieService: CookieService, private http: HttpClient, private authService: AuthService) {
        this.incomingAudioPlayer.load();
        this.outgoingAudioPlayer.load();
        this.prepareStickers();
    }
    prepareStickers() {
        this.stickerList.forEach((sticker) => {
            sticker.path = `${this.stickerFolder}/${sticker.name}.svg`;
        });
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

    public uploadFile(file: File, threadId) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('thread_id', threadId);
        const httpOptions = {
            headers: new HttpHeaders({ Authorization: this.TOKEN }),
        };
        let url = '';
        if (
            this.ORGANIZATION_TYPE === OrganizationType.SEWN_ADMIN ||
            this.ORGANIZATION_TYPE === OrganizationType.CONSUMER
        ) {
            url = `${environment.chatUploadEndPoint}${this.ORGANIZATION_TYPE}/upload-files`;
        } else {
            url = `${environment.chatUploadEndPoint}${this.ORGANIZATION_TYPE}/${this.ORGANIZATION_ID}/upload-files`;
        }
        return this.http.post(url, formData, httpOptions);
    }

    public get ORGANIZATION_ID(): number {
        return this.authService.getOrgId();
    }
    public get TOKEN(): string {
        let userToken = this.authService.token?.replace(/\r/g, '')?.split(/\n/)[0];
        if (!userToken && this.ORGANIZATION_TYPE === OrganizationType.CONSUMER) {
            // Check token from Local storage for consumer user
            userToken = localStorage.getItem('coffeeToken') || '';
        }
        if (!userToken) {
            console.error('User token parese error');
            userToken = '';
        }
        return userToken;
    }
    public get USER_ID(): number | null {
        let userId = this.authService.userId;
        if (!userId && this.ORGANIZATION_TYPE === OrganizationType.CONSUMER) {
            let user = { id: null };
            try {
                user = JSON.parse(localStorage.getItem('coffeeUser') || '') || { id: null };
            } catch (e) {
                user = { id: null };
            }
            userId = user.id as number;
        }
        return userId;
    }

    getOrganization(orgType: OrganizationType) {
        if (orgType === OrganizationType.ROASTER) {
            return 'Roaster';
        } else if (orgType === OrganizationType.MICRO_ROASTER) {
            return 'Micro Roaster';
        } else if (orgType === OrganizationType.FACILITATOR) {
            return 'Facilitator';
        } else if (orgType === OrganizationType.ESTATE) {
            return 'Coffee Estate';
        } else if (orgType === OrganizationType.HORECA) {
            return 'Partner';
        } else if (orgType === OrganizationType.SEWN_ADMIN) {
            return 'Admin';
        } else if (orgType === OrganizationType.CONSUMER) {
            return 'Consumer';
        } else {
            return 'Unknown';
        }
    }

    public getProfileImageBgStyle(profileImageUrl: string) {
        if (profileImageUrl) {
            return `url(${profileImageUrl})`;
        } else {
            return `url(${this.DEFAULT_URL})`; // Placeholder image
        }
    }
    getProfileImageDirectURL(profileImageUrl: string) {
        if (profileImageUrl) {
            return profileImageUrl;
        } else {
            return this.DEFAULT_URL;
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
