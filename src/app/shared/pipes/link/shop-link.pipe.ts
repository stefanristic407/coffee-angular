import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { AuthService } from '@services';

@Pipe({
    name: 'shopLink',
})
export class ShopLinkPipe implements PipeTransform {
    constructor(private authService: AuthService, protected sanitizer: DomSanitizer) {}

    transform(url: string): string | SafeUrl {
        const token = this.authService.token;
        return this.sanitizer.bypassSecurityTrustUrl(
            `${environment.shopWeb}/gate?token=${encodeURIComponent(token)}&redirect_to=${encodeURIComponent(url)}`,
        );
    }
}
