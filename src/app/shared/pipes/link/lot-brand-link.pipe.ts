import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
    name: 'lotBrandLink',
})
export class LotBrandLinkPipe implements PipeTransform {
    transform(slug: string, id: number, name: any): string {
        if (!(slug && id)) {
            return '';
        }
        return `${environment.estateBrandProfileUrl}/${slug}/lot-details/${id}/${name.replaceAll(' ', '-')}`;
    }
}
