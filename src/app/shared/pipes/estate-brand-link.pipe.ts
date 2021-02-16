import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
    name: 'estateBrandLink',
})
export class EstateBrandLinkPipe implements PipeTransform {
    transform(slug: string, page: string = ''): string {
        return `${environment.estateBrandProfileUrl}/slug/${slug}/${page}`;
    }
}
