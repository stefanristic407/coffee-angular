import { TransactionChannel } from '@enums';

export interface Transaction {
    account_name: string;
    account_number: number;
    address_line1: string;
    address_line2: string;
    amount_exclude_vat: number;
    channel: TransactionChannel;
    city: string;
    commission_amount: number;
    commission_rate: number;
    contact_person: string;
    country: string;
    currency: string;
    delivery_address_line1: string;
    delivery_address_line2: string;
    delivery_city: string;
    delivery_country: string;
    delivery_zipcode: string;
    document_date: string;
    document_number: number;
    document_type: string;
    id: number;
    order_items: TransactionOrder[];
    order_type: string;
    org_number: string;
    transaction_date: string;
    payment_type: string;
    phone_number: string;
    roaster_reference_number: string;
    status: string;
    total_amount: number;
    transaction_type: string;
    vat_amount: number;
    zipcode: string;
}

export interface TransactionOrder {
    amount_excl_vat: number;
    item_name: string;
    item_number: string;
    item_system_id: number;
    quantity: number;
    total: number;
    unit_price_excl_vat: number;
    unit_price_incl_vat: number;
    vat_amount: number;
    vat_percent: number;
}
