import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GlobalsService } from '@services';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
    helpData: any[] = [
        {
            title: 'Get Help',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut molestie lectus. Mauris pretium eget lorem gravida hendrerit. Maecenas sollicitudin dictum libero,',
        },
        {
            title: 'Our Terms & Conditions',
            content:
                'vulputate nulla faucibus non. Aenean placerat, nulla eu gravida pellentesque, magna risus porta mi, at malesuada nunc nulla quis magna. Curabitur vel tellus maximus, sagittis massa eu, fermentum libero. Curabitur commodo mauris quis lacus tempor, quis molestie leo finibus. Integer lorem tellus, lobortis ut neque nec, aliquam tempor diam. Aliquam erat volutpat. Donec eget ornare leo.',
        },
    ];
    feedbackData: any[] = [
        {
            title: 'Give Feedback',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut molestie lectus. Mauris pretium eget lorem gravida hendrerit. Maecenas sollicitudin dictum libero,',
        },
        {
            title: 'Report a problem',
            content:
                'vulputate nulla faucibus non. Aenean placerat, nulla eu gravida pellentesque, magna risus porta mi, at malesuada nunc nulla quis magna. Curabitur vel tellus maximus, sagittis massa eu, fermentum libero. Curabitur commodo mauris quis lacus tempor, quis molestie leo finibus. Integer lorem tellus, lobortis ut neque nec, aliquam tempor diam. Aliquam erat volutpat. Donec eget ornare leo.',
        },
        {
            title: 'Rate Us',
            content:
                'vulputate nulla faucibus non. Aenean placerat, nulla eu gravida pellentesque, magna risus porta mi, at malesuada nunc nulla quis magna. Curabitur vel tellus maximus, sagittis massa eu, fermentum libero. Curabitur commodo mauris quis lacus tempor, quis molestie leo finibus. Integer lorem tellus, lobortis ut neque nec, aliquam tempor diam. Aliquam erat volutpat. Donec eget ornare leo.',
        },
    ];
    breadcrumbItems: MenuItem[];

    constructor(public location: Location, public globals: GlobalsService) {}

    ngOnInit(): void {
        this.breadcrumbItems = [
            { label: this.globals.languageJson?.home, routerLink: '/dashboard' },
            { label: this.globals.languageJson?.account_settings, routerLink: '../../account-settings' },
            { label: this.globals.languageJson?.help },
        ];
    }

    handleClickAccordionItem(event: any): void {
        const accordionItem = event.target.parentElement;
        if (accordionItem.classList.contains('active')) {
            accordionItem.classList.remove('active');
        } else {
            accordionItem.classList.add('active');
        }
    }
}
