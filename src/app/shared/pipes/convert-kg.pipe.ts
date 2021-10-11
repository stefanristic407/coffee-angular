import { Pipe, PipeTransform } from '@angular/core';
import { QuantityUnit } from '@enums';
import { convertKg } from '@utils';

@Pipe({
    name: 'convertKg',
})
export class ConvertKgPipe implements PipeTransform {
    transform(weight: number, weightUnit: QuantityUnit = QuantityUnit.kg) {
        return convertKg(weight, weightUnit);
    }
}
