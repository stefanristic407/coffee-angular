import { UserStatus } from '@enums';
import { LabelValue } from '@models';

export const USER_STATUS_ITEMS: LabelValue[] = [
    { label: 'Active', value: UserStatus.ACTIVE },
    { label: 'Inactive', value: UserStatus.INACTIVE },
    { label: 'Pending', value: UserStatus.PENDING },
];
