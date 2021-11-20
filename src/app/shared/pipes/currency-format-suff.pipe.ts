import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyFormat',
})
export class CurrencyFormatPipe extends CurrencyPipe implements PipeTransform {
    transform(
        value: any,
        currencyCode: string = 'USD',
        display: string | boolean = 'code',
        digitsInfo: string = '1.2-2',
        locale?: string,
    ): string {
        let abs = Math.abs(value);
        const isNegative = value < 0; // will also work for Negetive numbers
        let key = '';

        const powers = [
            { key: 'Q', value: Math.pow(10, 15) },
            { key: 'T', value: Math.pow(10, 12) },
            { key: 'B', value: Math.pow(10, 9) },
            { key: 'M', value: Math.pow(10, 6) },
            { key: 'K', value: Math.pow(10, 3) },
        ];

        for (const power of powers) {
            const reduced = abs / power.value;
            if (reduced >= 1) {
                abs = reduced;
                key = power.key;
                break;
            }
        }
        return (isNegative ? '- ' : '') + super.transform(abs, currencyCode, display, digitsInfo, locale) + key;
    }
}
