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
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                plainString += match;
                plainString += ' ';
                // console.log(`Found match, group ${groupIndex}: ${match}`);
            });
        }
        plainString = plainString || description;
        plainString = plainString.trim();
        const wordCount = plainString.split(' ').length;
        if (wordCount <= count) {
            return plainString;
        } else {
            return plainString.split(' ').slice(0, count).join(' ') + '...';
        }
    }

}
