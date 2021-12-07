import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

import { Menu } from '@models';
import { menuItems } from './menu';

import * as _ from 'underscore';

@Injectable()
export class MenuService {
    isMenuOpened: BehaviorSubject<boolean> = new BehaviorSubject(false);
    constructor(private location: Location) {}

    public getMenuItems(): Array<Menu> {
        return menuItems;
    }

    public expandActiveSubMenu() {
        const url = this.location.path();
        const routerLink = url;
        const activeMenuItem = menuItems.filter((item) => routerLink.startsWith(item.routerLink));
        if (activeMenuItem?.length) {
            let menuItem = _.reduce(
                activeMenuItem,
                (acc, val) => {
                    return val.routerLink && val.routerLink.length > acc.routerLink.length ? val : acc;
                },
                activeMenuItem[0],
            );
            if (menuItem.parentId !== 0 && menuItem.parentId !== 1000) {
                while (menuItem.parentId !== 0) {
                    menuItem = menuItems.filter((item) => item.id === menuItem.parentId)[0];
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
        if ((currentMenuItem.parentId === 0 || currentMenuItem.parentId === 1000) && !currentMenuItem.target) {
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
