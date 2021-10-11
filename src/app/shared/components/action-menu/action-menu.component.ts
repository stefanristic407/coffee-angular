import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-action-menu',
    templateUrl: './action-menu.component.html',
    styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent implements OnInit {
    @Input() menuItems: MenuItem[] = [];
    @Input() icon: 'pi-ellipsis-v' | 'pi-ellipsis-h' = 'pi-ellipsis-v';
    @Input() placement: 'left' | 'bottom' = 'left';
    @Output() clickEvent = new EventEmitter<any>();

    constructor(@Inject(DOCUMENT) private doc, private router: Router) {}

    ngOnInit(): void {}

    click(event) {
        event.stopPropagation();
        this.doc.querySelector('body').click();
    }

    menuClicked(item) {
        if (item.routerLink) {
            this.router.navigate([item.routerLink]);
        } else if (item.command) {
            item.command();
        }
    }
}
