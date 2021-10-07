export interface Download {
    content: Blob | null;
    progress: number;
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
    uuid?: number;
    name?: string;
}
