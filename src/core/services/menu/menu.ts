import { Menu } from '@models';

export const menuItems = [
    new Menu(1, 'menu_dashboard', '/roaster-dashboard', null, null, null, false, 0, []),

    new Menu(2, 'menu_sourcing', null, null, null, null, true, 0, ['sourcing-management']),
    new Menu(21, 'menu_gc_sourcing', '/sourcing', null, null, null, false, 2, []),
    new Menu(22, 'menu_quality_control', '/green-grading', null, null, null, false, 2, []),

    new Menu(3, 'menu_order_management', null, null, null, null, true, 0, ['sourcing-management']),
    new Menu(31, 'menu_estate_orders', '/orders/es', null, null, null, false, 3, []),
    new Menu(32, 'menu_micro_roaster_orders', '/orders/mr', null, null, null, false, 3, []),

    new Menu(4, 'menu_inventory', null, null, null, null, true, 0, [
        'coffee-management',
        'coffee-list',
        'products-management',
    ]),
    new Menu(
        41,
        'menu_gc_inventory',
        '/green-coffee-management/green-coffee-inventory',
        null,
        null,
        null,
        false,
        4,
        [],
    ),
    new Menu(42, 'menu_rc_inventory', '/roasted-coffee-batch/roasted-coffee-batchs', null, null, null, false, 4, []),
    new Menu(43, 'menu_product_settings', '/features/vat-management', null, null, null, false, 4, []),

    new Menu(9, 'menu_ecommerce_management', '/features/products-list', null, null, null, false, 0, []),

    new Menu(5, 'menu_sales_management', null, null, null, null, true, 0, []),
    new Menu(51, 'menu_sales', './', null, null, null, false, 5, []),
    new Menu(52, 'menu_sales_contracts', '/sales-contract', null, null, null, false, 5, []),
    new Menu(53, 'menu_api_requests', '/api-requests-list', null, null, null, false, 5, []),

    new Menu(7, 'menu_brand_experience', null, null, null, null, true, 0, []),
    new Menu(71, 'menu_brand_profile', '/brand-profile', null, null, null, false, 7, []),
    new Menu(72, 'menu_end_user_experience', '/coffee-experience', null, null, null, false, 7, []),
    new Menu(73, 'menu_education_collaboration', '/file-share', null, null, null, false, 7, []),
    new Menu(75, 'menu_social_pr', '/social-media', null, null, null, false, 7, []),

    new Menu(8, 'menu_team_management', null, null, null, null, true, 0, [
        'acl-management',
        'acl-list',
        'user-management',
        'user-reports',
    ]),
    new Menu(81, 'menu_roles', '/team-management/manage-role', null, null, null, false, 8, [
        'acl-management',
        'acl-list',
    ]),
    new Menu(82, 'menu_user_management', '/team-management/team-members', null, null, null, false, 8, [
        'user-management',
        'user-reports',
    ]),
    new Menu(83, 'menu_customer_management', '/people/customer-management', null, null, null, false, 8, []),

    // Dropdown Menu
    new Menu(10001, 'roastery_profile', '/roastery-profile', null, null, null, false, 1000, []),
    new Menu(10002, 'my_profile', '/features/myprofile', null, null, null, false, 1000, []),
    new Menu(10003, 'account_settings', '/features/account-settings', null, null, null, false, 1000, []),
];
