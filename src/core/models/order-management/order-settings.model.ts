import { QuantityUnit } from '@enums';

export interface OrderSettings {
    sample_price: number;
    sample_quantity: number;
    sample_quantity_unit: QuantityUnit;
    token_amount: number;
    sample_price_currency: string;
    token_amount_currency: string;
}

export interface GcOrderSettings {
    sample_price: number;
    sample_quantity: number;
    token_amount: number;
    sample_price_currency: string;
    token_amount_currency: string;
}
