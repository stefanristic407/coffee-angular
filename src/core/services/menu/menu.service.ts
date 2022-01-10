import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Menu } from '@models';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'underscore';
import { AuthService } from '../auth';
import { menuItems } from './menu';

@Injectable()
export class MenuService {
    menus: Menu[];
    isMenuOpened: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private authService: AuthService, private location: Location) {
        if (!this.authService.shopDetails) {
            // Remove ecom links
            this.menus = menuItems.filter((ix) => ix.id !== 33 && ix.id !== 51);
        } else {
            this.menus = menuItems;
        }
    }

    public getMenuItems(): Array<Menu> {
        return this.menus;
    }

    public expandActiveSubMenu() {
        const url = this.location.path();
        const routerLink = url;
        const activeMenuItem = this.menus.filter((item) => routerLink.startsWith(item.routerLink));
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
                    menuItem = this.menus.filter((item) => item.id === menuItem.parentId)[0];
                }
            }
            const menuDom = document.getElementById('menu-item-' + menuItem.id);
            if (menuDom && menuDom.classList) {
                menuDom.classList.add('active');
            }
            this.closeOtherSubMenus(this.menus, menuItem.id);
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
