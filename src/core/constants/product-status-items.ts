import { ProductStatus } from '@enums';
import { SelectItem } from 'primeng/api';

export const ECOM_PRODUCT_STATUS_ITEMS: SelectItem[] = [
    { label: 'In stock', value: ProductStatus.INSTOCK },
    { label: 'Sold out', value: ProductStatus.SOLD },
    { label: 'In draft', value: ProductStatus.INDRAFT },
];

export const OTHER_PRODUCT_STATUS_ITEMS: SelectItem[] = [
    { label: 'In stock', value: ProductStatus.INSTOCK },
    { label: 'Out of stock', value: ProductStatus.OUTOFSTOCK },
];

export const PRODUCT_STATUS_ITEMS: SelectItem[] = [
    { label: 'In stock', value: ProductStatus.INSTOCK },
    { label: 'Sold out', value: ProductStatus.SOLD },
    { label: 'In draft', value: ProductStatus.INDRAFT },
    { label: 'Out of stock', value: ProductStatus.OUTOFSTOCK },
];
