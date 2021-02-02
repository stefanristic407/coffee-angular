import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { Menu } from './menu.model';
import { menuItems } from './menu';

@Injectable()
export class MenuService {
    constructor(private location: Location) {}

    public getMenuItems(): Array<Menu> {
        return menuItems;
    }

    public expandActiveSubMenu() {
        const url = this.location.path();
        const routerLink = url;
        const activeMenuItem = menuItems.filter((item) => routerLink.startsWith(item.routerLink));
        if (activeMenuItem[0]) {
            let menuItem = activeMenuItem[0];
            if (menuItem.parentId !== 0) {
                while (menuItem.parentId !== 0) {
                    const parentMenuItem = menuItems.filter((item) => item.id === menuItem.parentId)[0];
                    menuItem = parentMenuItem;
                }
            }
            const menuDom = document.getElementById('menu-item-' + menuItem.id);
            if (menuDom && menuDom.classList) {
                menuDom.classList.add('active');
            }
            this.closeOtherSubMenus(menuItems, menuItem.id);
        }
    }

    public toggleMenuItem(menuId) {
        const menuItem = document.getElementById('menu-item-' + menuId);
        const subMenu = document.getElementById('sub-menu-' + menuId);
        if (subMenu) {
            if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
                menuItem.classList.remove('active');
            } else {
                subMenu.classList.add('show');
                menuItem.classList.add('active');
            }
        } else {
            menuItem.classList.add('active');
        }
    }

    public closeOtherSubMenus(menu: Array<Menu>, menuId) {
        const currentMenuItem = menu.filter((item) => item.id === menuId)[0];
        if (currentMenuItem.parentId === 0 && !currentMenuItem.target) {
            menu.forEach((item) => {
                if (item.id !== menuId) {
                    const subMenu = document.getElementById('sub-menu-' + item.id);
                    const menuItem = document.getElementById('menu-item-' + item.id);
                    if (menuItem) {
                        menuItem.classList.remove('active');
                    }
                    if (subMenu) {
                        if (subMenu.classList.contains('show')) {
                            subMenu.classList.remove('show');
                        }
                    }
                }
            });
        }
    }
}
