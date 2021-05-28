import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToShortDescription',
})
export class ConvertToShortDescriptionPipe implements PipeTransform {

    transform(description: string, count: number): string {
        description = description.trim();
        const regex = /(?<=>)[^<>]+(?=<)/gm;
        let m;
        let plainString = '';
        // tslint:disable-next-line:no-conditional-assignment
        while ((m = regex.exec(description)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach((match, groupIndex) => {
                plainString += match;
                plainString += ' ';
            });
        }
        plainString = plainString || description;
        // tslint:disable-next-line
        plainString = plainString.replace(/&nbsp;/gi, ' ').replace(/ +(?= )/g,'');
        plainString = plainString.trim();
        const wordCount = plainString.split(' ').length;
        if (wordCount <= count) {
            return plainString;
        } else {
            return plainString.split(' ').slice(0, count).join(' ') + '...';
        }
    }

}
