import { OrderStatus } from '@enums';

export interface AvailabilityRequest {
    id: number;
    lot_id: number;
    roaster_id: number;
    micro_roaster_id: number;
    harvest_id: number;
    requested_by_id: number;
    requested_quantity: number;
    status: OrderStatus;
    approved_on: string;
    created_at: string;
    estate_name: string;
    origin: string;
    species: string;
    varieties: string;
    micro_roaster_name: string;
    unit_price: number;
    quantity_unit: string;
    price_unit: string;
    reject_reason: string;
}
