import { Component, OnInit, Input } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService, GlobalsService } from '@services';

@Component({
    selector: 'app-publish-forum',
    templateUrl: './publish-forum.component.html',
    styleUrls: ['./publish-forum.component.scss'],
})
export class PublishForumComponent implements OnInit {
    @Input() type: string;
    firstBtnValue: string;
    secondBtnValue: string;
    placeHolderValue: string;
    routerValue: string;
    constructor(private globals: GlobalsService, public authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        if (this.type === 'article') {
            this.firstBtnValue = this.globals.languageJson?.ask_a_question;
            this.secondBtnValue = this.globals.languageJson?.create_brew_guide;
            this.placeHolderValue = this.globals.languageJson?.write_post;
        } else if (this.type === 'recipe') {
            this.firstBtnValue = this.globals.languageJson?.ask_a_question;
            this.secondBtnValue = this.globals.languageJson?.write_post;
            this.placeHolderValue = this.globals.languageJson?.create_brew_guide;
        } else {
            this.routerValue = this.firstBtnValue = this.globals.languageJson?.write_post;
            this.secondBtnValue = this.globals.languageJson?.create_brew_guide;
            this.placeHolderValue = this.globals.languageJson?.ask_your_question;
        }
    }

    onFocus() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                type: this.type,
            },
        };
        this.router.navigate(['coffee-lab/create-post/tab'], navigationExtras);
    }

    onSecondBtn() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                type: this.type,
            },
        };
        if (this.type === 'article' || this.type === 'question') {
            navigationExtras.queryParams.type = 'recipe';
        } else if (this.type === 'recipe') {
            navigationExtras.queryParams.type = 'article';
        }
        this.router.navigate(['coffee-lab/create-post/tab'], navigationExtras);
    }

    onFirstBtn() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                type: '',
            },
        };
        if (this.type === 'article' || this.type === 'recipe') {
            navigationExtras.queryParams.type = 'question';
        } else if (this.type === 'question') {
            navigationExtras.queryParams.type = 'article';
        }

        this.router.navigate(['coffee-lab/create-post/tab'], navigationExtras);
    }
}
