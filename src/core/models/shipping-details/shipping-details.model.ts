import { ShippingStatus } from '@enums';

export interface ShippingDetails {
    ico_number: string;
    bag_markings: string;
    estimated_departure_date: string;
    estimated_arrival_date: string;
    shipping_id: string;
    tracking_id: string;
    shipping_line: string;
    vessel_number: number;
    container_number: number;
    container_requirements: string;
    shipping_instructions: string;
    shipment_status: ShippingStatus;
    estimated_pickup_date: string;
    exporter_fc_name: string;
    import_fc_name: string;
}
