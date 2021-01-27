import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SharedServiceService {
    public isMobileView = true;
    public windowWidth: number;
    public responsiveStartsAt = 640;
    constructor() {}
}
