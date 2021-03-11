import { OrderStatus } from '@enums';

export interface AvailabilityRequest {
    id: number;
    lotId: number;
    roasterId: number;
    microRoasterId: number;
    harvestId: number;
    requestedById: number;
    requestedQuantity: number;
    status: OrderStatus;
    approvedOn: string;
    createdAt: string;
    estateName: string;
    origin: string;
    species: string;
    varieties: string;
    microRoasterName: string;
    unitPrice: number;
    quantityUnit: string;
    priceUnit: string;
    rejectReason: string;
}
