export class Upload {
    uuid: number;
    name: string;
    progress: number;
    state: 'PENDING' | 'IN_PROGRESS' | 'DONE';

    constructor(uuid: number, name: string) {
        this.uuid = uuid;
        this.name = name;
        this.progress = 0;
        this.state = 'PENDING';
    }
}
