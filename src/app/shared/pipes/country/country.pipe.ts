import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '@services';

@Pipe({
    name: 'country',
})
export class CountryPipe implements PipeTransform {
    constructor(private commonService: CommonService) {}
    transform(value: string): string {
        return this.commonService.getCountryName(value) || 'NA';
    }
}
