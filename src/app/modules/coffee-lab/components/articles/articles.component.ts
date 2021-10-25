import { Component, Input, OnInit } from '@angular/core';
import { AuthService, CoffeeLabService } from '@services';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
    @Input() articles: any;
    @Input() isMyPost = false;
    @Input() isSavedPost = false;

    constructor(public coffeeLabService: CoffeeLabService, public authService: AuthService) {}

    ngOnInit(): void {}
}
