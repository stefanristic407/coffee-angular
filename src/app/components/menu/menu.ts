import { Menu } from './menu.model';

export const menuItems = [
    new Menu(1, 'dashboard', '/features/roaster-dashboard', null, null, null, false, 0, []),
    new Menu(2, 'sourcing_module', '/sourcing', null, null, null, false, 0, ['sourcing-management']),

    new Menu(3, 'order_management', null, null, null, null, true, 0, ['sourcing-management']),
    new Menu(31, 'Purchase Orders Estates', '/ordermanagement/estate-orders', null, null, null, false, 3, []),
    new Menu(
        32,
        'Orders & Requests by Micro Roasters',
        '/ordermanagement/microroaster-orders',
        null,
        null,
        null,
        false,
        3,
        [],
    ),
    new Menu(33, 'Customer Sales Orders', '/ordermanagement/microroaster-orders', null, null, null, false, 3, []),

    new Menu(4, 'Inventory', null, null, null, null, true, 0, [
        'coffee-management',
        'coffee-list',
        'products-management',
    ]),
    new Menu(41, 'Green Coffee Inventory', '/features/green-coffee-inventory', null, null, null, false, 4, []),
    new Menu(42, 'Roasted Coffee Inventory', '/features/roasted-coffee-batch', null, null, null, false, 4, []),
    new Menu(43, 'E-commerce Product Management', '/features/products-list', null, null, null, false, 4, []),
    new Menu(44, 'Product Settings', '/features/vat-management', null, null, null, false, 4, []),

    new Menu(5, 'Sales Management', null, null, null, null, true, 0, []),
    new Menu(51, 'Sales', './', null, null, null, false, 5, []),
    new Menu(52, 'Sales Contracts', '/features/agreement', null, null, null, false, 5, []),
    new Menu(53, 'Sales Tool', '/features/agreement', null, null, null, false, 5, []),
    new Menu(53, 'API Requests', '/features/api-requests-list', null, null, null, false, 5, []),

    new Menu(6, 'Green grading', '/features/green-grading', null, null, null, false, 0, []),

    new Menu(7, 'Brand & Experience', null, null, null, null, true, 0, []),
    new Menu(71, 'Brand Profile Management', '/brand-profile', null, null, null, false, 7, []),
    new Menu(72, 'End-User Experience', '/features/coffee-experience', null, null, null, false, 7, []),
    new Menu(73, 'Education & Collaboration', '/features/file-share', null, null, null, false, 7, []),
    new Menu(74, 'The Coffee Lab', '/features/q-a-forum', null, null, null, false, 7, []),
    new Menu(75, 'Social PR', '/features/social-media', null, null, null, false, 7, []),

    new Menu(8, 'Team Management', null, null, null, null, true, 0, [
        'acl-management',
        'acl-list',
        'user-management',
        'user-reports',
    ]),
    new Menu(81, 'Roles', '/people/manage-role', null, null, null, false, 8, ['acl-management', 'acl-list']),
    new Menu(82, 'User Settings', '/people/user-management', null, null, null, false, 8, [
        'user-management',
        'user-reports',
    ]),
    new Menu(83, 'customer_management', '/people/customer-management', null, null, null, false, 8, []),
];
