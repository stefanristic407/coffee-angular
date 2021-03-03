import { CookieService } from 'ngx-cookie-service';
import { OrderChatType } from '@enums';
import { RoasterserviceService } from '../api/roaster.service';
import { OrderChatService } from './order-chat.service';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrderDetailsRsolver implements Resolve<any> {
    constructor(private roasterService: RoasterserviceService, private cookieService: CookieService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const orderId = route?.params?.orderId;
        const chatType = route?.params?.chatType as OrderChatType;
        const roasterId = this.cookieService.get('roaster_id');
        return this.roasterService
            .getViewOrderDetails(roasterId, orderId, chatType === OrderChatType.RO_MR ? 'MR' : 'RO')
            .pipe(
                map((res: any) => {
                    if (res.success && res.result) {
                        return res.result;
                    } else {
                        throw new Error('Api error');
                    }
                }),
            );
    }
}
