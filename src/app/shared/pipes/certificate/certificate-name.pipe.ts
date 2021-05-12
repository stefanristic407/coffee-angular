import { Pipe, PipeTransform } from '@angular/core';
import { CertificateType } from '@enums';

@Pipe({
    name: 'certificateName',
})
export class CertificateNamePipe implements PipeTransform {
    transform(certType: CertificateType): string {
        const certificates = {
            [CertificateType.FairTrade]: 'Fair Trade',
            [CertificateType.RainforestAlliance]: 'Rainforest Alliance',
            [CertificateType.IfoamOrganics]: 'Ifoam Organics',
            [CertificateType.FourCoffee]: '4 Coffee',
            [CertificateType.EraOfWe]: 'Era of We',
        };
        return certificates[certType];
    }
}
