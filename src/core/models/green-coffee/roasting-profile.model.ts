export interface RoastingProfile {
    id: number;
    name: string;
    roast_level_id: number;
    roast_duration: string;
    temperature: string;
    machine_type: string;
    aroma: number;
    acidity: number;
    body: number;
    flavour: number;
    flavour_profile: any;
    roaster_notes: string;
    recommended_recipe: string;
    brewing_method: string;
    recommendation_text: string;
}
