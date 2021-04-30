import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
    name: 'roasterBrandCmsLink',
})
export class RoasterBrandCmsLinkPipe implements PipeTransform {
    transform(orgId: number, page: string = ''): string {
        return `${environment.roasterBrandProfileUrl}/gate?orgId=${orgId}${
            page && page !== 'home-page' ? '&url=' + page : ''
        }`;
    }
}
