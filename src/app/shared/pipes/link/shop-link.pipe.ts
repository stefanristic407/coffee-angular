import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';
import { AuthService } from '@services';

@Pipe({
    name: 'shopLink',
})
export class ShopLinkPipe implements PipeTransform {
    constructor(private authService: AuthService) {}

    transform(url: string): string {
        const token = this.authService.token;
        return `${environment.shopWeb}/gate?token=${encodeURIComponent(token)}&redirect_to=${encodeURIComponent(url)}`;
    }
}
