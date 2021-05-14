import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AclService, MenuService } from '@services';
import { GlobalsService } from '@services';
import { Menu } from '@models';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MenuService],
})
export class MenuComponent implements OnInit {
    @Input() menuParentId;
    public menuItems: Array<any>;
    constructor(public menuService: MenuService, public globals: GlobalsService, private aclService: AclService) {}

    ngOnInit() {
        this.menuItems = this.menuService.getMenuItems();
        this.menuItems = this.menuItems.filter((item) => item.parentId === this.menuParentId);
    }

    onClick(menuId) {
        if (this.globals.device === 'mobile') {
            this.menuService.toggleMenuItem(menuId);
            this.menuService.closeOtherSubMenus(this.menuItems, menuId);
        }
    }
}
