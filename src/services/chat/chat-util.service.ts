import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class ChatUtil {
    public getTimeStamp(): string {
        return moment.utc().format();
    }
    public getReadableTime(tTime: string = '') {
        const todayDate = moment();
        const messageDate = moment(tTime);
        if (messageDate.isValid || tTime) {
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
}
