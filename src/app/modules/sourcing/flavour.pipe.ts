import { Pipe, PipeTransform } from '@angular/core';
import { SourcingService } from './sourcing.service';

@Pipe({
    name: 'flavour',
    pure: false,
})
export class FlavourPipe implements PipeTransform {
    constructor(private sourcingSrv: SourcingService) {}
    transform(value: string): string {
        return this.sourcingSrv.getFlavour(value)?.name || '';
    }
}
