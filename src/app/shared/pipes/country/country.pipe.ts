import { Pipe, PipeTransform } from '@angular/core';
import { GlobalsService } from '@services';

@Pipe({
    name: 'country',
})
export class CountryPipe implements PipeTransform {
    constructor(private globalSrv: GlobalsService) {}
    transform(value: string): string {
        return this.globalSrv.getCountryName(value) || 'NA';
    }
}
