export interface Transaction {
    account_name: string;
    account_number: string;
    amount_exclude_vat: number;
    channel: string;
    commission_amount: number;
    commission_rate: number;
    currency: string;
    document_date: string;
    document_number: string;
    document_type: string;
    id: number;
    order_type: string;
    payment_date: string;
    payment_type: string;
    status: string;
    total_amount: number;
    transaction_type: string;
    vat_amount: number;
}
