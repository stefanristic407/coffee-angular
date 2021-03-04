import { OrderStatus, OrderType } from '@core/enums';

export interface OrderSummary {
    id: number;
    availabilityName: string;
    createdAt: string;
    cupScore: number;
    origin: string;
    price: number;
    status: OrderStatus;
    type: OrderType;
    varieties: string;
    estateName: string;
    quantity: number;
    quantityType: string;
}
