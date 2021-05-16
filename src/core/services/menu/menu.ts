import { Menu } from '@models';

export const menuItems = [
    new Menu(1, 'menu_dashboard', '/roaster-dashboard', null, null, null, false, 0, null),

    new Menu(2, 'menu_sourcing', null, null, null, null, true, 0, 'sourcing-management'),
    new Menu(21, 'menu_gc_sourcing', '/sourcing', null, null, null, false, 2, null),
    new Menu(22, 'menu_quality_control', '/green-grading', null, null, null, false, 2, null),

    new Menu(3, 'menu_order_management', null, null, null, null, true, 0, 'sourcing-management'),
    new Menu(31, 'menu_estate_orders', '/orders/es', null, null, null, false, 3, null),
    new Menu(32, 'menu_micro_roaster_orders', '/orders/mr', null, null, null, false, 3, null),
    new Menu(33, 'menu_outtake_orders', '/outtake-orders', null, null, null, false, 3, null),

    new Menu(4, 'menu_inventory', null, null, null, null, true, 0, 'coffee-management|coffee-list|products-management'),
    new Menu(
        41,
        'menu_gc_inventory',
        '/green-coffee-management/green-coffee-inventory',
        null,
        null,
        null,
        false,
        4,
        null,
    ),
    new Menu(42, 'menu_rc_inventory', '/roasted-coffee-batch/roasted-coffee-batchs', null, null, null, false, 4, null),
    new Menu(43, 'menu_product_settings', '/product-setting', null, null, null, false, 4, null),

    new Menu(9, 'menu_ecommerce', null, null, null, null, true, 0, null),
    new Menu(91, 'b2b_product_catalog', '/e-commerce/product-list/b2b', null, null, null, false, 9, null),
    new Menu(92, 'b2c_product_catalog', '/e-commerce/product-list/b2c', null, null, null, false, 9, null),
    new Menu(93, 'other_products', '/e-commerce/product-list/other', null, null, null, false, 9, null),

    new Menu(5, 'menu_sales_management', null, null, null, null, true, 0, null),
    new Menu(51, 'menu_sales', './', null, null, null, false, 5, null),
    new Menu(52, 'menu_sales_contracts', '/sales-contract', null, null, null, false, 5, null),
    new Menu(53, 'menu_api_requests', '/api-requests-list', null, null, null, false, 5, null),
    new Menu(54, 'menu_customer_management', '/people/customer-management', null, null, null, false, 5, null),

    new Menu(7, 'menu_brand_experience', null, null, null, null, true, 0, null),
    new Menu(71, 'menu_brand_profile', '/brand-profile', null, null, null, false, 7, null),
    new Menu(72, 'menu_end_user_experience', '/coffee-experience', null, null, null, false, 7, null),
    new Menu(73, 'menu_education_collaboration', '/file-share', null, null, null, false, 7, null),
    new Menu(74, 'menu_coffee_lab', '/coffee-lab', null, null, null, false, 7, null),
    new Menu(75, 'menu_social_pr', '/social-media', null, null, null, false, 7, null),

    new Menu(
        8,
        'menu_team_management',
        null,
        null,
        null,
        null,
        true,
        0,
        'acl-management&acl-list|user-management&user-reports',
    ),
    new Menu(81, 'menu_roles', '/team-management/manage-role', null, null, null, false, 8, 'acl-management&acl-list'),
    new Menu(
        82,
        'menu_user_management',
        '/team-management/team-members',
        null,
        null,
        null,
        false,
        8,
        'user-management&user-reports',
    ),

    // Dropdown Menu
    new Menu(10001, 'menu_roastery_profile', '/roastery-profile', null, null, null, false, 1000, null),
    new Menu(10002, 'menu_my_profile', '/my-profile', null, null, null, false, 1000, null),
    new Menu(10003, 'menu_account_settings', '/account-settings', null, null, null, false, 1000, null),
];
