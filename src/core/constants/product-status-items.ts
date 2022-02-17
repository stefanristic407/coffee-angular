import { ProductStatus } from '@enums';
import { SelectItem } from 'primeng/api';

export const PRODUCT_STATUS_ITEMS: SelectItem[] = [
    { label: 'In stock', value: ProductStatus.INSTOCK },
    { label: 'Sold out', value: ProductStatus.SOLD },
    { label: 'In draft', value: ProductStatus.INDRAFT },
];
