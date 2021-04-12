import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
    name: 'gcBrandLink',
})
export class GcBrandLinkPipe implements PipeTransform {
    transform(slug: string, id: number, name: any): string {
        if (!(slug && id)) {
            return '';
        }
        return `${environment.estateBrandProfileUrl}/${slug}/production-details/${id}/${name.replaceAll(' ', '-')}`;
    }
}
