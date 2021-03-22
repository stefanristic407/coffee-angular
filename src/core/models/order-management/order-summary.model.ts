import { OrderStatus, OrderType } from '@enums';

export interface OrderSummary {
    id: number;
    availability_name: string;
    created_at: string;
    cup_score: number;
    origin: string;
    price: number;
    total_price: number;
    status: OrderStatus;
    type: OrderType;
    varieties: string;
    estateName: string;
    micro_roaster_name: string;
    quantity: number;
    quantity_type: string;
}
