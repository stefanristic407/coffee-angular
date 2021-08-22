import { QuantityUnit } from '@enums';

export interface Crate {
    id: number;
    weight: number;
    crate_unit: QuantityUnit;
    crate_capacity: number;
}
