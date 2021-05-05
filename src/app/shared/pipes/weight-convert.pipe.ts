import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'weightConvert',
})
export class WeightConvertPipe implements PipeTransform {
    transform(value: number, unit: string) {
        if (value && !NaN) {
            if (unit === 'Kgs') {
                const suffixes = ['kg', 'ton', 'K ton', 'm ton', 'b ton'];
                const suffixNum = Math.floor(('' + value).length / 3);
                let shortValue = parseFloat(
                    (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2),
                );
                if (shortValue % 1 !== 0) {
                    shortValue = parseFloat(shortValue.toFixed(1));
                }
                return shortValue + suffixes[suffixNum];
            }

            if (unit === 'Pounds') {
                const weight = value * 2.2;
                return weight.toFixed(1);
            }
        }

        return;
    }
}
