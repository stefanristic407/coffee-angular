import { Pipe, PipeTransform } from '@angular/core';
import { countWords } from '@utils';
import * as moment from 'moment';

@Pipe({
    name: 'wordCount',
})
export class WordCountPipe implements PipeTransform {
    transform(value: string = ''): number {
        return countWords(value);
    }
}
