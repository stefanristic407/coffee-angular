import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber } from 'libphonenumber-js';

@Pipe({
    name: 'phonenumber',
})
export class PhoneNumberPipe implements PipeTransform {
    transform(phoneStr: string = ''): string {
        const phone = parsePhoneNumber(phoneStr);
        // Remove first zero in national number
        return phone.isValid() ? phone.formatInternational() : '';
    }
}
