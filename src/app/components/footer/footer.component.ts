import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { AuthService } from '@services';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    readonly env = environment;
    constructor(public authService: AuthService) {}

    ngOnInit(): void {}
}
