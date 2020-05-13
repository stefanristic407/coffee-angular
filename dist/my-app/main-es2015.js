(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: routes, AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




const routes = [
    {
        path: 'features',
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./features/features.module */ "./src/app/features/features.module.ts"))
            .then(m => m.FeaturesModule),
    },
    {
        path: 'auth',
        loadChildren: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! ./auth/auth.module */ "./src/app/auth/auth.module.ts"))
            .then(m => m.AuthModule)
    },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'people', loadChildren: () => __webpack_require__.e(/*! import() | people-people-module */ "people-people-module").then(__webpack_require__.bind(null, /*! ./people/people.module */ "./src/app/people/people.module.ts")).then(m => m.PeopleModule) },
    { path: '**', redirectTo: 'auth' },
];
const config = {
    useHash: false,
};
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, config)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, config)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class AppComponent {
    constructor() {
        this.title = 'my-app';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_service_worker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/service-worker */ "./node_modules/@angular/service-worker/__ivy_ngcc__/fesm2015/service-worker.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _features_features_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./features/features.module */ "./src/app/features/features.module.ts");
/* harmony import */ var _auth_auth_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./auth/auth.module */ "./src/app/auth/auth.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");












class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_9__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_9__["HashLocationStrategy"] }], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _auth_auth_module__WEBPACK_IMPORTED_MODULE_8__["AuthModule"],
            _features_features_module__WEBPACK_IMPORTED_MODULE_7__["FeaturesModule"],
            _angular_service_worker__WEBPACK_IMPORTED_MODULE_5__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].production })
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
        _auth_auth_module__WEBPACK_IMPORTED_MODULE_8__["AuthModule"],
        _features_features_module__WEBPACK_IMPORTED_MODULE_7__["FeaturesModule"], _angular_service_worker__WEBPACK_IMPORTED_MODULE_5__["ServiceWorkerModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                    _auth_auth_module__WEBPACK_IMPORTED_MODULE_8__["AuthModule"],
                    _features_features_module__WEBPACK_IMPORTED_MODULE_7__["FeaturesModule"],
                    _angular_service_worker__WEBPACK_IMPORTED_MODULE_5__["ServiceWorkerModule"].register('ngsw-worker.js', { enabled: _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].production })
                ],
                providers: [{ provide: _angular_common__WEBPACK_IMPORTED_MODULE_9__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_9__["HashLocationStrategy"] }],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/auth/auth-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/auth/login/login.component.ts");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "./src/app/auth/forgot-password/forgot-password.component.ts");
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth.component */ "./src/app/auth/auth.component.ts");
/* harmony import */ var _features_pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../features/pagenotfound/pagenotfound.component */ "./src/app/features/pagenotfound/pagenotfound.component.ts");
/* harmony import */ var _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./verify-otp/verify-otp.component */ "./src/app/auth/verify-otp/verify-otp.component.ts");
/* harmony import */ var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./change-password/change-password.component */ "./src/app/auth/change-password/change-password.component.ts");
/* harmony import */ var _setup_setup_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./setup/setup.component */ "./src/app/auth/setup/setup.component.ts");
/* harmony import */ var _update_password_update_password_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./update-password/update-password.component */ "./src/app/auth/update-password/update-password.component.ts");
/* harmony import */ var _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./privacy-policy/privacy-policy.component */ "./src/app/auth/privacy-policy/privacy-policy.component.ts");













const routes = [
    {
        path: '',
        component: _auth_component__WEBPACK_IMPORTED_MODULE_4__["AuthComponent"],
        children: [
            {
                path: 'login',
                component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
            },
            {
                path: 'forgot-password',
                component: _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_3__["ForgotPasswordComponent"]
            },
            {
                path: 'verify-otp',
                component: _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_6__["VerifyOtpComponent"]
            },
            {
                path: 'change-password',
                component: _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_7__["ChangePasswordComponent"]
            },
            {
                path: 'setup',
                component: _setup_setup_component__WEBPACK_IMPORTED_MODULE_8__["SetupComponent"]
            },
            {
                path: 'update-password',
                component: _update_password_update_password_component__WEBPACK_IMPORTED_MODULE_9__["UpdatePasswordComponent"]
            },
            {
                path: 'privacy-policy',
                component: _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_10__["PrivacyPolicyComponent"]
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
            {
                path: '**',
                component: _features_pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_5__["PagenotfoundComponent"]
            }
        ]
    }
];
class AuthRoutingModule {
}
AuthRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AuthRoutingModule });
AuthRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AuthRoutingModule_Factory(t) { return new (t || AuthRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AuthRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/auth/auth.component.ts":
/*!****************************************!*\
  !*** ./src/app/auth/auth.component.ts ***!
  \****************************************/
/*! exports provided: AuthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthComponent", function() { return AuthComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class AuthComponent {
    constructor() { }
    ngOnInit() {
    }
}
AuthComponent.ɵfac = function AuthComponent_Factory(t) { return new (t || AuthComponent)(); };
AuthComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AuthComponent, selectors: [["app-auth"]], decls: 1, vars: 0, template: function AuthComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvYXV0aC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-auth',
                templateUrl: './auth.component.html',
                styleUrls: ['./auth.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-routing.module */ "./src/app/auth/auth-routing.module.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/auth/login/login.component.ts");
/* harmony import */ var _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./forgot-password/forgot-password.component */ "./src/app/auth/forgot-password/forgot-password.component.ts");
/* harmony import */ var _auth_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth.component */ "./src/app/auth/auth.component.ts");
/* harmony import */ var _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pagenotfound/pagenotfound.component */ "./src/app/auth/pagenotfound/pagenotfound.component.ts");
/* harmony import */ var _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./verify-otp/verify-otp.component */ "./src/app/auth/verify-otp/verify-otp.component.ts");
/* harmony import */ var _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./change-password/change-password.component */ "./src/app/auth/change-password/change-password.component.ts");
/* harmony import */ var _setup_setup_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./setup/setup.component */ "./src/app/auth/setup/setup.component.ts");
/* harmony import */ var _update_password_update_password_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./update-password/update-password.component */ "./src/app/auth/update-password/update-password.component.ts");
/* harmony import */ var _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./privacy-policy/privacy-policy.component */ "./src/app/auth/privacy-policy/privacy-policy.component.ts");
/* harmony import */ var _setup_license_license_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./setup/license/license.component */ "./src/app/auth/setup/license/license.component.ts");














class AuthModule {
}
AuthModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AuthModule });
AuthModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AuthModule_Factory(t) { return new (t || AuthModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AuthModule, { declarations: [_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"], _auth_component__WEBPACK_IMPORTED_MODULE_5__["AuthComponent"], _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_6__["PagenotfoundComponent"], _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_7__["VerifyOtpComponent"], _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_8__["ChangePasswordComponent"], _setup_setup_component__WEBPACK_IMPORTED_MODULE_9__["SetupComponent"], _update_password_update_password_component__WEBPACK_IMPORTED_MODULE_10__["UpdatePasswordComponent"], _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_11__["PrivacyPolicyComponent"], _setup_license_license_component__WEBPACK_IMPORTED_MODULE_12__["LicenseComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AuthModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], _forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_4__["ForgotPasswordComponent"], _auth_component__WEBPACK_IMPORTED_MODULE_5__["AuthComponent"], _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_6__["PagenotfoundComponent"], _verify_otp_verify_otp_component__WEBPACK_IMPORTED_MODULE_7__["VerifyOtpComponent"], _change_password_change_password_component__WEBPACK_IMPORTED_MODULE_8__["ChangePasswordComponent"], _setup_setup_component__WEBPACK_IMPORTED_MODULE_9__["SetupComponent"], _update_password_update_password_component__WEBPACK_IMPORTED_MODULE_10__["UpdatePasswordComponent"], _privacy_policy_privacy_policy_component__WEBPACK_IMPORTED_MODULE_11__["PrivacyPolicyComponent"], _setup_license_license_component__WEBPACK_IMPORTED_MODULE_12__["LicenseComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/auth/change-password/change-password.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/auth/change-password/change-password.component.ts ***!
  \*******************************************************************/
/*! exports provided: ChangePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordComponent", function() { return ChangePasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class ChangePasswordComponent {
    constructor() { }
    ngOnInit() {
    }
}
ChangePasswordComponent.ɵfac = function ChangePasswordComponent_Factory(t) { return new (t || ChangePasswordComponent)(); };
ChangePasswordComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChangePasswordComponent, selectors: [["app-change-password"]], decls: 31, vars: 0, consts: [[1, "login-sec"], [1, "container"], [1, "sewn-bg-logo"], ["xmlns", "http://www.w3.org/2000/svg", "width", "90", "height", "27", "viewBox", "0 0 116 27"], ["fill", "none", "fill-rule", "evenodd"], ["fill", "#FFF", "font-family", "PlayfairDisplay-Bold, Playfair Display", "font-size", "26", "font-weight", "bold", "letter-spacing", "2.786", "transform", "translate(0 -5)", 2, "mix-blend-mode", "screen"], ["x", "33", "y", "28"], ["stroke", "#FFF", "stroke-width", "1.5"], ["d", "M1.448 9.926L10 18.416l8.552-8.49L10 1.437l-8.552 8.49z", "transform", "translate(0 -5) translate(0 5)"], ["d", "M1.448 17.074L10 25.563l8.552-8.49L10 8.585l-8.552 8.49z", "transform", "translate(0 -5) translate(0 5)"], [1, "col-xs-12", "col-sm-10", "col-md-8", "col-lg-6", "p-0", "login-box"], [1, "login"], [1, "login_heading"], [1, "login_para"], [1, "form-group", "row", "pt-1"], [1, "form-group", "col-md-12", "pt-2", "space-bottom"], [1, "role-name"], ["type", "password", "id", "", "placeholder", "Please enter your new passowrd", "name", "password", "required", "", 1, "form-control", "rectangle_name"], [1, "form-group", "col-md-12"], ["type", "password", "id", "", "placeholder", "Please enter new password again", "name", "password", "required", "", 1, "form-control", "rectangle_name"], [1, "w-100", "d-inline-block", "pt-1"], ["type", "button", "routerLink", "", 1, "btn", "btn-info", "login-butn", "float-right"]], template: function ChangePasswordComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "g", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "tspan", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "SEWN");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "g", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h3", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Change password ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Now you can set-up your new password ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "NEW PASSWORD");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "RE-ENTER YOUR NEW PASSWORD");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "button", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "CHANGE PASSWORD ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".login[_ngcontent-%COMP%] {\r\n    border-radius: 6px;\r\n    box-shadow: 0 0 10px 4px rgba(27, 27, 27, 0.3);\r\n    background-color: #ffffff;\r\n    padding: 2.3rem 2.3rem 3.8rem 2.3rem;\r\n}\r\n\r\n.login_heading[_ngcontent-%COMP%] {\r\n    font-family: PlayfairDisplay;\r\n    font-size: 32px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 42px;\r\n    letter-spacing: normal;\r\n    color: #000000;\r\n}\r\n\r\n.login_para[_ngcontent-%COMP%] {\r\n    font-family: Montserrat;\r\n    font-size: 12px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 28px;\r\n    letter-spacing: normal;\r\n    color: #666666;\r\n}\r\n\r\n.role-name[_ngcontent-%COMP%] {\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    color: #666666;\r\n    font-family: Montserrat;\r\n}\r\n\r\n.rectangle_name[_ngcontent-%COMP%] {\r\n    height: 46px;\r\n    border-radius: 6px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n}\r\n\r\n.remember[_ngcontent-%COMP%] {\r\n\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #333333;\r\n    margin-top: 3px;\r\n    margin-left: 5px;\r\n}\r\n\r\n.forgot[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n  \r\n    color: #3d8462;\r\n}\r\n\r\n.forgot[_ngcontent-%COMP%]:hover {\r\n    color: #3d8462;\r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%] {\r\n    border-radius: 6px;\r\n    background-color: #3d8462;\r\n    padding: 10px 11px;\r\n    font-size: 12px;\r\n    font-weight: 600;\r\n    color: #ffffff;\r\n    height: 40px;\r\n    border: #3d8462;\r\n\r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%]:focus {\r\n     outline:0;\r\n     background-color: #3d8462 !important; \r\n     \r\n }\r\n\r\n.login-butn[_ngcontent-%COMP%]:hover{\r\n   background-color: #3d8462; \r\n     border: #3d8462;\r\n     box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n\r\n}\r\n\r\n.space-bottom[_ngcontent-%COMP%]{\r\n    margin-bottom: 0.2px !important;\r\n}\r\n\r\n\r\n\r\n@media only screen and (max-width: 375px) {\r\n    .login_heading[_ngcontent-%COMP%] {\r\n        font-size: 28px;\r\n    }\r\n    \r\n    .login_para[_ngcontent-%COMP%], .remember[_ngcontent-%COMP%], .forgot[_ngcontent-%COMP%]{\r\n        font-size: 12px;\r\n    } \r\n    \r\n    \r\n}\r\n\r\n@media only screen and (max-width: 320px) {\r\n    .login_heading[_ngcontent-%COMP%] {\r\n        font-size: 24px;\r\n    }\r\n    \r\n    .login_para[_ngcontent-%COMP%], .remember[_ngcontent-%COMP%], .forgot[_ngcontent-%COMP%]{\r\n        font-size: 10px;\r\n    } \r\n       .login[_ngcontent-%COMP%]{\r\n       padding: 1rem;    \r\n       }\r\n    \r\n    \r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9jaGFuZ2UtcGFzc3dvcmQvY2hhbmdlLXBhc3N3b3JkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLDhDQUE4QztJQUM5Qyx5QkFBeUI7SUFDekIsb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksNEJBQTRCO0lBQzVCLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixzQkFBc0I7SUFDdEIsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLHlCQUF5QjtBQUM3Qjs7QUFFQTs7SUFFSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsc0JBQXNCOztJQUV0QixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFJQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLFlBQVk7SUFDWixlQUFlOztBQUVuQjs7QUFFQztLQUNJLFNBQVM7S0FDVCxvQ0FBb0M7O0NBRXhDOztBQUNEO0dBQ0cseUJBQXlCO0tBQ3ZCLGVBQWU7S0FDZiwrQ0FBK0M7O0FBRXBEOztBQUNBO0lBQ0ksK0JBQStCO0FBQ25DOztBQUVBLDBEQUEwRDs7QUFFMUQ7SUFDSTtRQUNJLGVBQWU7SUFDbkI7O0lBRUE7UUFDSSxlQUFlO0lBQ25COzs7QUFHSjs7QUFFRztJQUNDO1FBQ0ksZUFBZTtJQUNuQjs7SUFFQTtRQUNJLGVBQWU7SUFDbkI7T0FDRztPQUNBLGFBQWE7T0FDYjs7O0FBR1A7O0FBRUEsUUFBUSIsImZpbGUiOiJzcmMvYXBwL2F1dGgvY2hhbmdlLXBhc3N3b3JkL2NoYW5nZS1wYXNzd29yZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5sb2dpbiB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMTBweCA0cHggcmdiYSgyNywgMjcsIDI3LCAwLjMpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICAgIHBhZGRpbmc6IDIuM3JlbSAyLjNyZW0gMy44cmVtIDIuM3JlbTtcclxufVxyXG5cclxuLmxvZ2luX2hlYWRpbmcge1xyXG4gICAgZm9udC1mYW1pbHk6IFBsYXlmYWlyRGlzcGxheTtcclxuICAgIGZvbnQtc2l6ZTogMzJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG59XHJcblxyXG4ubG9naW5fcGFyYSB7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyOHB4O1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIGNvbG9yOiAjNjY2NjY2O1xyXG59XHJcblxyXG4ucm9sZS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogMTFweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG59XHJcblxyXG4ucmVjdGFuZ2xlX25hbWUge1xyXG4gICAgaGVpZ2h0OiA0NnB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcbi5yZW1lbWJlciB7XHJcblxyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICBjb2xvcjogIzMzMzMzMztcclxuICAgIG1hcmdpbi10b3A6IDNweDtcclxuICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbn1cclxuXHJcbi5mb3Jnb3Qge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgXHJcbiAgICBjb2xvcjogIzNkODQ2MjtcclxufVxyXG5cclxuLmZvcmdvdDpob3ZlciB7XHJcbiAgICBjb2xvcjogIzNkODQ2MjtcclxufVxyXG5cclxuXHJcblxyXG4ubG9naW4tYnV0biB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG4gICAgcGFkZGluZzogMTBweCAxMXB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgYm9yZGVyOiAjM2Q4NDYyO1xyXG5cclxufVxyXG5cclxuIC5sb2dpbi1idXRuOmZvY3VzIHtcclxuICAgICBvdXRsaW5lOjA7XHJcbiAgICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MiAhaW1wb3J0YW50OyBcclxuICAgICBcclxuIH1cclxuLmxvZ2luLWJ1dG46aG92ZXJ7XHJcbiAgIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7IFxyXG4gICAgIGJvcmRlcjogIzNkODQ2MjtcclxuICAgICBib3gtc2hhZG93OiAwIDAgN3B4IDFweCByZ2JhKDY3LCAxNDYsIDEwOCwgMC41KTtcclxuXHJcbn1cclxuLnNwYWNlLWJvdHRvbXtcclxuICAgIG1hcmdpbi1ib3R0b206IDAuMnB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi8qIGNvbW1vbiBjc3MgcmVzcG9uc2l2ZSBmb3IgbG9naW4gcmVzZXQgY2hhbmdlIHBhc3N3b3JkICovXHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM3NXB4KSB7XHJcbiAgICAubG9naW5faGVhZGluZyB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyOHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubG9naW5fcGFyYSwgLnJlbWVtYmVyLCAuZm9yZ290e1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIFxyXG59XHJcblxyXG4gICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDMyMHB4KSB7XHJcbiAgICAubG9naW5faGVhZGluZyB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubG9naW5fcGFyYSwgLnJlbWVtYmVyLCAuZm9yZ290e1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIH0gXHJcbiAgICAgICAubG9naW57XHJcbiAgICAgICBwYWRkaW5nOiAxcmVtOyAgICBcclxuICAgICAgIH1cclxuICAgIFxyXG4gICAgXHJcbn1cclxuXHJcbi8qZW5kcyAqLyJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChangePasswordComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-change-password',
                templateUrl: './change-password.component.html',
                styleUrls: ['./change-password.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/auth/forgot-password/forgot-password.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/auth/forgot-password/forgot-password.component.ts ***!
  \*******************************************************************/
/*! exports provided: ForgotPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class ForgotPasswordComponent {
    constructor() { }
    ngOnInit() {
    }
    ngAfterViewChecked() {
        $('.email-link').on('click', function () {
            $('.email-link').addClass('email-recovery');
            $('.email-link').removeClass('email-link');
        });
    }
}
ForgotPasswordComponent.ɵfac = function ForgotPasswordComponent_Factory(t) { return new (t || ForgotPasswordComponent)(); };
ForgotPasswordComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ForgotPasswordComponent, selectors: [["app-forgot-password"]], decls: 31, vars: 0, consts: [[1, "login-sec"], [1, "container"], [1, "sewn-bg-logo"], ["xmlns", "http://www.w3.org/2000/svg", "width", "90", "height", "27", "viewBox", "0 0 116 27"], ["fill", "none", "fill-rule", "evenodd"], ["fill", "#FFF", "font-family", "PlayfairDisplay-Bold, Playfair Display", "font-size", "26", "font-weight", "bold", "letter-spacing", "2.786", "transform", "translate(0 -5)", 2, "mix-blend-mode", "screen"], ["x", "33", "y", "28"], ["stroke", "#FFF", "stroke-width", "1.5"], ["d", "M1.448 9.926L10 18.416l8.552-8.49L10 1.437l-8.552 8.49z", "transform", "translate(0 -5) translate(0 5)"], ["d", "M1.448 17.074L10 25.563l8.552-8.49L10 8.585l-8.552 8.49z", "transform", "translate(0 -5) translate(0 5)"], [1, "col-xs-12", "col-sm-10", "col-md-8", "col-lg-6", "p-0", "login-box"], [1, "login"], [1, "login_heading"], [1, "login_para"], [1, "form-group", "row", "pt-2"], [1, "form-group", "col-md-12"], [1, "role-name"], ["type", "email", "id", "", "placeholder", "you@example.com", "name", "email", "autofocus", "", "required", "", 1, "form-control", "rectangle_name"], [1, "form-group", "row", "pt-1", "m-0"], [1, "text-center", "w-100"], ["type", "button", "routerLink", "../verify-otp", 1, "btn", "btn-info", "login-butn", "email-link", "w-100"], [1, "form-group", "row", "pt-4", "pb-5", "pl-3", "bottom-space"], ["href", "", 1, "forgot", "w-100"]], template: function ForgotPasswordComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "g", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "tspan", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "SEWN");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "g", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h3", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Reset your password! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Welcome Back, Please login to your account. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "label", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "EMAIL ADDRESS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "button", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Already have an account? Login");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".login[_ngcontent-%COMP%] {\r\n    border-radius: 6px;\r\n    box-shadow: 0 0 10px 4px rgba(27, 27, 27, 0.3);\r\n    background-color: #ffffff;\r\n    padding: 2.3rem 2.3rem 1.1rem 2.3rem;\r\n}\r\n\r\n.login_heading[_ngcontent-%COMP%] {\r\n    font-family: PlayfairDisplay;\r\n    font-size: 32px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 42px;\r\n    letter-spacing: normal;\r\n    color: #000000;\r\n}\r\n\r\n.login_para[_ngcontent-%COMP%] {\r\n    font-family: Montserrat;\r\n    font-size: 12px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 28px;\r\n    letter-spacing: normal;\r\n    color: #666666;\r\n}\r\n\r\n.role-name[_ngcontent-%COMP%] {\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    color: #666666;\r\n    font-family: Montserrat;\r\n}\r\n\r\n.rectangle_name[_ngcontent-%COMP%] {\r\n    height: 46px;\r\n    border-radius: 6px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n}\r\n\r\n.remember[_ngcontent-%COMP%] {\r\n\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #333333;\r\n    margin-top: 3px;\r\n    margin-left: 5px;\r\n}\r\n\r\n.forgot[_ngcontent-%COMP%] {\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    text-decoration: underline;\r\n    color: #3d8462;\r\n}\r\n\r\n.forgot[_ngcontent-%COMP%]:hover {\r\n    color: #3d8462;\r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%] {\r\n    border-radius: 6px;\r\n    background-color: #3d8462;\r\n    padding: 11px 20px;\r\n    font-size: 12px;\r\n    font-weight: 600;\r\n    color: #ffffff;\r\n    border: #3d8462;\r\n\r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%]:hover{\r\n   background-color: #3d8462; \r\n     border: #3d8462;\r\n     box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n\r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%]:focus {\r\n    outline:0;\r\n    background-color: #3d8462 !important; \r\n\r\n}\r\n\r\n.email-link[_ngcontent-%COMP%]:before{content:'EMAIL ME A RECOVERY LINK ';}\r\n\r\n.email-recovery[_ngcontent-%COMP%]:before{content: '\\f00c';\r\nfont-family: FontAwesome;\r\nfont-style: normal;\r\nfont-weight: normal;\r\ntext-decoration: inherit;\r\npadding-right: 5px;\r\nfont-weight: 100;\r\nfont-size: 14px;}\r\n\r\n.email-recovery[_ngcontent-%COMP%]:after{content:'LINK SENT';}\r\n\r\n.bottom-space[_ngcontent-%COMP%]{\r\n    margin-bottom: 3rem;\r\n}\r\n\r\n\r\n\r\n@media only screen and (max-width: 375px) {\r\n    .login_heading[_ngcontent-%COMP%] {\r\n        font-size: 28px;\r\n    }\r\n    \r\n    .login_para[_ngcontent-%COMP%], .remember[_ngcontent-%COMP%], .forgot[_ngcontent-%COMP%]{\r\n        font-size: 12px;\r\n    } \r\n    \r\n    \r\n}\r\n\r\n@media only screen and (max-width: 320px) {\r\n    .login_heading[_ngcontent-%COMP%] {\r\n        font-size: 24px;\r\n    }\r\n    \r\n    .login_para[_ngcontent-%COMP%], .remember[_ngcontent-%COMP%], .forgot[_ngcontent-%COMP%]{\r\n        font-size: 10px;\r\n    } \r\n       .login[_ngcontent-%COMP%]{\r\n       padding: 1rem;    \r\n       }\r\n    \r\n    \r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9mb3Jnb3QtcGFzc3dvcmQvZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLDhDQUE4QztJQUM5Qyx5QkFBeUI7SUFDekIsb0NBQW9DO0FBQ3hDOztBQUVBO0lBQ0ksNEJBQTRCO0lBQzVCLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixzQkFBc0I7SUFDdEIsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLHlCQUF5QjtBQUM3Qjs7QUFFQTs7SUFFSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLDBCQUEwQjtJQUMxQixjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFJQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLGVBQWU7O0FBRW5COztBQUVBO0dBQ0cseUJBQXlCO0tBQ3ZCLGVBQWU7S0FDZiwrQ0FBK0M7O0FBRXBEOztBQUNBO0lBQ0ksU0FBUztJQUNULG9DQUFvQzs7QUFFeEM7O0FBQ0EsbUJBQW1CLG1DQUFtQyxDQUFDOztBQUN2RCx1QkFBdUIsZ0JBQWdCO0FBQ3ZDLHdCQUF3QjtBQUN4QixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHdCQUF3QjtBQUN4QixrQkFBa0I7QUFDbEIsZ0JBQWdCO0FBQ2hCLGVBQWUsQ0FBQzs7QUFDaEIsc0JBQXNCLG1CQUFtQixDQUFDOztBQUUxQztJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQSwwREFBMEQ7O0FBRTFEO0lBQ0k7UUFDSSxlQUFlO0lBQ25COztJQUVBO1FBQ0ksZUFBZTtJQUNuQjs7O0FBR0o7O0FBRUc7SUFDQztRQUNJLGVBQWU7SUFDbkI7O0lBRUE7UUFDSSxlQUFlO0lBQ25CO09BQ0c7T0FDQSxhQUFhO09BQ2I7OztBQUdQOztBQUVBLFFBQVEiLCJmaWxlIjoic3JjL2FwcC9hdXRoL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4ubG9naW4ge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggNHB4IHJnYmEoMjcsIDI3LCAyNywgMC4zKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICBwYWRkaW5nOiAyLjNyZW0gMi4zcmVtIDEuMXJlbSAyLjNyZW07XHJcbn1cclxuXHJcbi5sb2dpbl9oZWFkaW5nIHtcclxuICAgIGZvbnQtZmFtaWx5OiBQbGF5ZmFpckRpc3BsYXk7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogNDJweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxufVxyXG5cclxuLmxvZ2luX3BhcmEge1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogMjhweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxufVxyXG5cclxuLnJvbGUtbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICM2NjY2NjY7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxufVxyXG5cclxuLnJlY3RhbmdsZV9uYW1lIHtcclxuICAgIGhlaWdodDogNDZweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG59XHJcblxyXG4ucmVtZW1iZXIge1xyXG5cclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gICAgY29sb3I6ICMzMzMzMzM7XHJcbiAgICBtYXJnaW4tdG9wOiAzcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG59XHJcblxyXG4uZm9yZ290IHtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICBjb2xvcjogIzNkODQ2MjtcclxufVxyXG5cclxuLmZvcmdvdDpob3ZlciB7XHJcbiAgICBjb2xvcjogIzNkODQ2MjtcclxufVxyXG5cclxuXHJcblxyXG4ubG9naW4tYnV0biB7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG4gICAgcGFkZGluZzogMTFweCAyMHB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYm9yZGVyOiAjM2Q4NDYyO1xyXG5cclxufVxyXG5cclxuLmxvZ2luLWJ1dG46aG92ZXJ7XHJcbiAgIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7IFxyXG4gICAgIGJvcmRlcjogIzNkODQ2MjtcclxuICAgICBib3gtc2hhZG93OiAwIDAgN3B4IDFweCByZ2JhKDY3LCAxNDYsIDEwOCwgMC41KTtcclxuXHJcbn1cclxuLmxvZ2luLWJ1dG46Zm9jdXMge1xyXG4gICAgb3V0bGluZTowO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MiAhaW1wb3J0YW50OyBcclxuXHJcbn1cclxuLmVtYWlsLWxpbms6YmVmb3Jle2NvbnRlbnQ6J0VNQUlMIE1FIEEgUkVDT1ZFUlkgTElOSyAnO31cclxuLmVtYWlsLXJlY292ZXJ5OmJlZm9yZXtjb250ZW50OiAnXFxmMDBjJztcclxuZm9udC1mYW1pbHk6IEZvbnRBd2Vzb21lO1xyXG5mb250LXN0eWxlOiBub3JtYWw7XHJcbmZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbnRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcclxucGFkZGluZy1yaWdodDogNXB4O1xyXG5mb250LXdlaWdodDogMTAwO1xyXG5mb250LXNpemU6IDE0cHg7fVxyXG4uZW1haWwtcmVjb3Zlcnk6YWZ0ZXJ7Y29udGVudDonTElOSyBTRU5UJzt9XHJcblxyXG4uYm90dG9tLXNwYWNle1xyXG4gICAgbWFyZ2luLWJvdHRvbTogM3JlbTtcclxufVxyXG5cclxuLyogY29tbW9uIGNzcyByZXNwb25zaXZlIGZvciBsb2dpbiByZXNldCBjaGFuZ2UgcGFzc3dvcmQgKi9cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzc1cHgpIHtcclxuICAgIC5sb2dpbl9oZWFkaW5nIHtcclxuICAgICAgICBmb250LXNpemU6IDI4cHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5sb2dpbl9wYXJhLCAucmVtZW1iZXIsIC5mb3Jnb3R7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgfSBcclxuICAgIFxyXG4gICAgXHJcbn1cclxuXHJcbiAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzIwcHgpIHtcclxuICAgIC5sb2dpbl9oZWFkaW5nIHtcclxuICAgICAgICBmb250LXNpemU6IDI0cHg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5sb2dpbl9wYXJhLCAucmVtZW1iZXIsIC5mb3Jnb3R7XHJcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xyXG4gICAgfSBcclxuICAgICAgIC5sb2dpbntcclxuICAgICAgIHBhZGRpbmc6IDFyZW07ICAgIFxyXG4gICAgICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG5cclxuLyplbmRzICovIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ForgotPasswordComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-forgot-password',
                templateUrl: './forgot-password.component.html',
                styleUrls: ['./forgot-password.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/auth/login/login.component.ts":
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class LoginComponent {
    constructor() { }
    ngOnInit() {
    }
    myAlertTop() {
        $(".myAlert-top").show();
        setTimeout(function () {
            $(".myAlert-top").hide();
        }, 2000);
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 52, vars: 0, consts: [[1, "login-sec"], [1, "container"], [1, "sewn-bg-logo"], ["xmlns", "http://www.w3.org/2000/svg", "width", "90", "height", "27", "viewBox", "0 0 116 27"], ["fill", "none", "fill-rule", "evenodd"], ["fill", "#FFF", "font-family", "PlayfairDisplay-Bold, Playfair Display", "font-size", "26", "font-weight", "bold", "letter-spacing", "2.786", "transform", "translate(0 -5)", 2, "mix-blend-mode", "screen"], ["x", "33", "y", "28"], ["stroke", "#FFF", "stroke-width", "1.5"], ["d", "M1.448 9.926L10 18.416l8.552-8.49L10 1.437l-8.552 8.49z", "transform", "translate(0 -5) translate(0 5)"], ["d", "M1.448 17.074L10 25.563l8.552-8.49L10 8.585l-8.552 8.49z", "transform", "translate(0 -5) translate(0 5)"], [1, "row"], [1, "col-xs-12", "col-sm-10", "col-md-8", "col-lg-6", "login-box"], [1, "login"], [1, "login_heading"], [1, "login_para"], [1, "col-sm-12"], [1, "invalid-combination", "myAlert-top", "alert", "text-center"], [1, "form-group", "row", "pt-2"], [1, "form-group", "col-md-12", "padding-spacing"], [1, "role-name"], ["type", "email", "id", "", "placeholder", "you@example.com", "name", "email", "autofocus", "", "required", "", 1, "form-control", "rectangle_name"], [1, "form-group", "row", "pt-1"], ["type", "password", "id", "", "placeholder", "Please enter your password", "name", "password", "autofocus", "", "required", "", 1, "form-control", "rectangle_name"], [1, "form-group", "row", "pt-1", "pl-1", "d-inline-block", "w-100"], [1, "custom-control", "custom-checkbox", "mb-1", "float-left", "pad-left"], ["type", "checkbox", "id", "remember", "name", "example1", 1, "custom-control-input"], ["for", "remember", 1, "custom-control-label", "remember"], [1, "remeber-left"], [1, "float-right"], ["routerLink", "../forgot-password", 1, "forgot"], [1, "form-group", "row", "pt-2", "pl-3", "d-inline-block", "w-100"], [1, "float-left", "mt-2"], ["routerLink", "/auth/setup", 1, "forgot"], ["type", "button", "routerLink", "../../features", 1, "btn", "btn-info", "login-butn", 3, "click"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "svg", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "g", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "tspan", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "SEWN");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "g", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "h3", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Login to your account ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "p", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Welcome Back, Please login to your account. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "form");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "h5", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, " Invalid Combination. Have another go. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "EMAIL ADDRESS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "PASSWORD");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "input", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "span", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Remember me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "a", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Forgot password?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "a", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Don't have an account? Sign up");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "button", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_50_listener() { return ctx.myAlertTop(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "LOGIN");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".login-sec[_ngcontent-%COMP%] {\r\n    background-image: url('coffee_estate_bg.png');\r\n    width: 100%;\r\n    height: 100%;\r\n    background-size: cover;\r\n    position: fixed;\r\n}\r\n\r\n.login[_ngcontent-%COMP%] {\r\n    border-radius: 6px;\r\n    box-shadow: 0 0 10px 4px rgba(27, 27, 27, 0.3);\r\n    background-color: #ffffff;\r\n    padding: 2.3rem 2.3rem 1.1rem 2.3rem;\r\n    \r\n}\r\n\r\n.login_heading[_ngcontent-%COMP%] {\r\n    font-family: PlayfairDisplay;\r\n    font-size: 32px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 44px;\r\n    letter-spacing: normal;\r\n    color: #000000;\r\n}\r\n\r\n.login_para[_ngcontent-%COMP%] {\r\n    font-family: Montserrat;\r\n    font-size: 12px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 26px;\r\n    letter-spacing: normal;\r\n    color: #666666;\r\n}\r\n\r\n.role-name[_ngcontent-%COMP%] {\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    color: #666666;\r\n    font-family: Montserrat;\r\n}\r\n\r\n.rectangle_name[_ngcontent-%COMP%] {\r\n    height: 46px;\r\n    border-radius: 6px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n    color:#000000;\r\n    font-weight: 500;\r\n    font-family: Montserrat;\r\n\r\n}\r\n\r\n.rectangle_name[_ngcontent-%COMP%]::-webkit-input-placeholder {\r\n    font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n}\r\n\r\n.rectangle_name[_ngcontent-%COMP%]::-moz-placeholder {\r\n    font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n}\r\n\r\n.rectangle_name[_ngcontent-%COMP%]::-ms-input-placeholder {\r\n    font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n}\r\n\r\n.rectangle_name[_ngcontent-%COMP%]::placeholder {\r\n    font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n}\r\n\r\n.remember[_ngcontent-%COMP%] {\r\n\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #333333;\r\n    margin-top: 3px;\r\n    margin-left: 7px;\r\n}\r\n\r\n.remember[_ngcontent-%COMP%]:before{\r\n    \r\n    border: solid 1px #827a7a87;\r\n    background-color: #ffffff;\r\n  }\r\n\r\n.forgot[_ngcontent-%COMP%] {\r\n    font-size: 13px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    text-decoration: underline;\r\n    color: #3d8462;\r\n}\r\n\r\n.forgot[_ngcontent-%COMP%]:hover {\r\n    color: #3d8462;\r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%] {\r\n    background-color: #3d8462;\r\n    padding: 10px 24px;\r\n    font-size: 12px;\r\n    font-weight: 600;\r\n    color: #ffffff;  \r\n    border: #3d8462;\r\n    border-radius: 6px;\r\n    \r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%]:hover{\r\n   background-color: #3d8462; \r\n     border: #3d8462;\r\n     box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n\r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%]:focus {\r\n    outline:0;\r\n    background-color: #3d8462 !important;\r\n}\r\n\r\ndiv.fullscreen[_ngcontent-%COMP%] {\r\nposition: absolute;\r\nwidth:100%; \r\nheight:960px; \r\ntop: 0; \r\nleft: 0; \r\n}\r\n\r\n.alert[_ngcontent-%COMP%]{\r\ndisplay: none;\r\n}\r\n\r\n.invalid-combination[_ngcontent-%COMP%]{\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #ffffff;\r\nborder-radius: 6px;\r\nbackground-color: #e02f1f;\r\npadding: 10px; \r\n}\r\n\r\n.pad-left[_ngcontent-%COMP%]{\r\n    padding:0;\r\n}\r\n\r\n.remeber-left[_ngcontent-%COMP%]{\r\n    display: inline-block;\r\n    padding-left: 20px;\r\n}\r\n\r\n.padding-spacing[_ngcontent-%COMP%]{\r\n    margin-bottom: 0.2px !important;\r\n}\r\n\r\n\r\n\r\n@media only screen and (max-width: 375px) {\r\n    .login_heading[_ngcontent-%COMP%] {\r\n        font-size: 28px;\r\n    }\r\n    \r\n    .login_para[_ngcontent-%COMP%], .remember[_ngcontent-%COMP%], .forgot[_ngcontent-%COMP%]{\r\n        font-size: 12px;\r\n    } \r\n    \r\n    \r\n}\r\n\r\n@media only screen and (max-width: 320px) {\r\n    .login_heading[_ngcontent-%COMP%] {\r\n        font-size: 24px;\r\n    }\r\n    \r\n    .login_para[_ngcontent-%COMP%], .remember[_ngcontent-%COMP%], .forgot[_ngcontent-%COMP%]{\r\n        font-size: 10px;\r\n    } \r\n       .login[_ngcontent-%COMP%]{\r\n       padding: 1rem;    \r\n       }\r\n    \r\n    \r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksNkNBQWtFO0lBQ2xFLFdBQVc7SUFDWCxZQUFZO0lBQ1osc0JBQXNCO0lBQ3RCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsOENBQThDO0lBQzlDLHlCQUF5QjtJQUN6QixvQ0FBb0M7O0FBRXhDOztBQUVBO0lBQ0ksNEJBQTRCO0lBQzVCLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixzQkFBc0I7SUFDdEIsY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztJQUNkLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6QixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLHVCQUF1Qjs7QUFFM0I7O0FBQ0E7SUFDSSx1QkFBdUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjs7QUFKQTtJQUNJLHVCQUF1QjtFQUN6QixlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUpBO0lBQ0ksdUJBQXVCO0VBQ3pCLGVBQWU7RUFDZixnQkFBZ0I7QUFDbEI7O0FBSkE7SUFDSSx1QkFBdUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjs7QUFFQTs7SUFFSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtBQUNwQjs7QUFDQTtJQUNJLHdCQUF3QjtJQUN4QiwyQkFBMkI7SUFDM0IseUJBQXlCO0VBQzNCOztBQUNGO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsMEJBQTBCO0lBQzFCLGNBQWM7QUFDbEI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxlQUFlO0lBQ2Ysa0JBQWtCO0lBQ2xCLHFEQUFxRDtBQUN6RDs7QUFFQTtHQUNHLHlCQUF5QjtLQUN2QixlQUFlO0tBQ2YsK0NBQStDOztBQUVwRDs7QUFDQTtJQUNJLFNBQVM7SUFDVCxvQ0FBb0M7QUFDeEM7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEIsVUFBVTtBQUNWLFlBQVk7QUFDWixNQUFNO0FBQ04sT0FBTztBQUNQOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsY0FBYztBQUNkLGtCQUFrQjtBQUNsQix5QkFBeUI7QUFDekIsYUFBYTtBQUNiOztBQUNBO0lBQ0ksU0FBUztBQUNiOztBQUNBO0lBQ0kscUJBQXFCO0lBQ3JCLGtCQUFrQjtBQUN0Qjs7QUFDQTtJQUNJLCtCQUErQjtBQUNuQzs7QUFDQSwwREFBMEQ7O0FBRTFEO0lBQ0k7UUFDSSxlQUFlO0lBQ25COztJQUVBO1FBQ0ksZUFBZTtJQUNuQjs7O0FBR0o7O0FBRUc7SUFDQztRQUNJLGVBQWU7SUFDbkI7O0lBRUE7UUFDSSxlQUFlO0lBQ25CO09BQ0c7T0FDQSxhQUFhO09BQ2I7OztBQUdQOztBQUVBLFFBQVEiLCJmaWxlIjoic3JjL2FwcC9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9naW4tc2VjIHtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2NvZmZlZV9lc3RhdGVfYmcucG5nKTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxufVxyXG5cclxuLmxvZ2luIHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IDRweCByZ2JhKDI3LCAyNywgMjcsIDAuMyk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcGFkZGluZzogMi4zcmVtIDIuM3JlbSAxLjFyZW0gMi4zcmVtO1xyXG4gICAgXHJcbn1cclxuXHJcbi5sb2dpbl9oZWFkaW5nIHtcclxuICAgIGZvbnQtZmFtaWx5OiBQbGF5ZmFpckRpc3BsYXk7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogNDRweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxufVxyXG5cclxuLmxvZ2luX3BhcmEge1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogMjZweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxufVxyXG5cclxuLnJvbGUtbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICM2NjY2NjY7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxufVxyXG5cclxuLnJlY3RhbmdsZV9uYW1lIHtcclxuICAgIGhlaWdodDogNDZweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgY29sb3I6IzAwMDAwMDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuXHJcbn1cclxuLnJlY3RhbmdsZV9uYW1lOjpwbGFjZWhvbGRlciB7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICBmb250LXNpemU6IDEzcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuLnJlbWVtYmVyIHtcclxuXHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIGNvbG9yOiAjMzMzMzMzO1xyXG4gICAgbWFyZ2luLXRvcDogM3B4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDdweDtcclxufVxyXG4ucmVtZW1iZXI6YmVmb3Jle1xyXG4gICAgLyogYm9yZGVyLXJhZGl1czogNnB4OyAqL1xyXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggIzgyN2E3YTg3O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICB9XHJcbi5mb3Jnb3Qge1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICAgIGNvbG9yOiAjM2Q4NDYyO1xyXG59XHJcblxyXG4uZm9yZ290OmhvdmVyIHtcclxuICAgIGNvbG9yOiAjM2Q4NDYyO1xyXG59XHJcblxyXG4ubG9naW4tYnV0biB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG4gICAgcGFkZGluZzogMTBweCAyNHB4O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjZmZmZmZmOyAgXHJcbiAgICBib3JkZXI6ICMzZDg0NjI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICAvKiBib3gtc2hhZG93OiAwIDAgN3B4IDFweCByZ2JhKDY3LCAxNDYsIDEwOCwgMC41KTsgKi9cclxufVxyXG5cclxuLmxvZ2luLWJ1dG46aG92ZXJ7XHJcbiAgIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7IFxyXG4gICAgIGJvcmRlcjogIzNkODQ2MjtcclxuICAgICBib3gtc2hhZG93OiAwIDAgN3B4IDFweCByZ2JhKDY3LCAxNDYsIDEwOCwgMC41KTtcclxuXHJcbn1cclxuLmxvZ2luLWJ1dG46Zm9jdXMge1xyXG4gICAgb3V0bGluZTowO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5kaXYuZnVsbHNjcmVlbiB7XHJcbnBvc2l0aW9uOiBhYnNvbHV0ZTtcclxud2lkdGg6MTAwJTsgXHJcbmhlaWdodDo5NjBweDsgXHJcbnRvcDogMDsgXHJcbmxlZnQ6IDA7IFxyXG59XHJcblxyXG4uYWxlcnR7XHJcbmRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbi5pbnZhbGlkLWNvbWJpbmF0aW9ue1xyXG5mb250LXNpemU6IDE0cHg7XHJcbmZvbnQtd2VpZ2h0OiA1MDA7XHJcbmZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG5mb250LXN0eWxlOiBub3JtYWw7XHJcbmxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbmxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbmNvbG9yOiAjZmZmZmZmO1xyXG5ib3JkZXItcmFkaXVzOiA2cHg7XHJcbmJhY2tncm91bmQtY29sb3I6ICNlMDJmMWY7XHJcbnBhZGRpbmc6IDEwcHg7IFxyXG59XHJcbi5wYWQtbGVmdHtcclxuICAgIHBhZGRpbmc6MDtcclxufVxyXG4ucmVtZWJlci1sZWZ0e1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xyXG59XHJcbi5wYWRkaW5nLXNwYWNpbmd7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwLjJweCAhaW1wb3J0YW50O1xyXG59XHJcbi8qIGNvbW1vbiBjc3MgcmVzcG9uc2l2ZSBmb3IgbG9naW4gcmVzZXQgY2hhbmdlIHBhc3N3b3JkICovXHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM3NXB4KSB7XHJcbiAgICAubG9naW5faGVhZGluZyB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyOHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubG9naW5fcGFyYSwgLnJlbWVtYmVyLCAuZm9yZ290e1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTJweDtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIFxyXG59XHJcblxyXG4gICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDMyMHB4KSB7XHJcbiAgICAubG9naW5faGVhZGluZyB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubG9naW5fcGFyYSwgLnJlbWVtYmVyLCAuZm9yZ290e1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIH0gXHJcbiAgICAgICAubG9naW57XHJcbiAgICAgICBwYWRkaW5nOiAxcmVtOyAgICBcclxuICAgICAgIH1cclxuICAgIFxyXG4gICAgXHJcbn1cclxuXHJcbi8qZW5kcyAqLyJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LoginComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-login',
                templateUrl: './login.component.html',
                styleUrls: ['./login.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/auth/pagenotfound/pagenotfound.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/auth/pagenotfound/pagenotfound.component.ts ***!
  \*************************************************************/
/*! exports provided: PagenotfoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagenotfoundComponent", function() { return PagenotfoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class PagenotfoundComponent {
    constructor() { }
    ngOnInit() {
    }
}
PagenotfoundComponent.ɵfac = function PagenotfoundComponent_Factory(t) { return new (t || PagenotfoundComponent)(); };
PagenotfoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PagenotfoundComponent, selectors: [["app-pagenotfound"]], decls: 2, vars: 0, template: function PagenotfoundComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "pagenotfound works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvcGFnZW5vdGZvdW5kL3BhZ2Vub3Rmb3VuZC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PagenotfoundComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pagenotfound',
                templateUrl: './pagenotfound.component.html',
                styleUrls: ['./pagenotfound.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/auth/privacy-policy/privacy-policy.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/auth/privacy-policy/privacy-policy.component.ts ***!
  \*****************************************************************/
/*! exports provided: PrivacyPolicyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivacyPolicyComponent", function() { return PrivacyPolicyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class PrivacyPolicyComponent {
    constructor() { }
    ngOnInit() {
    }
}
PrivacyPolicyComponent.ɵfac = function PrivacyPolicyComponent_Factory(t) { return new (t || PrivacyPolicyComponent)(); };
PrivacyPolicyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PrivacyPolicyComponent, selectors: [["app-privacy-policy"]], decls: 59, vars: 0, consts: [[1, "sewn_heading"], ["xmlns", "http://www.w3.org/2000/svg", "width", "90", "height", "27", "viewBox", "0 0 115 27", 1, "logo_sewn"], ["fill", "none", "fill-rule", "evenodd"], ["stroke", "#000", "stroke-width", "1.5"], ["d", "M1.448 9.926L10 18.416l8.552-8.49L10 1.437l-8.552 8.49z", "transform", "translate(0 -4) translate(0 4)"], ["d", "M1.448 17.074L10 25.563l8.552-8.49L10 8.585l-8.552 8.49z", "transform", "translate(0 -4) translate(0 4)"], ["fill", "#000", "font-family", "PlayfairDisplay-Bold, Playfair Display", "font-size", "26", "font-weight", "bold", "letter-spacing", "2.786", "transform", "translate(0 -4)"], ["x", "32", "y", "28"], [1, "container-fluid", "position-total"], [1, "row"], [1, "col-1", "first_column"], [1, "col-10", "middle_column"], [1, "container"], [1, "row", "justify-content-center"], [1, "policy-title"], [1, "col-12", "text-center", "privacy-text", "mt-3"], [1, "col-12", "text-center", "agree-text", "mt-1"], [1, "main_spacing"], [1, "col-xl-5", "col-lg-6", "col-md-7", "col-sm-10", "mx-auto"], [1, "custom-control", "custom-checkbox", "mb-1", "top-spacing"], ["type", "checkbox", "id", "custom_check1", "name", "example1", 1, "custom-control-input"], ["for", "custom_check1", 1, "custom-control-label", "text_checkbox"], [1, "remeber-left"], [1, "custom-control", "custom-checkbox", "mb-1", "mt-4"], ["type", "checkbox", "id", "custom_check2", "name", "example2", 1, "custom-control-input"], ["for", "custom_check2", 1, "custom-control-label", "text_checkbox"], ["type", "checkbox", "id", "custom_check3", "name", "example3", 1, "custom-control-input"], ["for", "custom_check3", 1, "custom-control-label", "text_checkbox"], [1, "line_spacing", "mt-3"], ["type", "checkbox", "id", "custom_policy", "name", "example4", 1, "custom-control-input"], ["for", "custom_policy", 1, "custom-control-label", "policy_checkbox"], [1, "policy_color"], ["type", "checkbox", "id", "custom_terms", "name", "example5", 1, "custom-control-input"], ["for", "custom_terms", 1, "custom-control-label", "policy_checkbox"], [1, "text-center", "policy-spacing"], ["type", "submit", "routerLink", "../update-password", 1, "col-3", "col-sm-2", "col-md-2", "col-lg-1", "next-button", "btn"], [1, "next-text"], [1, "col-1", "last_column"]], template: function PrivacyPolicyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "g", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "g", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "path", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "text", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "tspan", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "SEWN");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h3", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Our Privacy Policy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "We care about your privacy!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "By agreeing to the following, you are giving permission to SEWN for");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "input", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Accessing my account and it\u2019s details");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "label", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Collecting my data");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "input", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "label", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Accessing my chat");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "input", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "label", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "I have read and agree to the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "span", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Privacy Policy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "input", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "label", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "span", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "I have read and agree to the ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "span", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Terms and Conditions");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "button", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "span", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "NEXT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](58, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".sewn_heading[_ngcontent-%COMP%]\r\n    {\r\n        background-color: #f3efe8;\r\n    height: 60px;\r\n    \r\n    padding-left: 110px;\r\n    }\r\n    .logo_sewn[_ngcontent-%COMP%]{\r\n        \r\n        margin-top: 16px;\r\n    }\r\n    .first_column[_ngcontent-%COMP%]{\r\n     background-color: #f3efe8;\r\n     \r\n     \r\n   }\r\n    .last_column[_ngcontent-%COMP%]{\r\n        background-color: #f3efe8;\r\n\r\n   }\r\n    .middle_column[_ngcontent-%COMP%]{\r\n        border-radius: 6px;\r\n        background-color: #ffffff;\r\n   }\r\n    .policy-title[_ngcontent-%COMP%]{\r\n    font-family: PlayfairDisplay;\r\n    font-size: 32px;\r\n    color: #000000;\r\n    margin-top: 28px;\r\n    font-weight: 500;\r\n    line-height: 42px;\r\n   }\r\n    .privacy-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  color: #a88057;\r\n   }\r\n    .agree-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  line-height: 1.43;\r\n  color: #666666;\r\n   }\r\n    .text_checkbox[_ngcontent-%COMP%]{\r\n     font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 600;\r\n  color: #666666;\r\n  cursor: pointer;\r\n   }\r\n    .policy_checkbox[_ngcontent-%COMP%]{\r\n  font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 600;\r\n  color: #666666;\r\n  cursor: pointer;\r\n  \r\n}\r\n    .top-spacing[_ngcontent-%COMP%]{\r\n  margin-top: 2.3rem;\r\n}\r\n    .main_spacing[_ngcontent-%COMP%]{\r\n  margin-left: 4rem;\r\n}\r\n    .line_spacing[_ngcontent-%COMP%]{\r\n  border-top: 1px dashed #f3efe8;\r\n  \r\n}\r\n    .policy_color[_ngcontent-%COMP%]{\r\n  color: #3d8462;\r\n}\r\n    .next-button[_ngcontent-%COMP%]{\r\n  height: 40px;\r\n  border-radius: 6px;\r\n  background-color: #3d8462;\r\n    margin-top: 3%;\r\n    margin-bottom: 9%;\r\n\r\n}\r\n    .next-button[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n    box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n    \r\n}\r\n    .next-text[_ngcontent-%COMP%]{\r\n   font-family: Montserrat;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  color: #ffffff;\r\n}\r\n    .policy-spacing[_ngcontent-%COMP%]{\r\n  margin-bottom: 70px;\r\n}\r\n    .remeber-left[_ngcontent-%COMP%]{\r\n  display: inline-block;\r\n  padding-left: 22px;\r\n}\r\n    input[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%] {\r\n  color: #333333;\r\n  font-weight: 600;\r\n}\r\n    .position-total[_ngcontent-%COMP%]{\r\n  position:fixed;\r\n}\r\n    .text_checkbox[_ngcontent-%COMP%]:before, .policy_checkbox[_ngcontent-%COMP%]::before{\r\n  \r\n  border: solid 1px #827a7a87;\r\n  background-color: #ffffff;\r\n  top:2px;\r\n}\r\n    .text_checkbox[_ngcontent-%COMP%]::after, .policy_checkbox[_ngcontent-%COMP%]::after{\r\n  height: 1.4rem;\r\n}\r\n    @media all and (max-width: 991px) {\r\n .main_spacing[_ngcontent-%COMP%] {\r\n    margin-left: 0rem !important;\r\n}\r\n}\r\n    @media all and (max-width: 768px) {\r\n .policy-title[_ngcontent-%COMP%] {\r\n    font-size: 29px !important;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9wcml2YWN5LXBvbGljeS9wcml2YWN5LXBvbGljeS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztRQUVRLHlCQUF5QjtJQUM3QixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLG1CQUFtQjtJQUNuQjtJQUNBO1FBQ0ksdUJBQXVCO1FBQ3ZCLGdCQUFnQjtJQUNwQjtJQUNEO0tBQ0UseUJBQXlCO0tBQ3pCLGtCQUFrQjs7R0FFcEI7SUFDQTtRQUNLLHlCQUF5Qjs7R0FFOUI7SUFDQTtRQUNLLGtCQUFrQjtRQUNsQix5QkFBeUI7R0FDOUI7SUFDQTtJQUNDLDRCQUE0QjtJQUM1QixlQUFlO0lBQ2YsY0FBYztJQUNkLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0dBQ2xCO0lBQ0E7SUFDQyx1QkFBdUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0dBQ2I7SUFDQTtJQUNDLHVCQUF1QjtFQUN6QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixjQUFjO0dBQ2I7SUFDQTtLQUNFLHVCQUF1QjtFQUMxQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxlQUFlO0dBQ2Q7SUFDSDtFQUNFLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxlQUFlO0VBQ2YsbUJBQW1CO0FBQ3JCO0lBQ0E7RUFDRSxrQkFBa0I7QUFDcEI7SUFDQTtFQUNFLGlCQUFpQjtBQUNuQjtJQUNBO0VBQ0UsOEJBQThCO0VBQzlCO3VCQUNxQjtBQUN2QjtJQUNBO0VBQ0UsY0FBYztBQUNoQjtJQUNBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQix5QkFBeUI7SUFDdkIsY0FBYztJQUNkLGlCQUFpQjs7QUFFckI7SUFDQTtJQUNJLHlCQUF5QjtJQUN6QiwrQ0FBK0M7SUFDL0MscUJBQXFCO0FBQ3pCO0lBQ0E7R0FDRyx1QkFBdUI7RUFDeEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCO0lBQ0E7RUFDRSxtQkFBbUI7QUFDckI7SUFDQTtFQUNFLHFCQUFxQjtFQUNyQixrQkFBa0I7QUFDcEI7SUFDQTtFQUNFLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7SUFDQTtFQUNFLGNBQWM7QUFDaEI7SUFDQTtFQUNFLHdCQUF3QjtFQUN4QiwyQkFBMkI7RUFDM0IseUJBQXlCO0VBQ3pCLE9BQU87QUFDVDtJQUNBO0VBQ0UsY0FBYztBQUNoQjtJQUVFO0NBQ0Q7SUFDRyw0QkFBNEI7QUFDaEM7QUFDQTtJQUNBO0NBQ0M7SUFDRywwQkFBMEI7RUFDNUI7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zZXduX2hlYWRpbmdcclxuICAgIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlZmU4O1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgLyogcGFkZGluZy1sZWZ0OiAxMDFweDsgKi9cclxuICAgIHBhZGRpbmctbGVmdDogMTEwcHg7XHJcbiAgICB9XHJcbiAgICAubG9nb19zZXdue1xyXG4gICAgICAgIC8qIHBhZGRpbmctdG9wOiAxNXB4OyAqL1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAgICB9XHJcbiAgIC5maXJzdF9jb2x1bW57XHJcbiAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZWZlODtcclxuICAgICAvKiBoZWlnaHQ6IDkwdmg7ICovXHJcbiAgICAgXHJcbiAgIH1cclxuICAgLmxhc3RfY29sdW1ue1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmM2VmZTg7XHJcblxyXG4gICB9XHJcbiAgIC5taWRkbGVfY29sdW1ue1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICB9XHJcbiAgIC5wb2xpY3ktdGl0bGV7XHJcbiAgICBmb250LWZhbWlseTogUGxheWZhaXJEaXNwbGF5O1xyXG4gICAgZm9udC1zaXplOiAzMnB4O1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBtYXJnaW4tdG9wOiAyOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xyXG4gICB9XHJcbiAgIC5wcml2YWN5LXRleHR7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogI2E4ODA1NztcclxuICAgfVxyXG4gICAuYWdyZWUtdGV4dHtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAxLjQzO1xyXG4gIGNvbG9yOiAjNjY2NjY2O1xyXG4gICB9XHJcbiAgIC50ZXh0X2NoZWNrYm94e1xyXG4gICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiAjNjY2NjY2O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICAgfVxyXG4ucG9saWN5X2NoZWNrYm94e1xyXG4gIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiAjNjY2NjY2O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICAvKiBjb2xvcjogIzMzMzMzMyAqL1xyXG59XHJcbi50b3Atc3BhY2luZ3tcclxuICBtYXJnaW4tdG9wOiAyLjNyZW07XHJcbn1cclxuLm1haW5fc3BhY2luZ3tcclxuICBtYXJnaW4tbGVmdDogNHJlbTtcclxufVxyXG4ubGluZV9zcGFjaW5ne1xyXG4gIGJvcmRlci10b3A6IDFweCBkYXNoZWQgI2YzZWZlODtcclxuICAvKndpZHRoOiAyMTUlO1xyXG4gICAgbWFyZ2luLWxlZnQ6IC03NSU7Ki9cclxufVxyXG4ucG9saWN5X2NvbG9ye1xyXG4gIGNvbG9yOiAjM2Q4NDYyO1xyXG59XHJcbi5uZXh0LWJ1dHRvbntcclxuICBoZWlnaHQ6IDQwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7XHJcbiAgICBtYXJnaW4tdG9wOiAzJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDklO1xyXG5cclxufVxyXG4ubmV4dC1idXR0b246aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyOyBcclxuICAgIGJveC1zaGFkb3c6IDAgMCA3cHggMXB4IHJnYmEoNjcsIDE0NiwgMTA4LCAwLjUpO1xyXG4gICAgLyogYm9yZGVyOiAjM2Q4NDYyOyAqL1xyXG59XHJcbi5uZXh0LXRleHR7XHJcbiAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG59XHJcbi5wb2xpY3ktc3BhY2luZ3tcclxuICBtYXJnaW4tYm90dG9tOiA3MHB4O1xyXG59XHJcbi5yZW1lYmVyLWxlZnR7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIHBhZGRpbmctbGVmdDogMjJweDtcclxufVxyXG5pbnB1dDpjaGVja2VkICsgbGFiZWwge1xyXG4gIGNvbG9yOiAjMzMzMzMzO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuLnBvc2l0aW9uLXRvdGFse1xyXG4gIHBvc2l0aW9uOmZpeGVkO1xyXG59XHJcbi50ZXh0X2NoZWNrYm94OmJlZm9yZSwucG9saWN5X2NoZWNrYm94OjpiZWZvcmV7XHJcbiAgLyogYm9yZGVyLXJhZGl1czogNnB4OyAqL1xyXG4gIGJvcmRlcjogc29saWQgMXB4ICM4MjdhN2E4NztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gIHRvcDoycHg7XHJcbn1cclxuLnRleHRfY2hlY2tib3g6OmFmdGVyLC5wb2xpY3lfY2hlY2tib3g6OmFmdGVye1xyXG4gIGhlaWdodDogMS40cmVtO1xyXG59XHJcblxyXG4gIEBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDk5MXB4KSB7XHJcbiAubWFpbl9zcGFjaW5nIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAwcmVtICFpbXBvcnRhbnQ7XHJcbn1cclxufVxyXG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gLnBvbGljeS10aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDI5cHggIWltcG9ydGFudDtcclxuICB9XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PrivacyPolicyComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-privacy-policy',
                templateUrl: './privacy-policy.component.html',
                styleUrls: ['./privacy-policy.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/auth/setup/license/license.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/auth/setup/license/license.component.ts ***!
  \*********************************************************/
/*! exports provided: LicenseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LicenseComponent", function() { return LicenseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");



function LicenseComponent_div_0_button_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LicenseComponent_div_0_button_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LicenseComponent_div_0_button_22_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LicenseComponent_div_0_button_22_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const i_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r5.delete(i_r1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function LicenseComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "CERTIFICATION NAME*");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "label", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "YEAR OF CERTIFICATION");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "select", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "option", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Please select year");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "option", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "1991");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "option", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "1992");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "1993");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, LicenseComponent_div_0_button_20_Template, 4, 0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, LicenseComponent_div_0_button_21_Template, 4, 0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, LicenseComponent_div_0_button_22_Template, 4, 0, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const i_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r1 == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r1 > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r1 > 0);
} }
class LicenseComponent {
    constructor() {
        this.array = [0];
    }
    ngOnInit() {
    }
    addCert() {
        this.array.push(this.array.length);
    }
    delete(i) {
        this.array.splice(i);
    }
}
LicenseComponent.ɵfac = function LicenseComponent_Factory(t) { return new (t || LicenseComponent)(); };
LicenseComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LicenseComponent, selectors: [["sewn-license"]], decls: 8, vars: 1, consts: [[4, "ngFor", "ngForOf"], [1, "form_content"], [1, "form-group", "row", "pt-2"], [1, "form-group", "col-md-1", "pt-2"], ["type", "button", "id", "add-btn", 1, "btn", "btn-link", "add-btn", 3, "click"], ["src", "assets/images/plus.svg"], [1, "add-text"], [1, "form-group", "row"], [1, "form-group", "col-md-5"], [1, "role-name"], ["type", "text", "id", "", "placeholder", "Enter certification name", "name", "email", "required", "", 1, "form-control", "rectangle_name"], [1, "form-group", "col-md-4", "col-sm-10"], ["id", "role_edit", "name", "role", "required", "", 1, "form-control", "rectangle_name", "cert-year"], ["value", "", "selected", "", "disabled", ""], ["value", "1991"], ["value", "1992"], ["value", "1993"], [1, "form-group", "col-md-1", "col-sm-2", "pt-2", "upload-div"], ["type", "button", "id", "upload-btn", "class", "btn btn-link upload-btn", 4, "ngIf"], ["type", "button", "id", "upload-add-btn", "class", "btn btn-link upload-add-btn", 4, "ngIf"], ["type", "button", "id", "delete-btn", "class", "btn btn-link upload-btn", 3, "click", 4, "ngIf"], ["type", "button", "id", "upload-btn", 1, "btn", "btn-link", "upload-btn"], ["src", "assets/images/upload.svg", 1, "upload-img"], [1, "upload-text"], ["type", "button", "id", "upload-add-btn", 1, "btn", "btn-link", "upload-add-btn"], ["type", "button", "id", "delete-btn", 1, "btn", "btn-link", "upload-btn", 3, "click"], ["src", "assets/images/delete.png", 1, "upload-img"]], template: function LicenseComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, LicenseComponent_div_0_Template, 23, 3, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function LicenseComponent_Template_button_click_4_listener() { return ctx.addCert(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Add Another Certificate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.array);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"]], styles: [".rectangle_name[_ngcontent-%COMP%] {\r\n    height: 50px;\r\n    border-radius: 8px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    color: #666666;\r\n}\r\n.role-name[_ngcontent-%COMP%] {\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    color: #666666;\r\n    font-family: Montserrat;\r\n}\r\n.form_header[_ngcontent-%COMP%]{\r\n    height: 46px;\r\n    font-family: PlayfairDisplay;\r\n    font-size: 34px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    text-align: center;\r\n    color: #000000;\r\n}\r\n.form_para[_ngcontent-%COMP%]{\r\n    height: 20px;\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 1.43;\r\n    letter-spacing: normal;\r\n    text-align: center;\r\n    color: #666666;\r\n}\r\n.form_content[_ngcontent-%COMP%]{\r\n    position: relative;\r\n    left: 8%;\r\n}\r\n.btn-div[_ngcontent-%COMP%]{\r\n    padding-right: 8%;\r\n}\r\n.prev-div[_ngcontent-%COMP%]{\r\n    padding-right: 10%;\r\n}\r\n.text-area[_ngcontent-%COMP%]{\r\n    height: 106px!important;\r\n}\r\n.upload-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #3d8462;\r\n    padding-left: 12%;\r\n}\r\n.upload-btn[_ngcontent-%COMP%]{\r\n    padding: 8% 0%;\r\n    margin-top: 30%;\r\n\r\n    \r\n}\r\n.upload-div[_ngcontent-%COMP%]{\r\npadding: 0%;\r\nposition: relative;\r\nright: 2%;\r\n}\r\n.cert-year[_ngcontent-%COMP%]{\r\n    width: 90%;\r\n}\r\n.add-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #3d8462;\r\n    padding-left: 8%;\r\n}\r\n#role_edit[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n    background: url(/assets/images/active.png) right 16px top 19px/10px no-repeat;\r\n    -webkit-appearance: none;\r\n    font-family: Montserrat;\r\n    font-weight: 500;\r\nheight: 50px !important;\r\npadding-top: 7px;\r\ncursor: pointer;\r\n}\r\n.btn[_ngcontent-%COMP%]{\r\n    text-decoration: none;\r\n}\r\n#delete-btn[_ngcontent-%COMP%]{\r\npadding: 0%;\r\nmargin-top: 5%;\r\n}\r\n.upload-add-btn[_ngcontent-%COMP%]{\r\n    margin-top: 21%;\r\n    padding:0% ;\r\n}\r\n.add-btn[_ngcontent-%COMP%]:hover    > .add-text[_ngcontent-%COMP%], .upload-btn[_ngcontent-%COMP%]:hover    > .upload-text[_ngcontent-%COMP%], .upload-add-btn[_ngcontent-%COMP%]:hover    > .upload-text[_ngcontent-%COMP%] {\r\n    text-decoration: underline;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9zZXR1cC9saWNlbnNlL2xpY2Vuc2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0VBQ0U7SUFDRSxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYztBQUNsQjtBQUNBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSxZQUFZO0lBQ1osNEJBQTRCO0lBQzVCLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQixjQUFjO0FBQ2xCO0FBQ0E7SUFDSSxZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQixjQUFjO0FBQ2xCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtBQUNaO0FBQ0E7SUFDSSxpQkFBaUI7QUFDckI7QUFDQTtJQUNJLGtCQUFrQjtBQUN0QjtBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCO0FBQ0E7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsY0FBYztJQUNkLGlCQUFpQjtBQUNyQjtBQUVBO0lBQ0ksY0FBYztJQUNkLGVBQWU7OztBQUduQjtBQUNBO0FBQ0EsV0FBVztBQUNYLGtCQUFrQjtBQUNsQixTQUFTO0FBQ1Q7QUFDQTtJQUNJLFVBQVU7QUFDZDtBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxnQkFBZ0I7QUFDcEI7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIseUJBQXlCO0lBQ3pCLDZFQUE2RTtJQUM3RSx3QkFBd0I7SUFDeEIsdUJBQXVCO0lBQ3ZCLGdCQUFnQjtBQUNwQix1QkFBdUI7QUFDdkIsZ0JBQWdCO0FBQ2hCLGVBQWU7QUFDZjtBQUNBO0lBQ0kscUJBQXFCO0FBQ3pCO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsY0FBYztBQUNkO0FBQ0E7SUFDSSxlQUFlO0lBQ2YsV0FBVztBQUNmO0FBQ0E7SUFDSSwwQkFBMEI7QUFDOUIiLCJmaWxlIjoic3JjL2FwcC9hdXRoL3NldHVwL2xpY2Vuc2UvbGljZW5zZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgLnJlY3RhbmdsZV9uYW1lIHtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgY29sb3I6ICM2NjY2NjY7XHJcbn1cclxuLnJvbGUtbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICM2NjY2NjY7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxufVxyXG4uZm9ybV9oZWFkZXJ7XHJcbiAgICBoZWlnaHQ6IDQ2cHg7XHJcbiAgICBmb250LWZhbWlseTogUGxheWZhaXJEaXNwbGF5O1xyXG4gICAgZm9udC1zaXplOiAzNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxufVxyXG4uZm9ybV9wYXJhe1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogMS40MztcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxufVxyXG4uZm9ybV9jb250ZW50e1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbGVmdDogOCU7XHJcbn1cclxuLmJ0bi1kaXZ7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA4JTtcclxufVxyXG4ucHJldi1kaXZ7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMCU7XHJcbn1cclxuLnRleHQtYXJlYXtcclxuICAgIGhlaWdodDogMTA2cHghaW1wb3J0YW50O1xyXG59XHJcbi51cGxvYWQtdGV4dHtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICBjb2xvcjogIzNkODQ2MjtcclxuICAgIHBhZGRpbmctbGVmdDogMTIlO1xyXG59XHJcblxyXG4udXBsb2FkLWJ0bntcclxuICAgIHBhZGRpbmc6IDglIDAlO1xyXG4gICAgbWFyZ2luLXRvcDogMzAlO1xyXG5cclxuICAgIFxyXG59XHJcbi51cGxvYWQtZGl2e1xyXG5wYWRkaW5nOiAwJTtcclxucG9zaXRpb246IHJlbGF0aXZlO1xyXG5yaWdodDogMiU7XHJcbn1cclxuLmNlcnQteWVhcntcclxuICAgIHdpZHRoOiA5MCU7XHJcbn1cclxuXHJcbi5hZGQtdGV4dHtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICBjb2xvcjogIzNkODQ2MjtcclxuICAgIHBhZGRpbmctbGVmdDogOCU7XHJcbn1cclxuI3JvbGVfZWRpdHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYmFja2dyb3VuZDogdXJsKC9hc3NldHMvaW1hZ2VzL2FjdGl2ZS5wbmcpIHJpZ2h0IDE2cHggdG9wIDE5cHgvMTBweCBuby1yZXBlYXQ7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbmhlaWdodDogNTBweCAhaW1wb3J0YW50O1xyXG5wYWRkaW5nLXRvcDogN3B4O1xyXG5jdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLmJ0bntcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG4jZGVsZXRlLWJ0bntcclxucGFkZGluZzogMCU7XHJcbm1hcmdpbi10b3A6IDUlO1xyXG59XHJcbi51cGxvYWQtYWRkLWJ0bntcclxuICAgIG1hcmdpbi10b3A6IDIxJTtcclxuICAgIHBhZGRpbmc6MCUgO1xyXG59XHJcbi5hZGQtYnRuOmhvdmVyID4gLmFkZC10ZXh0ICwgLnVwbG9hZC1idG46aG92ZXIgPiAudXBsb2FkLXRleHQgLCAudXBsb2FkLWFkZC1idG46aG92ZXIgPiAudXBsb2FkLXRleHQge1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LicenseComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'sewn-license',
                templateUrl: './license.component.html',
                styleUrls: ['./license.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/auth/setup/setup.component.ts":
/*!***********************************************!*\
  !*** ./src/app/auth/setup/setup.component.ts ***!
  \***********************************************/
/*! exports provided: SetupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetupComponent", function() { return SetupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _license_license_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./license/license.component */ "./src/app/auth/setup/license/license.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




class SetupComponent {
    constructor() { }
    ngOnInit() {
    }
    personalDetails() {
        const firsttab = document.getElementById('first-tab');
        firsttab.classList.remove('current');
        const secondtab = document.getElementById('second-tab');
        secondtab.classList.add('current');
        const activenumber2 = document.getElementById('active2');
        activenumber2.classList.add('Member-tracker-active');
        const bordernumber2 = document.getElementById('border-color2');
        bordernumber2.classList.add('border-color');
    }
    roasteryDetails() {
        const secondtab = document.getElementById('second-tab');
        secondtab.classList.remove('current');
        const thirdtab = document.getElementById('third-tab');
        thirdtab.classList.add('current');
        const activenumber3 = document.getElementById('active3');
        activenumber3.classList.add('Member-tracker-active');
        const bordernumber3 = document.getElementById('border-color3');
        bordernumber3.classList.add('border-color');
    }
    licenseDetails() {
        const thirdtab = document.getElementById('third-tab');
        thirdtab.classList.remove('current');
        const fourthtab = document.getElementById('fourth-tab');
        fourthtab.classList.add('current');
        const activenumber4 = document.getElementById('active4');
        activenumber4.classList.add('Member-tracker-active');
        const bordernumber4 = document.getElementById('border-color4');
        bordernumber4.classList.add('border-color');
    }
    goprevtab(myval) {
        if (myval == 'first-tab') {
            const secondtab = document.getElementById('second-tab');
            secondtab.classList.remove('current');
            const firsttab = document.getElementById('first-tab');
            firsttab.classList.add('current');
        }
        else if (myval == 'second-tab') {
            const thirdtab = document.getElementById('third-tab');
            thirdtab.classList.remove('current');
            const secondtab = document.getElementById('second-tab');
            secondtab.classList.add('current');
        }
        else if (myval == 'third-tab') {
            const fourthtab = document.getElementById('fourth-tab');
            fourthtab.classList.remove('current');
            const thirdtab = document.getElementById('third-tab');
            thirdtab.classList.add('current');
        }
    }
}
SetupComponent.ɵfac = function SetupComponent_Factory(t) { return new (t || SetupComponent)(); };
SetupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SetupComponent, selectors: [["app-setup"]], decls: 266, vars: 0, consts: [[1, "sewn_heading"], ["src", "assets/images/sewn-black-logo.svg", "alt", "image", 1, "logo_sewn"], [1, "container-fluid"], [1, "row"], [1, "col-1", "first_column"], [1, "col-10", "middle_column"], [1, "container"], [1, "col-md-12", "mt-5", "mb-5", "signup-fill-tracker"], [1, "form-nav", "w-100"], [1, "form-nav-list", "p-0", "mx-auto", "d-flex", "justify-content-center"], ["id", "border-color1", 1, "form-nav-list__item", "float-left", "border-color"], [1, "step"], ["id", "active1", 1, "d-inline-block", "step__circle", "Member-tracker-active"], [1, "d-block", "step__info"], ["id", "border-color2", 1, "form-nav-list__item", "float-left"], ["id", "active2", 1, "d-inline-block", "step__circle"], ["id", "border-color3", 1, "form-nav-list__item", "float-left"], ["id", "active3", 1, "d-inline-block", "step__circle"], ["id", "border-color4", 1, "form-nav-list__item", "float-left"], ["id", "active4", 1, "d-inline-block", "step__circle"], [1, "col-md-12", "demo-form", "mb-5"], ["id", "first-tab", 1, "form-section", "current"], [1, "col-lg-12", "col-md-12"], [1, "text-center"], [1, "form_header"], [1, "form_para"], [1, "form_content"], [1, "form-group", "row", "pt-2", "profile-div"], [1, "form-group", "col-md-10", "m-4"], ["src", "assets/images/profile.svg", "alt", "profile", 1, "profile-pic"], ["src", "assets/images/add_pic.svg", "alt", "add_pic", 1, "add-pic"], [1, "pic-head-text"], [1, "btn", "btn-link", "add-btn"], ["src", "assets/images/upload.svg"], [1, "add-text"], [1, "form-group", "row", "pt-2"], [1, "form-group", "col-md-5"], [1, "role-name"], ["type", "text", "id", "", "placeholder", "Enter your Full Name", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["type", "email", "id", "", "placeholder", "you@example.com", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["type", "number", "id", "", "placeholder", "Enter your phone number", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["type", "password", "id", "", "placeholder", "Please enter your password", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["id", "role_edit", "name", "role", "required", "", 1, "form-control", "rectangle_name"], ["value", "Admin"], ["value", "Sales & marketing"], ["value", "Accountant"], ["value", "Finance"], [1, "form-group", "row", "w-100", "pt-2", "btn-div"], [1, "float-right", "ml-auto"], ["type", "button", 1, "btn", "btn-info", "login-butn", 3, "click"], ["id", "second-tab", 1, "form-section"], ["src", "assets/images/roaster_logo.svg", "alt", "profile"], ["type", "text", "id", "", "placeholder", "Please enter the Roastery name", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["type", "email", "id", "", "placeholder", "rostery@email.com", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["type", "number", "id", "", "placeholder", "Enter phone number", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["id", "role_edit", "name", "country", "required", "", 1, "form-control", "rectangle_name"], ["value", "India"], ["value", "England"], ["value", "New York"], ["id", "role_edit", "name", "state", "required", "", 1, "form-control", "rectangle_name"], ["value", "Delhi"], ["value", "Bangalore"], ["value", "Kerala"], ["type", "text", "id", "", "placeholder", "Line 1", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["type", "text", "id", "", "placeholder", "Line 2", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["type", "text", "id", "", "placeholder", "City", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["type", "number", "id", "", "placeholder", "eg: 22134", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["id", "role_edit", "name", "year", "required", "", 1, "form-control", "rectangle_name"], ["value", "1990"], ["value", "1991"], ["value", "1992"], ["type", "text", "id", "", "placeholder", "www.roaster.com", "name", "email", "required", "", 1, "form-control", "rectangle_name"], [1, "form-group", "col-md-10"], ["id", "", "rows", "4", "placeholder", "Please enter a short description", "name", "email", "required", "", 1, "form-control", "rectangle_name", "text-area"], ["type", "text", "id", "", "placeholder", "Add facebook URL", "name", "email", "required", "", 1, "form-control", "rectangle_name"], ["type", "text", "id", "", "placeholder", "Add instagram URL", "name", "email", "required", "", 1, "form-control", "rectangle_name"], [1, "form-group", "row", "pt-2", "prev-div"], ["type", "button", 1, "previous", "btn", "btn-info", "pull-left", 3, "click"], [1, "form-group", "row", "pt-4"], [1, "form-group", "col-md-3"], [1, "word-break", "footer-text"], [1, "form-group", "col-md-3", "admin-div"], [1, "footer-text"], [1, "sub-text"], [1, "form-group", "col-md-2"], [1, "form-group", "col-md-4", "bill-div"], ["id", "third-tab", 1, "form-section"], [1, "text-center", "pb-5"], ["id", "fourth-tab", 1, "form-section"], [1, "text-center", "mail-box"], ["src", "assets/images/mail.svg", "alt", "mail"], [1, "form_para", "success-mail"], ["id", "done-btn", "routerLink", "../privacy-policy", 1, "btn", "done-btn"], [1, "done-text"], [1, "col-1", "last_column"]], template: function SetupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "ul", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Personal Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "li", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Roaster Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "li", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "License & certificate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "li", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "span", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "Confirmation");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "form", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "h4", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Personal Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "p", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, " Fill in your details to get started! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "img", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "img", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "p", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Upload your Picture");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "p", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, " You can upload a JPG or PNG file. Max file size limit 2MB ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "button", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "img", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "span", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Upload Logo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "NAME*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "input", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "EMAIL ADDRESS*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "input", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "PHONE NUMBER");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](72, "input", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "PASSWORD*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](77, "input", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "ASSIGN YOURSELF A ROLE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "select", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "option", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83, "Admin");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "option", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, "Sales & marketing");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "option", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, "Accountant");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "option", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "Finance");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "button", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SetupComponent_Template_button_click_92_listener() { return ctx.personalDetails(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, " NEXT ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "div", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "h4", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, "Rostery Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "p", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, " Fill in your details to get started! ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "div", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](106, "img", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](107, "img", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "p", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109, "Roastery Logo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "p", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, " You can upload a JPG or PNG file. Max file size limit 2MB ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "button", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](113, "img", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "span", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, "Upload Logo");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](119, "NAME*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](120, "input", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124, "EMAIL ADDRESS*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](125, "input", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](128, "PHONE NUMBER");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](129, "input", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](133, "COUNTRY*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "select", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "option", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](136, "India");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](137, "option", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](138, "England");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "option", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](140, "New York");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](143, "STATE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "select", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "option", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](146, "Delhi");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](147, "option", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](148, "Bangalore");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](149, "option", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](150, "Kerala");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](152, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](153, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](154, "ADDRESS*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](155, "input", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](157, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](158, "ADDRESS*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](159, "input", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](160, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](161, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](162, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](163, "CITY*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](164, "input", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](165, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](167, "ZIPCODE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](168, "input", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](169, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](170, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](171, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](172, "YEAR FOUNDED IN*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](173, "select", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "option", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](175, "1990");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "option", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](177, "1991");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "option", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](179, "1992");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](181, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](182, "ROASTERY WEBSITE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](183, "input", 71);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](184, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](185, "div", 72);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](186, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](187, "A SHORT DESCRIPTION ABOUT THE ROASTERY*");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](188, "textarea", 73);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](189, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](190, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](191, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](192, "FACEBOOK LINK(ADD URL)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](193, "input", 74);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](194, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "label", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](196, "INSTAGRAM(ADD URL)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](197, "input", 75);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](198, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](199, "div", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](200, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](201, "button", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SetupComponent_Template_button_click_201_listener() { return ctx.roasteryDetails(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](202, " NEXT ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](203, "button", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SetupComponent_Template_button_click_203_listener() { return ctx.goprevtab("first-tab"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](204, " PREV ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](205, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](206, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "div", 78);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](208, "div", 79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](209, "p", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](210, " Having trouble? Please contact the following. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "div", 81);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](212, "p", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](213, "Admin");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](214, "p", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](215, "Lucinda Parker");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](216, "p", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](217, "lucy.P@Sewn.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](218, "p", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](219, "527-163-7463");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](220, "div", 84);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](221, "p", 80);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](222, "Billing");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](223, "p", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](224, "Ray Copeland");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](225, "p", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](226, "ray@Sewn.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](227, "p", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](228, "146-311-6973");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](229, "div", 85);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](230, "p", 82);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](231, "Tech Help");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](232, "p", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](233, "ada.or@Sewn.com");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](234, "p", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](235, "720-033-2862");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](236, "p", 83);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](237, "Ada Ortega");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](238, "div", 86);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](239, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](240, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](241, "div", 87);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](242, "h4", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](243, "License & Certificates");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](244, "p", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](245, " Please uplaod your certificates, if any. This helps in your profile getting more noticed. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](246, "sewn-license");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](247, "div", 76);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](248, "div", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](249, "button", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SetupComponent_Template_button_click_249_listener() { return ctx.licenseDetails(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](250, " NEXT ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](251, "button", 77);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SetupComponent_Template_button_click_251_listener() { return ctx.goprevtab("second-tab"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](252, " PREV ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](253, "div", 88);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](254, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](255, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](256, "div", 89);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](257, "img", 90);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](258, "h4", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](259, "Successful!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](260, "p", 91);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](261, " An invitation email has been successfully sent out to david@roaster.com ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](262, "button", 92);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](263, "span", 93);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](264, "DONE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](265, "div", 94);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_license_license_component__WEBPACK_IMPORTED_MODULE_1__["LicenseComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLink"]], styles: [".sewn_heading[_ngcontent-%COMP%]\r\n{\r\n    background-color: #f3efe8;\r\n    padding: 2rem 7rem;\r\n}\r\n\r\n.first_column[_ngcontent-%COMP%]{\r\n background-color: #f3efe8;\r\n}\r\n\r\n.last_column[_ngcontent-%COMP%]{\r\n    background-color: #f3efe8;\r\n\r\n}\r\n\r\n.middle_column[_ngcontent-%COMP%]{\r\n    border-radius: 6px;\r\n    background-color: #ffffff;\r\n}\r\n\r\n.line_spacing[_ngcontent-%COMP%]{\r\nborder-top: 1px dashed #f3efe8;\r\n}\r\n\r\n.next-button[_ngcontent-%COMP%]{\r\nheight: 46px;\r\nborder-radius: 6px;\r\nbackground-color: #3d8462;\r\nmargin-top: 4%;\r\n\r\n}\r\n\r\n.next-text[_ngcontent-%COMP%]{\r\nfont-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 600;\r\ncolor: #ffffff;\r\n}\r\n\r\n.custom-control-label[_ngcontent-%COMP%]:before{\r\nborder-radius: 6px;\r\nborder: solid 1px #827a7a87;\r\nbackground-color: #ffffff;\r\n}\r\n\r\n\r\n\r\n.form-section[_ngcontent-%COMP%] {\r\n \r\n    display: none;\r\n  }\r\n\r\n.form-section.current[_ngcontent-%COMP%] {\r\n    display: inherit;\r\n  }\r\n\r\n.btn-info[_ngcontent-%COMP%], .btn-default[_ngcontent-%COMP%] {\r\n    margin-top: 10px;\r\n  }\r\n\r\nhtml.codepen[_ngcontent-%COMP%]   body[_ngcontent-%COMP%] {\r\n    margin: 1em;\r\n  }\r\n\r\n.form-nav-list[_ngcontent-%COMP%]{\r\n  list-style-type: none;\r\n  }\r\n\r\n.form-nav-list__item[_ngcontent-%COMP%]{\r\n    min-width: 30%;\r\n    max-width: 30%;\r\n    position: relative;\r\n    \r\n  }\r\n\r\n.form-nav-list__item[_ngcontent-%COMP%]:last-child {\r\n    min-width: 0 !important;\r\n  }\r\n\r\n.form-nav-list__item[_ngcontent-%COMP%]::after {\r\n    position: absolute;\r\n    content: \"\";\r\n    top: 17%;\r\n    right: 2.5%;\r\n    transform: translateY(-50%);\r\n    width: 70%;\r\n    height: 1px;\r\n    background-color: gray;\r\n    z-index: 9;\r\n  }\r\n\r\n.form-nav-list__item.succeed[_ngcontent-%COMP%]::after{  background-color:#c29d7a;}\r\n\r\n.form-nav-list__item.succeed[_ngcontent-%COMP%]   .step__circle[_ngcontent-%COMP%]:after {\r\n    border-color: #fff;\r\n    border-width: 0px 3px 3px 0;\r\n    width: 7px;\r\n    left: 11px;\r\n    opacity: 1;\r\n}\r\n\r\n.form-nav-list__item[_ngcontent-%COMP%]   .step__circle[_ngcontent-%COMP%]:after{\r\n\r\n    display: block;\r\n    position: absolute;\r\n    content: '';\r\n    height: 14px;\r\n    width: 7px;\r\n    top: -2px;\r\n    bottom: 0;\r\n    left: 5px;\r\n    margin: auto 0;\r\n    border: 0px solid #AFAFAF;\r\n    border-width: 0px 2px 2px 0;\r\n    transform: rotate(45deg);\r\n    border-color: #fff;\r\n    border-width: 0px 3px 3px 0;\r\n    width: 7px;\r\n    left: 11px;\r\n    opacity: 0;\r\n}\r\n\r\n.form-nav-list__item[_ngcontent-%COMP%]:last-child::after {\r\n    content: none;\r\n    display: none;\r\n  }\r\n\r\n\r\n\r\n.form-nav-list__item.succeed[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%]   .step__circle[_ngcontent-%COMP%] {\r\n    background-color: #c29d7a;\r\n    text-indent: -200000px;\r\n  }\r\n\r\n\r\n\r\n\r\n\r\n.form-nav-list__item.active[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%]   .step__info[_ngcontent-%COMP%] {\r\n  color: black;\r\n  opacity: 1;\r\n  }\r\n\r\n.form-nav-list__item[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%]  {\r\n    width: 40%;\r\n    text-align: center;\r\n  }\r\n\r\n.form-nav-list__item[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%]   .step__circle[_ngcontent-%COMP%] {\r\n    width: 25px;\r\n    color: #a88057;\r\n    height: 25px;\r\n    border-radius: 50%;\r\n    background-color: #fff;\r\n    border: #a88057;\r\n    position: relative;\r\n  }\r\n\r\n.form-nav-list__item[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%]   .step__info[_ngcontent-%COMP%] {\r\n    color: gray;\r\n    opacity: .7;\r\n    font-size: 12px;\r\n  }\r\n\r\n.Successful[_ngcontent-%COMP%]{\r\n    border:1px solid gray;\r\n    padding: 3rem;\r\n  }\r\n\r\n\r\n\r\n.rectangle_name[_ngcontent-%COMP%] {\r\n    height: 50px;\r\n    border-radius: 8px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    color: #666666;\r\n}\r\n\r\n.role-name[_ngcontent-%COMP%] {\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    color: #666666;\r\n    font-family: Montserrat;\r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%] {\r\n    border-radius: 8px;\r\n    background-color: #3d8462;\r\n    padding: 10px 20px;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    color: #ffffff;  \r\n    border: #3d8462;\r\n}\r\n\r\n.login-butn[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n      border: #3d8462;\r\n      box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n \r\n }\r\n\r\n.login-butn[_ngcontent-%COMP%]:focus {\r\n     outline:0;\r\n     background-color: #3d8462 !important;\r\n }\r\n\r\n.done-btn[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n    box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n }\r\n\r\n#role_edit[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n    background: url('active.png') right 16px top 19px/10px no-repeat;\r\n    -webkit-appearance: none;\r\n    font-family: Montserrat;\r\n    font-weight: 500;\r\nheight: 50px !important;\r\npadding-top: 7px;\r\ncursor: pointer;\r\n}\r\n\r\n.form_header[_ngcontent-%COMP%]{\r\n    height: 46px;\r\n    font-family: PlayfairDisplay;\r\n    font-size: 34px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    text-align: center;\r\n    color: #000000;\r\n}\r\n\r\n.form_para[_ngcontent-%COMP%]{\r\n    height: 20px;\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 1.43;\r\n    letter-spacing: normal;\r\n    text-align: center;\r\n    color: #666666;\r\n}\r\n\r\ninput[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button, input[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button {\r\n  -webkit-appearance: none;\r\n  margin: 0;\r\n}\r\n\r\n.previous[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n    background-color: #ffffff;\r\n    padding: 10px 20px;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    color: #3d8462;  \r\n    border: #ffffff;\r\n}\r\n\r\n.success-mail[_ngcontent-%COMP%]{\r\n    margin: 0 30%;\r\n}\r\n\r\n.mail-box[_ngcontent-%COMP%]{\r\n    margin-top:8% ;\r\n    margin-bottom:15%;\r\n}\r\n\r\n.done-btn[_ngcontent-%COMP%]{\r\n    height: 50px;\r\n    border-radius: 6px;\r\n    background-color: #3d8462;\r\n    padding: 0% 10%;\r\n    margin-top: 8% ;\r\n}\r\n\r\n.done-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    text-align: center;\r\n    color: #ffffff;\r\n}\r\n\r\n.form_content[_ngcontent-%COMP%]{\r\n    position: relative;\r\n    left: 8%;\r\n}\r\n\r\n.btn-div[_ngcontent-%COMP%]{\r\n    padding-right: 8%;\r\n}\r\n\r\n.prev-div[_ngcontent-%COMP%]{\r\n    padding-right: 10%;\r\n}\r\n\r\n.text-area[_ngcontent-%COMP%]{\r\n    height: 106px!important;\r\n}\r\n\r\n.upload-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #3d8462;\r\n    padding-left: 12%;\r\n}\r\n\r\n.upload-btn[_ngcontent-%COMP%]:hover{\r\n    text-decoration: none;\r\n}\r\n\r\n.upload-btn[_ngcontent-%COMP%]{\r\n    padding: 8% 0%;\r\n}\r\n\r\n.upload-div[_ngcontent-%COMP%]{\r\npadding: 0%;\r\nposition: relative;\r\nright: 2%;\r\n}\r\n\r\n.cert-year[_ngcontent-%COMP%]{\r\n    width: 90%;\r\n}\r\n\r\n.add-btn[_ngcontent-%COMP%]:hover{\r\n    text-decoration: none;\r\n}\r\n\r\n.add-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #3d8462;\r\n    padding-left: 8%;\r\n}\r\n\r\n.pic-head-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n    font-size: 16px;\r\n    font-weight: bold;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    text-align: center;\r\n    color: #000000;\r\n    padding-top: 2rem;\r\n}\r\n\r\n.profile-div[_ngcontent-%COMP%]{\r\n    border-radius: 6px;\r\n    border: solid 1px #bbbbbb;\r\n    border-style: dashed;\r\n    width: 84%;\r\n    padding-left: 8%;\r\n}\r\n\r\n.add-pic[_ngcontent-%COMP%]{\r\n    position: absolute;\r\n    top: 34%;\r\n    left: 48%;\r\n    cursor: pointer;\r\n}\r\n\r\n\r\n\r\n.footer-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #000000;\r\n}\r\n\r\n.sub-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n    font-size: 12px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 1.67;\r\n    letter-spacing: normal;\r\n    color: #000000;\r\n    margin-bottom: 0%;\r\n}\r\n\r\n.admin-div[_ngcontent-%COMP%]{\r\n    padding: 0% 6%;\r\n}\r\n\r\n.bill-div[_ngcontent-%COMP%]{\r\n    padding-left: 4%;\r\n}\r\n\r\nhr[_ngcontent-%COMP%]{\r\n    border-style: dashed !important;\r\n    margin-top: 2rem;\r\n    border: 0;\r\n    border-top: 1px solid #f2efeb;\r\n}\r\n\r\n.previous[_ngcontent-%COMP%]:hover, .upload-text[_ngcontent-%COMP%]:hover, .add-text[_ngcontent-%COMP%]:hover{\r\n    text-decoration: underline;\r\n}\r\n\r\n\r\n\r\n.Member-tracker-active[_ngcontent-%COMP%], .border-color[_ngcontent-%COMP%]::after{\r\n    background-color: #c29d7a !important;\r\n  }\r\n\r\n\r\n\r\n@media screen and (max-width:768px){\r\n    .add-pic[_ngcontent-%COMP%]{\r\n        top: 31%;\r\n        left:47%;\r\n    }\r\n    .profile-pic[_ngcontent-%COMP%]{\r\n        padding-left: 1%;\r\n    }\r\n    .add-btn[_ngcontent-%COMP%]{\r\n        margin-top:5%;\r\n    }\r\n    .success-mail[_ngcontent-%COMP%]{\r\n        margin: 0% 20%;\r\n    }\r\n    .sewn_heading[_ngcontent-%COMP%]{\r\n        padding: 2rem 4rem;\r\n    }\r\n\r\n  }\r\n\r\n@media screen and (min-width:1024px) and (max-width:1200px){\r\n    .add-pic[_ngcontent-%COMP%]{\r\n        left:48%;\r\n    }\r\n    .profile-pic[_ngcontent-%COMP%]{\r\n        padding-left: 1%;\r\n    }\r\n    .success-mail[_ngcontent-%COMP%]{\r\n        margin: 0% 25%;\r\n    }\r\n    .sewn_heading[_ngcontent-%COMP%]{\r\n        padding: 2rem 5rem;\r\n    }\r\n   \r\n  }\r\n\r\n@media screen and (max-width:425px){\r\n      .profile-div[_ngcontent-%COMP%]{\r\n          padding-left: 0%;\r\n          width: 90%;\r\n      }\r\n      .add-pic[_ngcontent-%COMP%]{\r\n        left: 43%;\r\n        top: 32%;\r\n    }\r\n    .add-btn[_ngcontent-%COMP%]{\r\n        margin-top: 15%;\r\n    }\r\n    .form-control[_ngcontent-%COMP%]{\r\n        width: 88%;\r\n    }\r\n    .form-group[_ngcontent-%COMP%]{\r\n        padding-left: 0%;\r\n    }\r\n    .done-btn[_ngcontent-%COMP%]{\r\n        margin-top: 20%;\r\n    }\r\n    .form_para[_ngcontent-%COMP%]{\r\n        margin: 0%;\r\n    }\r\n    .profile-pic[_ngcontent-%COMP%]{\r\n        padding-left: 2%;\r\n    }\r\n    .sewn_heading[_ngcontent-%COMP%]{\r\n        padding: 2rem 2rem;\r\n    }\r\n    #upload-btn[_ngcontent-%COMP%]{\r\n        padding: 0%;\r\n    }\r\n    #add-btn[_ngcontent-%COMP%]{\r\n        margin-top: 0%;\r\n        padding: 0%;\r\n    }\r\n\r\n }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9zZXR1cC9zZXR1cC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztJQUVJLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBRUE7Q0FDQyx5QkFBeUI7QUFDMUI7O0FBQ0E7SUFDSSx5QkFBeUI7O0FBRTdCOztBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLHlCQUF5QjtBQUM3Qjs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5Qjs7QUFFQTtBQUNBLFlBQVk7QUFDWixrQkFBa0I7QUFDbEIseUJBQXlCO0FBQ3pCLGNBQWM7O0FBRWQ7O0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQixjQUFjO0FBQ2Q7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEIsMkJBQTJCO0FBQzNCLHlCQUF5QjtBQUN6Qjs7QUFFQSxnQ0FBZ0M7O0FBRWhDOztJQUVJLGFBQWE7RUFDZjs7QUFDQTtJQUNFLGdCQUFnQjtFQUNsQjs7QUFDQTtJQUNFLGdCQUFnQjtFQUNsQjs7QUFDQTtJQUNFLFdBQVc7RUFDYjs7QUFFQTtFQUNBLHFCQUFxQjtFQUNyQjs7QUFHQTtJQUNFLGNBQWM7SUFDZCxjQUFjO0lBQ2Qsa0JBQWtCOztFQUVwQjs7QUFFQTtJQUNFLHVCQUF1QjtFQUN6Qjs7QUFFQTtJQUNFLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsUUFBUTtJQUNSLFdBQVc7SUFDWCwyQkFBMkI7SUFDM0IsVUFBVTtJQUNWLFdBQVc7SUFDWCxzQkFBc0I7SUFDdEIsVUFBVTtFQUNaOztBQUNBLHNDQUFzQyx3QkFBd0IsQ0FBQzs7QUFDL0Q7SUFDRSxrQkFBa0I7SUFDbEIsMkJBQTJCO0lBQzNCLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtBQUNkOztBQUVBOztJQUVJLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7SUFDWixVQUFVO0lBQ1YsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsY0FBYztJQUNkLHlCQUF5QjtJQUN6QiwyQkFBMkI7SUFDM0Isd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQiwyQkFBMkI7SUFDM0IsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0FBQ2Q7O0FBR0U7SUFDRSxhQUFhO0lBQ2IsYUFBYTtFQUNmOztBQUNBLHlCQUF5Qjs7QUFDekI7SUFDRSx5QkFBeUI7SUFDekIsc0JBQXNCO0VBQ3hCOztBQUVBLHlCQUF5Qjs7QUFHekIsMEJBQTBCOztBQUMxQjtFQUNBLFlBQVk7RUFDWixVQUFVO0VBQ1Y7O0FBRUE7SUFDRSxVQUFVO0lBQ1Ysa0JBQWtCO0VBQ3BCOztBQUVBO0lBQ0UsV0FBVztJQUNYLGNBQWM7SUFDZCxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHNCQUFzQjtJQUN0QixlQUFlO0lBQ2Ysa0JBQWtCO0VBQ3BCOztBQUdBO0lBQ0UsV0FBVztJQUNYLFdBQVc7SUFDWCxlQUFlO0VBQ2pCOztBQUVBO0lBQ0UscUJBQXFCO0lBQ3JCLGFBQWE7RUFDZjs7QUFHQSxrQkFBa0I7O0FBRWxCO0lBQ0UsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIseUJBQXlCO0lBQ3pCLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7QUFDbEI7O0FBQ0E7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCx1QkFBdUI7QUFDM0I7O0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxlQUFlO0FBQ25COztBQUNBO0lBQ0kseUJBQXlCO01BQ3ZCLGVBQWU7TUFDZiwrQ0FBK0M7O0NBRXBEOztBQUNBO0tBQ0ksU0FBUztLQUNULG9DQUFvQztDQUN4Qzs7QUFDQTtJQUNHLHlCQUF5QjtJQUN6QiwrQ0FBK0M7Q0FDbEQ7O0FBQ0Q7SUFDSSxrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6QixnRUFBcUY7SUFDckYsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixnQkFBZ0I7QUFDcEIsdUJBQXVCO0FBQ3ZCLGdCQUFnQjtBQUNoQixlQUFlO0FBQ2Y7O0FBQ0E7SUFDSSxZQUFZO0lBQ1osNEJBQTRCO0lBQzVCLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQixjQUFjO0FBQ2xCOztBQUNBO0lBQ0ksWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsY0FBYztBQUNsQjs7QUFDQTs7RUFFRSx3QkFBd0I7RUFDeEIsU0FBUztBQUNYOztBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsZUFBZTtBQUNuQjs7QUFDQTtJQUNJLGFBQWE7QUFDakI7O0FBQ0E7SUFDSSxjQUFjO0lBQ2QsaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksWUFBWTtJQUNaLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsZUFBZTtJQUNmLGVBQWU7QUFDbkI7O0FBQ0E7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLGNBQWM7QUFDbEI7O0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtBQUNaOztBQUNBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUNBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7O0FBQ0E7SUFDSSxjQUFjO0FBQ2xCOztBQUNBO0FBQ0EsV0FBVztBQUNYLGtCQUFrQjtBQUNsQixTQUFTO0FBQ1Q7O0FBQ0E7SUFDSSxVQUFVO0FBQ2Q7O0FBQ0E7SUFDSSxxQkFBcUI7QUFDekI7O0FBQ0E7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsY0FBYztJQUNkLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixrQkFBa0I7SUFDbEIsY0FBYztJQUNkLGlCQUFpQjtBQUNyQjs7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsb0JBQW9CO0lBQ3BCLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEI7O0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCxlQUFlO0FBQ25COztBQUVBLDJCQUEyQjs7QUFFM0I7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIsY0FBYztBQUNsQjs7QUFDQTtJQUNJLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLHNCQUFzQjtJQUN0QixjQUFjO0lBQ2QsaUJBQWlCO0FBQ3JCOztBQUNBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLCtCQUErQjtJQUMvQixnQkFBZ0I7SUFDaEIsU0FBUztJQUNULDZCQUE2QjtBQUNqQzs7QUFHQTtJQUNJLDBCQUEwQjtBQUM5Qjs7QUFLQSxzQkFBc0I7O0FBQ3RCO0lBQ0ksb0NBQW9DO0VBQ3RDOztBQUlBLG1DQUFtQzs7QUFFbkM7SUFDRTtRQUNJLFFBQVE7UUFDUixRQUFRO0lBQ1o7SUFDQTtRQUNJLGdCQUFnQjtJQUNwQjtJQUNBO1FBQ0ksYUFBYTtJQUNqQjtJQUNBO1FBQ0ksY0FBYztJQUNsQjtJQUNBO1FBQ0ksa0JBQWtCO0lBQ3RCOztFQUVGOztBQUNBO0lBQ0U7UUFDSSxRQUFRO0lBQ1o7SUFDQTtRQUNJLGdCQUFnQjtJQUNwQjtJQUNBO1FBQ0ksY0FBYztJQUNsQjtJQUNBO1FBQ0ksa0JBQWtCO0lBQ3RCOztFQUVGOztBQUNBO01BQ0k7VUFDSSxnQkFBZ0I7VUFDaEIsVUFBVTtNQUNkO01BQ0E7UUFDRSxTQUFTO1FBQ1QsUUFBUTtJQUNaO0lBQ0E7UUFDSSxlQUFlO0lBQ25CO0lBQ0E7UUFDSSxVQUFVO0lBQ2Q7SUFDQTtRQUNJLGdCQUFnQjtJQUNwQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksVUFBVTtJQUNkO0lBQ0E7UUFDSSxnQkFBZ0I7SUFDcEI7SUFDQTtRQUNJLGtCQUFrQjtJQUN0QjtJQUNBO1FBQ0ksV0FBVztJQUNmO0lBQ0E7UUFDSSxjQUFjO1FBQ2QsV0FBVztJQUNmOztDQUVIIiwiZmlsZSI6InNyYy9hcHAvYXV0aC9zZXR1cC9zZXR1cC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNld25faGVhZGluZ1xyXG57XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlZmU4O1xyXG4gICAgcGFkZGluZzogMnJlbSA3cmVtO1xyXG59XHJcblxyXG4uZmlyc3RfY29sdW1ue1xyXG4gYmFja2dyb3VuZC1jb2xvcjogI2YzZWZlODtcclxufVxyXG4ubGFzdF9jb2x1bW57XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlZmU4O1xyXG5cclxufVxyXG4ubWlkZGxlX2NvbHVtbntcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcbi5saW5lX3NwYWNpbmd7XHJcbmJvcmRlci10b3A6IDFweCBkYXNoZWQgI2YzZWZlODtcclxufVxyXG5cclxuLm5leHQtYnV0dG9ue1xyXG5oZWlnaHQ6IDQ2cHg7XHJcbmJvcmRlci1yYWRpdXM6IDZweDtcclxuYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjtcclxubWFyZ2luLXRvcDogNCU7XHJcblxyXG59XHJcbi5uZXh0LXRleHR7XHJcbmZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG5mb250LXNpemU6IDE0cHg7XHJcbmZvbnQtd2VpZ2h0OiA2MDA7XHJcbmNvbG9yOiAjZmZmZmZmO1xyXG59XHJcblxyXG4uY3VzdG9tLWNvbnRyb2wtbGFiZWw6YmVmb3Jle1xyXG5ib3JkZXItcmFkaXVzOiA2cHg7XHJcbmJvcmRlcjogc29saWQgMXB4ICM4MjdhN2E4NztcclxuYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLyogPT09PVNURVAgRk9STSBTRUNUSU9OID09PT09ICovXHJcblxyXG4uZm9ybS1zZWN0aW9uIHtcclxuIFxyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgLmZvcm0tc2VjdGlvbi5jdXJyZW50IHtcclxuICAgIGRpc3BsYXk6IGluaGVyaXQ7XHJcbiAgfVxyXG4gIC5idG4taW5mbywgLmJ0bi1kZWZhdWx0IHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgfVxyXG4gIGh0bWwuY29kZXBlbiBib2R5IHtcclxuICAgIG1hcmdpbjogMWVtO1xyXG4gIH1cclxuICBcclxuICAuZm9ybS1uYXYtbGlzdHtcclxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIC5mb3JtLW5hdi1saXN0X19pdGVte1xyXG4gICAgbWluLXdpZHRoOiAzMCU7XHJcbiAgICBtYXgtd2lkdGg6IDMwJTtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIFxyXG4gIH0gXHJcbiAgXHJcbiAgLmZvcm0tbmF2LWxpc3RfX2l0ZW06bGFzdC1jaGlsZCB7XHJcbiAgICBtaW4td2lkdGg6IDAgIWltcG9ydGFudDtcclxuICB9XHJcbiAgXHJcbiAgLmZvcm0tbmF2LWxpc3RfX2l0ZW06OmFmdGVyIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICB0b3A6IDE3JTtcclxuICAgIHJpZ2h0OiAyLjUlO1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xyXG4gICAgd2lkdGg6IDcwJTtcclxuICAgIGhlaWdodDogMXB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcclxuICAgIHotaW5kZXg6IDk7XHJcbiAgfVxyXG4gIC5mb3JtLW5hdi1saXN0X19pdGVtLnN1Y2NlZWQ6OmFmdGVyeyAgYmFja2dyb3VuZC1jb2xvcjojYzI5ZDdhO31cclxuICAuZm9ybS1uYXYtbGlzdF9faXRlbS5zdWNjZWVkIC5zdGVwX19jaXJjbGU6YWZ0ZXIge1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAwcHggM3B4IDNweCAwO1xyXG4gICAgd2lkdGg6IDdweDtcclxuICAgIGxlZnQ6IDExcHg7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG59XHJcblxyXG4uZm9ybS1uYXYtbGlzdF9faXRlbSAuc3RlcF9fY2lyY2xlOmFmdGVye1xyXG5cclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgY29udGVudDogJyc7XHJcbiAgICBoZWlnaHQ6IDE0cHg7XHJcbiAgICB3aWR0aDogN3B4O1xyXG4gICAgdG9wOiAtMnB4O1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgbGVmdDogNXB4O1xyXG4gICAgbWFyZ2luOiBhdXRvIDA7XHJcbiAgICBib3JkZXI6IDBweCBzb2xpZCAjQUZBRkFGO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAwcHggMnB4IDJweCAwO1xyXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAwcHggM3B4IDNweCAwO1xyXG4gICAgd2lkdGg6IDdweDtcclxuICAgIGxlZnQ6IDExcHg7XHJcbiAgICBvcGFjaXR5OiAwO1xyXG59XHJcblxyXG5cclxuICAuZm9ybS1uYXYtbGlzdF9faXRlbTpsYXN0LWNoaWxkOjphZnRlciB7XHJcbiAgICBjb250ZW50OiBub25lO1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbiAgLypzdWNjZXNlZCBjaXJjbGUgY29sb3IgKi9cclxuICAuZm9ybS1uYXYtbGlzdF9faXRlbS5zdWNjZWVkIC5zdGVwIC5zdGVwX19jaXJjbGUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MyOWQ3YTtcclxuICAgIHRleHQtaW5kZW50OiAtMjAwMDAwcHg7XHJcbiAgfVxyXG4gIFxyXG4gIC8qc3VjY2VzZWQgY2lyY2xlIGNvbG9yICovXHJcbiBcclxuICBcclxuICAvKkN1cmVlbnQgbmF2IHRleHQgY29sb3IgKi9cclxuICAuZm9ybS1uYXYtbGlzdF9faXRlbS5hY3RpdmUgLnN0ZXAgLnN0ZXBfX2luZm8ge1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBvcGFjaXR5OiAxO1xyXG4gIH1cclxuIFxyXG4gIC5mb3JtLW5hdi1saXN0X19pdGVtIC5zdGVwICB7XHJcbiAgICB3aWR0aDogNDAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuICBcclxuICAuZm9ybS1uYXYtbGlzdF9faXRlbSAuc3RlcCAuc3RlcF9fY2lyY2xlIHtcclxuICAgIHdpZHRoOiAyNXB4O1xyXG4gICAgY29sb3I6ICNhODgwNTc7XHJcbiAgICBoZWlnaHQ6IDI1cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYm9yZGVyOiAjYTg4MDU3O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIH1cclxuICBcclxuICBcclxuICAuZm9ybS1uYXYtbGlzdF9faXRlbSAuc3RlcCAuc3RlcF9faW5mbyB7XHJcbiAgICBjb2xvcjogZ3JheTtcclxuICAgIG9wYWNpdHk6IC43O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gIH1cclxuICBcclxuICAuU3VjY2Vzc2Z1bHtcclxuICAgIGJvcmRlcjoxcHggc29saWQgZ3JheTtcclxuICAgIHBhZGRpbmc6IDNyZW07XHJcbiAgfVxyXG4gIFxyXG5cclxuICAvKiAgZm9ybXMgaW5wdXRzICovXHJcblxyXG4gIC5yZWN0YW5nbGVfbmFtZSB7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGNvbG9yOiAjNjY2NjY2O1xyXG59XHJcbi5yb2xlLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjNjY2NjY2O1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbn1cclxuLmxvZ2luLWJ1dG4ge1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjtcclxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjsgIFxyXG4gICAgYm9yZGVyOiAjM2Q4NDYyO1xyXG59XHJcbi5sb2dpbi1idXRuOmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjsgXHJcbiAgICAgIGJvcmRlcjogIzNkODQ2MjtcclxuICAgICAgYm94LXNoYWRvdzogMCAwIDdweCAxcHggcmdiYSg2NywgMTQ2LCAxMDgsIDAuNSk7XHJcbiBcclxuIH1cclxuIC5sb2dpbi1idXRuOmZvY3VzIHtcclxuICAgICBvdXRsaW5lOjA7XHJcbiAgICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MiAhaW1wb3J0YW50O1xyXG4gfVxyXG4gLmRvbmUtYnRuOmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjsgXHJcbiAgICBib3gtc2hhZG93OiAwIDAgN3B4IDFweCByZ2JhKDY3LCAxNDYsIDEwOCwgMC41KTtcclxuIH1cclxuI3JvbGVfZWRpdHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYmFja2dyb3VuZDogdXJsKC4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvYWN0aXZlLnBuZykgcmlnaHQgMTZweCB0b3AgMTlweC8xMHB4IG5vLXJlcGVhdDtcclxuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuaGVpZ2h0OiA1MHB4ICFpbXBvcnRhbnQ7XHJcbnBhZGRpbmctdG9wOiA3cHg7XHJcbmN1cnNvcjogcG9pbnRlcjtcclxufVxyXG4uZm9ybV9oZWFkZXJ7XHJcbiAgICBoZWlnaHQ6IDQ2cHg7XHJcbiAgICBmb250LWZhbWlseTogUGxheWZhaXJEaXNwbGF5O1xyXG4gICAgZm9udC1zaXplOiAzNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxufVxyXG4uZm9ybV9wYXJhe1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogMS40MztcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxufVxyXG5pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24sXHJcbmlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbiB7XHJcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gIG1hcmdpbjogMDtcclxufVxyXG4ucHJldmlvdXN7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjM2Q4NDYyOyAgXHJcbiAgICBib3JkZXI6ICNmZmZmZmY7XHJcbn1cclxuLnN1Y2Nlc3MtbWFpbHtcclxuICAgIG1hcmdpbjogMCAzMCU7XHJcbn1cclxuLm1haWwtYm94e1xyXG4gICAgbWFyZ2luLXRvcDo4JSA7XHJcbiAgICBtYXJnaW4tYm90dG9tOjE1JTtcclxufVxyXG4uZG9uZS1idG57XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG4gICAgcGFkZGluZzogMCUgMTAlO1xyXG4gICAgbWFyZ2luLXRvcDogOCUgO1xyXG59XHJcbi5kb25lLXRleHR7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuLmZvcm1fY29udGVudHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGxlZnQ6IDglO1xyXG59XHJcbi5idG4tZGl2e1xyXG4gICAgcGFkZGluZy1yaWdodDogOCU7XHJcbn1cclxuLnByZXYtZGl2e1xyXG4gICAgcGFkZGluZy1yaWdodDogMTAlO1xyXG59XHJcbi50ZXh0LWFyZWF7XHJcbiAgICBoZWlnaHQ6IDEwNnB4IWltcG9ydGFudDtcclxufVxyXG4udXBsb2FkLXRleHR7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gICAgY29sb3I6ICMzZDg0NjI7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEyJTtcclxufVxyXG4udXBsb2FkLWJ0bjpob3ZlcntcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG4udXBsb2FkLWJ0bntcclxuICAgIHBhZGRpbmc6IDglIDAlO1xyXG59XHJcbi51cGxvYWQtZGl2e1xyXG5wYWRkaW5nOiAwJTtcclxucG9zaXRpb246IHJlbGF0aXZlO1xyXG5yaWdodDogMiU7XHJcbn1cclxuLmNlcnQteWVhcntcclxuICAgIHdpZHRoOiA5MCU7XHJcbn1cclxuLmFkZC1idG46aG92ZXJ7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuLmFkZC10ZXh0e1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIGNvbG9yOiAjM2Q4NDYyO1xyXG4gICAgcGFkZGluZy1sZWZ0OiA4JTtcclxufVxyXG5cclxuLnBpYy1oZWFkLXRleHR7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG4gICAgcGFkZGluZy10b3A6IDJyZW07XHJcbn1cclxuLnByb2ZpbGUtZGl2e1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2JiYmJiYjtcclxuICAgIGJvcmRlci1zdHlsZTogZGFzaGVkO1xyXG4gICAgd2lkdGg6IDg0JTtcclxuICAgIHBhZGRpbmctbGVmdDogOCU7XHJcbn1cclxuLmFkZC1waWN7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDM0JTtcclxuICAgIGxlZnQ6IDQ4JTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLyogPT1GT09URVIgU0VDVElPTiBDU1M9PSAqL1xyXG5cclxuLmZvb3Rlci10ZXh0e1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG59XHJcbi5zdWItdGV4dHtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgZm9udC1zaXplOiAxMnB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuNjc7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAwJTtcclxufVxyXG4uYWRtaW4tZGl2e1xyXG4gICAgcGFkZGluZzogMCUgNiU7XHJcbn1cclxuXHJcbi5iaWxsLWRpdntcclxuICAgIHBhZGRpbmctbGVmdDogNCU7XHJcbn1cclxuXHJcbmhye1xyXG4gICAgYm9yZGVyLXN0eWxlOiBkYXNoZWQgIWltcG9ydGFudDtcclxuICAgIG1hcmdpbi10b3A6IDJyZW07XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2YyZWZlYjtcclxufVxyXG5cclxuXHJcbi5wcmV2aW91czpob3ZlciwgLnVwbG9hZC10ZXh0OmhvdmVyLCAuYWRkLXRleHQ6aG92ZXJ7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuLyogPT09PSBDaGFuZ2VzID09PT0gKi9cclxuLk1lbWJlci10cmFja2VyLWFjdGl2ZSwgLmJvcmRlci1jb2xvcjo6YWZ0ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzI5ZDdhICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG5cclxuXHJcbiAgLyogPT09PT09PT0gTUVESUEgUVVFUklFUyA9PT09PT09ICovXHJcblxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NzY4cHgpe1xyXG4gICAgLmFkZC1waWN7XHJcbiAgICAgICAgdG9wOiAzMSU7XHJcbiAgICAgICAgbGVmdDo0NyU7XHJcbiAgICB9XHJcbiAgICAucHJvZmlsZS1waWN7XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxJTtcclxuICAgIH1cclxuICAgIC5hZGQtYnRue1xyXG4gICAgICAgIG1hcmdpbi10b3A6NSU7XHJcbiAgICB9XHJcbiAgICAuc3VjY2Vzcy1tYWlse1xyXG4gICAgICAgIG1hcmdpbjogMCUgMjAlO1xyXG4gICAgfVxyXG4gICAgLnNld25faGVhZGluZ3tcclxuICAgICAgICBwYWRkaW5nOiAycmVtIDRyZW07XHJcbiAgICB9XHJcblxyXG4gIH1cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjEwMjRweCkgYW5kIChtYXgtd2lkdGg6MTIwMHB4KXtcclxuICAgIC5hZGQtcGlje1xyXG4gICAgICAgIGxlZnQ6NDglO1xyXG4gICAgfVxyXG4gICAgLnByb2ZpbGUtcGlje1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMSU7XHJcbiAgICB9XHJcbiAgICAuc3VjY2Vzcy1tYWlse1xyXG4gICAgICAgIG1hcmdpbjogMCUgMjUlO1xyXG4gICAgfVxyXG4gICAgLnNld25faGVhZGluZ3tcclxuICAgICAgICBwYWRkaW5nOiAycmVtIDVyZW07XHJcbiAgICB9XHJcbiAgIFxyXG4gIH1cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjQyNXB4KXtcclxuICAgICAgLnByb2ZpbGUtZGl2e1xyXG4gICAgICAgICAgcGFkZGluZy1sZWZ0OiAwJTtcclxuICAgICAgICAgIHdpZHRoOiA5MCU7XHJcbiAgICAgIH1cclxuICAgICAgLmFkZC1waWN7XHJcbiAgICAgICAgbGVmdDogNDMlO1xyXG4gICAgICAgIHRvcDogMzIlO1xyXG4gICAgfVxyXG4gICAgLmFkZC1idG57XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMTUlO1xyXG4gICAgfVxyXG4gICAgLmZvcm0tY29udHJvbHtcclxuICAgICAgICB3aWR0aDogODglO1xyXG4gICAgfVxyXG4gICAgLmZvcm0tZ3JvdXB7XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwJTtcclxuICAgIH1cclxuICAgIC5kb25lLWJ0bntcclxuICAgICAgICBtYXJnaW4tdG9wOiAyMCU7XHJcbiAgICB9XHJcbiAgICAuZm9ybV9wYXJhe1xyXG4gICAgICAgIG1hcmdpbjogMCU7XHJcbiAgICB9XHJcbiAgICAucHJvZmlsZS1waWN7XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAyJTtcclxuICAgIH1cclxuICAgIC5zZXduX2hlYWRpbmd7XHJcbiAgICAgICAgcGFkZGluZzogMnJlbSAycmVtO1xyXG4gICAgfVxyXG4gICAgI3VwbG9hZC1idG57XHJcbiAgICAgICAgcGFkZGluZzogMCU7XHJcbiAgICB9XHJcbiAgICAjYWRkLWJ0bntcclxuICAgICAgICBtYXJnaW4tdG9wOiAwJTtcclxuICAgICAgICBwYWRkaW5nOiAwJTtcclxuICAgIH1cclxuXHJcbiB9XHJcblxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SetupComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-setup',
                templateUrl: './setup.component.html',
                styleUrls: ['./setup.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/auth/update-password/update-password.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/auth/update-password/update-password.component.ts ***!
  \*******************************************************************/
/*! exports provided: UpdatePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpdatePasswordComponent", function() { return UpdatePasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class UpdatePasswordComponent {
    constructor() { }
    ngOnInit() {
    }
}
UpdatePasswordComponent.ɵfac = function UpdatePasswordComponent_Factory(t) { return new (t || UpdatePasswordComponent)(); };
UpdatePasswordComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UpdatePasswordComponent, selectors: [["app-update-password"]], decls: 45, vars: 0, consts: [[1, "sewn_heading"], ["xmlns", "http://www.w3.org/2000/svg", "width", "90", "height", "27", "viewBox", "0 0 115 27", 1, "logo_sewn"], ["fill", "none", "fill-rule", "evenodd"], ["stroke", "#000", "stroke-width", "1.5"], ["d", "M1.448 9.926L10 18.416l8.552-8.49L10 1.437l-8.552 8.49z", "transform", "translate(0 -4) translate(0 4)"], ["d", "M1.448 17.074L10 25.563l8.552-8.49L10 8.585l-8.552 8.49z", "transform", "translate(0 -4) translate(0 4)"], ["fill", "#000", "font-family", "PlayfairDisplay-Bold, Playfair Display", "font-size", "26", "font-weight", "bold", "letter-spacing", "2.786", "transform", "translate(0 -4)"], ["x", "32", "y", "28"], [1, "container-fluid", "position-total"], [1, "row"], [1, "col-1", "first_column"], [1, "col-10", "middle_column"], [1, "container"], [1, "row", "justify-content-center"], [1, "welcome_title"], [1, "col-12", "thank_you"], [1, "update-pwd-title", "mb-3"], [1, "col-xl-5", "col-lg-5", "col-md-6", "col-sm-10", "mx-auto", "form"], [1, "px-2"], [1, "justify-content-center"], [1, "form-group", "box-spacing"], [1, "current-pwd_title"], ["type", "password", "id", "", "placeholder", "Enter the password sent via email", "name", "role", "required", "", 1, "form-control", "current-password"], [1, "new-pwd_title", "mt-1"], ["type", "password", "placeholder", "New password", 1, "form-control", "new-password"], [1, "form-group"], [1, "enter-pwd_title", "mt-1"], ["type", "password", "placeholder", "Enter new password again", 1, "form-control", "re-enter-password"], [1, "text-center", "bottom-spacing"], ["type", "submit", "routerLink", "", 1, "change-button", "mt-3", "btn"], [1, "change-pwd-text"], [1, "col-1", "last_column"]], template: function UpdatePasswordComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "g", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "g", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "path", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "text", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "tspan", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "SEWN");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "h3", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Welcome to SEWN!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Thank you for taking a step with us to disrupt the coffee ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "supply chain!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "h4", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Update Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "form", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "label", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "CURRENT PASSWORD");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "label", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "NEW PASSWORD");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "label", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "RE-ENTER YOUR NEW PASSWORD");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "input", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "button", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "span", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "CHANGE PASSWORD");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".sewn_heading[_ngcontent-%COMP%]\r\n    {\r\n        background-color: #f3efe8;\r\n    height: 60px;\r\n    padding-left: 110px;\r\n    }\r\n    .logo_sewn[_ngcontent-%COMP%]{\r\n        \r\n        margin-top: 16px;\r\n    }\r\n    .first_column[_ngcontent-%COMP%]{\r\n     background-color: #f3efe8;\r\n   }\r\n    .last_column[_ngcontent-%COMP%]{\r\n        background-color: #f3efe8;\r\n\r\n   }\r\n    .middle_column[_ngcontent-%COMP%]{\r\n        border-radius: 6px;\r\n        background-color: #ffffff;\r\n   }\r\n    .welcome_title[_ngcontent-%COMP%]{\r\n    font-family: PlayfairDisplay;\r\n    font-size: 32px;\r\n    color: #000000;\r\n    margin-top: 28px;\r\n    font-weight: 500;\r\n    line-height: 42px;\r\n   }\r\n    .thank_you[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  line-height: 1.43;\r\n  text-align: center;\r\n  color: #666666;\r\n   }\r\n    .update-pwd-title[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 15px;\r\n  font-weight: 600;\r\n  color: #a88057;\r\n  margin-top: 32px;\r\n   }\r\n    .current-pwd_title[_ngcontent-%COMP%], .new-pwd_title[_ngcontent-%COMP%], .enter-pwd_title[_ngcontent-%COMP%]{\r\n     font-family: Montserrat;\r\n  font-size: 11px;\r\n  font-weight: 600;\r\n  color: #666666;\r\n  padding-top: 9px;\r\n   }\r\n    .current-password[_ngcontent-%COMP%], .new-password[_ngcontent-%COMP%], .re-enter-password[_ngcontent-%COMP%]{\r\n    height: 46px;\r\n  border-radius: 6px;\r\n  border: solid 1px #cccccc;\r\n  background-color: #ffffff;\r\n  color: #000000;\r\n  font-weight: 500;\r\n   }\r\n    .current-password[_ngcontent-%COMP%]::-webkit-input-placeholder, .new-password[_ngcontent-%COMP%]::-webkit-input-placeholder, .re-enter-password[_ngcontent-%COMP%]::-webkit-input-placeholder{\r\n  font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n   }\r\n    .current-password[_ngcontent-%COMP%]::-moz-placeholder, .new-password[_ngcontent-%COMP%]::-moz-placeholder, .re-enter-password[_ngcontent-%COMP%]::-moz-placeholder{\r\n  font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n   }\r\n    .current-password[_ngcontent-%COMP%]::-ms-input-placeholder, .new-password[_ngcontent-%COMP%]::-ms-input-placeholder, .re-enter-password[_ngcontent-%COMP%]::-ms-input-placeholder{\r\n  font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n   }\r\n    .current-password[_ngcontent-%COMP%]::placeholder, .new-password[_ngcontent-%COMP%]::placeholder, .re-enter-password[_ngcontent-%COMP%]::placeholder{\r\n  font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n   }\r\n    .change-button[_ngcontent-%COMP%]{\r\n       border-radius: 6px;\r\n  background-color: #3d8462;\r\n  height: 46px;\r\n  \r\n  }\r\n    .change-button[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n      box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n      \r\n  }\r\n    .change-pwd-text[_ngcontent-%COMP%]{\r\n     font-family: Montserrat;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  color: #ffffff;\r\n  }\r\n    .bottom-spacing[_ngcontent-%COMP%]{\r\n    margin-bottom: 70px;\r\n    overflow-y:hidden;\r\n\r\n  }\r\n    .box-spacing[_ngcontent-%COMP%]{\r\n    margin-bottom: 0.5rem;\r\n  }\r\n    .position-total[_ngcontent-%COMP%]{\r\n    \r\n    position:fixed;\r\n    \r\n  }\r\n    @media all and (max-width: 768px) {\r\n  .welcome_title[_ngcontent-%COMP%] {\r\n    font-size: 26px !important;\r\n    }\r\n    .thank_you[_ngcontent-%COMP%] {\r\n    font-size: 13px !important;\r\n}\r\n  }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC91cGRhdGUtcGFzc3dvcmQvdXBkYXRlLXBhc3N3b3JkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O1FBRVEseUJBQXlCO0lBQzdCLFlBQVk7SUFDWixtQkFBbUI7SUFDbkI7SUFDQTtRQUNJLHVCQUF1QjtRQUN2QixnQkFBZ0I7SUFDcEI7SUFDRDtLQUNFLHlCQUF5QjtHQUMzQjtJQUNBO1FBQ0sseUJBQXlCOztHQUU5QjtJQUNBO1FBQ0ssa0JBQWtCO1FBQ2xCLHlCQUF5QjtHQUM5QjtJQUNBO0lBQ0MsNEJBQTRCO0lBQzVCLGVBQWU7SUFDZixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGdCQUFnQjtJQUNoQixpQkFBaUI7R0FDbEI7SUFDQTtJQUNDLHVCQUF1QjtFQUN6QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsY0FBYztHQUNiO0lBQ0E7SUFDQyx1QkFBdUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0VBQ2QsZ0JBQWdCO0dBQ2Y7SUFDQTtLQUNFLHVCQUF1QjtFQUMxQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGNBQWM7RUFDZCxnQkFBZ0I7R0FDZjtJQUNBO0lBQ0MsWUFBWTtFQUNkLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxnQkFBZ0I7R0FDZjtJQUNBO0VBQ0QsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixnQkFBZ0I7R0FDZjtJQUpBO0VBQ0QsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixnQkFBZ0I7R0FDZjtJQUpBO0VBQ0QsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixnQkFBZ0I7R0FDZjtJQUpBO0VBQ0QsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixnQkFBZ0I7R0FDZjtJQUNEO09BQ0ssa0JBQWtCO0VBQ3ZCLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osd0JBQXdCO0VBQ3hCO0lBQ0E7SUFDRSx5QkFBeUI7TUFDdkIsK0NBQStDO01BQy9DLHFCQUFxQjtFQUN6QjtJQUNBO0tBQ0csdUJBQXVCO0VBQzFCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkO0lBQ0E7SUFDRSxtQkFBbUI7SUFDbkIsaUJBQWlCOztFQUVuQjtJQUNBO0lBQ0UscUJBQXFCO0VBQ3ZCO0lBQ0E7SUFDRTtlQUNXO0lBQ1gsY0FBYztJQUNkLHVCQUF1QjtFQUN6QjtJQUNBO0VBQ0E7SUFDRSwwQkFBMEI7SUFDMUI7SUFDQTtJQUNBLDBCQUEwQjtBQUM5QjtFQUNFIiwiZmlsZSI6InNyYy9hcHAvYXV0aC91cGRhdGUtcGFzc3dvcmQvdXBkYXRlLXBhc3N3b3JkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2V3bl9oZWFkaW5nXHJcbiAgICB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZWZlODtcclxuICAgIGhlaWdodDogNjBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMTEwcHg7XHJcbiAgICB9XHJcbiAgICAubG9nb19zZXdue1xyXG4gICAgICAgIC8qIHBhZGRpbmctdG9wOiAxNXB4OyAqL1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAgICB9XHJcbiAgIC5maXJzdF9jb2x1bW57XHJcbiAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZWZlODtcclxuICAgfVxyXG4gICAubGFzdF9jb2x1bW57XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZWZlODtcclxuXHJcbiAgIH1cclxuICAgLm1pZGRsZV9jb2x1bW57XHJcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgIH1cclxuICAgLndlbGNvbWVfdGl0bGV7XHJcbiAgICBmb250LWZhbWlseTogUGxheWZhaXJEaXNwbGF5O1xyXG4gICAgZm9udC1zaXplOiAzMnB4O1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBtYXJnaW4tdG9wOiAyOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xyXG4gICB9XHJcbiAgIC50aGFua195b3V7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICBmb250LXNpemU6IDEzcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBsaW5lLWhlaWdodDogMS40MztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY29sb3I6ICM2NjY2NjY7XHJcbiAgIH1cclxuICAgLnVwZGF0ZS1wd2QtdGl0bGV7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogI2E4ODA1NztcclxuICBtYXJnaW4tdG9wOiAzMnB4O1xyXG4gICB9XHJcbiAgIC5jdXJyZW50LXB3ZF90aXRsZSwubmV3LXB3ZF90aXRsZSwuZW50ZXItcHdkX3RpdGxle1xyXG4gICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTFweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGNvbG9yOiAjNjY2NjY2O1xyXG4gIHBhZGRpbmctdG9wOiA5cHg7XHJcbiAgIH1cclxuICAgLmN1cnJlbnQtcGFzc3dvcmQsLm5ldy1wYXNzd29yZCwucmUtZW50ZXItcGFzc3dvcmR7XHJcbiAgICBoZWlnaHQ6IDQ2cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICBjb2xvcjogIzAwMDAwMDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gICB9XHJcbiAgIC5jdXJyZW50LXBhc3N3b3JkOjpwbGFjZWhvbGRlciwubmV3LXBhc3N3b3JkOjpwbGFjZWhvbGRlciwucmUtZW50ZXItcGFzc3dvcmQ6OnBsYWNlaG9sZGVye1xyXG4gIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gICB9XHJcbiAgLmNoYW5nZS1idXR0b257XHJcbiAgICAgICBib3JkZXItcmFkaXVzOiA2cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjtcclxuICBoZWlnaHQ6IDQ2cHg7XHJcbiAgLyogbWFyZ2luLWJvdHRvbTogMTQlOyAqL1xyXG4gIH0gXHJcbiAgLmNoYW5nZS1idXR0b246aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyOyBcclxuICAgICAgYm94LXNoYWRvdzogMCAwIDdweCAxcHggcmdiYSg2NywgMTQ2LCAxMDgsIDAuNSk7XHJcbiAgICAgIC8qIGJvcmRlcjogIzNkODQ2MjsgKi9cclxuICB9XHJcbiAgLmNoYW5nZS1wd2QtdGV4dHtcclxuICAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxuICB9XHJcbiAgLmJvdHRvbS1zcGFjaW5ne1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNzBweDtcclxuICAgIG92ZXJmbG93LXk6aGlkZGVuO1xyXG5cclxuICB9XHJcbiAgLmJveC1zcGFjaW5ne1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xyXG4gIH1cclxuICAucG9zaXRpb24tdG90YWx7XHJcbiAgICAvKiB0b3A6IDA7XHJcbiAgICBib3R0b206MDsgKi9cclxuICAgIHBvc2l0aW9uOmZpeGVkO1xyXG4gICAgLyogb3ZlcmZsb3cteTpoaWRkZW47ICovXHJcbiAgfVxyXG4gIEBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLndlbGNvbWVfdGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAyNnB4ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAudGhhbmtfeW91IHtcclxuICAgIGZvbnQtc2l6ZTogMTNweCAhaW1wb3J0YW50O1xyXG59XHJcbiAgfSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UpdatePasswordComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-update-password',
                templateUrl: './update-password.component.html',
                styleUrls: ['./update-password.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/auth/verify-otp/verify-otp.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/auth/verify-otp/verify-otp.component.ts ***!
  \*********************************************************/
/*! exports provided: VerifyOtpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyOtpComponent", function() { return VerifyOtpComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class VerifyOtpComponent {
    constructor() { }
    ngOnInit() {
        var counter = 60;
        var interval = setInterval(function () {
            counter--;
            if (counter <= 0) {
                clearInterval(interval);
                $('#timer').html("<span>00:00</span>");
                return;
            }
            else {
                $('#time').text(counter);
            }
        }, 1000);
    }
    getCodeBoxElement(index) {
        return document.getElementById('codeBox' + index);
    }
    onKeyUpEvent(index, event) {
        const eventCode = event.which || event.keyCode;
        console.log("keyup is coming here ", eventCode);
        if (this.getCodeBoxElement(index).value.length == 1) {
            if (index !== 4) {
                this.getCodeBoxElement(index + 1).focus();
            }
            else {
                this.getCodeBoxElement(index).blur();
                // Submit code
                console.log('submit code ');
            }
        }
        if (eventCode == 8 && index !== 1) {
            this.getCodeBoxElement(index - 1).focus();
        }
    }
    onFocusEvent(index) {
        console.log("focusing here");
        for (let item = 1; item < index; item++) {
            const currentElement = this.getCodeBoxElement(item);
            if (!currentElement.value) {
                currentElement.focus();
                break;
            }
        }
    }
}
VerifyOtpComponent.ɵfac = function VerifyOtpComponent_Factory(t) { return new (t || VerifyOtpComponent)(); };
VerifyOtpComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VerifyOtpComponent, selectors: [["app-verify-otp"]], decls: 35, vars: 0, consts: [[1, "login-sec"], [1, "container"], [1, "sewn-bg-logo"], ["xmlns", "http://www.w3.org/2000/svg", "width", "90", "height", "27", "viewBox", "0 0 116 27"], ["fill", "none", "fill-rule", "evenodd"], ["fill", "#FFF", "font-family", "PlayfairDisplay-Bold, Playfair Display", "font-size", "26", "font-weight", "bold", "letter-spacing", "2.786", "transform", "translate(0 -5)", 2, "mix-blend-mode", "screen"], ["x", "33", "y", "28"], ["stroke", "#FFF", "stroke-width", "1.5"], ["d", "M1.448 9.926L10 18.416l8.552-8.49L10 1.437l-8.552 8.49z", "transform", "translate(0 -5) translate(0 5)"], ["d", "M1.448 17.074L10 25.563l8.552-8.49L10 8.585l-8.552 8.49z", "transform", "translate(0 -5) translate(0 5)"], [1, "col-xs-12", "col-sm-10", "col-md-8", "col-lg-6", "p-0", "login-box"], [1, "login"], [1, "login_heading"], [1, "login_para"], [1, "otp-expiry"], ["id", "timer", 1, "timer"], ["id", "time"], [1, "form-container", "spacing-bottom"], [1, "form-group", "row"], [1, "role-name", "col-md-12"], [1, "form-group", "col-md-12"], ["id", "codeBox1", "type", "number", "placeholder", "0", "maxlength", "1", 3, "keyup", "focus"], ["id", "codeBox2", "type", "number", "placeholder", "0", "maxlength", "1", 3, "keyup", "focus"], ["id", "codeBox3", "type", "number", "placeholder", "0", "maxlength", "1", 3, "keyup", "focus"], ["id", "codeBox4", "type", "number", "placeholder", "0", "maxlength", "1", 3, "keyup", "focus"], ["type", "button", "routerLink", "../change-password", 1, "btn", "submit-btn"], [1, "submit-text"]], template: function VerifyOtpComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "svg", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "g", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "tspan", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "SEWN");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "g", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "h3", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Email OTP Verification ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "A OTP has been sent to your email ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "p", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "OTP Expires in 60s - ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "00:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "60");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "form", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "ENTER 4 DIGIT OTP CODE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "input", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function VerifyOtpComponent_Template_input_keyup_28_listener($event) { return ctx.onKeyUpEvent(1, $event); })("focus", function VerifyOtpComponent_Template_input_focus_28_listener() { return ctx.onFocusEvent(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function VerifyOtpComponent_Template_input_keyup_29_listener($event) { return ctx.onKeyUpEvent(2, $event); })("focus", function VerifyOtpComponent_Template_input_focus_29_listener() { return ctx.onFocusEvent(2); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "input", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function VerifyOtpComponent_Template_input_keyup_30_listener($event) { return ctx.onKeyUpEvent(3, $event); })("focus", function VerifyOtpComponent_Template_input_focus_30_listener() { return ctx.onFocusEvent(3); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "input", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("keyup", function VerifyOtpComponent_Template_input_keyup_31_listener($event) { return ctx.onKeyUpEvent(4, $event); })("focus", function VerifyOtpComponent_Template_input_focus_31_listener() { return ctx.onFocusEvent(4); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "button", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "span", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "SUBMIT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".login[_ngcontent-%COMP%] {\r\n    border-radius: 6px;\r\n    box-shadow: 0 0 10px 4px rgba(27, 27, 27, 0.3);\r\n    background-color: #ffffff;\r\n    padding: 2.3rem 2.3rem 3rem 2.3rem;\r\n    }\r\n\r\n\r\n.login_heading[_ngcontent-%COMP%] {\r\n    font-family: PlayfairDisplay;\r\n    font-size: 32px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 42px;\r\n    letter-spacing: normal;\r\n    color: #000000;\r\n}\r\n\r\n\r\n.login_para[_ngcontent-%COMP%] {\r\n    font-family: Montserrat;\r\n    font-size: 12px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 28px;\r\n    letter-spacing: 0.2px;\r\n    color: #666666;\r\n}\r\n\r\n\r\n.role-name[_ngcontent-%COMP%] {\r\n    font-size: 9px;\r\n    font-weight: 600;\r\n    color: #666666;\r\n    font-family: Montserrat;\r\n    padding-left: 3%;\r\n    letter-spacing: 0.3px;\r\n}\r\n\r\n\r\ninput[type=number][_ngcontent-%COMP%] {\r\n     width: 44px;\r\nheight: 44px;\r\nborder-radius: 6px;\r\nborder: solid 1px #cccccc;\r\nbackground-color: #ffffff;\r\ntext-align: center;\r\nmargin-right: 7px;\r\n  }\r\n\r\n\r\ninput[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button, input[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button {\r\n    -webkit-appearance: none;\r\n    margin: 0;\r\n  }\r\n\r\n\r\ninput[type=number][_ngcontent-%COMP%] {\r\n    -moz-appearance:textfield;\r\n}\r\n\r\n\r\n.otp-expiry[_ngcontent-%COMP%]{\r\n     font-family: Montserrat;\r\nfont-size: 15px;\r\nfont-weight: normal;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\nmargin-top: 5%;\r\n\r\n  }\r\n\r\n\r\n.timer[_ngcontent-%COMP%]{\r\n    font-size: 16px;\r\nfont-weight: 600;\r\ncolor: #000000;\r\n  }\r\n\r\n\r\n.submit-text[_ngcontent-%COMP%]{\r\n      font-family: Montserrat;\r\nfont-size: 12px;\r\nfont-weight: 600;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #ffffff;\r\npadding: 10px 6px;\r\n\r\n\r\n  }\r\n\r\n\r\n.spacing-bottom[_ngcontent-%COMP%]{\r\n    margin-top: 2.2rem;\r\n  }\r\n\r\n\r\n[_ngcontent-%COMP%]::-webkit-input-placeholder{\r\n      font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n  }\r\n\r\n\r\n[_ngcontent-%COMP%]::-moz-placeholder{\r\n      font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n  }\r\n\r\n\r\n[_ngcontent-%COMP%]::-ms-input-placeholder{\r\n      font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n  }\r\n\r\n\r\n[_ngcontent-%COMP%]::placeholder{\r\n      font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n  }\r\n\r\n\r\n[_ngcontent-%COMP%]::-webkit-input-placeholder{\r\nfont-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\npadding-top: 5%;\r\n  }\r\n\r\n\r\n.submit-btn[_ngcontent-%COMP%]{\r\n     height: 45px;\r\n  border-radius: 6px;\r\n  background-color: #3d8462;\r\n  position: relative;\r\n  bottom: 3px;\r\n  \r\n  }\r\n\r\n\r\n.submit-btn[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n      box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n  \r\n  }\r\n\r\n\r\n.form-container[_ngcontent-%COMP%]{\r\n    margin-bottom: 8rem;\r\n  }\r\n\r\n\r\n@media only screen and (min-width: 385px) and (max-width: 575px) {\r\n    .login_heading[_ngcontent-%COMP%] {\r\n      font-size: 27px;\r\n    }\r\n   }\r\n\r\n\r\n@media only screen and (min-width: 320px) and (max-width: 384px) {\r\ninput[type=number][_ngcontent-%COMP%] {\r\n      width: 32px;\r\n      height: 36px;\r\n      margin-right: 5px;\r\n     }\r\n     .submit-btn[_ngcontent-%COMP%]{\r\n     height: 36px;\r\n  }\r\n     \r\n  .submit-text[_ngcontent-%COMP%]{\r\n    padding: 5px 1px;\r\n\r\n  }\r\n  .login_heading[_ngcontent-%COMP%] {\r\n    font-size: 23px;\r\n  }\r\n\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC92ZXJpZnktb3RwL3ZlcmlmeS1vdHAuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQTtJQUNJLGtCQUFrQjtJQUNsQiw4Q0FBOEM7SUFDOUMseUJBQXlCO0lBQ3pCLGtDQUFrQztJQUNsQzs7O0FBR0o7SUFDSSw0QkFBNEI7SUFDNUIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixzQkFBc0I7SUFDdEIsY0FBYztBQUNsQjs7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixxQkFBcUI7SUFDckIsY0FBYztBQUNsQjs7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCx1QkFBdUI7SUFDdkIsZ0JBQWdCO0lBQ2hCLHFCQUFxQjtBQUN6Qjs7O0FBRUM7S0FDSSxXQUFXO0FBQ2hCLFlBQVk7QUFDWixrQkFBa0I7QUFDbEIseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QixrQkFBa0I7QUFDbEIsaUJBQWlCO0VBQ2Y7OztBQUNBOztJQUVFLHdCQUF3QjtJQUN4QixTQUFTO0VBQ1g7OztBQUNBO0lBQ0UseUJBQXlCO0FBQzdCOzs7QUFDRTtLQUNHLHVCQUF1QjtBQUM1QixlQUFlO0FBQ2YsbUJBQW1CO0FBQ25CLG9CQUFvQjtBQUNwQixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixjQUFjO0FBQ2QsY0FBYzs7RUFFWjs7O0FBQ0E7SUFDRSxlQUFlO0FBQ25CLGdCQUFnQjtBQUNoQixjQUFjO0VBQ1o7OztBQUNBO01BQ0ksdUJBQXVCO0FBQzdCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7QUFDZCxpQkFBaUI7QUFDakIscUJBQXFCOztFQUVuQjs7O0FBQ0E7SUFDRSxrQkFBa0I7RUFDcEI7OztBQUVBO01BQ0ksdUJBQXVCO0FBQzdCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7RUFDWjs7O0FBVEE7TUFDSSx1QkFBdUI7QUFDN0IsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsY0FBYztFQUNaOzs7QUFUQTtNQUNJLHVCQUF1QjtBQUM3QixlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCLG9CQUFvQjtBQUNwQixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixjQUFjO0VBQ1o7OztBQVRBO01BQ0ksdUJBQXVCO0FBQzdCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7RUFDWjs7O0FBQ0E7QUFDRix1QkFBdUI7QUFDdkIsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsY0FBYztBQUNkLGVBQWU7RUFDYjs7O0FBR0E7S0FDRyxZQUFZO0VBQ2Ysa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLHdCQUF3QjtFQUN4Qjs7O0FBQ0E7SUFDRSx5QkFBeUI7TUFDdkIsK0NBQStDOztFQUVuRDs7O0FBQ0E7SUFDRSxtQkFBbUI7RUFDckI7OztBQUdDO0lBQ0M7TUFDRSxlQUFlO0lBQ2pCO0dBQ0Q7OztBQUVIO0FBQ0E7TUFDTSxXQUFXO01BQ1gsWUFBWTtNQUNaLGlCQUFpQjtLQUNsQjtLQUNBO0tBQ0EsWUFBWTtFQUNmOztFQUVBO0lBQ0UsZ0JBQWdCOztFQUVsQjtFQUNBO0lBQ0UsZUFBZTtFQUNqQjs7QUFFRiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvdmVyaWZ5LW90cC92ZXJpZnktb3RwLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcblxyXG4ubG9naW4ge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggNHB4IHJnYmEoMjcsIDI3LCAyNywgMC4zKTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICBwYWRkaW5nOiAyLjNyZW0gMi4zcmVtIDNyZW0gMi4zcmVtO1xyXG4gICAgfVxyXG5cclxuXHJcbi5sb2dpbl9oZWFkaW5nIHtcclxuICAgIGZvbnQtZmFtaWx5OiBQbGF5ZmFpckRpc3BsYXk7XHJcbiAgICBmb250LXNpemU6IDMycHg7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogNDJweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxufVxyXG5cclxuLmxvZ2luX3BhcmEge1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDEycHg7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogMjhweDtcclxuICAgIGxldHRlci1zcGFjaW5nOiAwLjJweDtcclxuICAgIGNvbG9yOiAjNjY2NjY2O1xyXG59XHJcblxyXG4ucm9sZS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogOXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjNjY2NjY2O1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDMlO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xyXG59XHJcblxyXG4gaW5wdXRbdHlwZT1udW1iZXJdIHtcclxuICAgICB3aWR0aDogNDRweDtcclxuaGVpZ2h0OiA0NHB4O1xyXG5ib3JkZXItcmFkaXVzOiA2cHg7XHJcbmJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XHJcbmJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbnRleHQtYWxpZ246IGNlbnRlcjtcclxubWFyZ2luLXJpZ2h0OiA3cHg7XHJcbiAgfVxyXG4gIGlucHV0W3R5cGU9bnVtYmVyXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcclxuICBpbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24ge1xyXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gIH1cclxuICBpbnB1dFt0eXBlPW51bWJlcl0ge1xyXG4gICAgLW1vei1hcHBlYXJhbmNlOnRleHRmaWVsZDtcclxufVxyXG4gIC5vdHAtZXhwaXJ5e1xyXG4gICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG5mb250LXNpemU6IDE1cHg7XHJcbmZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbmZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG5mb250LXN0eWxlOiBub3JtYWw7XHJcbmxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbmxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbmNvbG9yOiAjNjY2NjY2O1xyXG5tYXJnaW4tdG9wOiA1JTtcclxuXHJcbiAgfVxyXG4gIC50aW1lcntcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuZm9udC13ZWlnaHQ6IDYwMDtcclxuY29sb3I6ICMwMDAwMDA7XHJcbiAgfVxyXG4gIC5zdWJtaXQtdGV4dHtcclxuICAgICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbmZvbnQtc2l6ZTogMTJweDtcclxuZm9udC13ZWlnaHQ6IDYwMDtcclxuZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbmZvbnQtc3R5bGU6IG5vcm1hbDtcclxubGluZS1oZWlnaHQ6IG5vcm1hbDtcclxubGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuY29sb3I6ICNmZmZmZmY7XHJcbnBhZGRpbmc6IDEwcHggNnB4O1xyXG4vKiBwYWRkaW5nOiAwJSAxMCU7ICovXHJcblxyXG4gIH1cclxuICAuc3BhY2luZy1ib3R0b217XHJcbiAgICBtYXJnaW4tdG9wOiAyLjJyZW07XHJcbiAgfVxyXG5cclxuICA6OnBsYWNlaG9sZGVye1xyXG4gICAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuZm9udC1zaXplOiAxNHB4O1xyXG5mb250LXdlaWdodDogNTAwO1xyXG5mb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuZm9udC1zdHlsZTogbm9ybWFsO1xyXG5saW5lLWhlaWdodDogbm9ybWFsO1xyXG5sZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG5jb2xvcjogIzY2NjY2NjtcclxuICB9XHJcbiAgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye1xyXG5mb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuZm9udC1zaXplOiAxNHB4O1xyXG5mb250LXdlaWdodDogNTAwO1xyXG5mb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuZm9udC1zdHlsZTogbm9ybWFsO1xyXG5saW5lLWhlaWdodDogbm9ybWFsO1xyXG5sZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG5jb2xvcjogIzY2NjY2NjtcclxucGFkZGluZy10b3A6IDUlO1xyXG4gIH1cclxuIFxyXG5cclxuICAuc3VibWl0LWJ0bntcclxuICAgICBoZWlnaHQ6IDQ1cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGJvdHRvbTogM3B4O1xyXG4gIC8qIHBhZGRpbmctcmlnaHQ6IDUlIDsgKi9cclxuICB9XHJcbiAgLnN1Ym1pdC1idG46aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyOyBcclxuICAgICAgYm94LXNoYWRvdzogMCAwIDdweCAxcHggcmdiYSg2NywgMTQ2LCAxMDgsIDAuNSk7XHJcbiAgXHJcbiAgfVxyXG4gIC5mb3JtLWNvbnRhaW5lcntcclxuICAgIG1hcmdpbi1ib3R0b206IDhyZW07XHJcbiAgfVxyXG5cclxuXHJcbiAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzg1cHgpIGFuZCAobWF4LXdpZHRoOiA1NzVweCkge1xyXG4gICAgLmxvZ2luX2hlYWRpbmcge1xyXG4gICAgICBmb250LXNpemU6IDI3cHg7XHJcbiAgICB9XHJcbiAgIH1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzIwcHgpIGFuZCAobWF4LXdpZHRoOiAzODRweCkge1xyXG5pbnB1dFt0eXBlPW51bWJlcl0ge1xyXG4gICAgICB3aWR0aDogMzJweDtcclxuICAgICAgaGVpZ2h0OiAzNnB4O1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcclxuICAgICB9XHJcbiAgICAgLnN1Ym1pdC1idG57XHJcbiAgICAgaGVpZ2h0OiAzNnB4O1xyXG4gIH1cclxuICAgICBcclxuICAuc3VibWl0LXRleHR7XHJcbiAgICBwYWRkaW5nOiA1cHggMXB4O1xyXG5cclxuICB9XHJcbiAgLmxvZ2luX2hlYWRpbmcge1xyXG4gICAgZm9udC1zaXplOiAyM3B4O1xyXG4gIH1cclxuXHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VerifyOtpComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-verify-otp',
                templateUrl: './verify-otp.component.html',
                styleUrls: ['./verify-otp.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/features/dashboard/dashboard.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/features/dashboard/dashboard.component.ts ***!
  \***********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class DashboardComponent {
    constructor() { }
    ngOnInit() {
    }
}
DashboardComponent.ɵfac = function DashboardComponent_Factory(t) { return new (t || DashboardComponent)(); };
DashboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DashboardComponent, selectors: [["app-dashboard"]], decls: 27, vars: 0, consts: [[1, "header-sewn"], [1, "hello-txt"], [1, "col-sm-12", "col-md-12", "col-lg-12"], [1, "row"], [1, "col-sm-12", "col-md-6", "col-lg-3", "mb-3"], ["routerLink", "../roaster-onboarding", 1, "btn", "dashboard-button"], ["src", "assets/images/roaster.svg", 1, "logo-img", "float-left"], ["src", "assets/images/roaster_logo_hover.svg", 1, "logo-img-hover", "float-left"], [1, "roaster"], ["src", "assets/images/unfilled-arrow.png", 1, "icon-img", "float-right"], ["src", "assets/images/filled-arrow.png", 1, "icon-img-filled", "float-right"], [1, "btn", "dashboard-button"], ["src", "assets/images/facilitator.png", 1, "logo-img", "float-left"], ["src", "assets/images/estate.png", 1, "logo-img", "float-left"]], template: function DashboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Onboard Users to the Platform ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "section", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Roaster");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "img", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Facilitator");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "img", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Estates");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".header-sewn[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n    position: relative;\r\n    top: -5rem;\r\n    }\r\n\r\n    .hello-txt[_ngcontent-%COMP%]{\r\n        font-family: PlayfairDisplay;\r\n        font-size: 38px;\r\n        font-weight: normal;\r\n        font-stretch: normal;\r\n        font-style: normal;\r\n        line-height: 1.21;\r\n        letter-spacing: normal;\r\n        text-align: center;\r\n        color: #ffffff;\r\n        }\r\n\r\n    .dashboard-button[_ngcontent-%COMP%]{\r\n    height: 70px;\r\n    width: 100%;\r\n    border-radius: 6px;\r\n    border: solid 1px #dddddd;\r\n    background-color: #ffffff;\r\n    padding-left: 30px;\r\n    padding-right: 30px;\r\n\r\n }\r\n\r\n    .roaster[_ngcontent-%COMP%], .facilitator[_ngcontent-%COMP%], .estate[_ngcontent-%COMP%]{\r\n      font-family: Montserrat;\r\n      font-size: 20px;\r\n      font-weight: 600;\r\n      font-stretch: normal;\r\n      font-style: normal;\r\n      line-height: normal;\r\n      letter-spacing: normal;\r\n      color: #000000;\r\n }\r\n\r\n    .logo-img[_ngcontent-%COMP%]{\r\n            bottom: 2px;\r\nposition: relative;\r\n}\r\n\r\n    .dashboard-button[_ngcontent-%COMP%]:hover{\r\n    border: solid 1px #3d8462;\r\n }\r\n\r\n    .dashboard-button[_ngcontent-%COMP%]   .icon-img-filled[_ngcontent-%COMP%] {\r\n    display: none;\r\n}\r\n\r\n    .dashboard-button[_ngcontent-%COMP%]:hover   .icon-img-filled[_ngcontent-%COMP%] {\r\n    display: inline;\r\n}\r\n\r\n    .dashboard-button[_ngcontent-%COMP%]:hover   .icon-img[_ngcontent-%COMP%] {\r\n    display: none;\r\n}\r\n\r\n    .dashboard-button[_ngcontent-%COMP%]   .logo-img-hover[_ngcontent-%COMP%] {\r\n    display: none;\r\n}\r\n\r\n    .dashboard-button[_ngcontent-%COMP%]:hover   .logo-img-hover[_ngcontent-%COMP%] {\r\n    position: relative;\r\n    bottom: 2px;\r\n    display: inline;\r\n}\r\n\r\n    .dashboard-button[_ngcontent-%COMP%]:hover   .logo-img[_ngcontent-%COMP%] {\r\n    display: none;\r\n}\r\n\r\n    @media only screen and (min-width: 991px) and (max-width: 1200px)  {\r\n     .dashboard-button[_ngcontent-%COMP%]{\r\n    height: 70px;\r\n    width: 100%;\r\n    border-radius: 6px;\r\n    border: solid 1px #dddddd;\r\n    background-color: #ffffff;\r\n    padding-left: 20px;\r\n    padding-right: 20px;\r\n\r\n } \r\n  .roaster[_ngcontent-%COMP%], .facilitator[_ngcontent-%COMP%], .estate[_ngcontent-%COMP%]{\r\n      font-family: Montserrat;\r\n      font-size: 16px;\r\n      font-weight: 600;\r\n      font-stretch: normal;\r\n      font-style: normal;\r\n      line-height: normal;\r\n      letter-spacing: normal;\r\n      color: #000000;\r\n }\r\n.logo-img[_ngcontent-%COMP%]{\r\n    bottom: 6px;\r\n    position: relative;\r\n}\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZmVhdHVyZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1Y7O0lBRUE7UUFDSSw0QkFBNEI7UUFDNUIsZUFBZTtRQUNmLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLGlCQUFpQjtRQUNqQixzQkFBc0I7UUFDdEIsa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZDs7SUFFUjtJQUNJLFlBQVk7SUFDWixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLG1CQUFtQjs7Q0FFdEI7O0lBQ0E7TUFDSyx1QkFBdUI7TUFDdkIsZUFBZTtNQUNmLGdCQUFnQjtNQUNoQixvQkFBb0I7TUFDcEIsa0JBQWtCO01BQ2xCLG1CQUFtQjtNQUNuQixzQkFBc0I7TUFDdEIsY0FBYztDQUNuQjs7SUFFQTtZQUNXLFdBQVc7QUFDdkIsa0JBQWtCO0FBQ2xCOztJQUNDO0lBQ0cseUJBQXlCO0NBQzVCOztJQUVBO0lBQ0csYUFBYTtBQUNqQjs7SUFDQTtJQUNJLGVBQWU7QUFDbkI7O0lBQ0E7SUFDSSxhQUFhO0FBQ2pCOztJQUVBO0lBQ0ksYUFBYTtBQUNqQjs7SUFDQTtJQUNJLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsZUFBZTtBQUNuQjs7SUFDQTtJQUNJLGFBQWE7QUFDakI7O0lBSUE7S0FDSztJQUNELFlBQVk7SUFDWixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLG1CQUFtQjs7Q0FFdEI7RUFDQztNQUNJLHVCQUF1QjtNQUN2QixlQUFlO01BQ2YsZ0JBQWdCO01BQ2hCLG9CQUFvQjtNQUNwQixrQkFBa0I7TUFDbEIsbUJBQW1CO01BQ25CLHNCQUFzQjtNQUN0QixjQUFjO0NBQ25CO0FBQ0Q7SUFDSSxXQUFXO0lBQ1gsa0JBQWtCO0FBQ3RCO0FBQ0EiLCJmaWxlIjoic3JjL2FwcC9mZWF0dXJlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVyLXNld257XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0b3A6IC01cmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5oZWxsby10eHR7XHJcbiAgICAgICAgZm9udC1mYW1pbHk6IFBsYXlmYWlyRGlzcGxheTtcclxuICAgICAgICBmb250LXNpemU6IDM4cHg7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgICAgICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuMjE7XHJcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgfVxyXG5cclxuLmRhc2hib2FyZC1idXR0b257XHJcbiAgICBoZWlnaHQ6IDcwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICNkZGRkZGQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAzMHB4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMzBweDtcclxuXHJcbiB9ICAgXHJcbiAucm9hc3RlciwuZmFjaWxpdGF0b3IsLmVzdGF0ZXtcclxuICAgICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICAgICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgICAgY29sb3I6ICMwMDAwMDA7XHJcbiB9XHJcblxyXG4gLmxvZ28taW1ne1xyXG4gICAgICAgICAgICBib3R0b206IDJweDtcclxucG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbiAuZGFzaGJvYXJkLWJ1dHRvbjpob3ZlcntcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICMzZDg0NjI7XHJcbiB9XHJcblxyXG4gLmRhc2hib2FyZC1idXR0b24gLmljb24taW1nLWZpbGxlZCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcbi5kYXNoYm9hcmQtYnV0dG9uOmhvdmVyIC5pY29uLWltZy1maWxsZWQge1xyXG4gICAgZGlzcGxheTogaW5saW5lO1xyXG59XHJcbi5kYXNoYm9hcmQtYnV0dG9uOmhvdmVyIC5pY29uLWltZyB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4uZGFzaGJvYXJkLWJ1dHRvbiAubG9nby1pbWctaG92ZXIge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG4uZGFzaGJvYXJkLWJ1dHRvbjpob3ZlciAubG9nby1pbWctaG92ZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgYm90dG9tOiAycHg7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmU7XHJcbn1cclxuLmRhc2hib2FyZC1idXR0b246aG92ZXIgLmxvZ28taW1nIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcblxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5OTFweCkgYW5kIChtYXgtd2lkdGg6IDEyMDBweCkgIHtcclxuICAgICAuZGFzaGJvYXJkLWJ1dHRvbntcclxuICAgIGhlaWdodDogNzBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gICAgYm9yZGVyOiBzb2xpZCAxcHggI2RkZGRkZDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xyXG5cclxuIH0gXHJcbiAgLnJvYXN0ZXIsLmZhY2lsaXRhdG9yLC5lc3RhdGV7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICAgIGNvbG9yOiAjMDAwMDAwO1xyXG4gfVxyXG4ubG9nby1pbWd7XHJcbiAgICBib3R0b206IDZweDtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DashboardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dashboard',
                templateUrl: './dashboard.component.html',
                styleUrls: ['./dashboard.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/features/features-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/features/features-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: FeaturesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturesRoutingModule", function() { return FeaturesRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pagenotfound/pagenotfound.component */ "./src/app/features/pagenotfound/pagenotfound.component.ts");
/* harmony import */ var _roaster_onboarding_roaster_onboarding_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./roaster-onboarding/roaster-onboarding.component */ "./src/app/features/roaster-onboarding/roaster-onboarding.component.ts");
/* harmony import */ var _roaster_quick_setup_roaster_quick_setup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./roaster-quick-setup/roaster-quick-setup.component */ "./src/app/features/roaster-quick-setup/roaster-quick-setup.component.ts");
/* harmony import */ var _roaster_complete_setup_roaster_complete_setup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./roaster-complete-setup/roaster-complete-setup.component */ "./src/app/features/roaster-complete-setup/roaster-complete-setup.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/features/dashboard/dashboard.component.ts");
/* harmony import */ var _features_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./features.component */ "./src/app/features/features.component.ts");
/* harmony import */ var _welcome_aboard_welcome_aboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./welcome-aboard/welcome-aboard.component */ "./src/app/features/welcome-aboard/welcome-aboard.component.ts");











const routes = [
    {
        path: '',
        component: _features_component__WEBPACK_IMPORTED_MODULE_7__["FeaturesComponent"],
        children: [
            {
                path: 'dashboard',
                component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_6__["DashboardComponent"]
            },
            {
                path: 'roaster-onboarding',
                component: _roaster_onboarding_roaster_onboarding_component__WEBPACK_IMPORTED_MODULE_3__["RoasterOnboardingComponent"]
            },
            {
                path: 'roaster-quick-setup',
                component: _roaster_quick_setup_roaster_quick_setup_component__WEBPACK_IMPORTED_MODULE_4__["RoasterQuickSetupComponent"]
            },
            {
                path: 'roaster-complete-setup',
                component: _roaster_complete_setup_roaster_complete_setup_component__WEBPACK_IMPORTED_MODULE_5__["RoasterCompleteSetupComponent"]
            },
            {
                path: 'welcome-aboard',
                component: _welcome_aboard_welcome_aboard_component__WEBPACK_IMPORTED_MODULE_8__["WelcomeAboardComponent"]
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: '**',
                component: _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_2__["PagenotfoundComponent"]
            }
        ]
    },
];
class FeaturesRoutingModule {
}
FeaturesRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: FeaturesRoutingModule });
FeaturesRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function FeaturesRoutingModule_Factory(t) { return new (t || FeaturesRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FeaturesRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeaturesRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/features/features.component.ts":
/*!************************************************!*\
  !*** ./src/app/features/features.component.ts ***!
  \************************************************/
/*! exports provided: FeaturesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturesComponent", function() { return FeaturesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");




class FeaturesComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngOnInit() {
        // $('[data-toggle="tooltip"]').tooltip(); 
        // $( ".mytogglecl" ).click(function() {
        //   alert( "Handler for .click() called." );
        // });
        //copy pasted all custom JS code here.....
        jquery__WEBPACK_IMPORTED_MODULE_1__(function () {
            "use strict";
            // ============================================================== 
            // Theme options
            // ==============================================================     
            // ============================================================== 
            // sidebar-hover
            // ==============================================================
            jquery__WEBPACK_IMPORTED_MODULE_1__(".left-sidebar").hover(function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__(".navbar-header").addClass("expand-logo");
            }, function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__(".navbar-header").removeClass("expand-logo");
            });
            // this is for close icon when navigation open in mobile view
            jquery__WEBPACK_IMPORTED_MODULE_1__(".nav-toggler").on('click', function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").toggleClass("show-sidebar");
                jquery__WEBPACK_IMPORTED_MODULE_1__(".nav-toggler i").toggleClass("ti-menu");
            });
            jquery__WEBPACK_IMPORTED_MODULE_1__(".nav-lock").on('click', function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__("body").toggleClass("lock-nav");
                jquery__WEBPACK_IMPORTED_MODULE_1__(".nav-lock i").toggleClass("mdi-toggle-switch-off");
                jquery__WEBPACK_IMPORTED_MODULE_1__("body, .page-wrapper").trigger("resize");
            });
            jquery__WEBPACK_IMPORTED_MODULE_1__(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__(".app-search").toggle(200);
                jquery__WEBPACK_IMPORTED_MODULE_1__(".app-search input").focus();
            });
            // ============================================================== 
            // Right sidebar options
            // ==============================================================
            jquery__WEBPACK_IMPORTED_MODULE_1__(function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__(".service-panel-toggle").on('click', function () {
                    jquery__WEBPACK_IMPORTED_MODULE_1__(".customizer").toggleClass('show-service-panel');
                });
                jquery__WEBPACK_IMPORTED_MODULE_1__('.page-wrapper').on('click', function () {
                    jquery__WEBPACK_IMPORTED_MODULE_1__(".customizer").removeClass('show-service-panel');
                });
            });
            // ============================================================== 
            // This is for the floating labels
            // ============================================================== 
            jquery__WEBPACK_IMPORTED_MODULE_1__('.floating-labels .form-control').on('focus blur', function (e) {
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
            }).trigger('blur');
            // ============================================================== 
            //tooltip
            // ============================================================== 
            // $(function() {
            //     $('[data-toggle="tooltip"]').tooltip()
            // })
            // ============================================================== 
            //Popover
            // ============================================================== 
            // $(function() {
            //     $('[data-toggle="popover"]').popover()
            // })
            // ============================================================== 
            // Perfact scrollbar
            // ============================================================== 
            // $('.message-center, .customizer-body, .scrollable').perfectScrollbar({
            //     wheelPropagation: !0
            // });
            /*var ps = new PerfectScrollbar('.message-body');
            var ps = new PerfectScrollbar('.notifications');
            var ps = new PerfectScrollbar('.scroll-sidebar');
            var ps = new PerfectScrollbar('.customizer-body');*/
            // ============================================================== 
            // Resize all elements
            // ============================================================== 
            jquery__WEBPACK_IMPORTED_MODULE_1__("body, .page-wrapper").trigger("resize");
            jquery__WEBPACK_IMPORTED_MODULE_1__(".page-wrapper").show();
            // ============================================================== 
            // To do list
            // ============================================================== 
            jquery__WEBPACK_IMPORTED_MODULE_1__(".list-task li label").click(function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).toggleClass("task-done");
            });
            //****************************
            /* This is for the mini-sidebar if width is less then 1170*/
            //**************************** 
            var setsidebartype = function () {
                var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
                if (width < 1170) {
                    jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                }
                else {
                    jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").attr("data-sidebartype", "full");
                }
            };
            jquery__WEBPACK_IMPORTED_MODULE_1__(window).ready(setsidebartype);
            jquery__WEBPACK_IMPORTED_MODULE_1__(window).on("resize", setsidebartype);
            //****************************
            /* This is for sidebartoggler*/
            //****************************
            jquery__WEBPACK_IMPORTED_MODULE_1__('.sidebartoggler').on("click", function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").toggleClass("mini-sidebar");
                if (jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").hasClass("mini-sidebar")) {
                    jquery__WEBPACK_IMPORTED_MODULE_1__(".sidebartoggler").prop("checked", !0);
                    jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
                }
                else {
                    jquery__WEBPACK_IMPORTED_MODULE_1__(".sidebartoggler").prop("checked", !1);
                    jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").attr("data-sidebartype", "full");
                }
            });
        });
        // ============================================================== 
        // Auto select left navbar
        // ============================================================== 
        jquery__WEBPACK_IMPORTED_MODULE_1__(function () {
            "use strict";
            var url = window.location + "";
            var path = url.replace(window.location.protocol + "//" + window.location.host + "/", "");
            var element = jquery__WEBPACK_IMPORTED_MODULE_1__('ul#sidebarnav a').filter(function () {
                return this.href === url || this.href === path; // || url.href.indexOf(this.href) === 0;
            });
            element.parentsUntil(".sidebar-nav").each(function (index) {
                if (jquery__WEBPACK_IMPORTED_MODULE_1__(this).is("li") && jquery__WEBPACK_IMPORTED_MODULE_1__(this).children("a").length !== 0) {
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).children("a").addClass("active");
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).parent("ul#sidebarnav").length === 0
                        ? jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass("active")
                        : jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass("selected");
                }
                else if (!jquery__WEBPACK_IMPORTED_MODULE_1__(this).is("ul") && jquery__WEBPACK_IMPORTED_MODULE_1__(this).children("a").length === 0) {
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass("selected");
                }
                else if (jquery__WEBPACK_IMPORTED_MODULE_1__(this).is("ul")) {
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass('in');
                }
            });
            element.addClass("active");
            jquery__WEBPACK_IMPORTED_MODULE_1__('#sidebarnav a').on('click', function (e) {
                if (!jquery__WEBPACK_IMPORTED_MODULE_1__(this).hasClass("active")) {
                    // hide any open menus and remove all other classes
                    jquery__WEBPACK_IMPORTED_MODULE_1__("ul", jquery__WEBPACK_IMPORTED_MODULE_1__(this).parents("ul:first")).removeClass("in");
                    jquery__WEBPACK_IMPORTED_MODULE_1__("a", jquery__WEBPACK_IMPORTED_MODULE_1__(this).parents("ul:first")).removeClass("active");
                    // open our new menu and add the open class
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).next("ul").addClass("in");
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass("active");
                }
                else if (jquery__WEBPACK_IMPORTED_MODULE_1__(this).hasClass("active")) {
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).removeClass("active");
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).parents("ul:first").removeClass("active");
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).next("ul").removeClass("in");
                }
            });
            jquery__WEBPACK_IMPORTED_MODULE_1__('#sidebarnav >li >a.has-arrow').on('click', function (e) {
                e.preventDefault();
            });
        });
        window.onscroll = function () { scrollFunction(); };
        function scrollFunction() {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
                document.getElementById("navbar-sewn").style.backgroundColor = "#ffffff";
                document.getElementById("white-sewn-logo").style.display = "none";
                document.getElementById("black-sewn-logo").style.display = "block";
                document.getElementById("white-add").style.display = "none";
                document.getElementById("black-add").style.display = "block";
                document.getElementById("white-msg").style.display = "none";
                document.getElementById("black-msg").style.display = "block";
                document.getElementById("white-alert").style.display = "none";
                document.getElementById("black-alert").style.display = "block";
                // document.getElementById("white-search").style.display = "none";
                // document.getElementById("black-search").style.display = "block";
            }
            else {
                document.getElementById("navbar-sewn").style.backgroundColor = "transparent";
                document.getElementById("white-sewn-logo").style.display = "block";
                document.getElementById("black-sewn-logo").style.display = "none";
                document.getElementById("white-add").style.display = "block";
                document.getElementById("black-add").style.display = "none";
                document.getElementById("white-msg").style.display = "block";
                document.getElementById("black-msg").style.display = "none";
                document.getElementById("white-alert").style.display = "block";
                document.getElementById("black-alert").style.display = "none";
                // document.getElementById("white-search").style.display = "block";
                // document.getElementById("black-search").style.display = "none";
            }
        }
    }
    ngAfterViewInit() {
        jquery__WEBPACK_IMPORTED_MODULE_1__(".closed-link").click(function () {
            jquery__WEBPACK_IMPORTED_MODULE_1__(".checking").addClass("ti-menu");
            jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").removeClass("show-sidebar");
        });
    }
}
FeaturesComponent.ɵfac = function FeaturesComponent_Factory(t) { return new (t || FeaturesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
FeaturesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FeaturesComponent, selectors: [["app-features"]], decls: 134, vars: 0, consts: [["id", "main-wrapper", 1, "mini-sidebar"], [1, "sewn-bg-img"], ["data-navbarbg", "skin5", 1, "topbar"], ["id", "navbar-sewn", 1, "navbar", "top-navbar", "navbar-expand-md", "navbar-dark"], ["data-logobg", "skin5", 1, "navbar-header"], ["href", "javascript:void(0)", 1, "nav-toggler", "waves-effect", "waves-light", "d-block", "d-md-none"], [1, "ti-menu", "ti-close"], ["href", "javascript:void(0)", 1, "navbar-brand"], ["src", "assets/images/Sewn-logo.png", "alt", "user", "id", "white-sewn-logo", 1, "Sewn-Logo", "web-logo"], ["src", "assets/images/sewn-black-logo.svg", "alt", "user", "id", "black-sewn-logo", 1, "Sewn-Logo", "mobile-logo"], ["src", "assets/images/sewn-black-logo.svg", "alt", "user", 1, "Sewn-Logo", "mobile-logo"], ["href", "javascript:void(0)", "data-toggle", "collapse", "data-target", "#navbarSupportedContent", "aria-controls", "navbarSupportedContent", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "topbartoggler", "d-block", "d-md-none", "waves-effect", "waves-light"], [1, "ti-more"], ["id", "navbarSupportedContent", "data-navbarbg", "skin5", 1, "navbar-collapse", "collapse"], [1, "float-left", "mr-auto"], [1, "navbar-nav", "position-standerd"], [1, "nav-item", "d-none", "d-md-block"], ["href", "javascript:void(0)", "data-sidebartype", "mini-sidebar", 1, "nav-link", "sidebartoggler", "waves-effect", "waves-light"], [1, "mdi", "mdi-menu", "font-24"], [1, "nav-item", "search-box"], ["href", "javascript:void(0)", 1, "nav-link", "waves-effect", "waves-dark"], [1, "d-inline", "col-sm-12", "search-div"], ["type", "text", "name", "search", "placeholder", "Search..", 1, "search"], [1, "navbar-nav", "float-right"], [1, "nav-item", "dropdown", "notify"], ["href", "", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle", "waves-effect", "waves-dark", "blob"], ["src", "assets/images/add.png", "alt", "Dashboard", "id", "white-add"], ["src", "assets/images/black-add.svg", "alt", "Dashboard", "id", "black-add"], ["src", "assets/images/message.png", "alt", "Dashboard", "id", "white-msg"], ["src", "assets/images/black-message.svg", "alt", "Dashboard", "id", "black-msg"], ["href", "", "id", "2", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle", "waves-effect", "waves-dark", "blob"], ["src", "assets/images/alerts.png", "alt", "Dashboard", "id", "white-alert"], ["src", "assets/images/black-alerts.svg", "alt", "Dashboard", "id", "black-alert"], [1, "nav-item", "dropdown"], ["href", "", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle", "text-muted", "pro-pic"], ["src", "assets/images/user-profile.png", "alt", "user", "width", "31", 1, "rounded-circle"], [1, "sewn-profile"], [1, "username", "w-100"], [1, "username", "admin-p", "w-100"], ["data-sidebarbg", "skin5", 1, "left-sidebar"], [1, "scroll-sidebar"], [1, "sidebar-nav"], ["id", "sidebarnav", 1, "p-t-30"], [1, "sidebar-item"], ["routerLink", "/features/dashboard", "aria-expanded", "false", 1, "sidebar-link", "dark", "sidebar-link", "dash", "active"], ["src", "assets/images/dashboard.svg", "alt", "Dashboard"], [1, "hide-menu"], ["href", "javascript:void(0)", "aria-expanded", "false", 1, "sidebar-link", "dark", "sidebar-link", "dash"], ["src", "assets/images/sourcing-module.svg", "alt", "Dashboard"], ["href", "javascript:void(0", "aria-expanded", "false", "href", "javascript:void(0)", 1, "sidebar-link", "has-arrow", "dark", "dash"], ["src", "assets/images/order-management.svg", "alt", "Dashboard"], ["aria-expanded", "false", 1, "collapse", "first-level"], [1, "sidebar-item", "closed-link"], ["href", "javascript:void(0)", 1, "sidebar-link"], ["src", "assets/images/farm-link.svg", "alt", "Dashboard"], ["href", "javascript:void(0", "aria-expanded", "false", 1, "sidebar-link", "dark", "sidebar-link", "dash"], ["src", "assets/images/insights.png", "alt", "Dashboard"], ["src", "assets/images/e-commerce.png", "alt", "Dashboard"], ["src", "assets/images/marketing -sales.png", "alt", "Dashboard"], ["src", "assets/images/people.png", "alt", "Dashboard"], ["routerLink", "../people/manage-role", 1, "sidebar-link"], ["routerLink", "../people/user-management", 1, "sidebar-link"], [1, "sidebar-item", "mt-5"], ["href", "javascript:void(0)", "aria-expanded", "false", 1, "sidebar-link", "dark", "dash"], ["src", "assets/images/help-and-support.png", "alt", "Dashboard"], ["href", "javascript:void(0)", "aria-expanded", "false", 1, "sidebar-link", "waves-effect", "waves-dark", "dash"], ["src", "assets/images/terms-and-conditions.png", "alt", "Dashboard"], [1, "sidebar-item", "mb-2"], ["src", "assets/images/privacy-policy.png", "alt", "Dashboard"], [1, "page-wrapper"], [1, "container-fluid"]], template: function FeaturesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "header", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nav", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "img", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "i", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "ul", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "i", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "li", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "ul", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "img", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "img", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "img", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "img", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "li", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "a", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "img", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "img", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "li", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "img", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, " \u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "span", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "span", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, " Mollie Jennings");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "span", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Admin");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "aside", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "nav", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "ul", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "li", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "a", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "img", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Dashboard");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "li", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "a", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "img", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "Sourcing Module");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "li", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "a", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](61, "img", 50);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Order Management ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "ul", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "li", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "a", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, " My Orders ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "li", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "a", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, " Payments ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "li", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "a", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "img", 54);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Farm Link ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "ul", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "li", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "a", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, " My Orders ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "li", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "a", 53);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, " Payments ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "li", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "a", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](89, "img", 56);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "Insights");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "li", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "a", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](94, "img", 57);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](96, "E-commerce");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "li", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "a", 55);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](99, "img", 58);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, "Marketing+Sales");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "li", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "a", 49);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "img", 59);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](106, "People ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "ul", 51);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "li", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "a", 60);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, " Manage Roles ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "li", 52);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "a", 61);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, " User Management ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "li", 62);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "a", 63);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](118, "img", 64);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](120, "Help and Support ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "li", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "a", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "img", 66);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](125, "Terms and Conditions ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "li", 67);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "a", 65);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](128, "img", 68);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "span", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](130, "Privacy Policy ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "div", 69);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "div", 70);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](133, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]], styles: [".welcome-sec[_ngcontent-%COMP%]{\r\n    border-radius: 5px;\r\n    padding: 30px;\r\n    font-size: 14px;\r\n}\r\n.update-title[_ngcontent-%COMP%]{\r\n    font-family: 'PlayfairDisplay';\r\n    font-size: 34px;\r\n    color: #000000;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n}\r\n.create-role-butn[_ngcontent-%COMP%]{\r\n    background-color: #3d8462;\r\n    border:1px solid #3d8462;\r\n    color: #FFFFFF;\r\n    font-weight: 600;\r\n    font-size: 14px;\r\n    padding: 2% 10%;\r\n    border-radius: 8px;\r\n}\r\n.welocme_txt[_ngcontent-%COMP%]{\r\n   word-wrap: break-word;\r\n    padding: 1% 7% 2%;\r\n    font-weight: 600;\r\n    color: #256547;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    line-height: 1.43;\r\n    color: #666666;\r\n  }\r\n.sewn-bg-img[_ngcontent-%COMP%]{\r\n    background-image: url('sewn-bg-cover.png') !important;\r\n    width: 100%;\r\n    height: 150px;\r\n    position: fixed;\r\n    top: 0;\r\n    background-size: cover;\r\n    overflow: hidden;   \r\n    }\r\n.hello-txt[_ngcontent-%COMP%]{\r\n    font-family: PlayfairDisplay;\r\n    font-size: 38px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 1.21;\r\n    letter-spacing: normal;\r\n    text-align: center;\r\n    color: #ffffff;\r\n    }\r\n.header-sewn[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n    position: relative;\r\n    top: -5rem;\r\n    }\r\n.search-sewn[_ngcontent-%COMP%]{\r\n    color: #aeaeae;\r\n    font-size: 16px;\r\n    padding-left: 5px;\r\n    }\r\n.username[_ngcontent-%COMP%]{\r\n     color: #fff;\r\n    font-size: 14px;\r\n    line-height: 0;\r\n    }\r\n.admin-p[_ngcontent-%COMP%]{\r\n        display: block;\r\n    }\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link[_ngcontent-%COMP%]:hover {\r\n    border: 1px solid #3d8462;\r\n    border-radius: 8px;\r\n    position: relative;\r\n}\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link.active[_ngcontent-%COMP%]{\r\n    border: 1px solid #3d8462;\r\n    border-radius: 8px;\r\n        position: relative;\r\n    }\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link[_ngcontent-%COMP%]{\r\n         position: relative;\r\n    }\r\n.dark.active[_ngcontent-%COMP%]{\r\n         position: relative;\r\n    }\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link[_ngcontent-%COMP%]:before{\r\n    content: \"\";\r\n    width: 5px;\r\n    height: 5px;\r\n    background: #666666;\r\n    border-radius: 50%;\r\n    position: absolute;\r\n    top: 15px;\r\n    left: 10px;\r\n    }\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link.active[_ngcontent-%COMP%]:before{\r\n    content: \"\";\r\n    width: 5px;\r\n    height: 5px;\r\n    background: #3d8462;\r\n    border-radius: 50%;\r\n    position: absolute;\r\n    top: 15px;\r\n    left: 10px;\r\n    }\r\n.position-standerd[_ngcontent-%COMP%]{\r\n    position: absolute;\r\n    top: 0;\r\n    left: 8rem;\r\n    }\r\n.dark.active[_ngcontent-%COMP%]:before{\r\n   content: \"\";\r\n    width: 4px;\r\n    height: 30px;\r\n    background: #3d8462;\r\n    position: absolute;\r\n    border-radius: 100px;\r\n    top: 12px;\r\n    left: 0px;\r\n   \r\n    }\r\n.dash[_ngcontent-%COMP%]{position: relative;}\r\n.dash[_ngcontent-%COMP%]:before{\r\n    position: absolute;\r\n    content: \"\";\r\n    border-bottom: 1px dashed #aeaeae;\r\n    padding-bottom: .5rem;\r\n    width: 60%;\r\n    left: 24%;\r\n    bottom: 0rem;}\r\n.mini-sidebar[_ngcontent-%COMP%]   .collapse.in[_ngcontent-%COMP%]{display: none;}\r\n.mini-sidebar[_ngcontent-%COMP%]   .sidebar-item[_ngcontent-%COMP%]:hover   .collapse.in[_ngcontent-%COMP%]{display: block;}\r\n.mini-sidebar[_ngcontent-%COMP%]   .dash[_ngcontent-%COMP%]:before{border-bottom: 0;}\r\n.mini-sidebar[_ngcontent-%COMP%]   .left-sidebar[_ngcontent-%COMP%]:hover   .dash[_ngcontent-%COMP%]:before{border-bottom: 1px dashed #aeaeae;}\r\n.mobile-logo[_ngcontent-%COMP%]{\r\n        display: none;\r\n    }\r\ni.mdi[_ngcontent-%COMP%] {\r\n        color: transparent !important;\r\n    }\r\n.sewn-profile[_ngcontent-%COMP%]{\r\n        display: block;\r\n        float: right;\r\n        width: 70%;\r\n        line-height: 41px;\r\n        padding-top: 0.2rem;\r\n    }\r\n#black-sewn-logo[_ngcontent-%COMP%]{\r\n        display:none;\r\n    }\r\n#black-add[_ngcontent-%COMP%], #black-msg[_ngcontent-%COMP%], #black-alert[_ngcontent-%COMP%], #black-search[_ngcontent-%COMP%]{\r\n        display:none;  \r\n    }\r\n.nav-item.notify[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n        padding-top: 15px !important;\r\n        top: 22px;\r\n        line-height: normal !important;\r\n    }\r\n#navbar-sewn[_ngcontent-%COMP%]{\r\n        position: fixed;\r\n    left: 0px;\r\n    right: 0px;\r\n    top: 0px;\r\n    }\r\n\r\n@media only screen and (min-width: 1024px) {\r\n        .page-wrapper[_ngcontent-%COMP%] {\r\n    margin-left: 0px; \r\n    margin-top: 6rem;\r\n }\r\n\r\n\r\n    }\r\n@media only screen and (max-width: 767px) {\r\n        .mobile-logo[_ngcontent-%COMP%]{\r\n            display: block;\r\n        }\r\n        .web-logo[_ngcontent-%COMP%], .sewn-bg-img[_ngcontent-%COMP%]{\r\n            display: none;\r\n        }\r\n\r\n        i.mdi[_ngcontent-%COMP%] {\r\n            color: #c29d7a !important;\r\n        }\r\n\r\n \r\n    }\r\n.search[_ngcontent-%COMP%]{\r\n    font-family: 'Montserrat';\r\n    height: 38px;\r\n    border-radius: 8px;\r\n    border: solid 0px #cccccc;\r\n    background-color: #ffffff;\r\n    background: url('header-search.svg') no-repeat scroll 12px 5px;\r\n    padding-left: 45px;\r\n    }\r\n.search-black[_ngcontent-%COMP%]{\r\n        font-family: 'Montserrat';\r\n        height: 38px;\r\n        border-radius: 8px;\r\n        border: solid 0px #cccccc;\r\n        background-color: #ffffff;\r\n        background: url('black-search.svg') no-repeat scroll 12px 5px;\r\n        padding-left: 45px;\r\n    }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZmVhdHVyZXMvZmVhdHVyZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsZUFBZTtBQUNuQjtBQUNBO0lBQ0ksOEJBQThCO0lBQzlCLGVBQWU7SUFDZixjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLHNCQUFzQjtBQUMxQjtBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLHdCQUF3QjtJQUN4QixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCO0FBQ0E7R0FDRyxxQkFBcUI7SUFDcEIsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsY0FBYztFQUNoQjtBQUVFO0lBQ0EscURBQXVFO0lBQ3ZFLFdBQVc7SUFDWCxhQUFhO0lBQ2IsZUFBZTtJQUNmLE1BQU07SUFDTixzQkFBc0I7SUFDdEIsZ0JBQWdCO0lBQ2hCO0FBQ0E7SUFDQSw0QkFBNEI7SUFDNUIsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixvQkFBb0I7SUFDcEIsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixzQkFBc0I7SUFDdEIsa0JBQWtCO0lBQ2xCLGNBQWM7SUFDZDtBQUNBO0lBQ0Esa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1Y7QUFDQTtJQUNBLGNBQWM7SUFDZCxlQUFlO0lBQ2YsaUJBQWlCO0lBQ2pCO0FBRUE7S0FDQyxXQUFXO0lBQ1osZUFBZTtJQUNmLGNBQWM7SUFDZDtBQUVBO1FBQ0ksY0FBYztJQUNsQjtBQUVBO0lBQ0EseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7QUFFSTtJQUNBLHlCQUF5QjtJQUN6QixrQkFBa0I7UUFDZCxrQkFBa0I7SUFDdEI7QUFDQTtTQUNLLGtCQUFrQjtJQUN2QjtBQUNBO1NBQ0ssa0JBQWtCO0lBQ3ZCO0FBQ0E7SUFDQSxXQUFXO0lBQ1gsVUFBVTtJQUNWLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsVUFBVTtJQUNWO0FBQ0E7SUFDQSxXQUFXO0lBQ1gsVUFBVTtJQUNWLFdBQVc7SUFDWCxtQkFBbUI7SUFDbkIsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixTQUFTO0lBQ1QsVUFBVTtJQUNWO0FBQ0E7SUFDQSxrQkFBa0I7SUFDbEIsTUFBTTtJQUNOLFVBQVU7SUFDVjtBQUVGO0dBQ0MsV0FBVztJQUNWLFVBQVU7SUFDVixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixvQkFBb0I7SUFDcEIsU0FBUztJQUNULFNBQVM7O0lBRVQ7QUFDQSxNQUFNLGtCQUFrQixDQUFDO0FBQ3pCO0lBQ0Esa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxpQ0FBaUM7SUFDakMscUJBQXFCO0lBQ3JCLFVBQVU7SUFDVixTQUFTO0lBQ1QsWUFBWSxDQUFDO0FBRWIsMkJBQTJCLGFBQWEsQ0FBQztBQUN6QywrQ0FBK0MsY0FBYyxDQUFDO0FBQzlELDJCQUEyQixnQkFBZ0IsQ0FBQztBQUM1QywrQ0FBK0MsaUNBQWlDLENBQUM7QUFDakY7UUFDSSxhQUFhO0lBQ2pCO0FBQ0E7UUFDSSw2QkFBNkI7SUFDakM7QUFDQTtRQUNJLGNBQWM7UUFDZCxZQUFZO1FBQ1osVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixtQkFBbUI7SUFDdkI7QUFDQTtRQUNJLFlBQVk7SUFDaEI7QUFDQTtRQUNJLFlBQVk7SUFDaEI7QUFFQTtRQUNJLDRCQUE0QjtRQUM1QixTQUFTO1FBQ1QsOEJBQThCO0lBQ2xDO0FBS0E7UUFDSSxlQUFlO0lBQ25CLFNBQVM7SUFDVCxVQUFVO0lBQ1YsUUFBUTtJQUNSO0FBRUEsaUNBQWlDO0FBQ2pDO1FBQ0k7SUFDSixnQkFBZ0I7SUFDaEIsZ0JBQWdCO0NBQ25COzs7SUFHRztBQUVBO1FBQ0k7WUFDSSxjQUFjO1FBQ2xCO1FBQ0E7WUFDSSxhQUFhO1FBQ2pCOztRQUVBO1lBQ0kseUJBQXlCO1FBQzdCOzs7SUFHSjtBQUVBO0lBQ0EseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6Qiw4REFBZ0Y7SUFDaEYsa0JBQWtCO0lBQ2xCO0FBRUE7UUFDSSx5QkFBeUI7UUFDekIsWUFBWTtRQUNaLGtCQUFrQjtRQUNsQix5QkFBeUI7UUFDekIseUJBQXlCO1FBQ3pCLDZEQUErRTtRQUMvRSxrQkFBa0I7SUFDdEIiLCJmaWxlIjoic3JjL2FwcC9mZWF0dXJlcy9mZWF0dXJlcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndlbGNvbWUtc2Vje1xyXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgcGFkZGluZzogMzBweDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG4udXBkYXRlLXRpdGxle1xyXG4gICAgZm9udC1mYW1pbHk6ICdQbGF5ZmFpckRpc3BsYXknO1xyXG4gICAgZm9udC1zaXplOiAzNHB4O1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxufVxyXG4uY3JlYXRlLXJvbGUtYnV0bntcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7XHJcbiAgICBib3JkZXI6MXB4IHNvbGlkICMzZDg0NjI7XHJcbiAgICBjb2xvcjogI0ZGRkZGRjtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBwYWRkaW5nOiAyJSAxMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbn1cclxuLndlbG9jbWVfdHh0e1xyXG4gICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XHJcbiAgICBwYWRkaW5nOiAxJSA3JSAyJTtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzI1NjU0NztcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBsaW5lLWhlaWdodDogMS40MztcclxuICAgIGNvbG9yOiAjNjY2NjY2O1xyXG4gIH1cclxuXHJcbiAgICAuc2V3bi1iZy1pbWd7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vLi4vYXNzZXRzL2ltYWdlcy9zZXduLWJnLWNvdmVyLnBuZykgIWltcG9ydGFudDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxNTBweDtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMDtcclxuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuOyAgIFxyXG4gICAgfVxyXG4gICAgLmhlbGxvLXR4dHtcclxuICAgIGZvbnQtZmFtaWx5OiBQbGF5ZmFpckRpc3BsYXk7XHJcbiAgICBmb250LXNpemU6IDM4cHg7XHJcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogMS4yMTtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIH1cclxuICAgIC5oZWFkZXItc2V3bntcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIHRvcDogLTVyZW07XHJcbiAgICB9XHJcbiAgICAuc2VhcmNoLXNld257XHJcbiAgICBjb2xvcjogI2FlYWVhZTtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIHBhZGRpbmctbGVmdDogNXB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAudXNlcm5hbWV7XHJcbiAgICAgY29sb3I6ICNmZmY7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBsaW5lLWhlaWdodDogMDtcclxuICAgIH1cclxuXHJcbiAgICAuYWRtaW4tcHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmNvbGxhcHNlIGEuc2lkZWJhci1saW5rOmhvdmVyIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICMzZDg0NjI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuICAgIFxyXG4gICAgLmNvbGxhcHNlICBhLnNpZGViYXItbGluay5hY3RpdmV7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjM2Q4NDYyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIH1cclxuICAgIC5jb2xsYXBzZSAgYS5zaWRlYmFyLWxpbmt7XHJcbiAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIH1cclxuICAgIC5kYXJrLmFjdGl2ZXtcclxuICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgfVxyXG4gICAgLmNvbGxhcHNlICBhLnNpZGViYXItbGluazpiZWZvcmV7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgd2lkdGg6IDVweDtcclxuICAgIGhlaWdodDogNXB4O1xyXG4gICAgYmFja2dyb3VuZDogIzY2NjY2NjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTVweDtcclxuICAgIGxlZnQ6IDEwcHg7XHJcbiAgICB9XHJcbiAgICAuY29sbGFwc2UgIGEuc2lkZWJhci1saW5rLmFjdGl2ZTpiZWZvcmV7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgd2lkdGg6IDVweDtcclxuICAgIGhlaWdodDogNXB4O1xyXG4gICAgYmFja2dyb3VuZDogIzNkODQ2MjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMTVweDtcclxuICAgIGxlZnQ6IDEwcHg7XHJcbiAgICB9XHJcbiAgICAucG9zaXRpb24tc3RhbmRlcmR7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBsZWZ0OiA4cmVtO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgLmRhcmsuYWN0aXZlOmJlZm9yZXtcclxuICAgY29udGVudDogXCJcIjtcclxuICAgIHdpZHRoOiA0cHg7XHJcbiAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjM2Q4NDYyO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTAwcHg7XHJcbiAgICB0b3A6IDEycHg7XHJcbiAgICBsZWZ0OiAwcHg7XHJcbiAgIFxyXG4gICAgfVxyXG4gICAgLmRhc2h7cG9zaXRpb246IHJlbGF0aXZlO31cclxuICAgIC5kYXNoOmJlZm9yZXtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkICNhZWFlYWU7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogLjVyZW07XHJcbiAgICB3aWR0aDogNjAlO1xyXG4gICAgbGVmdDogMjQlO1xyXG4gICAgYm90dG9tOiAwcmVtO31cclxuICAgIFxyXG4gICAgLm1pbmktc2lkZWJhciAuY29sbGFwc2UuaW57ZGlzcGxheTogbm9uZTt9XHJcbiAgICAubWluaS1zaWRlYmFyIC5zaWRlYmFyLWl0ZW06aG92ZXIgLmNvbGxhcHNlLmlue2Rpc3BsYXk6IGJsb2NrO31cclxuICAgIC5taW5pLXNpZGViYXIgLmRhc2g6YmVmb3Jle2JvcmRlci1ib3R0b206IDA7fVxyXG4gICAgLm1pbmktc2lkZWJhciAubGVmdC1zaWRlYmFyOmhvdmVyIC5kYXNoOmJlZm9yZXtib3JkZXItYm90dG9tOiAxcHggZGFzaGVkICNhZWFlYWU7fVxyXG4gICAgLm1vYmlsZS1sb2dve1xyXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICB9XHJcbiAgICBpLm1kaSB7XHJcbiAgICAgICAgY29sb3I6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XHJcbiAgICB9XHJcbiAgICAuc2V3bi1wcm9maWxle1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICB3aWR0aDogNzAlO1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0MXB4O1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiAwLjJyZW07XHJcbiAgICB9XHJcbiAgICAjYmxhY2stc2V3bi1sb2dve1xyXG4gICAgICAgIGRpc3BsYXk6bm9uZTtcclxuICAgIH1cclxuICAgICNibGFjay1hZGQsICNibGFjay1tc2csICNibGFjay1hbGVydCwgI2JsYWNrLXNlYXJjaHtcclxuICAgICAgICBkaXNwbGF5Om5vbmU7ICBcclxuICAgIH1cclxuXHJcbiAgICAubmF2LWl0ZW0ubm90aWZ5IGF7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDE1cHggIWltcG9ydGFudDtcclxuICAgICAgICB0b3A6IDIycHg7XHJcbiAgICAgICAgbGluZS1oZWlnaHQ6IG5vcm1hbCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuICAgXHJcbiAgICBcclxuXHJcbiAgICAjbmF2YmFyLXNld257XHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgbGVmdDogMHB4O1xyXG4gICAgcmlnaHQ6IDBweDtcclxuICAgIHRvcDogMHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qIGN1c3RvbSBjb2RlIHBhZ2Ugd3JhcHBlciAxMDI0Ki9cclxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAyNHB4KSB7XHJcbiAgICAgICAgLnBhZ2Utd3JhcHBlciB7XHJcbiAgICBtYXJnaW4tbGVmdDogMHB4OyBcclxuICAgIG1hcmdpbi10b3A6IDZyZW07XHJcbiB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAgICAgLm1vYmlsZS1sb2dve1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLndlYi1sb2dvLCAuc2V3bi1iZy1pbWd7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpLm1kaSB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjYzI5ZDdhICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuIFxyXG4gICAgfVxyXG5cclxuICAgIC5zZWFyY2h7XHJcbiAgICBmb250LWZhbWlseTogJ01vbnRzZXJyYXQnO1xyXG4gICAgaGVpZ2h0OiAzOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgYm9yZGVyOiBzb2xpZCAwcHggI2NjY2NjYztcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICBiYWNrZ3JvdW5kOiB1cmwoLi4vLi4vYXNzZXRzL2ltYWdlcy9oZWFkZXItc2VhcmNoLnN2Zykgbm8tcmVwZWF0IHNjcm9sbCAxMnB4IDVweDtcclxuICAgIHBhZGRpbmctbGVmdDogNDVweDtcclxuICAgIH1cclxuXHJcbiAgICAuc2VhcmNoLWJsYWNre1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCc7XHJcbiAgICAgICAgaGVpZ2h0OiAzOHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgICAgICBib3JkZXI6IHNvbGlkIDBweCAjY2NjY2NjO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKC4uLy4uL2Fzc2V0cy9pbWFnZXMvYmxhY2stc2VhcmNoLnN2Zykgbm8tcmVwZWF0IHNjcm9sbCAxMnB4IDVweDtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDQ1cHg7XHJcbiAgICB9XHJcbiAgICAiXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeaturesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-features',
                templateUrl: './features.component.html',
                styleUrls: ['./features.component.css']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, null); })();


/***/ }),

/***/ "./src/app/features/features.module.ts":
/*!*********************************************!*\
  !*** ./src/app/features/features.module.ts ***!
  \*********************************************/
/*! exports provided: FeaturesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeaturesModule", function() { return FeaturesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _features_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./features-routing.module */ "./src/app/features/features-routing.module.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/features/dashboard/dashboard.component.ts");
/* harmony import */ var _roaster_onboarding_roaster_onboarding_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./roaster-onboarding/roaster-onboarding.component */ "./src/app/features/roaster-onboarding/roaster-onboarding.component.ts");
/* harmony import */ var _roaster_quick_setup_roaster_quick_setup_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./roaster-quick-setup/roaster-quick-setup.component */ "./src/app/features/roaster-quick-setup/roaster-quick-setup.component.ts");
/* harmony import */ var _roaster_complete_setup_roaster_complete_setup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./roaster-complete-setup/roaster-complete-setup.component */ "./src/app/features/roaster-complete-setup/roaster-complete-setup.component.ts");
/* harmony import */ var _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pagenotfound/pagenotfound.component */ "./src/app/features/pagenotfound/pagenotfound.component.ts");
/* harmony import */ var _features_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./features.component */ "./src/app/features/features.component.ts");
/* harmony import */ var primeng_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/button */ "./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-button.js");
/* harmony import */ var _welcome_aboard_welcome_aboard_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./welcome-aboard/welcome-aboard.component */ "./src/app/features/welcome-aboard/welcome-aboard.component.ts");









//PrimeNG Modules



class FeaturesModule {
}
FeaturesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: FeaturesModule });
FeaturesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function FeaturesModule_Factory(t) { return new (t || FeaturesModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _features_routing_module__WEBPACK_IMPORTED_MODULE_2__["FeaturesRoutingModule"],
            //PrimeNG Modules
            primeng_button__WEBPACK_IMPORTED_MODULE_9__["ButtonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FeaturesModule, { declarations: [_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"],
        _roaster_onboarding_roaster_onboarding_component__WEBPACK_IMPORTED_MODULE_4__["RoasterOnboardingComponent"],
        _roaster_quick_setup_roaster_quick_setup_component__WEBPACK_IMPORTED_MODULE_5__["RoasterQuickSetupComponent"],
        _roaster_complete_setup_roaster_complete_setup_component__WEBPACK_IMPORTED_MODULE_6__["RoasterCompleteSetupComponent"],
        _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_7__["PagenotfoundComponent"], _features_component__WEBPACK_IMPORTED_MODULE_8__["FeaturesComponent"], _welcome_aboard_welcome_aboard_component__WEBPACK_IMPORTED_MODULE_10__["WelcomeAboardComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _features_routing_module__WEBPACK_IMPORTED_MODULE_2__["FeaturesRoutingModule"],
        //PrimeNG Modules
        primeng_button__WEBPACK_IMPORTED_MODULE_9__["ButtonModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeaturesModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"],
                    _roaster_onboarding_roaster_onboarding_component__WEBPACK_IMPORTED_MODULE_4__["RoasterOnboardingComponent"],
                    _roaster_quick_setup_roaster_quick_setup_component__WEBPACK_IMPORTED_MODULE_5__["RoasterQuickSetupComponent"],
                    _roaster_complete_setup_roaster_complete_setup_component__WEBPACK_IMPORTED_MODULE_6__["RoasterCompleteSetupComponent"],
                    _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_7__["PagenotfoundComponent"], _features_component__WEBPACK_IMPORTED_MODULE_8__["FeaturesComponent"], _welcome_aboard_welcome_aboard_component__WEBPACK_IMPORTED_MODULE_10__["WelcomeAboardComponent"]
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _features_routing_module__WEBPACK_IMPORTED_MODULE_2__["FeaturesRoutingModule"],
                    //PrimeNG Modules
                    primeng_button__WEBPACK_IMPORTED_MODULE_9__["ButtonModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/features/pagenotfound/pagenotfound.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/features/pagenotfound/pagenotfound.component.ts ***!
  \*****************************************************************/
/*! exports provided: PagenotfoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagenotfoundComponent", function() { return PagenotfoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class PagenotfoundComponent {
    constructor() { }
    ngOnInit() {
    }
}
PagenotfoundComponent.ɵfac = function PagenotfoundComponent_Factory(t) { return new (t || PagenotfoundComponent)(); };
PagenotfoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PagenotfoundComponent, selectors: [["app-pagenotfound"]], decls: 2, vars: 0, template: function PagenotfoundComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "pagenotfound works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlYXR1cmVzL3BhZ2Vub3Rmb3VuZC9wYWdlbm90Zm91bmQuY29tcG9uZW50LmNzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PagenotfoundComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-pagenotfound',
                templateUrl: './pagenotfound.component.html',
                styleUrls: ['./pagenotfound.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/features/roaster-complete-setup/roaster-complete-setup.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/features/roaster-complete-setup/roaster-complete-setup.component.ts ***!
  \*************************************************************************************/
/*! exports provided: RoasterCompleteSetupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoasterCompleteSetupComponent", function() { return RoasterCompleteSetupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class RoasterCompleteSetupComponent {
    constructor() { }
    ngOnInit() {
    }
}
RoasterCompleteSetupComponent.ɵfac = function RoasterCompleteSetupComponent_Factory(t) { return new (t || RoasterCompleteSetupComponent)(); };
RoasterCompleteSetupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RoasterCompleteSetupComponent, selectors: [["app-roaster-complete-setup"]], decls: 2, vars: 0, template: function RoasterCompleteSetupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "roaster-complete-setup works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlYXR1cmVzL3JvYXN0ZXItY29tcGxldGUtc2V0dXAvcm9hc3Rlci1jb21wbGV0ZS1zZXR1cC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RoasterCompleteSetupComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-roaster-complete-setup',
                templateUrl: './roaster-complete-setup.component.html',
                styleUrls: ['./roaster-complete-setup.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/features/roaster-onboarding/roaster-onboarding.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/features/roaster-onboarding/roaster-onboarding.component.ts ***!
  \*****************************************************************************/
/*! exports provided: RoasterOnboardingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoasterOnboardingComponent", function() { return RoasterOnboardingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class RoasterOnboardingComponent {
    constructor() { }
    ngOnInit() {
    }
}
RoasterOnboardingComponent.ɵfac = function RoasterOnboardingComponent_Factory(t) { return new (t || RoasterOnboardingComponent)(); };
RoasterOnboardingComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RoasterOnboardingComponent, selectors: [["app-roaster-onboarding"]], decls: 23, vars: 0, consts: [[1, "header-sewn"], [1, "hello-txt"], [1, "col-sm-12", "col-md-12", "col-lg-12"], [1, "d-flex", "justify-content-center"], [1, "form-container", "col-md-6", "col-lg-6"], [1, "form-group", "pt-5"], [1, "text-center", "label_title"], [1, "input-group"], ["type", "email", "placeholder", "User work email", "name", "email", "required", "", 1, "form-control", "email"], [1, "input-group-append"], ["type", "button", "routerLink", "../welcome-aboard", 1, "btn", "send-invite"], [1, "send-text"], [1, "col-md-6", "mt-5"], ["data-content", "OR", 1, "hr-text"], [1, "mt-5"], ["routerLink", "/auth/setup", 1, "btn", "continue-btn"], [1, "continue-text"]], template: function RoasterOnboardingComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Onboard Roasters ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "section", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "form", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "INVITE ROASTER FOR SETUP");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "span", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "SEND INVITE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "hr", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "CONTINUE SETUP");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".label_title[_ngcontent-%COMP%]{\r\n    height: 14px;\r\n    font-family: Montserrat;\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #666666;\r\n}\r\n\r\n.hr-text[_ngcontent-%COMP%] {\r\nline-height: 1em;\r\nposition: relative;\r\noutline: 0;\r\nborder: 0;\r\ncolor: black;\r\ntext-align: center;\r\nheight: 1.5em;\r\nopacity: .5;\r\n}\r\n\r\n.hr-text[_ngcontent-%COMP%]::before {\r\n  content: '';\r\n  border: solid 1px #cccccc; \r\n  position: absolute;\r\n  left: 0;\r\n  top: 50%;\r\n  width: 100%;\r\n  height: 1px;\r\n}\r\n\r\n.hr-text[_ngcontent-%COMP%]::after {\r\n  content: 'OR';\r\n  position: relative;\r\n  display: inline-block;\r\n  color: #666666;\r\n  font-family: Montserrat;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  padding: 0 1.5em;\r\n  line-height: 1.5em;\r\n  color: #818078;\r\n  background-color: #ffffff;\r\n}\r\n\r\n.email[_ngcontent-%COMP%]{\r\n    height: 50px;\r\nborder-radius: 6px;\r\nborder: solid 1px #cccccc;\r\nbackground-color: #ffffff;\r\n}\r\n\r\n.send-invite[_ngcontent-%COMP%]{\r\n   height: 50px;\r\nborder-radius: 6px;\r\nbackground-color: #3d8462;\r\ncolor: #ffffff;\r\n\r\n}\r\n\r\n.send-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 600;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #ffffff;\r\n\r\n}\r\n\r\n.send-invite[_ngcontent-%COMP%]:hover{\r\n  background-color: #3d8462; \r\n  box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n\r\n}\r\n\r\n[_ngcontent-%COMP%]::-webkit-input-placeholder{\r\n    font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n\r\n[_ngcontent-%COMP%]::-moz-placeholder{\r\n    font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n\r\n[_ngcontent-%COMP%]::-ms-input-placeholder{\r\n    font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n\r\n[_ngcontent-%COMP%]::placeholder{\r\n    font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n\r\n[_ngcontent-%COMP%]::-webkit-input-placeholder{\r\n   font-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n\r\n.continue-btn[_ngcontent-%COMP%]{\r\n  border-radius: 6px;\r\n  background-color: #3d8462;\r\n  height: 50px;\r\n  padding: 0% 10%;\r\n}\r\n\r\n.continue-text[_ngcontent-%COMP%]{\r\nfont-family: Montserrat;\r\nfont-size: 14px;\r\nfont-weight: 600;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ntext-align: center;\r\ncolor: #ffffff;\r\n\r\n}\r\n\r\n.continue-btn[_ngcontent-%COMP%]:hover{\r\n  background-color: #3d8462; \r\n  box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%]{\r\n  margin-bottom: 0%;\r\n}\r\n\r\n@media only screen and (min-width: 320px) and (max-width: 990px) {\r\n  .label_title[_ngcontent-%COMP%]{\r\n    height: 14px;\r\n    font-family: Montserrat;\r\n    font-size: 9px;\r\n    font-weight: 600;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #666666;\r\n}\r\n.email[_ngcontent-%COMP%]{\r\n    height: 30px;\r\nborder-radius: 6px;\r\nborder: solid 1px #cccccc;\r\nbackground-color: #ffffff;\r\n}\r\n.send-invite[_ngcontent-%COMP%]{\r\n   height: 30px;\r\nborder-radius: 6px;\r\nbackground-color: #3d8462;\r\ncolor: #ffffff;\r\npadding-top: 0;\r\n}\r\n.send-text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\nfont-size: 8px;\r\nfont-weight: 600;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #ffffff;\r\npadding: 0% 10%;\r\n}\r\n .continue-btn[_ngcontent-%COMP%]{\r\n  border-radius: 6px;\r\n  background-color: #3d8462;\r\n  height: 30px;\r\n  padding-top: 0;\r\n}\r\n.continue-text[_ngcontent-%COMP%]{\r\nfont-family: Montserrat;\r\nfont-size: 8px;\r\nfont-weight: 600;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ntext-align: center;\r\ncolor: #ffffff;\r\npadding: 0% 10%;\r\n}\r\n.hr-text[_ngcontent-%COMP%] {\r\nline-height: 1em;\r\nposition: relative;\r\noutline: 0;\r\nborder: 0;\r\ncolor: black;\r\ntext-align: center;\r\nheight: 1.5em;\r\nopacity: .5;\r\n}\r\n.hr-text[_ngcontent-%COMP%]::before {\r\n  content: '';\r\n  border: solid 1px #cccccc; \r\n  position: absolute;\r\n  left: 0;\r\n  top: 50%;\r\n  width: 100%;\r\n  height: 1px;\r\n}\r\n.hr-text[_ngcontent-%COMP%]::after {\r\n  content: 'OR';\r\n  position: relative;\r\n  display: inline-block;\r\n  color: #666666;\r\n  font-family: Montserrat;\r\n  font-size: 11px;\r\n  font-weight: 600;\r\n  padding: 0 1.5em;\r\n  line-height: 1.5em;\r\n  color: #818078;\r\n  background-color: #ffffff;\r\n}\r\n [_ngcontent-%COMP%]::-webkit-input-placeholder{\r\n    font-family: Montserrat;\r\nfont-size: 10px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n [_ngcontent-%COMP%]::-moz-placeholder{\r\n    font-family: Montserrat;\r\nfont-size: 10px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n [_ngcontent-%COMP%]::-ms-input-placeholder{\r\n    font-family: Montserrat;\r\nfont-size: 10px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n [_ngcontent-%COMP%]::placeholder{\r\n    font-family: Montserrat;\r\nfont-size: 10px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n[_ngcontent-%COMP%]::-webkit-input-placeholder{\r\n   font-family: Montserrat;\r\nfont-size: 10px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #666666;\r\n}\r\n }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZmVhdHVyZXMvcm9hc3Rlci1vbmJvYXJkaW5nL3JvYXN0ZXItb25ib2FyZGluZy5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixjQUFjO0FBQ2xCOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCLGtCQUFrQjtBQUNsQixVQUFVO0FBQ1YsU0FBUztBQUNULFlBQVk7QUFDWixrQkFBa0I7QUFDbEIsYUFBYTtBQUNiLFdBQVc7QUFDWDs7QUFDQTtFQUNFLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLE9BQU87RUFDUCxRQUFRO0VBQ1IsV0FBVztFQUNYLFdBQVc7QUFDYjs7QUFDQTtFQUNFLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLGNBQWM7RUFDZCx1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCx5QkFBeUI7QUFDM0I7O0FBQ0E7SUFDSSxZQUFZO0FBQ2hCLGtCQUFrQjtBQUNsQix5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCOztBQUNBO0dBQ0csWUFBWTtBQUNmLGtCQUFrQjtBQUNsQix5QkFBeUI7QUFDekIsY0FBYzs7QUFFZDs7QUFDQTtJQUNJLHVCQUF1QjtBQUMzQixlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCLG9CQUFvQjtBQUNwQixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixjQUFjOztBQUVkOztBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLCtDQUErQzs7QUFFakQ7O0FBQ0E7SUFDSSx1QkFBdUI7QUFDM0IsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsY0FBYztBQUNkOztBQVRBO0lBQ0ksdUJBQXVCO0FBQzNCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7QUFDZDs7QUFUQTtJQUNJLHVCQUF1QjtBQUMzQixlQUFlO0FBQ2YsZ0JBQWdCO0FBQ2hCLG9CQUFvQjtBQUNwQixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixjQUFjO0FBQ2Q7O0FBVEE7SUFDSSx1QkFBdUI7QUFDM0IsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsY0FBYztBQUNkOztBQUNBO0dBQ0csdUJBQXVCO0FBQzFCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7QUFDZDs7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLGNBQWM7O0FBRWQ7O0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsK0NBQStDO0FBQ2pEOztBQUNBO0VBQ0UsaUJBQWlCO0FBQ25COztBQUVDO0VBQ0M7SUFDRSxZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGNBQWM7QUFDbEI7QUFDQTtJQUNJLFlBQVk7QUFDaEIsa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekI7QUFDQTtHQUNHLFlBQVk7QUFDZixrQkFBa0I7QUFDbEIseUJBQXlCO0FBQ3pCLGNBQWM7QUFDZCxjQUFjO0FBQ2Q7QUFDQTtJQUNJLHVCQUF1QjtBQUMzQixjQUFjO0FBQ2QsZ0JBQWdCO0FBQ2hCLG9CQUFvQjtBQUNwQixrQkFBa0I7QUFDbEIsbUJBQW1CO0FBQ25CLHNCQUFzQjtBQUN0QixjQUFjO0FBQ2QsZUFBZTtBQUNmO0NBQ0M7RUFDQyxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixjQUFjO0FBQ2hCO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsY0FBYztBQUNkLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLGNBQWM7QUFDZCxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixrQkFBa0I7QUFDbEIsVUFBVTtBQUNWLFNBQVM7QUFDVCxZQUFZO0FBQ1osa0JBQWtCO0FBQ2xCLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtFQUNFLFdBQVc7RUFDWCx5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLE9BQU87RUFDUCxRQUFRO0VBQ1IsV0FBVztFQUNYLFdBQVc7QUFDYjtBQUNBO0VBQ0UsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsY0FBYztFQUNkLHlCQUF5QjtBQUMzQjtDQUNDO0lBQ0csdUJBQXVCO0FBQzNCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7QUFDZDtDQVRDO0lBQ0csdUJBQXVCO0FBQzNCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7QUFDZDtDQVRDO0lBQ0csdUJBQXVCO0FBQzNCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7QUFDZDtDQVRDO0lBQ0csdUJBQXVCO0FBQzNCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7QUFDZDtBQUNBO0dBQ0csdUJBQXVCO0FBQzFCLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7QUFDZDtDQUNDIiwiZmlsZSI6InNyYy9hcHAvZmVhdHVyZXMvcm9hc3Rlci1vbmJvYXJkaW5nL3JvYXN0ZXItb25ib2FyZGluZy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxhYmVsX3RpdGxle1xyXG4gICAgaGVpZ2h0OiAxNHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDExcHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIGNvbG9yOiAjNjY2NjY2O1xyXG59XHJcblxyXG4uaHItdGV4dCB7XHJcbmxpbmUtaGVpZ2h0OiAxZW07XHJcbnBvc2l0aW9uOiByZWxhdGl2ZTtcclxub3V0bGluZTogMDtcclxuYm9yZGVyOiAwO1xyXG5jb2xvcjogYmxhY2s7XHJcbnRleHQtYWxpZ246IGNlbnRlcjtcclxuaGVpZ2h0OiAxLjVlbTtcclxub3BhY2l0eTogLjU7XHJcbn1cclxuLmhyLXRleHQ6OmJlZm9yZSB7XHJcbiAgY29udGVudDogJyc7XHJcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYzsgXHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGxlZnQ6IDA7XHJcbiAgdG9wOiA1MCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxcHg7XHJcbn1cclxuLmhyLXRleHQ6OmFmdGVyIHtcclxuICBjb250ZW50OiAnT1InO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgY29sb3I6ICM2NjY2NjY7XHJcbiAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgZm9udC1zaXplOiAxNnB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgcGFkZGluZzogMCAxLjVlbTtcclxuICBsaW5lLWhlaWdodDogMS41ZW07XHJcbiAgY29sb3I6ICM4MTgwNzg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxufVxyXG4uZW1haWx7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbmJvcmRlci1yYWRpdXM6IDZweDtcclxuYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcclxuYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxufVxyXG4uc2VuZC1pbnZpdGV7XHJcbiAgIGhlaWdodDogNTBweDtcclxuYm9yZGVyLXJhZGl1czogNnB4O1xyXG5iYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG5jb2xvcjogI2ZmZmZmZjtcclxuXHJcbn1cclxuLnNlbmQtdGV4dHtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG5mb250LXNpemU6IDE0cHg7XHJcbmZvbnQtd2VpZ2h0OiA2MDA7XHJcbmZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG5mb250LXN0eWxlOiBub3JtYWw7XHJcbmxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbmxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbmNvbG9yOiAjZmZmZmZmO1xyXG5cclxufVxyXG4uc2VuZC1pbnZpdGU6aG92ZXJ7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjsgXHJcbiAgYm94LXNoYWRvdzogMCAwIDdweCAxcHggcmdiYSg2NywgMTQ2LCAxMDgsIDAuNSk7XHJcblxyXG59XHJcbjo6cGxhY2Vob2xkZXJ7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuZm9udC1zaXplOiAxNHB4O1xyXG5mb250LXdlaWdodDogNTAwO1xyXG5mb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuZm9udC1zdHlsZTogbm9ybWFsO1xyXG5saW5lLWhlaWdodDogbm9ybWFsO1xyXG5sZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG5jb2xvcjogIzY2NjY2NjtcclxufVxyXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXJ7XHJcbiAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG5mb250LXNpemU6IDE0cHg7XHJcbmZvbnQtd2VpZ2h0OiA1MDA7XHJcbmZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG5mb250LXN0eWxlOiBub3JtYWw7XHJcbmxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbmxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbmNvbG9yOiAjNjY2NjY2O1xyXG59XHJcbi5jb250aW51ZS1idG57XHJcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIHBhZGRpbmc6IDAlIDEwJTtcclxufVxyXG4uY29udGludWUtdGV4dHtcclxuZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbmZvbnQtc2l6ZTogMTRweDtcclxuZm9udC13ZWlnaHQ6IDYwMDtcclxuZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbmZvbnQtc3R5bGU6IG5vcm1hbDtcclxubGluZS1oZWlnaHQ6IG5vcm1hbDtcclxubGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxudGV4dC1hbGlnbjogY2VudGVyO1xyXG5jb2xvcjogI2ZmZmZmZjtcclxuXHJcbn1cclxuLmNvbnRpbnVlLWJ0bjpob3ZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyOyBcclxuICBib3gtc2hhZG93OiAwIDAgN3B4IDFweCByZ2JhKDY3LCAxNDYsIDEwOCwgMC41KTtcclxufVxyXG4uZm9ybS1ncm91cHtcclxuICBtYXJnaW4tYm90dG9tOiAwJTtcclxufVxyXG5cclxuIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzIwcHgpIGFuZCAobWF4LXdpZHRoOiA5OTBweCkge1xyXG4gIC5sYWJlbF90aXRsZXtcclxuICAgIGhlaWdodDogMTRweDtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgZm9udC1zaXplOiA5cHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIGNvbG9yOiAjNjY2NjY2O1xyXG59XHJcbi5lbWFpbHtcclxuICAgIGhlaWdodDogMzBweDtcclxuYm9yZGVyLXJhZGl1czogNnB4O1xyXG5ib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xyXG5iYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG59XHJcbi5zZW5kLWludml0ZXtcclxuICAgaGVpZ2h0OiAzMHB4O1xyXG5ib3JkZXItcmFkaXVzOiA2cHg7XHJcbmJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7XHJcbmNvbG9yOiAjZmZmZmZmO1xyXG5wYWRkaW5nLXRvcDogMDtcclxufVxyXG4uc2VuZC10ZXh0e1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbmZvbnQtc2l6ZTogOHB4O1xyXG5mb250LXdlaWdodDogNjAwO1xyXG5mb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuZm9udC1zdHlsZTogbm9ybWFsO1xyXG5saW5lLWhlaWdodDogbm9ybWFsO1xyXG5sZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG5jb2xvcjogI2ZmZmZmZjtcclxucGFkZGluZzogMCUgMTAlO1xyXG59XHJcbiAuY29udGludWUtYnRue1xyXG4gIGJvcmRlci1yYWRpdXM6IDZweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG4gIGhlaWdodDogMzBweDtcclxuICBwYWRkaW5nLXRvcDogMDtcclxufVxyXG4uY29udGludWUtdGV4dHtcclxuZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbmZvbnQtc2l6ZTogOHB4O1xyXG5mb250LXdlaWdodDogNjAwO1xyXG5mb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuZm9udC1zdHlsZTogbm9ybWFsO1xyXG5saW5lLWhlaWdodDogbm9ybWFsO1xyXG5sZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG50ZXh0LWFsaWduOiBjZW50ZXI7XHJcbmNvbG9yOiAjZmZmZmZmO1xyXG5wYWRkaW5nOiAwJSAxMCU7XHJcbn1cclxuLmhyLXRleHQge1xyXG5saW5lLWhlaWdodDogMWVtO1xyXG5wb3NpdGlvbjogcmVsYXRpdmU7XHJcbm91dGxpbmU6IDA7XHJcbmJvcmRlcjogMDtcclxuY29sb3I6IGJsYWNrO1xyXG50ZXh0LWFsaWduOiBjZW50ZXI7XHJcbmhlaWdodDogMS41ZW07XHJcbm9wYWNpdHk6IC41O1xyXG59XHJcbi5oci10ZXh0OjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6ICcnO1xyXG4gIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7IFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBsZWZ0OiAwO1xyXG4gIHRvcDogNTAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMXB4O1xyXG59XHJcbi5oci10ZXh0OjphZnRlciB7XHJcbiAgY29udGVudDogJ09SJztcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIGNvbG9yOiAjNjY2NjY2O1xyXG4gIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTFweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIHBhZGRpbmc6IDAgMS41ZW07XHJcbiAgbGluZS1oZWlnaHQ6IDEuNWVtO1xyXG4gIGNvbG9yOiAjODE4MDc4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuIDo6cGxhY2Vob2xkZXJ7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuZm9udC1zaXplOiAxMHB4O1xyXG5mb250LXdlaWdodDogNTAwO1xyXG5mb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuZm9udC1zdHlsZTogbm9ybWFsO1xyXG5saW5lLWhlaWdodDogbm9ybWFsO1xyXG5sZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG5jb2xvcjogIzY2NjY2NjtcclxufVxyXG46Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXJ7XHJcbiAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG5mb250LXNpemU6IDEwcHg7XHJcbmZvbnQtd2VpZ2h0OiA1MDA7XHJcbmZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG5mb250LXN0eWxlOiBub3JtYWw7XHJcbmxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbmxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbmNvbG9yOiAjNjY2NjY2O1xyXG59XHJcbiB9Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RoasterOnboardingComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-roaster-onboarding',
                templateUrl: './roaster-onboarding.component.html',
                styleUrls: ['./roaster-onboarding.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/features/roaster-quick-setup/roaster-quick-setup.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/features/roaster-quick-setup/roaster-quick-setup.component.ts ***!
  \*******************************************************************************/
/*! exports provided: RoasterQuickSetupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoasterQuickSetupComponent", function() { return RoasterQuickSetupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class RoasterQuickSetupComponent {
    constructor() { }
    ngOnInit() {
    }
}
RoasterQuickSetupComponent.ɵfac = function RoasterQuickSetupComponent_Factory(t) { return new (t || RoasterQuickSetupComponent)(); };
RoasterQuickSetupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RoasterQuickSetupComponent, selectors: [["app-roaster-quick-setup"]], decls: 2, vars: 0, template: function RoasterQuickSetupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "roaster-quick-setup works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlYXR1cmVzL3JvYXN0ZXItcXVpY2stc2V0dXAvcm9hc3Rlci1xdWljay1zZXR1cC5jb21wb25lbnQuY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RoasterQuickSetupComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-roaster-quick-setup',
                templateUrl: './roaster-quick-setup.component.html',
                styleUrls: ['./roaster-quick-setup.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/features/welcome-aboard/welcome-aboard.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/features/welcome-aboard/welcome-aboard.component.ts ***!
  \*********************************************************************/
/*! exports provided: WelcomeAboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeAboardComponent", function() { return WelcomeAboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");



class WelcomeAboardComponent {
    constructor() { }
    ngOnInit() {
    }
}
WelcomeAboardComponent.ɵfac = function WelcomeAboardComponent_Factory(t) { return new (t || WelcomeAboardComponent)(); };
WelcomeAboardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WelcomeAboardComponent, selectors: [["app-welcome-aboard"]], decls: 14, vars: 0, consts: [[1, "header-sewn"], [1, "hello-txt"], [1, "d-flex", "justify-content-center"], [1, "col-xs-12", "col-sm-6", "col-md-10", "col-lg-6", "col-xl-5"], [1, "welcome-sec", "text-center"], ["src", "assets/images/welcome-aboard.png", "alt", "user", 1, "welcome-aboard", "mb-3"], [1, "update-title", "text-center", "mb-2"], [1, "welocme_txt", "text-center", "mb-4"], [1, "text-center"], ["type", "button", "routerLink", "/people/create-role", 1, "create-role-butn", "mt-1", "btn"]], template: function WelcomeAboardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Hello Sewn !");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "section", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Welcome aboard!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Create roles and permissions and add your team members who will help you manage your workload!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Create Role");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]], styles: [".welcome-sec[_ngcontent-%COMP%]{\r\n    border-radius: 5px;\r\n    padding: 30px;\r\n    font-size: 14px;\r\n}\r\n.update-title[_ngcontent-%COMP%]{\r\n    font-family: 'PlayfairDisplay';\r\n    font-size: 34px;\r\n    color: #000000;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n}\r\n.create-role-butn[_ngcontent-%COMP%]{\r\n    background-color: #3d8462;\r\n    border:1px solid #3d8462;\r\n    color: #FFFFFF;\r\n    font-weight: 600;\r\n    font-size: 14px;\r\n    padding: 2% 10%;\r\n    border-radius: 8px;\r\n}\r\n.welocme_txt[_ngcontent-%COMP%]{\r\n   word-wrap: break-word;\r\n    padding: 1% 7% 2%;\r\n    font-weight: 600;\r\n    color: #256547;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    line-height: 1.43;\r\n    color: #666666;\r\n  }\r\n.create-role-butn[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n    box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZmVhdHVyZXMvd2VsY29tZS1hYm9hcmQvd2VsY29tZS1hYm9hcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsZUFBZTtBQUNuQjtBQUNBO0lBQ0ksOEJBQThCO0lBQzlCLGVBQWU7SUFDZixjQUFjO0lBQ2QsbUJBQW1CO0lBQ25CLHNCQUFzQjtBQUMxQjtBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLHdCQUF3QjtJQUN4QixjQUFjO0lBQ2QsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixlQUFlO0lBQ2Ysa0JBQWtCO0FBQ3RCO0FBQ0E7R0FDRyxxQkFBcUI7SUFDcEIsaUJBQWlCO0lBQ2pCLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixpQkFBaUI7SUFDakIsY0FBYztFQUNoQjtBQUNGO0lBQ0kseUJBQXlCO0lBQ3pCLCtDQUErQztBQUNuRCIsImZpbGUiOiJzcmMvYXBwL2ZlYXR1cmVzL3dlbGNvbWUtYWJvYXJkL3dlbGNvbWUtYWJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud2VsY29tZS1zZWN7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICBwYWRkaW5nOiAzMHB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcbi51cGRhdGUtdGl0bGV7XHJcbiAgICBmb250LWZhbWlseTogJ1BsYXlmYWlyRGlzcGxheSc7XHJcbiAgICBmb250LXNpemU6IDM0cHg7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG59XHJcbi5jcmVhdGUtcm9sZS1idXRue1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjtcclxuICAgIGJvcmRlcjoxcHggc29saWQgIzNkODQ2MjtcclxuICAgIGNvbG9yOiAjRkZGRkZGO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHBhZGRpbmc6IDIlIDEwJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxufVxyXG4ud2Vsb2NtZV90eHR7XHJcbiAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcclxuICAgIHBhZGRpbmc6IDElIDclIDIlO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjMjU2NTQ3O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjQzO1xyXG4gICAgY29sb3I6ICM2NjY2NjY7XHJcbiAgfVxyXG4uY3JlYXRlLXJvbGUtYnV0bjpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7IFxyXG4gICAgYm94LXNoYWRvdzogMCAwIDdweCAxcHggcmdiYSg2NywgMTQ2LCAxMDgsIDAuNSk7XHJcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WelcomeAboardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-welcome-aboard',
                templateUrl: './welcome-aboard.component.html',
                styleUrls: ['./welcome-aboard.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Terralogic\SEWN\sewn-roaster\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map