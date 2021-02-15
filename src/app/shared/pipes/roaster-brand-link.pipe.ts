import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
    name: 'roasterBrandLink',
})
export class RoasterBrandLinkPipe implements PipeTransform {
    transform(slug: string, page: string = ''): string {
        return `${environment.roasterBrandProfileUrl}/${slug}/${page}`;
    }
}
