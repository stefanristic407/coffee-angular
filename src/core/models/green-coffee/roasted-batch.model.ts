import { QuantityUnit } from '@enums';

export interface RoastedBatch {
    batch_ref_no: string;
    best_before_date: string;
    gc_order_id: number;
    green_coffee_quantity: number;
    id: number;
    is_test_batch: boolean;
    name: string;
    order_ref_no: string;
    quantity_unit: QuantityUnit;
    roasted_coffee_quantity: number;
    roasted_date: string;
    roasting_profile_id: number;
    roasting_profile_name: string;
}
