export interface Review {
    id: number;
    reviewed_by_id: number;
    reviewed_by_name: string;
    reviewed_by_type: string;
    reviewed_by_image: string;
    reviewed_on_id: number;
    reviewed_on_name: string;
    reviewed_on_type: string;
    reviewed_on_image: string;
    comment: string;
    total_rating: number;
    overall_experience: number;
    communication: number;
    green_coffee: number;
    review_type: string;
    reviewed_item_id: number;
    created_at: string;
}
