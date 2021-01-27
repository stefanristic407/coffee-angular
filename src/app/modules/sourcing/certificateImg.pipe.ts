import { Pipe, PipeTransform } from '@angular/core';
import { SourcingService } from './sourcing.service';

@Pipe({
    name: 'certificateImg',
})
export class CertificateImgPipe implements PipeTransform {
    constructor(private sourcingSrv: SourcingService) {}
    transform(value: string): string {
        return this.sourcingSrv.getCertificateType(value)?.image_url || '';
    }
}
