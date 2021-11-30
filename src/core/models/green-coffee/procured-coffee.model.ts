import { PriceUnit, QuantityUnit } from '@enums';
import { ProcuredCoffeeStatus, ProcuredCoffeeUnit } from 'src/core/enums/procured-coffee';

export interface ProcuredCoffee {
    initial_quantity_count: number;
    last_ordered: string;
    minimum_order_quantity_count: number;
    name: string;
    order_id: number;
    price_per_unit: QuantityUnit;
    price_unit: PriceUnit;
    price: number;
    quantity_count: number;
    quantity_type: ProcuredCoffeeUnit;
    quantity_unit: QuantityUnit;
    quantity: number;
    roaster_id: number;
    sample_initial_quantity_count: number;
    sample_price: number;
    sample_quantity_count: number;
    sample_quantity_unit: QuantityUnit;
    sample_quantity: number;
    status: ProcuredCoffeeStatus;
    vat_percentage: number;
    vat_settings_id: number;
}
