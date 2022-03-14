import { BusinessType } from '@enums';
import { SelectItem } from 'primeng/api';

export const BUSINESS_TYPE_ITEMS: SelectItem[] = [
    { label: 'B2B', value: BusinessType.B2B },
    { label: 'B2C', value: BusinessType.B2C },
    { label: 'Both', value: BusinessType.BOTH },
];
