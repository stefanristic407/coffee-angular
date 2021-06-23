import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'htmlStringWordCount',
})
export class HtmlStringWordCountPipe implements PipeTransform {
    transform(description: string): number {
        description = (description || '').trim();
        const regex = />([^<]+)</g;
        let m;
        let plainString = '';
        // tslint:disable-next-line:no-conditional-assignment
        while ((m = regex.exec(description)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            plainString += m[1];
            plainString += ' ';
        }
        plainString = plainString || description;
        // tslint:disable-next-line
        plainString = plainString.replace(/&nbsp;/gi, ' ').replace(/ +(?= )/g, '');
        plainString = plainString.trim();
        return plainString ? plainString.split(' ').length : 0;
    }
}
