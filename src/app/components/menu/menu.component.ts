import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MenuService, ResizeService } from '@services';
import { GlobalsService } from '@services';
import { Menu } from '@models';
import { MenuType } from '@enums';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MenuService],
})
export class MenuComponent implements OnInit {
    readonly MenuType = MenuType;
    @Input() menuParentId;
    public menuItems: Array<Menu>;
    constructor(
        public menuService: MenuService,
        public globals: GlobalsService,
        private resizeService: ResizeService,
    ) {}

    ngOnInit() {
        this.menuItems = this.menuService.getMenuItems();
        this.menuItems = this.menuItems.filter((item) => item.parentId === this.menuParentId);
    }

    onClick(menuId) {
        if (this.resizeService.isMobile()) {
            this.menuService.toggleMenuItem(menuId);
            this.menuService.closeOtherSubMenus(this.menuItems, menuId);
        }
    }
}
