import { Variety } from './variety.model';

export interface LotDetails {
    id: number;
    number: number;
    name: string;
    description: string;
    estate_id: number;
    estate_name: string;
    country: string;
    state: string;
    district: string;
    village: string;
    region: string;
    sub_region: string;
    min_altitude: number;
    max_altitude: number;
    crop: string;
    species: string;
    varieties: Variety[];
    total_area: number;
    total_area_unit: string;
    irrigation: string;
    irrigation_type: string;
    irrigated_area: number;
    certifications: string;
    annual_production: number;
    sunlight: string;
    coffee_trees: number;
    pest_control: string;
    pesticides: string;
    fertilizers: string;
    harvest_start: string;
    harvest_end: string;
    green_initiatives: string;
    satellite_api: string;
    prebook_ready: boolean;
    is_hih: boolean;
    hih_owner: string;
    avg_precipitation: string;
    rainy_season_start: string;
    rainy_season_end: string;
    uv_current: number;
    relative_humidity: number;
    status: string;
    polygon_coordinates: any[];
    polygon_id: string;
    polygon_area: number;
    soil_footprint: string;
    temperature: string;
    weather_activity: number;
    avg_cup_score: number;
    water_source: string;
    soil_analysis: boolean;
    direction: string;
    other_crops: string;
    elevation: number;
    soil_type: string;
    water_footprint: string;
}
