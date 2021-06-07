import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';
import { AuthService } from '@services';

@Pipe({
    name: 'roasterBrandCmsLink',
})
export class RoasterBrandCmsLinkPipe implements PipeTransform {
    constructor(private authService: AuthService) {}
    transform(orgId: number, page: string = ''): string {
        return `${environment.roasterBrandProfileUrl}/gate?orgId=${orgId}${
            page && page !== 'home-page' ? '&url=' + page : ''
        }${this.authService.isSimulated ? '&loginType=sim' : ''}`;
    }
}
