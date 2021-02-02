import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MenuService } from './menu.service';
import { GlobalsService } from '@services';
import { Menu } from './menu.model';

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
    constructor(public menuService: MenuService, public globals: GlobalsService) {}

    ngOnInit() {
        this.menuItems = this.menuService.getMenuItems();
        this.menuItems = this.menuItems.filter((item) => item.parentId === this.menuParentId);
    }

    checkPermissions(menu: Menu) {
        for (const key in menu.permissions) {
            if (menu.permissions[key]) {
                if (!menu.hasSubMenu && !this.globals.checkItem(menu.permissions[key])) {
                    return false;
                }
                if (menu.hasSubMenu && this.globals.checkItem(menu.permissions[key])) {
                    return true;
                }
            }
        }
        return !menu.permissions.length || !menu.hasSubMenu;
    }

    onClick(menuId) {
        if (this.globals.device === 'mobile') {
            this.menuService.toggleMenuItem(menuId);
            this.menuService.closeOtherSubMenus(this.menuItems, menuId);
        }
    }
}
