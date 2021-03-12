import { OrderStatus, OrderType } from '@enums';

export interface OrderSummary {
    id: number;
    availabilityName: string;
    createdAt: string;
    cupScore: number;
    origin: string;
    price: number;
    totalPrice: number;
    status: OrderStatus;
    type: OrderType;
    varieties: string;
    estateName: string;
    microRoasterName: string;
    quantity: number;
    quantityType: string;
}
