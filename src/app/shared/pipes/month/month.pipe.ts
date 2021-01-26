import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'month',
})
export class MonthPipe implements PipeTransform {
    transform(value: string, args?): string {
        return value ? moment(value, 'M').format('MMM') : 'NA';
    }
}
