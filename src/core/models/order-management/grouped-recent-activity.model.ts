import { RecentActivity } from './recent-activity.model';

export interface GroupedRecentActivity {
    date: string;
    activities: RecentActivity[];
}
