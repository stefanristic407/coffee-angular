function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["people-people-module"], {
  /***/
  "./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-api.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-api.js ***!
    \*******************************************************************/

  /*! exports provided: ConfirmationService, Footer, Header, MessageService, PrimeTemplate, SharedModule, TreeDragDropService */

  /***/
  function node_modulesPrimeng__ivy_ngcc__Fesm2015PrimengApiJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ConfirmationService", function () {
      return ConfirmationService;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Footer", function () {
      return Footer;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Header", function () {
      return Header;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "MessageService", function () {
      return MessageService;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PrimeTemplate", function () {
      return PrimeTemplate;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "SharedModule", function () {
      return SharedModule;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TreeDragDropService", function () {
      return TreeDragDropService;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! rxjs */
    "./node_modules/rxjs/_esm2015/index.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");

    var _c0 = ["*"];

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var ConfirmationService = /*#__PURE__*/function () {
      function ConfirmationService() {
        _classCallCheck(this, ConfirmationService);

        this.requireConfirmationSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.acceptConfirmationSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
      }

      _createClass(ConfirmationService, [{
        key: "confirm",
        value: function confirm(confirmation) {
          this.requireConfirmationSource.next(confirmation);
          return this;
        }
      }, {
        key: "close",
        value: function close() {
          this.requireConfirmationSource.next(null);
          return this;
        }
      }, {
        key: "onAccept",
        value: function onAccept() {
          this.acceptConfirmationSource.next();
        }
      }]);

      return ConfirmationService;
    }();

    ConfirmationService.ɵfac = function ConfirmationService_Factory(t) {
      return new (t || ConfirmationService)();
    };

    ConfirmationService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: ConfirmationService,
      factory: ConfirmationService.ɵfac
    });

    var __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var MessageService = /*#__PURE__*/function () {
      function MessageService() {
        _classCallCheck(this, MessageService);

        this.messageSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.clearSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.messageObserver = this.messageSource.asObservable();
        this.clearObserver = this.clearSource.asObservable();
      }

      _createClass(MessageService, [{
        key: "add",
        value: function add(message) {
          if (message) {
            this.messageSource.next(message);
          }
        }
      }, {
        key: "addAll",
        value: function addAll(messages) {
          if (messages && messages.length) {
            this.messageSource.next(messages);
          }
        }
      }, {
        key: "clear",
        value: function clear(key) {
          this.clearSource.next(key || null);
        }
      }]);

      return MessageService;
    }();

    MessageService.ɵfac = function MessageService_Factory(t) {
      return new (t || MessageService)();
    };

    MessageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: MessageService,
      factory: MessageService.ɵfac
    });

    var __decorate$2 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var Header = function Header() {
      _classCallCheck(this, Header);
    };

    Header.ɵfac = function Header_Factory(t) {
      return new (t || Header)();
    };

    Header.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: Header,
      selectors: [["p-header"]],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function Header_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
        }
      },
      encapsulation: 2
    });

    var Footer = function Footer() {
      _classCallCheck(this, Footer);
    };

    Footer.ɵfac = function Footer_Factory(t) {
      return new (t || Footer)();
    };

    Footer.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: Footer,
      selectors: [["p-footer"]],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function Footer_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
        }
      },
      encapsulation: 2
    });

    var PrimeTemplate = /*#__PURE__*/function () {
      function PrimeTemplate(template) {
        _classCallCheck(this, PrimeTemplate);

        this.template = template;
      }

      _createClass(PrimeTemplate, [{
        key: "getType",
        value: function getType() {
          return this.name;
        }
      }]);

      return PrimeTemplate;
    }();

    PrimeTemplate.ɵfac = function PrimeTemplate_Factory(t) {
      return new (t || PrimeTemplate)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]));
    };

    PrimeTemplate.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: PrimeTemplate,
      selectors: [["", "pTemplate", ""]],
      inputs: {
        type: "type",
        name: ["pTemplate", "name"]
      }
    });

    PrimeTemplate.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
      }];
    };

    __decorate$2([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], PrimeTemplate.prototype, "type", void 0);

    __decorate$2([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('pTemplate')], PrimeTemplate.prototype, "name", void 0);

    var SharedModule = function SharedModule() {
      _classCallCheck(this, SharedModule);
    };

    SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: SharedModule
    });
    SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function SharedModule_Factory(t) {
        return new (t || SharedModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]]]
    });

    var __decorate$3 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var TreeDragDropService = /*#__PURE__*/function () {
      function TreeDragDropService() {
        _classCallCheck(this, TreeDragDropService);

        this.dragStartSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.dragStopSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.dragStart$ = this.dragStartSource.asObservable();
        this.dragStop$ = this.dragStopSource.asObservable();
      }

      _createClass(TreeDragDropService, [{
        key: "startDrag",
        value: function startDrag(event) {
          this.dragStartSource.next(event);
        }
      }, {
        key: "stopDrag",
        value: function stopDrag(event) {
          this.dragStopSource.next(event);
        }
      }]);

      return TreeDragDropService;
    }();

    TreeDragDropService.ɵfac = function TreeDragDropService_Factory(t) {
      return new (t || TreeDragDropService)();
    };

    TreeDragDropService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: TreeDragDropService,
      factory: TreeDragDropService.ɵfac
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConfirmationService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
      }], function () {
        return [];
      }, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MessageService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
      }], function () {
        return [];
      }, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Header, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'p-header',
          template: '<ng-content></ng-content>'
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](Footer, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'p-footer',
          template: '<ng-content></ng-content>'
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PrimeTemplate, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
          selector: '[pTemplate]',
          host: {}
        }]
      }], function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
        }];
      }, {
        type: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        name: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
          args: ['pTemplate']
        }]
      });
    })();

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](SharedModule, {
        declarations: function declarations() {
          return [Header, Footer, PrimeTemplate];
        },
        imports: function imports() {
          return [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]];
        },
        exports: function exports() {
          return [Header, Footer, PrimeTemplate];
        }
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SharedModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]],
          exports: [Header, Footer, PrimeTemplate],
          declarations: [Header, Footer, PrimeTemplate]
        }]
      }], null, null);
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TreeDragDropService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"]
      }], function () {
        return [];
      }, null);
    })();
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=primeng-api.js.map

    /***/

  },

  /***/
  "./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-overlaypanel.js":
  /*!****************************************************************************!*\
    !*** ./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-overlaypanel.js ***!
    \****************************************************************************/

  /*! exports provided: OverlayPanel, OverlayPanelModule */

  /***/
  function node_modulesPrimeng__ivy_ngcc__Fesm2015PrimengOverlaypanelJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OverlayPanel", function () {
      return OverlayPanel;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OverlayPanelModule", function () {
      return OverlayPanelModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var primeng_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! primeng/dom */
    "./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-dom.js");
    /* harmony import */


    var primeng_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! primeng/api */
    "./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-api.js");
    /* harmony import */


    var _angular_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/animations */
    "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");

    function OverlayPanel_div_0_ng_container_3_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
      }
    }

    function OverlayPanel_div_0_a_4_Template(rf, ctx) {
      if (rf & 1) {
        var _r156 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OverlayPanel_div_0_a_4_Template_a_click_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r156);

          var ctx_r155 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          return ctx_r155.onCloseClick($event);
        })("keydown.enter", function OverlayPanel_div_0_a_4_Template_a_keydown_enter_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r156);

          var ctx_r157 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

          return ctx_r157.hide();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "span", 6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var ctx_r154 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-label", ctx_r154.ariaCloseLabel);
      }
    }

    var _c0 = function _c0(a0, a1) {
      return {
        showTransitionParams: a0,
        hideTransitionParams: a1
      };
    };

    var _c1 = function _c1(a0, a1) {
      return {
        value: a0,
        params: a1
      };
    };

    function OverlayPanel_div_0_Template(rf, ctx) {
      if (rf & 1) {
        var _r159 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OverlayPanel_div_0_Template_div_click_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r159);

          var ctx_r158 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r158.onContainerClick();
        })("@animation.start", function OverlayPanel_div_0_Template_div_animation_animation_start_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r159);

          var ctx_r160 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r160.onAnimationStart($event);
        })("@animation.done", function OverlayPanel_div_0_Template_div_animation_animation_done_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r159);

          var ctx_r161 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r161.onAnimationEnd($event);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, OverlayPanel_div_0_ng_container_3_Template, 1, 0, "ng-container", 3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, OverlayPanel_div_0_a_4_Template, 2, 1, "a", 4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var ctx_r152 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"](ctx_r152.styleClass);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", "ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow")("ngStyle", ctx_r152.style)("@animation", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](10, _c1, ctx_r152.overlayVisible ? "open" : "close", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](7, _c0, ctx_r152.showTransitionOptions, ctx_r152.hideTransitionOptions)));

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r152.contentTemplate);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r152.showCloseIcon);
      }
    }

    var _c2 = ["*"];

    var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      }
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    var OverlayPanel = /*#__PURE__*/function () {
      function OverlayPanel(el, renderer, cd, zone) {
        _classCallCheck(this, OverlayPanel);

        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.dismissable = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onShow = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onHide = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.overlayVisible = false;
        this.render = false;
        this.isContainerClicked = true;
      }

      _createClass(OverlayPanel, [{
        key: "ngAfterContentInit",
        value: function ngAfterContentInit() {
          var _this = this;

          this.templates.forEach(function (item) {
            switch (item.getType()) {
              case 'content':
                _this.contentTemplate = item.template;
                break;

              default:
                _this.contentTemplate = item.template;
                break;
            }
          });
        }
      }, {
        key: "onContainerClick",
        value: function onContainerClick() {
          this.isContainerClicked = true;
        }
      }, {
        key: "bindDocumentClickListener",
        value: function bindDocumentClickListener() {
          var _this2 = this;

          if (!this.documentClickListener && this.dismissable) {
            this.zone.runOutsideAngular(function () {
              var documentEvent = primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].isIOS() ? 'touchstart' : 'click';
              _this2.documentClickListener = _this2.renderer.listen('document', documentEvent, function (event) {
                if (!_this2.container.contains(event.target) && _this2.target !== event.target && !_this2.target.contains(event.target) && !_this2.isContainerClicked) {
                  _this2.zone.run(function () {
                    _this2.hide();
                  });
                }

                _this2.isContainerClicked = false;

                _this2.cd.markForCheck();
              });
            });
          }
        }
      }, {
        key: "unbindDocumentClickListener",
        value: function unbindDocumentClickListener() {
          if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
          }
        }
      }, {
        key: "toggle",
        value: function toggle(event, target) {
          var _this3 = this;

          if (this.overlayVisible) {
            if (this.hasTargetChanged(event, target)) {
              this.destroyCallback = function () {
                _this3.show(null, target || event.currentTarget || event.target);
              };
            }

            this.overlayVisible = false;
          } else {
            this.show(event, target);
          }
        }
      }, {
        key: "show",
        value: function show(event, target) {
          this.target = target || event.currentTarget || event.target;
          this.overlayVisible = true;
          this.render = true;
        }
      }, {
        key: "hasTargetChanged",
        value: function hasTargetChanged(event, target) {
          return this.target != null && this.target !== (target || event.currentTarget || event.target);
        }
      }, {
        key: "appendContainer",
        value: function appendContainer() {
          if (this.appendTo) {
            if (this.appendTo === 'body') document.body.appendChild(this.container);else primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].appendChild(this.container, this.appendTo);
          }
        }
      }, {
        key: "restoreAppend",
        value: function restoreAppend() {
          if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
          }
        }
      }, {
        key: "align",
        value: function align() {
          if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + ++primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].zindex);
          }

          primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].absolutePosition(this.container, this.target);

          if (primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].getOffset(this.container).top < primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].getOffset(this.target).top) {
            primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].addClass(this.container, 'ui-overlaypanel-flipped');
          }

          if (Math.floor(primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].getOffset(this.container).left) < Math.floor(primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].getOffset(this.target).left) && primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].getOffset(this.container).left > 0) {
            primeng_dom__WEBPACK_IMPORTED_MODULE_2__["DomHandler"].addClass(this.container, 'ui-overlaypanel-shifted');
          }
        }
      }, {
        key: "onAnimationStart",
        value: function onAnimationStart(event) {
          if (event.toState === 'open') {
            this.container = event.element;
            this.onShow.emit(null);
            this.appendContainer();
            this.align();
            this.bindDocumentClickListener();
            this.bindDocumentResizeListener();
          }
        }
      }, {
        key: "onAnimationEnd",
        value: function onAnimationEnd(event) {
          switch (event.toState) {
            case 'void':
              if (this.destroyCallback) {
                this.destroyCallback();
                this.destroyCallback = null;
              }

              break;

            case 'close':
              this.onContainerDestroy();
              this.onHide.emit({});
              this.render = false;
              break;
          }
        }
      }, {
        key: "hide",
        value: function hide() {
          this.overlayVisible = false;
        }
      }, {
        key: "onCloseClick",
        value: function onCloseClick(event) {
          this.hide();
          event.preventDefault();
        }
      }, {
        key: "onWindowResize",
        value: function onWindowResize(event) {
          this.hide();
        }
      }, {
        key: "bindDocumentResizeListener",
        value: function bindDocumentResizeListener() {
          this.documentResizeListener = this.onWindowResize.bind(this);
          window.addEventListener('resize', this.documentResizeListener);
        }
      }, {
        key: "unbindDocumentResizeListener",
        value: function unbindDocumentResizeListener() {
          if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
          }
        }
      }, {
        key: "onContainerDestroy",
        value: function onContainerDestroy() {
          this.target = null;
          this.unbindDocumentClickListener();
          this.unbindDocumentResizeListener();
        }
      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          this.target = null;
          this.destroyCallback = null;

          if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
          }
        }
      }]);

      return OverlayPanel;
    }();

    OverlayPanel.ɵfac = function OverlayPanel_Factory(t) {
      return new (t || OverlayPanel)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]));
    };

    OverlayPanel.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: OverlayPanel,
      selectors: [["p-overlayPanel"]],
      contentQueries: function OverlayPanel_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, primeng_api__WEBPACK_IMPORTED_MODULE_3__["PrimeTemplate"], false);
        }

        if (rf & 2) {
          var _t;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.templates = _t);
        }
      },
      inputs: {
        dismissable: "dismissable",
        autoZIndex: "autoZIndex",
        baseZIndex: "baseZIndex",
        showTransitionOptions: "showTransitionOptions",
        hideTransitionOptions: "hideTransitionOptions",
        showCloseIcon: "showCloseIcon",
        style: "style",
        styleClass: "styleClass",
        appendTo: "appendTo",
        ariaCloseLabel: "ariaCloseLabel"
      },
      outputs: {
        onShow: "onShow",
        onHide: "onHide"
      },
      ngContentSelectors: _c2,
      decls: 1,
      vars: 1,
      consts: [[3, "ngClass", "ngStyle", "class", "click", 4, "ngIf"], [3, "ngClass", "ngStyle", "click"], [1, "ui-overlaypanel-content"], [4, "ngTemplateOutlet"], ["tabindex", "0", "class", "ui-overlaypanel-close ui-state-default", 3, "click", "keydown.enter", 4, "ngIf"], ["tabindex", "0", 1, "ui-overlaypanel-close", "ui-state-default", 3, "click", "keydown.enter"], [1, "ui-overlaypanel-close-icon", "pi", "pi-times"]],
      template: function OverlayPanel_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, OverlayPanel_div_0_Template, 5, 13, "div", 0);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.render);
        }
      },
      directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgStyle"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgTemplateOutlet"]],
      encapsulation: 2,
      data: {
        animation: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["trigger"])('animation', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({
          transform: 'translateY(5%)',
          opacity: 0
        })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('close', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({
          transform: 'translateY(5%)',
          opacity: 0
        })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('open', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({
          transform: 'translateY(0)',
          opacity: 1
        })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])('void => open', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])('{{showTransitionParams}}')), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])('open => close', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])('{{hideTransitionParams}}'))])]
      }
    });

    OverlayPanel.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
      }, {
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
      }];
    };

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "dismissable", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "showCloseIcon", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "style", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "styleClass", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "appendTo", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "autoZIndex", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "ariaCloseLabel", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "baseZIndex", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "showTransitionOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])()], OverlayPanel.prototype, "hideTransitionOptions", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])()], OverlayPanel.prototype, "onShow", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])()], OverlayPanel.prototype, "onHide", void 0);

    __decorate([Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"])(primeng_api__WEBPACK_IMPORTED_MODULE_3__["PrimeTemplate"])], OverlayPanel.prototype, "templates", void 0);

    var OverlayPanelModule = function OverlayPanelModule() {
      _classCallCheck(this, OverlayPanelModule);
    };

    OverlayPanelModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: OverlayPanelModule
    });
    OverlayPanelModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function OverlayPanelModule_Factory(t) {
        return new (t || OverlayPanelModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OverlayPanel, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'p-overlayPanel',
          template: "\n        <div *ngIf=\"render\" [ngClass]=\"'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"onContainerClick()\"\n            [@animation]=\"{value: (overlayVisible ? 'open': 'close'), params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" \n                (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\">\n            <div class=\"ui-overlaypanel-content\">\n                <ng-content></ng-content>\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </div>\n            <a tabindex=\"0\" *ngIf=\"showCloseIcon\" class=\"ui-overlaypanel-close ui-state-default\" (click)=\"onCloseClick($event)\" (keydown.enter)=\"hide()\" [attr.aria-label]=\"ariaCloseLabel\">\n                <span class=\"ui-overlaypanel-close-icon pi pi-times\"></span>\n            </a>\n        </div>\n    ",
          animations: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["trigger"])('animation', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({
            transform: 'translateY(5%)',
            opacity: 0
          })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('close', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({
            transform: 'translateY(5%)',
            opacity: 0
          })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["state"])('open', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["style"])({
            transform: 'translateY(0)',
            opacity: 1
          })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])('void => open', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])('{{showTransitionParams}}')), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["transition"])('open => close', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_4__["animate"])('{{hideTransitionParams}}'))])],
          changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].Default
        }]
      }], function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]
        }];
      }, {
        dismissable: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        autoZIndex: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        baseZIndex: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        showTransitionOptions: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        hideTransitionOptions: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        onShow: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }],
        onHide: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }],
        showCloseIcon: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        style: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        styleClass: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        appendTo: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        ariaCloseLabel: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }],
        templates: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"],
          args: [primeng_api__WEBPACK_IMPORTED_MODULE_3__["PrimeTemplate"]]
        }]
      });
    })();

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](OverlayPanelModule, {
        declarations: function declarations() {
          return [OverlayPanel];
        },
        imports: function imports() {
          return [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]];
        },
        exports: function exports() {
          return [OverlayPanel];
        }
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OverlayPanelModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
          exports: [OverlayPanel],
          declarations: [OverlayPanel]
        }]
      }], null, null);
    })();
    /**
     * Generated bundle index. Do not edit.
     */
    //# sourceMappingURL=primeng-overlaypanel.js.map

    /***/

  },

  /***/
  "./src/app/people/add-members/add-members.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/people/add-members/add-members.component.ts ***!
    \*************************************************************/

  /*! exports provided: AddMembersComponent */

  /***/
  function srcAppPeopleAddMembersAddMembersComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "AddMembersComponent", function () {
      return AddMembersComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! primeng/overlaypanel */
    "./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-overlaypanel.js");

    var AddMembersComponent = /*#__PURE__*/function () {
      function AddMembersComponent() {
        _classCallCheck(this, AddMembersComponent);
      }

      _createClass(AddMembersComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {// $(document).ready(function(){
          //   $('[data-toggle="popover"]').popover({
          //     html: true,
          //     content: function() {
          //       return $('#popover-content').html();
          //     }
          //   });
          // })
        }
      }, {
        key: "ngAfterViewChecked",
        value: function ngAfterViewChecked() {}
      }]);

      return AddMembersComponent;
    }();

    AddMembersComponent.ɵfac = function AddMembersComponent_Factory(t) {
      return new (t || AddMembersComponent)();
    };

    AddMembersComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: AddMembersComponent,
      selectors: [["app-add-members"]],
      decls: 60,
      vars: 1,
      consts: [[1, "header-sewn"], [1, "hello-txt"], [1, "total_header"], ["role", "navigation", "aria-labelledby", "title-breadcrumb-1", 1, "breadcrumb1"], ["id", "title-breadcrumb-1", 1, "sr-only"], [1, "b-cum"], ["routerLink", "/features/welcome-aboard", 1, "b-cum"], ["aria-hidden", "true", 1, "padl-r"], ["routerLink", "/people/manage-role", 1, "b-cum"], [1, "b-cum", "c-pink"], ["type", "submit", 1, "btn", "col-4", "col-sm-4", "col-md-3", "col-lg-1", "pull-right", "cancel_member"], [1, "cancel_value"], [1, "row", "col-12"], [1, "d-inline", "col-xs-12", "col-md-12", "member_heading", "ml-4", "mt-3"], [1, "d-inline", "member_heading", "member_title"], [1, "d-inline", "select_title"], ["src", "assets/images/active.png", "alt", "user", 1, "icon-select", "image_cursor", 3, "click"], [1, "member_details"], [1, "form-container"], [1, "form-group", "row", "pt-4"], [1, "form-group", "col-md-6", "col-lg-4"], [1, "member_name"], ["type", "text", "id", "", "placeholder", "Enter your Full Name", "name", "role", "autofocus", "", "required", "", 1, "form-control", "rectangle_name"], [1, "member_email"], ["type", "email", "id", "", "placeholder", "you@example.com", "name", "role", "required", "", 1, "form-control", "rectangle_email"], [1, "col-12", "col-lg-2", "pt-4"], [1, "btn", "invites_button"], [1, "send_invites"], ["appendTo", "body", 3, "dismissable"], ["op", ""], [1, "overflow-popover"], [1, "list-group", "custom-popover"], [1, "content_list"], [1, "btn", "addrole_button"], [1, "addrole_content"]],
      template: function AddMembersComponent_Template(rf, ctx) {
        if (rf & 1) {
          var _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Add Member ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nav", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "span", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ul");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Home");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " > ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "People");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " > ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Manage Roles");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " > ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "li", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Add Member");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "button", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "span", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "CANCEL");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "section", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Add your member for");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "span", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " Sales & marketing ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "img", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AddMembersComponent_Template_img_click_33_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r9);

            var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](50);

            return _r8.toggle($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "form", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "label", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "NAME");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "input", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "label", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Enter work Email Address*");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "input", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "button", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "span", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Send Invites");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "p-overlayPanel", 28, 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "ul", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Sourcing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Accounts");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "button", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "span", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "ADD ROLE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](49);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", true);
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_2__["OverlayPanel"]],
      styles: [".member_title[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  color: #000000;\r\n\r\n}\r\n.select_title[_ngcontent-%COMP%]{\r\n     font-family: Montserrat;\r\n    font-size: 16px;\r\n    font-weight: 600;\r\n    color: #3d8462 !important;\r\n    padding: 5px;\r\n    border: none;\r\n    background-color: #fdfdfd;\r\n    -webkit-appearance: none;\r\n\r\n}\r\n.member_name[_ngcontent-%COMP%], .member_email[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 11px;\r\n  font-weight: 600;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  color: #666666;\r\n}\r\n.member_details[_ngcontent-%COMP%]{\r\n  margin-top: 10px;\r\n}\r\n.rectangle_name[_ngcontent-%COMP%], .rectangle_email[_ngcontent-%COMP%]{\r\n    height: 46px;\r\n  border-radius: 8px;\r\n  border: solid 1px #cccccc;\r\n  background-color: #ffffff;\r\n  color:#000000;\r\n    font-weight: 500;\r\n    font-family: Montserrat;\r\n}\r\n.rectangle_name[_ngcontent-%COMP%]::-webkit-input-placeholder, .rectangle_email[_ngcontent-%COMP%]::-webkit-input-placeholder{\r\n  font-family: Montserrat;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  color:#000000;\r\n\r\n}\r\n.rectangle_name[_ngcontent-%COMP%]::-moz-placeholder, .rectangle_email[_ngcontent-%COMP%]::-moz-placeholder{\r\n  font-family: Montserrat;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  color:#000000;\r\n\r\n}\r\n.rectangle_name[_ngcontent-%COMP%]::-ms-input-placeholder, .rectangle_email[_ngcontent-%COMP%]::-ms-input-placeholder{\r\n  font-family: Montserrat;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  color:#000000;\r\n\r\n}\r\n.rectangle_name[_ngcontent-%COMP%]::placeholder, .rectangle_email[_ngcontent-%COMP%]::placeholder{\r\n  font-family: Montserrat;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  color:#000000;\r\n\r\n}\r\n.invites_button[_ngcontent-%COMP%]{\r\n    height: 46px;\r\n    border-radius: 8px;\r\n    background-color: #3d8462;\r\n    width: 129px;\r\n    \r\n  }\r\n.send_invites[_ngcontent-%COMP%]{\r\n  font-family: Montserrat;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  text-align: center;\r\n  color: #ffffff;\r\n}\r\n.invites_button[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n    box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n}\r\n.popover-title[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n}\r\n.custom-popover[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n    list-style: none;\r\n    padding-right: 4.5rem;\r\n  border: none!important;\r\n}\r\n.content_list[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  color: #000000;\r\n padding: 10px 0px 8px 3px;\r\n}\r\n  .ui-overlaypanel{\r\n \r\n    border: none !important;\r\n    border-radius: 6px !important;\r\n    box-shadow: 0 0 17px 2px rgba(27, 27, 27, 0.08) !important;\r\n    background-color: #ffffff;\r\n    margin-top: 16px;\r\n    margin-left: -9px;\r\n}\r\n  .ui-overlaypanel:before{\r\n  border-bottom-color: #fffafa !important;\r\n}\r\n  .ui-overlaypanel-shifted:after{\r\n  right: 10.9em !important;\r\n}\r\n.addrole_button[_ngcontent-%COMP%]{\r\n    border-radius: 2px;\r\n  background-color: #3d8462;\r\n  width: 100%;\r\n  height: 35px;\r\n}\r\n.addrole_button[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n    box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n\r\n}\r\n.addrole_content[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 12px;\r\n  font-weight: 500;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  color: #ffffff;\r\n}\r\n.cancel_member[_ngcontent-%COMP%]{\r\n  border-radius: 8px;\r\n  border: solid 1px #3d8462;\r\n  background-color: #ffffff;\r\n  height: 40px;\r\n    margin-right: 7%;\r\n\r\n}\r\n.cancel_value[_ngcontent-%COMP%]{\r\n  font-family: Montserrat;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  text-align: center;\r\n  color: #3d8462;\r\n}\r\n.total_header[_ngcontent-%COMP%] {\r\n    \r\n    margin-top: -2rem;;\r\n}\r\n.image_cursor[_ngcontent-%COMP%]{\r\n  cursor: pointer;\r\n}\r\n.cancel_member[_ngcontent-%COMP%]:hover{\r\n  background-color: #3d8462;\r\n}\r\n.cancel_member[_ngcontent-%COMP%]:hover    > .cancel_value[_ngcontent-%COMP%]{\r\n  color: white;\r\n}\r\n@media all and (max-width: 767px) {\r\n .invites_button[_ngcontent-%COMP%]{\r\n  margin-top: 1% !important;\r\n }\r\n}\r\n@media only screen and (min-width: 320px) and (max-width: 991px)  {\r\n  .member_title[_ngcontent-%COMP%], .select_title[_ngcontent-%COMP%]{\r\n    font-size: 16px !important;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGVvcGxlL2FkZC1tZW1iZXJzL2FkZC1tZW1iZXJzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx1QkFBdUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsY0FBYzs7QUFFaEI7QUFDQTtLQUNLLHVCQUF1QjtJQUN4QixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osWUFBWTtJQUNaLHlCQUF5QjtJQUN6Qix3QkFBd0I7QUFDNUI7Q0FDQztBQUNEO0FBQ0E7SUFDSSx1QkFBdUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsY0FBYztBQUNoQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7SUFDSSxZQUFZO0VBQ2Qsa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIsYUFBYTtJQUNYLGdCQUFnQjtJQUNoQix1QkFBdUI7QUFDM0I7QUFDQTtFQUNFLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGFBQWE7O0FBRWY7QUFOQTtFQUNFLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGFBQWE7O0FBRWY7QUFOQTtFQUNFLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGFBQWE7O0FBRWY7QUFOQTtFQUNFLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGFBQWE7O0FBRWY7QUFDQTtJQUNJLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixxQkFBcUI7RUFDdkI7QUFDRjtFQUNFLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsY0FBYztBQUNoQjtBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLCtDQUErQztBQUNuRDtBQUNBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIscUJBQXFCO0VBQ3ZCLHNCQUFzQjtBQUN4QjtBQUNBO0lBQ0ksdUJBQXVCO0VBQ3pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGNBQWM7Q0FDZix5QkFBeUI7QUFDMUI7QUFFQTs7SUFFSSx1QkFBdUI7SUFDdkIsNkJBQTZCO0lBQzdCLDBEQUEwRDtJQUMxRCx5QkFBeUI7SUFDekIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjtBQUNBO0VBQ0UsdUNBQXVDO0FBQ3pDO0FBQ0E7RUFDRSx3QkFBd0I7QUFDMUI7QUFDQTtJQUNJLGtCQUFrQjtFQUNwQix5QkFBeUI7RUFDekIsV0FBVztFQUNYLFlBQVk7QUFDZDtBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLCtDQUErQzs7QUFFbkQ7QUFFQTtJQUNJLHVCQUF1QjtFQUN6QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6QixZQUFZO0lBQ1YsZ0JBQWdCOztBQUVwQjtBQUNBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixjQUFjO0FBQ2hCO0FBQ0E7SUFDSSxxQkFBcUI7SUFDckIsaUJBQWlCO0FBQ3JCO0FBQUM7RUFDQyxlQUFlO0FBQ2pCO0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUVBO0NBQ0M7RUFDQyx5QkFBeUI7Q0FDMUI7QUFDRDtBQUNBO0VBQ0U7SUFDRSwwQkFBMEI7RUFDNUI7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3Blb3BsZS9hZGQtbWVtYmVycy9hZGQtbWVtYmVycy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1lbWJlcl90aXRsZXtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTZweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgY29sb3I6ICMwMDAwMDA7XHJcblxyXG59XHJcbi5zZWxlY3RfdGl0bGV7XHJcbiAgICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICMzZDg0NjIgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZGZkZmQ7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbi8qICAgIGN1cnNvcjogcG9pbnRlcjtcclxuKi9cclxufVxyXG4ubWVtYmVyX25hbWUsLm1lbWJlcl9lbWFpbHtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTFweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgY29sb3I6ICM2NjY2NjY7XHJcbn1cclxuLm1lbWJlcl9kZXRhaWxze1xyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuXHJcbi5yZWN0YW5nbGVfbmFtZSwucmVjdGFuZ2xlX2VtYWlse1xyXG4gICAgaGVpZ2h0OiA0NnB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgY29sb3I6IzAwMDAwMDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxufVxyXG4ucmVjdGFuZ2xlX25hbWU6OnBsYWNlaG9sZGVyLC5yZWN0YW5nbGVfZW1haWw6OnBsYWNlaG9sZGVye1xyXG4gIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTJweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiMwMDAwMDA7XHJcblxyXG59XHJcbi5pbnZpdGVzX2J1dHRvbntcclxuICAgIGhlaWdodDogNDZweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7XHJcbiAgICB3aWR0aDogMTI5cHg7XHJcbiAgICAvKiBtYXJnaW4tdG9wOiAxNCU7ICovXHJcbiAgfVxyXG4uc2VuZF9pbnZpdGVze1xyXG4gIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG59XHJcbi5pbnZpdGVzX2J1dHRvbjpob3ZlcntcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7IFxyXG4gICAgYm94LXNoYWRvdzogMCAwIDdweCAxcHggcmdiYSg2NywgMTQ2LCAxMDgsIDAuNSk7XHJcbn1cclxuLnBvcG92ZXItdGl0bGUge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmN1c3RvbS1wb3BvdmVyIGxpIHtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiA0LjVyZW07XHJcbiAgYm9yZGVyOiBub25lIWltcG9ydGFudDtcclxufVxyXG4uY29udGVudF9saXN0e1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICBjb2xvcjogIzAwMDAwMDtcclxuIHBhZGRpbmc6IDEwcHggMHB4IDhweCAzcHg7XHJcbn1cclxuXHJcbjo6bmctZGVlcCAudWktb3ZlcmxheXBhbmVse1xyXG4gXHJcbiAgICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDZweCAhaW1wb3J0YW50O1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDE3cHggMnB4IHJnYmEoMjcsIDI3LCAyNywgMC4wOCkgIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICBtYXJnaW4tdG9wOiAxNnB4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IC05cHg7XHJcbn1cclxuOjpuZy1kZWVwIC51aS1vdmVybGF5cGFuZWw6YmVmb3Jle1xyXG4gIGJvcmRlci1ib3R0b20tY29sb3I6ICNmZmZhZmEgIWltcG9ydGFudDtcclxufVxyXG46Om5nLWRlZXAgLnVpLW92ZXJsYXlwYW5lbC1zaGlmdGVkOmFmdGVye1xyXG4gIHJpZ2h0OiAxMC45ZW0gIWltcG9ydGFudDtcclxufVxyXG4uYWRkcm9sZV9idXR0b257XHJcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDM1cHg7XHJcbn1cclxuLmFkZHJvbGVfYnV0dG9uOmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjsgXHJcbiAgICBib3gtc2hhZG93OiAwIDAgN3B4IDFweCByZ2JhKDY3LCAxNDYsIDEwOCwgMC41KTtcclxuXHJcbn1cclxuXHJcbi5hZGRyb2xlX2NvbnRlbnR7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG59XHJcbi5jYW5jZWxfbWVtYmVye1xyXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBib3JkZXI6IHNvbGlkIDFweCAjM2Q4NDYyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA3JTtcclxuXHJcbn1cclxuLmNhbmNlbF92YWx1ZXtcclxuICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogIzNkODQ2MjtcclxufVxyXG4udG90YWxfaGVhZGVyIHtcclxuICAgIC8qIHBhZGRpbmctdG9wOiAxJTsgKi9cclxuICAgIG1hcmdpbi10b3A6IC0ycmVtOztcclxufS5pbWFnZV9jdXJzb3J7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uY2FuY2VsX21lbWJlcjpob3ZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG59XHJcbi5jYW5jZWxfbWVtYmVyOmhvdmVyID4gLmNhbmNlbF92YWx1ZXtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAuaW52aXRlc19idXR0b257XHJcbiAgbWFyZ2luLXRvcDogMSUgIWltcG9ydGFudDtcclxuIH1cclxufVxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDMyMHB4KSBhbmQgKG1heC13aWR0aDogOTkxcHgpICB7XHJcbiAgLm1lbWJlcl90aXRsZSwuc2VsZWN0X3RpdGxle1xyXG4gICAgZm9udC1zaXplOiAxNnB4ICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AddMembersComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-add-members',
          templateUrl: './add-members.component.html',
          styleUrls: ['./add-members.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/people/create-role/create-role.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/people/create-role/create-role.component.ts ***!
    \*************************************************************/

  /*! exports provided: CreateRoleComponent */

  /***/
  function srcAppPeopleCreateRoleCreateRoleComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CreateRoleComponent", function () {
      return CreateRoleComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var CreateRoleComponent = /*#__PURE__*/function () {
      function CreateRoleComponent() {
        _classCallCheck(this, CreateRoleComponent);
      }

      _createClass(CreateRoleComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return CreateRoleComponent;
    }();

    CreateRoleComponent.ɵfac = function CreateRoleComponent_Factory(t) {
      return new (t || CreateRoleComponent)();
    };

    CreateRoleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: CreateRoleComponent,
      selectors: [["app-create-role"]],
      decls: 180,
      vars: 0,
      consts: [[1, "header-sewn"], [1, "hello-txt"], ["role", "navigation", "aria-labelledby", "title-breadcrumb-1", 1, "breadcrumb1", "pt-3"], ["id", "title-breadcrumb-1", 1, "sr-only"], [1, "b-cum"], ["routerLink", "/features/welcome-aboard", 1, "b-cum"], ["aria-hidden", "true", 1, "padl-r"], ["routerLink", "/people/manage-role", 1, "b-cum"], [1, "b-cum", "c-pink"], ["type", "submit", 1, "btn", "col-12", "col-md-1", "pull-right", "add-role-butn", "d-md-block", "d-none"], [1, "create-role-sec", "pt-5"], [1, "col-lg-12", "col-md-12", "col-sm-12"], [1, "row"], [1, "col-lg-5", "col-md-5", "col-sm-12"], [1, "create-role"], [1, "create-role-title"], [1, "form-container"], [1, "form-group", "row", "pt-2"], [1, "form-group", "col-md-10"], [1, "role-name"], ["type", "text", "id", "", "placeholder", "Enter your Full Name", "name", "role", "required", "", 1, "form-control", "rectangle_name"], [1, "col-lg-7", "col-md-7", "col-sm-12"], [1, "create-role", "border-role"], [1, "create-role-title", "mb-3"], [1, "col-md-10", "form-group", "has-search", "no-padding"], ["_ngcontent-nvt-c24", "", "type", "text", "name", "search", "placeholder", "search by role", 1, "search", "col-md-10"], ["id", "accordionExample", 1, "accordion"], [1, "card"], ["id", "headingOne", 1, "card-head"], ["data-toggle", "collapse", "data-target", "#collapseOne", "aria-expanded", "true", "aria-controls", "collapseOne", 1, "mb-0"], ["id", "collapseOne", "aria-labelledby", "headingOne", "data-parent", "#accordionExample", 1, "collapse", "sourcing-collapse", "show"], [1, "card-body"], [1, "custom-control", "custom-checkbox", "mb-1"], ["type", "checkbox", "id", "customCheck1", "name", "example1", 1, "custom-control-input"], ["for", "customCheck1", 1, "custom-control-label", "sourcing"], ["type", "checkbox", "id", "customCheck2", "name", "example1", 1, "custom-control-input"], ["for", "customCheck2", 1, "custom-control-label", "sourcing"], ["type", "checkbox", "id", "customCheck3", "name", "example1", 1, "custom-control-input"], ["for", "customCheck3", 1, "custom-control-label", "sourcing"], ["type", "checkbox", "id", "customCheck4", "name", "example1", 1, "custom-control-input"], ["for", "customCheck4", 1, "custom-control-label", "sourcing"], ["id", "headingTwo", 1, "card-head"], ["data-toggle", "collapse", "data-target", "#collapseTwo", "aria-expanded", "false", "aria-controls", "collapseTwo", 1, "mb-0", "collapsed"], ["id", "collapseTwo", "aria-labelledby", "headingTwo", "data-parent", "#accordionExample", 1, "collapse", "sourcing-collapse"], ["type", "checkbox", "id", "customCheck5", "name", "example1", 1, "custom-control-input"], ["for", "customCheck5", 1, "custom-control-label", "sourcing"], ["type", "checkbox", "id", "customCheck6", "name", "example1", 1, "custom-control-input"], ["for", "customCheck6", 1, "custom-control-label", "sourcing"], ["type", "checkbox", "id", "customCheck7", "name", "example1", 1, "custom-control-input"], ["for", "customCheck7", 1, "custom-control-label", "sourcing"], ["type", "checkbox", "id", "customCheck8", "name", "example1", 1, "custom-control-input"], ["for", "customCheck8", 1, "custom-control-label", "sourcing"], ["id", "headingThree", 1, "card-head"], ["data-toggle", "collapse", "data-target", "#collapseThree", "aria-expanded", "false", "aria-controls", "collapseThree", 1, "mb-0", "collapsed"], ["id", "collapseThree", "aria-labelledby", "headingThree", "data-parent", "#accordionExample", 1, "collapse", "sourcing-collapse"], ["type", "checkbox", "id", "customCheck9", "name", "example1", 1, "custom-control-input"], ["for", "customCheck9", 1, "custom-control-label", "sourcing"], ["type", "checkbox", "id", "customCheck10", "name", "example1", 1, "custom-control-input"], ["for", "customCheck10", 1, "custom-control-label", "sourcing"], ["type", "checkbox", "id", "customCheck11", "name", "example1", 1, "custom-control-input"], ["for", "customCheck11", 1, "custom-control-label", "sourcing"], ["type", "checkbox", "id", "customCheck12", "name", "example1", 1, "custom-control-input"], ["for", "customCheck12", 1, "custom-control-label", "sourcing"], ["data-toggle", "collapse", "data-target", "#collapseFour", "aria-expanded", "false", "aria-controls", "collapseFour", 1, "mb-0", "collapsed"], ["id", "collapseFour", "aria-labelledby", "headingFour", "data-parent", "#accordionExample", 1, "collapse", "sourcing-collapse"], ["id", "headingFive", 1, "card-head"], ["data-toggle", "collapse", "data-target", "#collapseFive", "aria-expanded", "false", "aria-controls", "collapseFive", 1, "mb-0", "collapsed"], ["id", "collapseFive", "aria-labelledby", "headingFive", "data-parent", "#accordionExample", 1, "collapse", "sourcing-collapse"], ["id", "headingSix", 1, "card-head"], ["data-toggle", "collapse", "data-target", "#collapseSix", "aria-expanded", "false", "aria-controls", "collapseSix", 1, "mb-0", "collapsed"], ["id", "collapseSix", "aria-labelledby", "headingSix", "data-parent", "#accordionExample", 1, "collapse", "sourcing-collapse"], ["type", "button", 1, "next", "btn", "btn-info", "pull-right", "add-role-butn-mobile", "d-md-none", "d-sm-block", "mt-3"]],
      template: function CreateRoleComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Create Role");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nav", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "span", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "ul");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "li", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Home");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " > ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "li", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "People");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "span", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, " > ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "li", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "a", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Manage Roles");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " > ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "li", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Create Role");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "button", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " ADD Role ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "section", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "h4", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, " Create Role");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "form", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "label", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Give your role a name");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "input", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "h4", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, " Manage permissions for the role");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "form");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "h2", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, " Sourcing Module ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](53, "input", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "label", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "Micro Roaster");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "input", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "label", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "HoReCa");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](61, "input", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "label", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Estate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](65, "input", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "label", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Avalibility coffee");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "h2", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, " Order Management ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](75, "input", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "label", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Micro Roaster");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](79, "input", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "label", 47);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "HoReCa");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](83, "input", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "label", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, "Estate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](87, "input", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "label", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "Avalibility coffee");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "h2", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, " Farm Link ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "div", 54);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](97, "input", 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "label", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, "Micro Roaster");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](101, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "label", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](103, "HoReCa");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](105, "input", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "label", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, "Estate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](109, "input", 61);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "label", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](111, "Avalibility coffee");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "h2", 63);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, " People ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "div", 64);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](119, "input", 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "label", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](121, "Micro Roaster");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "label", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](125, "HoReCa");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](127, "input", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "label", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](129, "Estate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](131, "input", 61);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "label", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](133, "Avalibility coffee");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "div", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "h2", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](137, " Marketing+Sales ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](138, "div", 67);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](140, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](141, "input", 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "label", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](143, "Micro Roaster");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](145, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](146, "label", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](147, "HoReCa");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](149, "input", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](150, "label", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](151, "Estate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](152, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](153, "input", 61);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](154, "label", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](155, "Avalibility coffee");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "div", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](157, "div", 68);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](158, "h2", 69);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](159, " E-commerce ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](160, "div", 70);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](161, "div", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](162, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](163, "input", 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](164, "label", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](165, "Micro Roaster");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](167, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](168, "label", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](169, "HoReCa");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](170, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](171, "input", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](172, "label", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](173, "Estate");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "div", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](175, "input", 61);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "label", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](177, "Avalibility coffee");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "button", 71);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](179, "Add Role ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"]],
      styles: [".add-role-butn[_ngcontent-%COMP%] {\r\n    border-radius: 8px;\r\n    background-color: #3d8462;\r\n    padding: 10px 0px;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    color: #ffffff;\r\n    margin-right: 4rem;\r\n}\r\n.add-role-butn[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n    box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n}\r\n.add-role-butn-mobile[_ngcontent-%COMP%] {\r\n     border-radius: 8px;\r\n    background-color: #3d8462;\r\n    padding: 10px 20px;\r\n    font-size: 14px;\r\n    font-weight: 600;\r\n    color: #ffffff;\r\n    \r\n}\r\n.create-role[_ngcontent-%COMP%] {\r\n    padding: .3rem 1rem;\r\n}\r\n.create-role-title[_ngcontent-%COMP%] {\r\n    font-size: 18px;\r\n    font-weight: 600;\r\n    color: #000000;\r\n    font-family: Montserrat;\r\n}\r\n.role-name[_ngcontent-%COMP%] {\r\n    font-size: 11px;\r\n    font-weight: 600;\r\n    color: #666666;\r\n    font-family: Montserrat;\r\n}\r\n.rectangle_name[_ngcontent-%COMP%] {\r\n    height: 50px;\r\n    border-radius: 8px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n}\r\n.search_role[_ngcontent-%COMP%] {\r\n    height: 35px;\r\n    border-radius: 8px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n}\r\n.border-role[_ngcontent-%COMP%] {\r\n    border-left: 1px solid #cccccc;\r\n    padding-left: 4rem;\r\n}\r\n.accordion[_ngcontent-%COMP%] {\r\n    margin-top: 40px;\r\n}\r\n.accordion[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\r\n    border: none;\r\n    margin-bottom: 20px;\r\n}\r\n.accordion[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\r\n    \r\n    background: url('arrow-up.png') no-repeat calc(0% - -15px) center;\r\n    padding-left: 3rem;\r\n    background-size: 15px;\r\n    cursor: pointer;\r\n    font-size: 16px;\r\n}\r\n.accordion[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   h2.collapsed[_ngcontent-%COMP%] {\r\n    background-image: url('arrow-down.png');\r\n}\r\n.accordion[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%] {\r\n    padding-left: 0;\r\n    padding-right: 0;\r\n}\r\n.sourcing[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    font-family: Montserrat;\r\n    color: #333333;\r\n    margin-top: 3px;\r\n    margin-left: 5px;\r\n    display: inline-block;\r\n    padding-left: 1.8rem;\r\n}\r\n.sourcing-collapse[_ngcontent-%COMP%] {\r\n    margin-left: 1rem;\r\n}\r\n.has-search[_ngcontent-%COMP%]   .form-control[_ngcontent-%COMP%] {\r\n    padding-left: 2.375rem;\r\n}\r\n.search[_ngcontent-%COMP%]{\r\n    font-family: 'Montserrat';\r\n    height: 40px;\r\n    border-radius: 8px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n    background: url('black-search.svg') no-repeat scroll 12px 5px;\r\n    padding-left: 45px;\r\n}\r\n.has-search[_ngcontent-%COMP%]   .form-control-feedback[_ngcontent-%COMP%] {\r\n    position: absolute;\r\n    z-index: 2;\r\n    display: block;\r\n    width: 2.375rem;\r\n    height: 2.375rem;\r\n    line-height: 2.375rem;\r\n    text-align: center;\r\n    pointer-events: none;\r\n    color: #aaa;\r\n}\r\n@media only screen and (max-width: 767px) {\r\n\r\n    .border-role[_ngcontent-%COMP%] {\r\n        border-left: none;\r\n        padding-left: 0rem;\r\n    }\r\n\r\n    .create-role[_ngcontent-%COMP%] {\r\n        padding: .3rem .5rem;\r\n    }\r\n\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGVvcGxlL2NyZWF0ZS1yb2xlL2NyZWF0ZS1yb2xlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLHlCQUF5QjtJQUN6QiwrQ0FBK0M7QUFDbkQ7QUFFQTtLQUNLLGtCQUFrQjtJQUNuQix5QkFBeUI7SUFDekIsa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsY0FBYzs7QUFFbEI7QUFFQTtJQUNJLG1CQUFtQjtBQUN2QjtBQUVBO0lBQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixjQUFjO0lBQ2QsdUJBQXVCO0FBQzNCO0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCx1QkFBdUI7QUFDM0I7QUFFQTtJQUNJLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLHlCQUF5QjtBQUM3QjtBQUVBO0lBQ0ksWUFBWTtJQUNaLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIseUJBQXlCO0FBQzdCO0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7QUFFQTtJQUNJLFlBQVk7SUFDWixtQkFBbUI7QUFDdkI7QUFFQTtJQUNJLHNGQUFzRjtJQUN0RixpRUFBc0Y7SUFDdEYsa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixlQUFlO0lBQ2YsZUFBZTtBQUNuQjtBQUVBO0lBQ0ksdUNBQTREO0FBQ2hFO0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCO0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QixjQUFjO0lBQ2QsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixxQkFBcUI7SUFDckIsb0JBQW9CO0FBQ3hCO0FBRUE7SUFDSSxpQkFBaUI7QUFDckI7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjtBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6Qiw2REFBa0Y7SUFDbEYsa0JBQWtCO0FBQ3RCO0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLGNBQWM7SUFDZCxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLHFCQUFxQjtJQUNyQixrQkFBa0I7SUFDbEIsb0JBQW9CO0lBQ3BCLFdBQVc7QUFDZjtBQUVBOztJQUVJO1FBQ0ksaUJBQWlCO1FBQ2pCLGtCQUFrQjtJQUN0Qjs7SUFFQTtRQUNJLG9CQUFvQjtJQUN4Qjs7QUFFSiIsImZpbGUiOiJzcmMvYXBwL3Blb3BsZS9jcmVhdGUtcm9sZS9jcmVhdGUtcm9sZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFkZC1yb2xlLWJ1dG4ge1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjtcclxuICAgIHBhZGRpbmc6IDEwcHggMHB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA0cmVtO1xyXG59XHJcbi5hZGQtcm9sZS1idXRuOmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjsgXHJcbiAgICBib3gtc2hhZG93OiAwIDAgN3B4IDFweCByZ2JhKDY3LCAxNDYsIDEwOCwgMC41KTtcclxufVxyXG5cclxuLmFkZC1yb2xlLWJ1dG4tbW9iaWxlIHtcclxuICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjZmZmZmZmO1xyXG4gICAgXHJcbn1cclxuXHJcbi5jcmVhdGUtcm9sZSB7XHJcbiAgICBwYWRkaW5nOiAuM3JlbSAxcmVtO1xyXG59XHJcblxyXG4uY3JlYXRlLXJvbGUtdGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbn1cclxuXHJcbi5yb2xlLW5hbWUge1xyXG4gICAgZm9udC1zaXplOiAxMXB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjNjY2NjY2O1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbn1cclxuXHJcbi5yZWN0YW5nbGVfbmFtZSB7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLnNlYXJjaF9yb2xlIHtcclxuICAgIGhlaWdodDogMzVweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG59XHJcblxyXG4uYm9yZGVyLXJvbGUge1xyXG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjY2NjY2NjO1xyXG4gICAgcGFkZGluZy1sZWZ0OiA0cmVtO1xyXG59XHJcblxyXG4uYWNjb3JkaW9uIHtcclxuICAgIG1hcmdpbi10b3A6IDQwcHg7XHJcbn1cclxuXHJcbi5hY2NvcmRpb24gLmNhcmQge1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLmFjY29yZGlvbiAuY2FyZCBoMiB7XHJcbiAgICAvKiBiYWNrZ3JvdW5kOiB1cmwoLi4vYXNzZXRzL2ltYWdlcy9hcnJvdy11cC5wbmcpIG5vLXJlcGVhdCBjYWxjKDAlIC0gLTE1cHgpIGNlbnRlcjsgKi9cclxuICAgIGJhY2tncm91bmQ6IHVybCguLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2Fycm93LXVwLnBuZykgbm8tcmVwZWF0IGNhbGMoMCUgLSAtMTVweCkgY2VudGVyO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAzcmVtO1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiAxNXB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcblxyXG4uYWNjb3JkaW9uIC5jYXJkIGgyLmNvbGxhcHNlZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9hcnJvdy1kb3duLnBuZyk7XHJcbn1cclxuXHJcbi5hY2NvcmRpb24gLmNhcmQtYm9keSB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xyXG59XHJcblxyXG4uc291cmNpbmcge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgY29sb3I6ICMzMzMzMzM7XHJcbiAgICBtYXJnaW4tdG9wOiAzcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxLjhyZW07XHJcbn1cclxuXHJcbi5zb3VyY2luZy1jb2xsYXBzZSB7XHJcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcclxufVxyXG5cclxuLmhhcy1zZWFyY2ggLmZvcm0tY29udHJvbCB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDIuMzc1cmVtO1xyXG59XHJcblxyXG4uc2VhcmNoe1xyXG4gICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0JztcclxuICAgIGhlaWdodDogNDBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJvcmRlcjogc29saWQgMXB4ICNjY2NjY2M7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgYmFja2dyb3VuZDogdXJsKC4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvYmxhY2stc2VhcmNoLnN2Zykgbm8tcmVwZWF0IHNjcm9sbCAxMnB4IDVweDtcclxuICAgIHBhZGRpbmctbGVmdDogNDVweDtcclxufVxyXG5cclxuLmhhcy1zZWFyY2ggLmZvcm0tY29udHJvbC1mZWVkYmFjayB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB6LWluZGV4OiAyO1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB3aWR0aDogMi4zNzVyZW07XHJcbiAgICBoZWlnaHQ6IDIuMzc1cmVtO1xyXG4gICAgbGluZS1oZWlnaHQ6IDIuMzc1cmVtO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbiAgICBjb2xvcjogI2FhYTtcclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG5cclxuICAgIC5ib3JkZXItcm9sZSB7XHJcbiAgICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwcmVtO1xyXG4gICAgfVxyXG5cclxuICAgIC5jcmVhdGUtcm9sZSB7XHJcbiAgICAgICAgcGFkZGluZzogLjNyZW0gLjVyZW07XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CreateRoleComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-create-role',
          templateUrl: './create-role.component.html',
          styleUrls: ['./create-role.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/people/edit-members/edit-members.component.ts":
  /*!***************************************************************!*\
    !*** ./src/app/people/edit-members/edit-members.component.ts ***!
    \***************************************************************/

  /*! exports provided: EditMembersComponent */

  /***/
  function srcAppPeopleEditMembersEditMembersComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EditMembersComponent", function () {
      return EditMembersComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! jquery */
    "./node_modules/jquery/dist/jquery.js");
    /* harmony import */


    var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var EditMembersComponent = /*#__PURE__*/function () {
      function EditMembersComponent() {
        _classCallCheck(this, EditMembersComponent);
      }

      _createClass(EditMembersComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          jquery__WEBPACK_IMPORTED_MODULE_1__('.btn-toggle').click(function () {
            jquery__WEBPACK_IMPORTED_MODULE_1__(this).find('.btn').toggleClass('active');
            jquery__WEBPACK_IMPORTED_MODULE_1__(this).find('.btn').toggleClass('active_default');
            jquery__WEBPACK_IMPORTED_MODULE_1__(this).find('.btn').toggleClass('disable_default');
          });
        }
      }, {
        key: "ngAfterViewChecked",
        value: function ngAfterViewChecked() {}
      }]);

      return EditMembersComponent;
    }();

    EditMembersComponent.ɵfac = function EditMembersComponent_Factory(t) {
      return new (t || EditMembersComponent)();
    };

    EditMembersComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: EditMembersComponent,
      selectors: [["app-edit-members"]],
      decls: 79,
      vars: 0,
      consts: [[1, "header-sewn"], [1, "hello-txt"], [1, "total_editheader"], ["role", "navigation", "aria-labelledby", "title-breadcrumb-1", 1, "breadcrumb1"], ["id", "title-breadcrumb-1", 1, "sr-only"], [1, "b-cum"], ["routerLink", "/features/welcome-aboard", 1, "b-cum"], ["aria-hidden", "true", 1, "padl-r"], ["routerLink", "/people/manage-role", 1, "b-cum"], [1, "b-cum", "c-pink"], [1, "col-xs-12", "col-sm-12", "edit-memberspacing"], ["type", "submit", 1, "btn", "pull-right", "update_user"], [1, "update_text"], ["type", "submit", 1, "btn", "pull-right", "cancel_user"], [1, "cancel_text"], [1, "row", "col-12"], [1, "d-inline", "col-xs-12", "col-md-12", "user_heading", "mt-3"], [1, "edit_heading"], [1, "account_activation", "pt-1"], [1, "user_details"], [1, "form-container"], [1, "col-lg-12"], [1, "row"], [1, "col-lg-9", "p-0"], [1, "col-lg-5"], [1, "form-group"], [1, "user_name"], ["type", "text", "id", "", "placeholder", "Enter your Full Name", "name", "role", 1, "form-control", "rectangle_username"], [1, "user_email"], ["type", "email", "id", "", "placeholder", "you@example.com", "name", "role", 1, "form-control", "rectangle_useremail"], ["id", "role_edit", "name", "status", 1, "form-control", "rectangle_dropdown"], ["value", ""], ["value", "Active"], ["value", "Disabled"], [1, "col-lg-12", "mt-4"], [1, "btn-group", "btn-toggle"], [1, "btn", "active_default"], [1, "btn", "disable_default"], [1, "col-lg-4", "spacing_recovery"], [1, "recovery_account"], [1, "recovery_email"], [1, "email_text"], ["type", "button", 1, "btn", "pull-right", "send_email"], [1, "send_text"]],
      template: function EditMembersComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Edit Members");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nav", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "span", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "ul");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Home");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " > ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "People");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " > ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "User Management");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "span", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, " > ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "li", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Edit");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "button", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "span", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "UPDATE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "button", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "span", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "CANCEL");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "section", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "span", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Edit");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "p", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Account activated on 12th Jan 2020, 8:30pm");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "form", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "label", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "NAME");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](47, "input", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "label", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "ENTER WORK EMAIL ADDRESS*");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](52, "input", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "label", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "ROLE*");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "select", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "option", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Sales & marketing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "option", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "option", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Disabled");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "Disable");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "p", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Recovery Email");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "span", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "An email would be sent to the users email with a recovery link of their account. They can update the password using this link. ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "button", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "span", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "SEND");

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
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"]],
      styles: [".cancel_user[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n  border: solid 1px #3d8462;\r\n  background-color: #ffffff;\r\n  height: 40px;\r\n  margin-right: 1%;\r\n}\r\n.update_user[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n  border: solid 1px #3d8462;\r\n  background-color: #3d8462;\r\n  height: 40px;\r\n  margin-right: 5%;\r\n}\r\n.update_user[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n    box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n\r\n}\r\n.update_text[_ngcontent-%COMP%]{\r\n     font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 600;\r\n  text-align: center;\r\n  color: #ffffff;\r\n\r\n   \r\n}\r\n.cancel_text[_ngcontent-%COMP%]{\r\n   font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 600;\r\n  text-align: center;\r\n  color: #3d8462;\r\n}\r\n.total_editheader[_ngcontent-%COMP%]{\r\n  margin-top: -2%;\r\n}\r\n.edit_heading[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n    font-size: 17px;\r\n    font-weight: 600;\r\n    color: #000000;\r\n    line-height: 22px;\r\n}\r\n.user_heading[_ngcontent-%COMP%]{\r\n    margin-left: 1.5rem!important;\r\n}\r\n.account_activation[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  color: #666666;\r\n  line-height: 22px;\r\n}\r\n.user_name[_ngcontent-%COMP%], .user_email[_ngcontent-%COMP%]{\r\n  font-family: Montserrat;\r\n  font-size: 11px;\r\n  font-weight: 600;\r\n  color: #666666;\r\n}\r\n.rectangle_username[_ngcontent-%COMP%], .rectangle_useremail[_ngcontent-%COMP%]{\r\n     border-radius: 8px;\r\n  border: solid 1px #cccccc;\r\n  background-color: #ffffff;\r\n  height: 46px;\r\n}\r\n.rectangle_username[_ngcontent-%COMP%]::-webkit-input-placeholder, .rectangle_useremail[_ngcontent-%COMP%]::-webkit-input-placeholder{\r\n   font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  color: #000000;\r\n}\r\n.rectangle_username[_ngcontent-%COMP%]::-moz-placeholder, .rectangle_useremail[_ngcontent-%COMP%]::-moz-placeholder{\r\n   font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  color: #000000;\r\n}\r\n.rectangle_username[_ngcontent-%COMP%]::-ms-input-placeholder, .rectangle_useremail[_ngcontent-%COMP%]::-ms-input-placeholder{\r\n   font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  color: #000000;\r\n}\r\n.rectangle_username[_ngcontent-%COMP%]::placeholder, .rectangle_useremail[_ngcontent-%COMP%]::placeholder{\r\n   font-family: Montserrat;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  color: #000000;\r\n}\r\n.rectangle_dropdown[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n    border: solid 1px #cccccc;\r\n    background-color: #ffffff;\r\n    background: url('active.png') right 16px top 19px/10px no-repeat;\r\n    -webkit-appearance: none;\r\n    font-family: Montserrat;\r\n    font-size: 13px;\r\n    font-weight: 500;\r\n    color: #000000;\r\nheight: 46px !important;\r\npadding-top: 7px;\r\n}\r\n.recovery_email[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 18px;\r\n  font-weight: 600;\r\n  color: #87623b;\r\n    padding-top: 7%;\r\n\r\n}\r\n.recovery_account[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n  background-color: #faf8f4;\r\n  padding: 3%;\r\n}\r\n.spacing_recovery[_ngcontent-%COMP%]{\r\n    margin-left: -11%;\r\n    background-color: #faf8f4;\r\n}\r\n.email_text[_ngcontent-%COMP%]{\r\n    font-family: Montserrat;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  color: #666666;\r\n}\r\n.send_email[_ngcontent-%COMP%] \r\n{\r\n     border-radius: 8px;\r\n  border: solid 1px #3d8462;\r\n  background-color: #3d8462;\r\n  margin-top: 8%;\r\n  margin-bottom: 5%;\r\n}\r\n.send_email[_ngcontent-%COMP%]:hover{\r\n  background-color: #3d8462; \r\n  box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n}\r\n.send_text[_ngcontent-%COMP%]{\r\n     font-family: Montserrat;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  color: #ffffff;\r\n}\r\n.active_default[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n    background-color: #158934;\r\n    border: solid 1px #cccccc;\r\n    height: 28px;\r\n    padding-top: 2px;\r\n    font-size: 14px;\r\n    color: #fff !important;\r\n\r\n}\r\n.disable_default[_ngcontent-%COMP%] {\r\n      border-radius: 8px;\r\n  background-color: #ffffff;\r\n  border: solid 1px #cccccc;\r\n  height: 28px;\r\n  height: 28px;\r\n    padding-top: 2px;\r\n    font-size: 14px;\r\n}\r\n.edit-memberspacing[_ngcontent-%COMP%]{\r\n    margin-top: -1.4rem;\r\n}\r\n.cancel_user[_ngcontent-%COMP%]:hover{\r\n  background-color: #3d8462;\r\n}\r\n.cancel_user[_ngcontent-%COMP%]:hover    > .cancel_text[_ngcontent-%COMP%]{\r\n  color: white;\r\n}\r\n\r\n@media all and (max-width: 991px) {\r\n    .spacing_recovery[_ngcontent-%COMP%] {\r\n        margin-left: 0% !important;\r\n        margin-top: 1.5rem;\r\n    }\r\n    .recovery_account[_ngcontent-%COMP%] {\r\n        padding: 0% !important;\r\n    }\r\n}\r\n@media all and (max-width: 820px) {\r\n   .edit-memberspacing[_ngcontent-%COMP%]{\r\n    margin-top: 0rem !important;\r\n}\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGVvcGxlL2VkaXQtbWVtYmVycy9lZGl0LW1lbWJlcnMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7SUFDSSxrQkFBa0I7RUFDcEIseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osZ0JBQWdCO0FBQ2xCO0FBQ0E7SUFDSSxrQkFBa0I7RUFDcEIseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osZ0JBQWdCO0FBQ2xCO0FBQ0E7SUFDSSx5QkFBeUI7SUFDekIsK0NBQStDOztBQUVuRDtBQUNBO0tBQ0ssdUJBQXVCO0VBQzFCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGNBQWM7OztBQUdoQjtBQUNBO0dBQ0csdUJBQXVCO0VBQ3hCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLGNBQWM7QUFDaEI7QUFDQTtFQUNFLGVBQWU7QUFDakI7QUFDQTtJQUNJLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxpQkFBaUI7QUFDckI7QUFDQTtJQUNJLDZCQUE2QjtBQUNqQztBQUNBO0lBQ0ksdUJBQXVCO0VBQ3pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjtBQUNBO0tBQ0ssa0JBQWtCO0VBQ3JCLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIsWUFBWTtBQUNkO0FBQ0E7R0FDRyx1QkFBdUI7RUFDeEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCO0FBTEE7R0FDRyx1QkFBdUI7RUFDeEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCO0FBTEE7R0FDRyx1QkFBdUI7RUFDeEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCO0FBTEE7R0FDRyx1QkFBdUI7RUFDeEIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCO0FBQ0E7SUFDSSxrQkFBa0I7SUFDbEIseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6QixnRUFBcUY7SUFDckYsd0JBQXdCO0lBQ3hCLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGNBQWM7QUFDbEIsdUJBQXVCO0FBQ3ZCLGdCQUFnQjtBQUNoQjtBQUNBO0lBQ0ksdUJBQXVCO0VBQ3pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztJQUNaLGVBQWU7O0FBRW5CO0FBQ0E7SUFDSSxrQkFBa0I7RUFDcEIseUJBQXlCO0VBQ3pCLFdBQVc7QUFDYjtBQUNBO0lBQ0ksaUJBQWlCO0lBQ2pCLHlCQUF5QjtBQUM3QjtBQUVBO0lBQ0ksdUJBQXVCO0VBQ3pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsY0FBYztBQUNoQjtBQUNBOztLQUVLLGtCQUFrQjtFQUNyQix5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QiwrQ0FBK0M7QUFDakQ7QUFDQTtLQUNLLHVCQUF1QjtFQUMxQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGNBQWM7QUFDaEI7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIseUJBQXlCO0lBQ3pCLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLHNCQUFzQjs7QUFFMUI7QUFDQTtNQUNNLGtCQUFrQjtFQUN0Qix5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLFlBQVk7RUFDWixZQUFZO0lBQ1YsZ0JBQWdCO0lBQ2hCLGVBQWU7QUFDbkI7QUFDQTtJQUNJLG1CQUFtQjtBQUN2QjtBQUNBO0VBQ0UseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQSxvRUFBb0U7QUFFcEU7SUFDSTtRQUNJLDBCQUEwQjtRQUMxQixrQkFBa0I7SUFDdEI7SUFDQTtRQUNJLHNCQUFzQjtJQUMxQjtBQUNKO0FBQ0E7R0FDRztJQUNDLDJCQUEyQjtBQUMvQjtBQUNBIiwiZmlsZSI6InNyYy9hcHAvcGVvcGxlL2VkaXQtbWVtYmVycy9lZGl0LW1lbWJlcnMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4uY2FuY2VsX3VzZXJ7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzNkODQ2MjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gIGhlaWdodDogNDBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDElO1xyXG59XHJcbi51cGRhdGVfdXNlcntcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICBib3JkZXI6IHNvbGlkIDFweCAjM2Q4NDYyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIG1hcmdpbi1yaWdodDogNSU7XHJcbn1cclxuLnVwZGF0ZV91c2VyOmhvdmVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjsgXHJcbiAgICBib3gtc2hhZG93OiAwIDAgN3B4IDFweCByZ2JhKDY3LCAxNDYsIDEwOCwgMC41KTtcclxuXHJcbn1cclxuLnVwZGF0ZV90ZXh0e1xyXG4gICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxuXHJcbiAgIFxyXG59XHJcbi5jYW5jZWxfdGV4dHtcclxuICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgZm9udC1zaXplOiAxM3B4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGNvbG9yOiAjM2Q4NDYyO1xyXG59XHJcbi50b3RhbF9lZGl0aGVhZGVye1xyXG4gIG1hcmdpbi10b3A6IC0yJTtcclxufVxyXG4uZWRpdF9oZWFkaW5ne1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgICBsaW5lLWhlaWdodDogMjJweDtcclxufVxyXG4udXNlcl9oZWFkaW5ne1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEuNXJlbSFpbXBvcnRhbnQ7XHJcbn1cclxuLmFjY291bnRfYWN0aXZhdGlvbntcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiAjNjY2NjY2O1xyXG4gIGxpbmUtaGVpZ2h0OiAyMnB4O1xyXG59XHJcbi51c2VyX25hbWUsLnVzZXJfZW1haWx7XHJcbiAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgZm9udC1zaXplOiAxMXB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgY29sb3I6ICM2NjY2NjY7XHJcbn1cclxuLnJlY3RhbmdsZV91c2VybmFtZSwucmVjdGFuZ2xlX3VzZXJlbWFpbHtcclxuICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYm9yZGVyOiBzb2xpZCAxcHggI2NjY2NjYztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gIGhlaWdodDogNDZweDtcclxufVxyXG4ucmVjdGFuZ2xlX3VzZXJuYW1lOjpwbGFjZWhvbGRlciwucmVjdGFuZ2xlX3VzZXJlbWFpbDo6cGxhY2Vob2xkZXJ7XHJcbiAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gIGZvbnQtc2l6ZTogMTNweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGNvbG9yOiAjMDAwMDAwO1xyXG59XHJcbi5yZWN0YW5nbGVfZHJvcGRvd257XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICAgIGJhY2tncm91bmQ6IHVybCguLi8uLi8uLi9hc3NldHMvaW1hZ2VzL2FjdGl2ZS5wbmcpIHJpZ2h0IDE2cHggdG9wIDE5cHgvMTBweCBuby1yZXBlYXQ7XHJcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxuaGVpZ2h0OiA0NnB4ICFpbXBvcnRhbnQ7XHJcbnBhZGRpbmctdG9wOiA3cHg7XHJcbn1cclxuLnJlY292ZXJ5X2VtYWlse1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgY29sb3I6ICM4NzYyM2I7XHJcbiAgICBwYWRkaW5nLXRvcDogNyU7XHJcblxyXG59XHJcbi5yZWNvdmVyeV9hY2NvdW50e1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmYWY4ZjQ7XHJcbiAgcGFkZGluZzogMyU7XHJcbn1cclxuLnNwYWNpbmdfcmVjb3Zlcnl7XHJcbiAgICBtYXJnaW4tbGVmdDogLTExJTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmYWY4ZjQ7XHJcbn1cclxuXHJcbi5lbWFpbF90ZXh0e1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6ICM2NjY2NjY7XHJcbn1cclxuLnNlbmRfZW1haWwgXHJcbntcclxuICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYm9yZGVyOiBzb2xpZCAxcHggIzNkODQ2MjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG4gIG1hcmdpbi10b3A6IDglO1xyXG4gIG1hcmdpbi1ib3R0b206IDUlO1xyXG59XHJcbi5zZW5kX2VtYWlsOmhvdmVye1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzZDg0NjI7IFxyXG4gIGJveC1zaGFkb3c6IDAgMCA3cHggMXB4IHJnYmEoNjcsIDE0NiwgMTA4LCAwLjUpO1xyXG59XHJcbi5zZW5kX3RleHR7XHJcbiAgICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbiAgZm9udC1zaXplOiAxNHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbn1cclxuXHJcbi5hY3RpdmVfZGVmYXVsdHtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxNTg5MzQ7XHJcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xyXG4gICAgaGVpZ2h0OiAyOHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDJweDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGNvbG9yOiAjZmZmICFpbXBvcnRhbnQ7XHJcblxyXG59XHJcbi5kaXNhYmxlX2RlZmF1bHQge1xyXG4gICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICBib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xyXG4gIGhlaWdodDogMjhweDtcclxuICBoZWlnaHQ6IDI4cHg7XHJcbiAgICBwYWRkaW5nLXRvcDogMnB4O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG59XHJcbi5lZGl0LW1lbWJlcnNwYWNpbmd7XHJcbiAgICBtYXJnaW4tdG9wOiAtMS40cmVtO1xyXG59XHJcbi5jYW5jZWxfdXNlcjpob3ZlcntcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG59XHJcbi5jYW5jZWxfdXNlcjpob3ZlciA+IC5jYW5jZWxfdGV4dHtcclxuICBjb2xvcjogd2hpdGU7XHJcbn1cclxuLyoqKioqKioqKioqKioqKioqKk1lZGlhIFF1ZXJ5IGZvciBFZGl0IE1lbWJlciAqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiA5OTFweCkge1xyXG4gICAgLnNwYWNpbmdfcmVjb3Zlcnkge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwJSAhaW1wb3J0YW50O1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDEuNXJlbTtcclxuICAgIH1cclxuICAgIC5yZWNvdmVyeV9hY2NvdW50IHtcclxuICAgICAgICBwYWRkaW5nOiAwJSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDgyMHB4KSB7XHJcbiAgIC5lZGl0LW1lbWJlcnNwYWNpbmd7XHJcbiAgICBtYXJnaW4tdG9wOiAwcmVtICFpbXBvcnRhbnQ7XHJcbn1cclxufVxyXG5cclxuXHJcbiJdfQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EditMembersComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-edit-members',
          templateUrl: './edit-members.component.html',
          styleUrls: ['./edit-members.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/people/manage-role/manage-role.component.ts":
  /*!*************************************************************!*\
    !*** ./src/app/people/manage-role/manage-role.component.ts ***!
    \*************************************************************/

  /*! exports provided: ManageRoleComponent */

  /***/
  function srcAppPeopleManageRoleManageRoleComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ManageRoleComponent", function () {
      return ManageRoleComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var ManageRoleComponent = /*#__PURE__*/function () {
      function ManageRoleComponent() {
        _classCallCheck(this, ManageRoleComponent);
      }

      _createClass(ManageRoleComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "ngAfterViewChecked",
        value: function ngAfterViewChecked() {
          $('[data-toggle="popover"]').popover({
            html: true,
            content: function content() {
              return $('#popover-content').html();
            }
          });
          $('[data-toggle="popover"]').popover({
            html: true,
            content: function content() {
              return $('#popover-mobile-content').html();
            }
          });
        }
      }]);

      return ManageRoleComponent;
    }();

    ManageRoleComponent.ɵfac = function ManageRoleComponent_Factory(t) {
      return new (t || ManageRoleComponent)();
    };

    ManageRoleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ManageRoleComponent,
      selectors: [["app-manage-role"]],
      decls: 251,
      vars: 0,
      consts: [[1, "header-sewn"], [1, "hello-txt"], [1, "page-breadcrumb"], [1, "row"], [1, "col-12", "d-flex", "no-block", "align-items-center"], [1, ""], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/features/welcome-aboard"], ["aria-current", "page", 1, "breadcrumb-item", "active"], [1, "ml-auto", "text-right"], ["routerLink", "/people/create-role"], ["type", "submit", 1, "btn", "btn-succes", "create-role-btn"], [1, "table-container", "desk_view_user"], [1, "table-responsive"], [1, "table"], [1, "table-header"], [1, "header-row"], [1, "customcheckbox", "m-b-20"], ["type", "checkbox", "id", "mainCheckbox"], [1, "checkmark", "head-check"], ["scope", "col"], [1, "customtable"], [1, "customcheckbox"], ["type", "checkbox", 1, "listCheckbox"], ["type", "button", "routerLink", "/people/edit-members", 1, "btn", "view-btn"], ["type", "button", "routerLink", "/people/add-members", 1, "btn", "add-btn"], ["href", "#", "data-placement", "left", "data-toggle", "popover"], ["id", "popover-content", 2, "display", "none"], [1, "list-group", "custom-popover"], ["routerLink", "/people/add-members"], [1, "list-group-item"], [1, "mobile_view_user"], [1, "column"], [1, "card", "header_main"], [1, "name_head"], [1, "last_head"], [1, "email_head"], [1, "status_head"], [1, "roles_head"], [1, "action_head"], [1, "card"], [1, "col-12"], [1, "name_data"], ["href", "#", "data-toggle", "popover", "data-placement", "bottom"], ["id", "popover-mobile-content", 2, "display", "none"], ["href", "add-members.html"]],
      template: function ManageRoleComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " Manage Roles");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "nav", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ol", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "li", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Home");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Manage Roles");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Create new role");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "table", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "thead", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "tr", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "label", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "input", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "span", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "th", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Number of members");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "th", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Roles");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "th", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "th", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Actions");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "tbody", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "label", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "span", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "5");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Sales & Marketing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "button", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "View members");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "button", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Add members");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "a", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "label", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](56, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "span", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "3");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Accounting");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "a", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](66, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "label", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](70, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "span", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "7");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "Finance");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](76, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "a", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "label", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](84, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](85, "span", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, "2");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "Master Admin");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](90, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "a", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "label", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](99, "span", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, "1");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](103, "Admin");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "a", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](108, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "label", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](112, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](113, "span", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](115, "10");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](117, "Sourcing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](118, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "a", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](122, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "div", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "ul", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "a", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](127, "Add Members");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](130, "View Members");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](132, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](133, "Edit");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](136, "Rename");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](137, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](138, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](139, "Duplicate role");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](140, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](142, "Manage Permissions");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](143, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](145, "Delete");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](146, "div", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](147, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "div", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](149, "div", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](150, "div", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](151, "Name");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](152, "div", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](153, "Last Login");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](154, "div", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](155, "Email");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "div", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](157, "Status");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](158, "div", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](159, "All Roles");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](160, "div", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](161, "Action");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](162, "div", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](163, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](164, "div", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](165, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](166, "5");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](167, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](168, "Sales & Marketing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](169, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](170, "a", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](171, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](172, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](173, "div", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](175, "div", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](177, "3");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](179, "Accounting");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](181, "a", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](182, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](183, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](184, "div", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](185, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](186, "div", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](187, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](188, "7");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](189, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](190, "Finance");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](191, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](192, "a", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](193, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](194, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "div", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](196, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](197, "div", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](198, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](199, "2");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](200, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](201, "Master Admin");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](202, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](203, "a", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](204, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](205, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](206, "div", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](208, "div", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](209, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](210, "1");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](212, "Admin");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](214, "a", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](215, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](216, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](217, "div", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](218, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](219, "div", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](220, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](221, "10");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](222, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](223, "Sourcing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](224, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](225, "a", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](226, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](227, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](228, "div", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](229, "ul", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](230, "a", 47);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](231, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](232, "Add Members");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](233, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](234, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](235, "View Members");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](236, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](237, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](238, "Edit");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](239, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](240, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](241, "Rename");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](242, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](243, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](244, "Duplicate role");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](245, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](246, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](247, "Manage Permissions");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](248, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](249, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](250, "Delete");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"]],
      styles: [".page-breadcrumb[_ngcontent-%COMP%]{\r\n    background-color: #FFFFFF;\r\n    margin: 1% 5% 0 5%;\r\n}\r\n\r\n.table-container[_ngcontent-%COMP%]{\r\n    margin: 3% 5% 0% 5%;\r\n}\r\n\r\n.page-wrapper[_ngcontent-%COMP%]{\r\n    background-color: #FFFFFF;\r\n}\r\n\r\n.create-role-btn[_ngcontent-%COMP%]{\r\n    color: white;\r\n    border-radius: 8px;\r\n    background-color: #3d8462;\r\n}\r\n\r\n.create-role-btn[_ngcontent-%COMP%]:hover{\r\n    background-color: #3d8462; \r\n    box-shadow: 0 0 7px 1px rgba(67, 146, 108, 0.5);\r\n\r\n}\r\n\r\n.view-btn[_ngcontent-%COMP%], .add-btn[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n    border: solid 1px #3d8462;\r\n    background-color: #ffffff;\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #3d8462;\r\n    margin-left: 10px;\r\n}\r\n\r\n.list-group-item[_ngcontent-%COMP%]{\r\n    border: none;\r\n    font-family: Montserrat;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  color: #000000;\r\n}\r\n\r\n.popover-body[_ngcontent-%COMP%]{\r\n    box-shadow: 0 0 17px 2px rgba(27, 27, 27, 0.08);\r\n    background-color: #ffffff;\r\n    padding: 0;\r\n}\r\n\r\n.popover[_ngcontent-%COMP%]{\r\n    border: 1px solid #FFFFFF;\r\n    border-radius: 5px !important;\r\n    position: absolute;\r\ntransform: translate3d(988px, 253px, 0px);\r\ntop: 0px;\r\nleft: 0px !important;\r\nwill-change: transform;\r\n}\r\n\r\n.table-header[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\nbackground-color: #faf8f4;\r\n}\r\n\r\n.header-row[_ngcontent-%COMP%]{\r\n    border: none !important;\r\n}\r\n\r\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{\r\n    border: none !important;\r\n    font-family: Montserrat;\r\n    font-size: 14px;\r\n    color: #000000;\r\n}\r\n\r\ntr[_ngcontent-%COMP%]{\r\n    border-bottom: 1px dashed #ddd;\r\n}\r\n\r\ntr[_ngcontent-%COMP%]:last-child {\r\n    border-bottom-style: none;\r\n    border-bottom-color: none;\r\n}\r\n\r\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n    color: #87623b;\r\n    font-weight: 600;\r\n    font-family: Montserrat;\r\n}\r\n\r\nspan.checkmark[_ngcontent-%COMP%]{\r\n    background-color: white;\r\n    border: 1px solid #666666;\r\n    border-radius: 4px;\r\n}\r\n\r\n.customcheckbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%] {\r\nbackground-color: #000;\r\n}\r\n\r\n.breadcrumb-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { \r\n    color: #666666;\r\n }\r\n\r\n.breadcrumb-item.active[_ngcontent-%COMP%]{\r\n    color: #000;\r\n }\r\n\r\n.view-btn[_ngcontent-%COMP%]:hover, .add-btn[_ngcontent-%COMP%]:hover{\r\n    color: white;\r\n    background-color: #3d8462;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n.column[_ngcontent-%COMP%] {\r\nfloat: left;\r\nwidth: 50%;\r\npadding: 0 10px;\r\nbox-sizing: border-box;\r\n}\r\n\r\n\r\n\r\n.row[_ngcontent-%COMP%] {margin: 0 -5px;}\r\n\r\n\r\n\r\n.row[_ngcontent-%COMP%]:after {\r\ncontent: \"\";\r\ndisplay: table;\r\nclear: both;\r\n}\r\n\r\n\r\n\r\n.card[_ngcontent-%COMP%] {\r\n\r\n\r\ntext-align: center;\r\nbackground-color: #faf8f4;\r\nfont-size: 13px;\r\n}\r\n\r\n.header_main[_ngcontent-%COMP%]{\r\n\r\nbackground-color: #FFFFFF !important;\r\nborder: 1px solid #666666;\r\n}\r\n\r\n.name_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.last_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.email_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.status_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.roles_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.action_head[_ngcontent-%COMP%]{\r\npadding: 2%;\r\n}\r\n\r\n.data_role[_ngcontent-%COMP%]{\r\npadding-top: 5%;\r\n}\r\n\r\n.name_data[_ngcontent-%COMP%]{\r\npadding-top: 5%;\r\n}\r\n\r\n@media only screen and (min-width: 320px) and (max-width: 920px)  {\r\n.desk_view_user[_ngcontent-%COMP%]{\r\n    display: none;\r\n}\r\n.mobile_view_user[_ngcontent-%COMP%]{\r\n    display: block;\r\n    margin-top: 5%;\r\n}\r\n.list-group-item[_ngcontent-%COMP%]{\r\n    border: none;\r\n    font-family: 'Montserrat';\r\n  font-size: 10px;\r\n  font-weight: 500;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  color: #000000;\r\n} \r\n.popover-body[_ngcontent-%COMP%]{\r\n    box-shadow: 0 0 17px 2px rgba(27, 27, 27, 0.08);\r\n    background-color: #ffffff;\r\n    padding: 0;\r\n}\r\n.popover[_ngcontent-%COMP%]{\r\n    border: 1px solid #FFFFFF;\r\n    border-radius: 5px !important;\r\n    position: absolute;\r\ntransform: translate3d(988px, 253px, 0px);\r\ntop: 0px;\r\nleft: 0px !important;\r\nwill-change: transform;\r\n}\r\n.page-breadcrumb[_ngcontent-%COMP%]{\r\n    margin: 0;\r\n    padding: 15px 0px 0px 0px !important;\r\n}\r\n}\r\n\r\n@media only screen and (min-width: 921px){\r\n.desk_view_user[_ngcontent-%COMP%]{\r\ndisplay:block;\r\npadding: 0;\r\n}\r\n.mobile_view_user[_ngcontent-%COMP%]{\r\n  display: none;\r\n}\r\n}\r\n\r\n\r\n\r\n@media screen and (max-width: 767px) {\r\n.column[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  display: block;\r\n  margin-bottom: 20px;\r\n}\r\n.spacing-top[_ngcontent-%COMP%]{\r\n    margin-top: 1.4rem !important;\r\n }\r\n}\r\n\r\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n    vertical-align: middle !important;\r\n}\r\n\r\n.head-check[_ngcontent-%COMP%]{\r\n    top:-6px !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGVvcGxlL21hbmFnZS1yb2xlL21hbmFnZS1yb2xlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNERBQTREOztBQUU1RDtJQUNJLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBQ0E7SUFDSSxtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSx5QkFBeUI7QUFDN0I7O0FBQ0E7SUFDSSxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHlCQUF5QjtBQUM3Qjs7QUFDQTtJQUNJLHlCQUF5QjtJQUN6QiwrQ0FBK0M7O0FBRW5EOztBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGNBQWM7SUFDZCxpQkFBaUI7QUFDckI7O0FBQ0E7SUFDSSxZQUFZO0lBQ1osdUJBQXVCO0VBQ3pCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGNBQWM7QUFDaEI7O0FBQ0E7SUFDSSwrQ0FBK0M7SUFDL0MseUJBQXlCO0lBQ3pCLFVBQVU7QUFDZDs7QUFDQTtJQUNJLHlCQUF5QjtJQUN6Qiw2QkFBNkI7SUFDN0Isa0JBQWtCO0FBQ3RCLHlDQUF5QztBQUN6QyxRQUFRO0FBQ1Isb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0Qjs7QUFDQTtJQUNJLGtCQUFrQjtBQUN0Qix5QkFBeUI7QUFDekI7O0FBQ0E7SUFDSSx1QkFBdUI7QUFDM0I7O0FBQ0E7SUFDSSx1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLGVBQWU7SUFDZixjQUFjO0FBQ2xCOztBQUNBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLHlCQUF5QjtBQUM3Qjs7QUFDQTtJQUNJLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsdUJBQXVCO0FBQzNCOztBQUNDO0lBQ0csdUJBQXVCO0lBQ3ZCLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7O0FBQ0E7SUFDSSxjQUFjO0NBQ2pCOztBQUNBO0lBQ0csV0FBVztDQUNkOztBQUNEO0lBQ0ksWUFBWTtJQUNaLHlCQUF5QjtBQUM3Qjs7QUFHQSxxREFBcUQ7O0FBRXJELG9DQUFvQzs7QUFDcEM7QUFDQSxXQUFXO0FBQ1gsVUFBVTtBQUNWLGVBQWU7QUFDZixzQkFBc0I7QUFDdEI7O0FBRUEsd0RBQXdEOztBQUN4RCxNQUFNLGNBQWMsQ0FBQzs7QUFFckIsbUNBQW1DOztBQUNuQztBQUNBLFdBQVc7QUFDWCxjQUFjO0FBQ2QsV0FBVztBQUNYOztBQUNBLDRCQUE0Qjs7QUFDNUI7QUFDQSxnREFBZ0Q7QUFDaEQsdUJBQXVCO0FBQ3ZCLGtCQUFrQjtBQUNsQix5QkFBeUI7QUFDekIsZUFBZTtBQUNmOztBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLG9DQUFvQztBQUNwQyx5QkFBeUI7QUFDekI7O0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsV0FBVztBQUNYOztBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLFdBQVc7QUFDWDs7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyxXQUFXO0FBQ1g7O0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsV0FBVztBQUNYOztBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLFdBQVc7QUFDWDs7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0lBQ0ksYUFBYTtBQUNqQjtBQUNBO0lBQ0ksY0FBYztJQUNkLGNBQWM7QUFDbEI7QUFDQTtJQUNJLFlBQVk7SUFDWix5QkFBeUI7RUFDM0IsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsY0FBYztBQUNoQjtBQUNBO0lBQ0ksK0NBQStDO0lBQy9DLHlCQUF5QjtJQUN6QixVQUFVO0FBQ2Q7QUFDQTtJQUNJLHlCQUF5QjtJQUN6Qiw2QkFBNkI7SUFDN0Isa0JBQWtCO0FBQ3RCLHlDQUF5QztBQUN6QyxRQUFRO0FBQ1Isb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0QjtBQUNBO0lBQ0ksU0FBUztJQUNULG9DQUFvQztBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsVUFBVTtBQUNWO0FBQ0E7RUFDRSxhQUFhO0FBQ2Y7QUFDQTs7QUFDQSx1QkFBdUI7O0FBQ3ZCO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsY0FBYztFQUNkLG1CQUFtQjtBQUNyQjtBQUNBO0lBQ0ksNkJBQTZCO0NBQ2hDO0FBQ0Q7O0FBRUE7SUFDSSxpQ0FBaUM7QUFDckM7O0FBQ0E7SUFDSSxtQkFBbUI7QUFDdkIiLCJmaWxlIjoic3JjL2FwcC9wZW9wbGUvbWFuYWdlLXJvbGUvbWFuYWdlLXJvbGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qID09PT09PT09PT09PT09PT09PSBNQU5BR0UgUk9MRSBDU1MgPT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbi5wYWdlLWJyZWFkY3J1bWJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xyXG4gICAgbWFyZ2luOiAxJSA1JSAwIDUlO1xyXG59XHJcbi50YWJsZS1jb250YWluZXJ7XHJcbiAgICBtYXJnaW46IDMlIDUlIDAlIDUlO1xyXG59XHJcbi5wYWdlLXdyYXBwZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xyXG59XHJcbi5jcmVhdGUtcm9sZS1idG57XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG59XHJcbi5jcmVhdGUtcm9sZS1idG46aG92ZXJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyOyBcclxuICAgIGJveC1zaGFkb3c6IDAgMCA3cHggMXB4IHJnYmEoNjcsIDE0NiwgMTA4LCAwLjUpO1xyXG5cclxufVxyXG4udmlldy1idG4sLmFkZC1idG57XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjM2Q4NDYyO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgICBjb2xvcjogIzNkODQ2MjtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG59XHJcbi5saXN0LWdyb3VwLWl0ZW17XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBmb250LWZhbWlseTogTW9udHNlcnJhdDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gIGNvbG9yOiAjMDAwMDAwO1xyXG59IFxyXG4ucG9wb3Zlci1ib2R5e1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDE3cHggMnB4IHJnYmEoMjcsIDI3LCAyNywgMC4wOCk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG4ucG9wb3ZlcntcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGRkZGRkY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHggIWltcG9ydGFudDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxudHJhbnNmb3JtOiB0cmFuc2xhdGUzZCg5ODhweCwgMjUzcHgsIDBweCk7XHJcbnRvcDogMHB4O1xyXG5sZWZ0OiAwcHggIWltcG9ydGFudDtcclxud2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcclxufVxyXG4udGFibGUtaGVhZGVye1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG5iYWNrZ3JvdW5kLWNvbG9yOiAjZmFmOGY0O1xyXG59XHJcbi5oZWFkZXItcm93e1xyXG4gICAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7XHJcbn1cclxudGFibGUgdGgsdGFibGUgdGR7XHJcbiAgICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcclxuICAgIGZvbnQtZmFtaWx5OiBNb250c2VycmF0O1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbn1cclxudHJ7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkICNkZGQ7XHJcbn1cclxudHI6bGFzdC1jaGlsZCB7XHJcbiAgICBib3JkZXItYm90dG9tLXN0eWxlOiBub25lO1xyXG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogbm9uZTtcclxufVxyXG4udGFibGUgdGhlYWQgdGgge1xyXG4gICAgY29sb3I6ICM4NzYyM2I7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1mYW1pbHk6IE1vbnRzZXJyYXQ7XHJcbn1cclxuIHNwYW4uY2hlY2ttYXJre1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNjY2NjY2O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcbi5jdXN0b21jaGVja2JveCBpbnB1dDpjaGVja2VkIH4gLmNoZWNrbWFyayB7XHJcbmJhY2tncm91bmQtY29sb3I6ICMwMDA7XHJcbn1cclxuLmJyZWFkY3J1bWItaXRlbSBhIHsgXHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxuIH1cclxuIC5icmVhZGNydW1iLWl0ZW0uYWN0aXZle1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiB9XHJcbi52aWV3LWJ0bjpob3ZlciwgLmFkZC1idG46aG92ZXJ7XHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG59XHJcblxyXG5cclxuLyo9PT09PT09PT09PT09PT0gRm9yIENhcmQgbGF5b3V0ID09PT09PT09PT09PT09PT09PSovXHJcblxyXG4vKiBGbG9hdCBmb3VyIGNvbHVtbnMgc2lkZSBieSBzaWRlICovXHJcbi5jb2x1bW4ge1xyXG5mbG9hdDogbGVmdDtcclxud2lkdGg6IDUwJTtcclxucGFkZGluZzogMCAxMHB4O1xyXG5ib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4vKiBSZW1vdmUgZXh0cmEgbGVmdCBhbmQgcmlnaHQgbWFyZ2lucywgZHVlIHRvIHBhZGRpbmcgKi9cclxuLnJvdyB7bWFyZ2luOiAwIC01cHg7fVxyXG5cclxuLyogQ2xlYXIgZmxvYXRzIGFmdGVyIHRoZSBjb2x1bW5zICovXHJcbi5yb3c6YWZ0ZXIge1xyXG5jb250ZW50OiBcIlwiO1xyXG5kaXNwbGF5OiB0YWJsZTtcclxuY2xlYXI6IGJvdGg7XHJcbn1cclxuLyogU3R5bGUgdGhlIGNvdW50ZXIgY2FyZHMgKi9cclxuLmNhcmQge1xyXG4vKiBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMik7ICovXHJcbi8qIHBhZGRpbmc6IDE1cHggMHB4OyAqL1xyXG50ZXh0LWFsaWduOiBjZW50ZXI7XHJcbmJhY2tncm91bmQtY29sb3I6ICNmYWY4ZjQ7XHJcbmZvbnQtc2l6ZTogMTNweDtcclxufVxyXG4uaGVhZGVyX21haW57XHJcbi8qIGNvbG9yOiAjYThhOGE4OWUgIWltcG9ydGFudDsgKi9cclxuYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRiAhaW1wb3J0YW50O1xyXG5ib3JkZXI6IDFweCBzb2xpZCAjNjY2NjY2O1xyXG59XHJcbi5uYW1lX2hlYWR7XHJcbmJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjllOGU4O1xyXG5wYWRkaW5nOiAyJTtcclxufVxyXG4ubGFzdF9oZWFke1xyXG5ib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y5ZThlODtcclxucGFkZGluZzogMiU7XHJcbn1cclxuLmVtYWlsX2hlYWR7XHJcbmJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjllOGU4O1xyXG5wYWRkaW5nOiAyJTtcclxufVxyXG4uc3RhdHVzX2hlYWR7XHJcbmJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjllOGU4O1xyXG5wYWRkaW5nOiAyJTtcclxufVxyXG4ucm9sZXNfaGVhZHtcclxuYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmOWU4ZTg7XHJcbnBhZGRpbmc6IDIlO1xyXG59XHJcbi5hY3Rpb25faGVhZHtcclxucGFkZGluZzogMiU7XHJcbn1cclxuLmRhdGFfcm9sZXtcclxucGFkZGluZy10b3A6IDUlO1xyXG59XHJcbi5uYW1lX2RhdGF7XHJcbnBhZGRpbmctdG9wOiA1JTtcclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzMjBweCkgYW5kIChtYXgtd2lkdGg6IDkyMHB4KSAge1xyXG4uZGVza192aWV3X3VzZXJ7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcbi5tb2JpbGVfdmlld191c2Vye1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tdG9wOiA1JTtcclxufVxyXG4ubGlzdC1ncm91cC1pdGVte1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0JztcclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gIGNvbG9yOiAjMDAwMDAwO1xyXG59IFxyXG4ucG9wb3Zlci1ib2R5e1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDE3cHggMnB4IHJnYmEoMjcsIDI3LCAyNywgMC4wOCk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG4ucG9wb3ZlcntcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGRkZGRkY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHggIWltcG9ydGFudDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxudHJhbnNmb3JtOiB0cmFuc2xhdGUzZCg5ODhweCwgMjUzcHgsIDBweCk7XHJcbnRvcDogMHB4O1xyXG5sZWZ0OiAwcHggIWltcG9ydGFudDtcclxud2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcclxufVxyXG4ucGFnZS1icmVhZGNydW1ie1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMTVweCAwcHggMHB4IDBweCAhaW1wb3J0YW50O1xyXG59XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogOTIxcHgpe1xyXG4uZGVza192aWV3X3VzZXJ7XHJcbmRpc3BsYXk6YmxvY2s7XHJcbnBhZGRpbmc6IDA7XHJcbn1cclxuLm1vYmlsZV92aWV3X3VzZXJ7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG59XHJcbi8qIFJlc3BvbnNpdmUgY29sdW1ucyAqL1xyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4uY29sdW1uIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcbi5zcGFjaW5nLXRvcHtcclxuICAgIG1hcmdpbi10b3A6IDEuNHJlbSAhaW1wb3J0YW50O1xyXG4gfVxyXG59XHJcblxyXG4udGFibGUgdGQsIC50YWJsZSB0aCB7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlICFpbXBvcnRhbnQ7XHJcbn1cclxuLmhlYWQtY2hlY2t7XHJcbiAgICB0b3A6LTZweCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4iXX0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ManageRoleComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-manage-role',
          templateUrl: './manage-role.component.html',
          styleUrls: ['./manage-role.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/people/pagenotfound/pagenotfound.component.ts":
  /*!***************************************************************!*\
    !*** ./src/app/people/pagenotfound/pagenotfound.component.ts ***!
    \***************************************************************/

  /*! exports provided: PagenotfoundComponent */

  /***/
  function srcAppPeoplePagenotfoundPagenotfoundComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagenotfoundComponent", function () {
      return PagenotfoundComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var PagenotfoundComponent = /*#__PURE__*/function () {
      function PagenotfoundComponent() {
        _classCallCheck(this, PagenotfoundComponent);
      }

      _createClass(PagenotfoundComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }]);

      return PagenotfoundComponent;
    }();

    PagenotfoundComponent.ɵfac = function PagenotfoundComponent_Factory(t) {
      return new (t || PagenotfoundComponent)();
    };

    PagenotfoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: PagenotfoundComponent,
      selectors: [["app-pagenotfound"]],
      decls: 2,
      vars: 0,
      template: function PagenotfoundComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "pagenotfound works!");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Blb3BsZS9wYWdlbm90Zm91bmQvcGFnZW5vdGZvdW5kLmNvbXBvbmVudC5jc3MifQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PagenotfoundComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-pagenotfound',
          templateUrl: './pagenotfound.component.html',
          styleUrls: ['./pagenotfound.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/people/people-routing.module.ts":
  /*!*************************************************!*\
    !*** ./src/app/people/people-routing.module.ts ***!
    \*************************************************/

  /*! exports provided: PeopleRoutingModule */

  /***/
  function srcAppPeoplePeopleRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PeopleRoutingModule", function () {
      return PeopleRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _people_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./people.component */
    "./src/app/people/people.component.ts");
    /* harmony import */


    var _create_role_create_role_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./create-role/create-role.component */
    "./src/app/people/create-role/create-role.component.ts");
    /* harmony import */


    var _add_members_add_members_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./add-members/add-members.component */
    "./src/app/people/add-members/add-members.component.ts");
    /* harmony import */


    var _edit_members_edit_members_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./edit-members/edit-members.component */
    "./src/app/people/edit-members/edit-members.component.ts");
    /* harmony import */


    var _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./user-management/user-management.component */
    "./src/app/people/user-management/user-management.component.ts");
    /* harmony import */


    var _manage_role_manage_role_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./manage-role/manage-role.component */
    "./src/app/people/manage-role/manage-role.component.ts");
    /* harmony import */


    var _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./pagenotfound/pagenotfound.component */
    "./src/app/people/pagenotfound/pagenotfound.component.ts");

    var routes = [{
      path: '',
      component: _people_component__WEBPACK_IMPORTED_MODULE_2__["PeopleComponent"],
      children: [{
        path: 'create-role',
        component: _create_role_create_role_component__WEBPACK_IMPORTED_MODULE_3__["CreateRoleComponent"]
      }, {
        path: 'add-members',
        component: _add_members_add_members_component__WEBPACK_IMPORTED_MODULE_4__["AddMembersComponent"]
      }, {
        path: 'edit-members',
        component: _edit_members_edit_members_component__WEBPACK_IMPORTED_MODULE_5__["EditMembersComponent"]
      }, {
        path: 'user-management',
        component: _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_6__["UserManagementComponent"]
      }, {
        path: 'manage-role',
        component: _manage_role_manage_role_component__WEBPACK_IMPORTED_MODULE_7__["ManageRoleComponent"]
      }, {
        path: '',
        redirectTo: 'create-role',
        pathMatch: 'full'
      }, {
        path: '**',
        component: _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_8__["PagenotfoundComponent"]
      }]
    }];

    var PeopleRoutingModule = function PeopleRoutingModule() {
      _classCallCheck(this, PeopleRoutingModule);
    };

    PeopleRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: PeopleRoutingModule
    });
    PeopleRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function PeopleRoutingModule_Factory(t) {
        return new (t || PeopleRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PeopleRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PeopleRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/people/people.component.ts":
  /*!********************************************!*\
    !*** ./src/app/people/people.component.ts ***!
    \********************************************/

  /*! exports provided: PeopleComponent */

  /***/
  function srcAppPeoplePeopleComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PeopleComponent", function () {
      return PeopleComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! jquery */
    "./node_modules/jquery/dist/jquery.js");
    /* harmony import */


    var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var PeopleComponent = /*#__PURE__*/function () {
      function PeopleComponent(elementRef) {
        _classCallCheck(this, PeopleComponent);

        this.elementRef = elementRef;
      }

      _createClass(PeopleComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          // $('[data-toggle="tooltip"]').tooltip(); 
          // $( ".mytogglecl" ).click(function() {
          //   alert( "Handler for .click() called." );
          // });
          //copy pasted all custom JS code here.....
          jquery__WEBPACK_IMPORTED_MODULE_1__(function () {
            "use strict"; // ============================================================== 
            // Theme options
            // ==============================================================     
            // ============================================================== 
            // sidebar-hover
            // ==============================================================

            jquery__WEBPACK_IMPORTED_MODULE_1__(".left-sidebar").hover(function () {
              jquery__WEBPACK_IMPORTED_MODULE_1__(".navbar-header").addClass("expand-logo");
            }, function () {
              jquery__WEBPACK_IMPORTED_MODULE_1__(".navbar-header").removeClass("expand-logo");
            }); // this is for close icon when navigation open in mobile view

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
            }); // ============================================================== 
            // Right sidebar options
            // ==============================================================

            jquery__WEBPACK_IMPORTED_MODULE_1__(function () {
              jquery__WEBPACK_IMPORTED_MODULE_1__(".service-panel-toggle").on('click', function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__(".customizer").toggleClass('show-service-panel');
              });
              jquery__WEBPACK_IMPORTED_MODULE_1__('.page-wrapper').on('click', function () {
                jquery__WEBPACK_IMPORTED_MODULE_1__(".customizer").removeClass('show-service-panel');
              });
            }); // ============================================================== 
            // This is for the floating labels
            // ============================================================== 

            jquery__WEBPACK_IMPORTED_MODULE_1__('.floating-labels .form-control').on('focus blur', function (e) {
              jquery__WEBPACK_IMPORTED_MODULE_1__(this).parents('.form-group').toggleClass('focused', e.type === 'focus' || this.value.length > 0);
            }).trigger('blur'); // ============================================================== 
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
            jquery__WEBPACK_IMPORTED_MODULE_1__(".page-wrapper").show(); // ============================================================== 
            // To do list
            // ============================================================== 

            jquery__WEBPACK_IMPORTED_MODULE_1__(".list-task li label").click(function () {
              jquery__WEBPACK_IMPORTED_MODULE_1__(this).toggleClass("task-done");
            }); //****************************

            /* This is for the mini-sidebar if width is less then 1170*/
            //**************************** 

            var setsidebartype = function setsidebartype() {
              var width = window.innerWidth > 0 ? window.innerWidth : this.screen.width;

              if (width < 1170) {
                jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
              } else {
                jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").attr("data-sidebartype", "full");
              }
            };

            jquery__WEBPACK_IMPORTED_MODULE_1__(window).ready(setsidebartype);
            jquery__WEBPACK_IMPORTED_MODULE_1__(window).on("resize", setsidebartype); //****************************

            /* This is for sidebartoggler*/
            //****************************

            jquery__WEBPACK_IMPORTED_MODULE_1__('.sidebartoggler').on("click", function () {
              jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").toggleClass("mini-sidebar");

              if (jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").hasClass("mini-sidebar")) {
                jquery__WEBPACK_IMPORTED_MODULE_1__(".sidebartoggler").prop("checked", !0);
                jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
              } else {
                jquery__WEBPACK_IMPORTED_MODULE_1__(".sidebartoggler").prop("checked", !1);
                jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").attr("data-sidebartype", "full");
              }
            });
          }); // ============================================================== 
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
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).parent("ul#sidebarnav").length === 0 ? jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass("active") : jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass("selected");
              } else if (!jquery__WEBPACK_IMPORTED_MODULE_1__(this).is("ul") && jquery__WEBPACK_IMPORTED_MODULE_1__(this).children("a").length === 0) {
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass("selected");
              } else if (jquery__WEBPACK_IMPORTED_MODULE_1__(this).is("ul")) {
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass('in');
              }
            });
            element.addClass("active");
            jquery__WEBPACK_IMPORTED_MODULE_1__('#sidebarnav a').on('click', function (e) {
              if (!jquery__WEBPACK_IMPORTED_MODULE_1__(this).hasClass("active")) {
                // hide any open menus and remove all other classes
                jquery__WEBPACK_IMPORTED_MODULE_1__("ul", jquery__WEBPACK_IMPORTED_MODULE_1__(this).parents("ul:first")).removeClass("in");
                jquery__WEBPACK_IMPORTED_MODULE_1__("a", jquery__WEBPACK_IMPORTED_MODULE_1__(this).parents("ul:first")).removeClass("active"); // open our new menu and add the open class

                jquery__WEBPACK_IMPORTED_MODULE_1__(this).next("ul").addClass("in");
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass("active");
              } else if (jquery__WEBPACK_IMPORTED_MODULE_1__(this).hasClass("active")) {
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).removeClass("active");
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).parents("ul:first").removeClass("active");
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).next("ul").removeClass("in");
              }
            });
            jquery__WEBPACK_IMPORTED_MODULE_1__('#sidebarnav >li >a.has-arrow').on('click', function (e) {
              e.preventDefault();
            });
          });

          window.onscroll = function () {
            scrollFunction();
          };

          function scrollFunction() {
            if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
              document.getElementById("navbar-people-sewn").style.backgroundColor = "#ffffff";
              document.getElementById("white-sewn-logo").style.display = "none";
              document.getElementById("black-sewn-logo").style.display = "block";
              document.getElementById("white-add").style.display = "none";
              document.getElementById("black-add").style.display = "block";
              document.getElementById("white-msg").style.display = "none";
              document.getElementById("black-msg").style.display = "block";
              document.getElementById("white-alert").style.display = "none";
              document.getElementById("black-alert").style.display = "block";
            } else {
              document.getElementById("navbar-people-sewn").style.backgroundColor = "transparent";
              document.getElementById("white-sewn-logo").style.display = "block";
              document.getElementById("black-sewn-logo").style.display = "none";
              document.getElementById("white-add").style.display = "block";
              document.getElementById("black-add").style.display = "none";
              document.getElementById("white-msg").style.display = "block";
              document.getElementById("black-msg").style.display = "none";
              document.getElementById("white-alert").style.display = "block";
              document.getElementById("black-alert").style.display = "none";
            }
          }
        }
      }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          jquery__WEBPACK_IMPORTED_MODULE_1__(".closed-link").click(function () {
            jquery__WEBPACK_IMPORTED_MODULE_1__(".checking").addClass("ti-menu");
            jquery__WEBPACK_IMPORTED_MODULE_1__("#main-wrapper").removeClass("show-sidebar");
          });
        }
      }]);

      return PeopleComponent;
    }();

    PeopleComponent.ɵfac = function PeopleComponent_Factory(t) {
      return new (t || PeopleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]));
    };

    PeopleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: PeopleComponent,
      selectors: [["app-people"]],
      decls: 133,
      vars: 0,
      consts: [["id", "main-wrapper", 1, "mini-sidebar"], [1, "sewn-bg-img"], ["data-navbarbg", "skin5", 1, "topbar"], ["id", "navbar-people-sewn", 1, "navbar", "top-navbar", "navbar-expand-md", "navbar-dark"], ["data-logobg", "skin5", 1, "navbar-header"], ["href", "javascript:void(0)", 1, "nav-toggler", "waves-effect", "waves-light", "d-block", "d-md-none"], [1, "ti-menu", "ti-close"], ["href", "javascript:void(0)", 1, "navbar-brand"], ["src", "assets/images/Sewn-logo.png", "alt", "user", "id", "white-sewn-logo", 1, "Sewn-Logo", "web-logo"], ["src", "assets/images/sewn-black-logo.svg", "alt", "user", "id", "black-sewn-logo", 1, "Sewn-Logo", "mobile-logo"], ["src", "assets/images/sewn-black-logo.svg", "alt", "user", 1, "Sewn-Logo", "mobile-logo"], ["href", "javascript:void(0)", "data-toggle", "collapse", "data-target", "#navbarSupportedContent", "aria-controls", "navbarSupportedContent", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "topbartoggler", "d-block", "d-md-none", "waves-effect", "waves-light"], [1, "ti-more"], ["id", "navbarSupportedContent", "data-navbarbg", "skin5", 1, "navbar-collapse", "collapse"], [1, "float-left", "mr-auto"], [1, "navbar-nav", "position-standerd"], [1, "nav-item", "d-none", "d-md-block"], ["href", "javascript:void(0)", "data-sidebartype", "mini-sidebar", 1, "nav-link", "sidebartoggler", "waves-effect", "waves-light"], [1, "mdi", "mdi-menu", "font-24"], [1, "nav-item", "search-box"], ["href", "javascript:void(0)", 1, "nav-link", "waves-effect", "waves-dark"], ["type", "text", "name", "search", "placeholder", "Search..", 1, "search"], [1, "navbar-nav", "float-right"], [1, "nav-item", "dropdown", "notify"], ["href", "", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle", "waves-effect", "waves-dark", "blob"], ["src", "assets/images/add.png", "alt", "Dashboard", "id", "white-add"], ["src", "assets/images/black-add.svg", "alt", "Dashboard", "id", "black-add"], ["src", "assets/images/message.png", "alt", "Dashboard", "id", "white-msg"], ["src", "assets/images/black-message.svg", "alt", "Dashboard", "id", "black-msg"], ["href", "", "id", "2", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle", "waves-effect", "waves-dark", "blob"], ["src", "assets/images/alerts.png", "alt", "Dashboard", "id", "white-alert"], ["src", "assets/images/black-alerts.svg", "alt", "Dashboard", "id", "black-alert"], [1, "nav-item", "dropdown"], ["href", "", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle", "text-muted", "pro-pic"], ["src", "assets/images/user-profile.png", "alt", "user", "width", "31", 1, "rounded-circle"], [1, "sewn-profile"], [1, "username", "w-100"], [1, "username", "admin-p", "w-100"], ["data-sidebarbg", "skin5", 1, "left-sidebar"], [1, "scroll-sidebar"], [1, "sidebar-nav"], ["id", "sidebarnav", 1, "p-t-30"], [1, "sidebar-item"], ["routerLink", "/features/dashboard", "aria-expanded", "false", 1, "sidebar-link", "dark", "sidebar-link", "dash", "active"], ["src", "assets/images/dashboard.svg", "alt", "Dashboard"], [1, "hide-menu"], ["href", "javascript:void(0)", "aria-expanded", "false", 1, "sidebar-link", "dark", "sidebar-link", "dash"], ["src", "assets/images/sourcing-module.svg", "alt", "Dashboard"], ["href", "javascript:void(0", "aria-expanded", "false", "href", "javascript:void(0)", 1, "sidebar-link", "has-arrow", "dark", "dash"], ["src", "assets/images/order-management.svg", "alt", "Dashboard"], ["aria-expanded", "false", 1, "collapse", "first-level"], [1, "sidebar-item", "closed-link"], ["href", "javascript:void(0)", 1, "sidebar-link"], ["src", "assets/images/farm-link.svg", "alt", "Dashboard"], ["href", "javascript:void(0", "aria-expanded", "false", 1, "sidebar-link", "dark", "sidebar-link", "dash"], ["src", "assets/images/insights.png", "alt", "Dashboard"], ["src", "assets/images/e-commerce.png", "alt", "Dashboard"], ["src", "assets/images/marketing -sales.png", "alt", "Dashboard"], ["src", "assets/images/people.png", "alt", "Dashboard"], ["routerLink", "../people/manage-role", 1, "sidebar-link"], ["routerLink", "../people/user-management", 1, "sidebar-link"], [1, "sidebar-item", "mt-5"], ["href", "javascript:void(0)", "aria-expanded", "false", 1, "sidebar-link", "dark", "dash"], ["src", "assets/images/help-and-support.png", "alt", "Dashboard"], ["src", "assets/images/terms-and-conditions.png", "alt", "Dashboard"], [1, "sidebar-item", "mb-2"], ["src", "assets/images/privacy-policy.png", "alt", "Dashboard"], [1, "page-wrapper"], [1, "container-fluid"]],
      template: function PeopleComponent_Template(rf, ctx) {
        if (rf & 1) {
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

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "input", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "ul", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "img", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "img", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "a", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "img", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "img", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "li", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "a", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "img", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "img", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "li", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "a", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "img", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, " \xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "span", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, " Mollie Jennings");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "span", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Admin");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "aside", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "nav", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "ul", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "li", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "a", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](50, "img", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Dashboard");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "li", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "a", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "img", 47);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Sourcing Module");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "li", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "a", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "img", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Order Management ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "ul", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "li", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "a", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, " My Orders ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "li", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "a", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, " Payments ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "li", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "a", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "img", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "Farm Link ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "ul", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "li", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "a", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, " My Orders ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "li", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "a", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, " Payments ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "li", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "a", 54);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](88, "img", 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, "Insights");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "li", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "a", 54);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "img", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, "E-commerce");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "li", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "a", 54);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "img", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](100, "Marketing+Sales");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "li", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "a", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "img", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](105, "People ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "ul", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "li", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "a", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](110, " Manage Roles ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "li", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "a", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114, " User Management ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "li", 61);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "a", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](117, "img", 63);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](119, "Help and Support ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "li", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "a", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "img", 64);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](123, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](124, "Terms and Conditions ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "li", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "a", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](127, "img", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "span", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](129, "Privacy Policy ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "div", 67);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "div", 68);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](132, "router-outlet");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterOutlet"]],
      styles: [".welcome-sec[_ngcontent-%COMP%]{\r\n    border-radius: 5px;\r\n    padding: 30px;\r\n    font-size: 14px;\r\n}\r\n.update-title[_ngcontent-%COMP%]{\r\n    font-family: 'PlayfairDisplay';\r\n    font-size: 34px;\r\n    color: #000000;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n}\r\n.create-role-butn[_ngcontent-%COMP%]{\r\n    background-color: #3d8462;\r\n    border:1px solid #3d8462;\r\n    color: #FFFFFF;\r\n    font-weight: 600;\r\n    font-size: 14px;\r\n    padding: 2% 10%;\r\n    border-radius: 8px;\r\n}\r\n.welocme_txt[_ngcontent-%COMP%]{\r\n   word-wrap: break-word;\r\n    padding: 1% 7% 2%;\r\n    font-weight: 600;\r\n    color: #256547;\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    line-height: 1.43;\r\n    color: #666666;\r\n  }\r\n.sewn-bg-img[_ngcontent-%COMP%]{\r\n    \r\n    background-image: url('sewn-bg-cover.png') !important;\r\n\r\n    width: 100%;\r\n    height: 150px;\r\n    position: fixed;\r\n    top: 0;\r\n    background-size: cover;\r\n    overflow: hidden;   \r\n    }\r\n.hello-txt[_ngcontent-%COMP%]{\r\n    font-family: PlayfairDisplay;\r\n    font-size: 38px;\r\n    font-weight: normal;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: 1.21;\r\n    letter-spacing: normal;\r\n    text-align: center;\r\n    color: #ffffff;\r\n    }\r\n.header-sewn[_ngcontent-%COMP%]{\r\n    text-align: center;\r\n    position: relative;\r\n    top: -5rem;\r\n    }\r\n.search-sewn[_ngcontent-%COMP%]{\r\n    color: #aeaeae;\r\n    font-size: 16px;\r\n    padding-left: 5px;\r\n    }\r\n.username[_ngcontent-%COMP%]{\r\n     color: #fff;\r\n    font-size: 14px;\r\n    line-height: 0;\r\n    }\r\n.admin-p[_ngcontent-%COMP%]{\r\n        display: block;\r\n    }\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link[_ngcontent-%COMP%]:hover {\r\n    border: 1px solid #3d8462;\r\n    border-radius: 8px;\r\n    position: relative;\r\n}\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link.active[_ngcontent-%COMP%]{\r\n    border: 1px solid #3d8462;\r\n    border-radius: 8px;\r\n        position: relative;\r\n    }\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link[_ngcontent-%COMP%]{\r\n         position: relative;\r\n    }\r\n.dark.active[_ngcontent-%COMP%]{\r\n         position: relative;\r\n    }\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link[_ngcontent-%COMP%]:before{\r\n    content: \"\";\r\n    width: 5px;\r\n    height: 5px;\r\n    background: #666666;\r\n    border-radius: 50%;\r\n    position: absolute;\r\n    top: 15px;\r\n    left: 10px;\r\n    }\r\n.collapse[_ngcontent-%COMP%]   a.sidebar-link.active[_ngcontent-%COMP%]:before{\r\n    content: \"\";\r\n    width: 5px;\r\n    height: 5px;\r\n    background: #3d8462;\r\n    border-radius: 50%;\r\n    position: absolute;\r\n    top: 15px;\r\n    left: 10px;\r\n    }\r\n.position-standerd[_ngcontent-%COMP%]{\r\n    position: absolute;\r\n    top: 0;\r\n    left: 8rem;\r\n    }\r\n.dark.active[_ngcontent-%COMP%]:before{\r\n   content: \"\";\r\n    width: 4px;\r\n    height: 30px;\r\n    background: #3d8462;\r\n    position: absolute;\r\n    border-radius: 100px;\r\n    top: 12px;\r\n    left: 0px;\r\n   \r\n    }\r\n.dash[_ngcontent-%COMP%]{position: relative;}\r\n.dash[_ngcontent-%COMP%]:before{\r\n    position: absolute;\r\n    content: \"\";\r\n    border-bottom: 1px dashed #aeaeae;\r\n    padding-bottom: .5rem;\r\n    width: 60%;\r\n    left: 24%;\r\n    bottom: 0rem;}\r\n.mini-sidebar[_ngcontent-%COMP%]   .collapse.in[_ngcontent-%COMP%]{display: none;}\r\n.mini-sidebar[_ngcontent-%COMP%]   .sidebar-item[_ngcontent-%COMP%]:hover   .collapse.in[_ngcontent-%COMP%]{display: block;}\r\n.mini-sidebar[_ngcontent-%COMP%]   .dash[_ngcontent-%COMP%]:before{border-bottom: 0;}\r\n.mini-sidebar[_ngcontent-%COMP%]   .left-sidebar[_ngcontent-%COMP%]:hover   .dash[_ngcontent-%COMP%]:before{border-bottom: 1px dashed #aeaeae;}\r\n.mobile-logo[_ngcontent-%COMP%]{\r\n        display: none;\r\n    }\r\ni.mdi[_ngcontent-%COMP%] {\r\n        color: transparent !important;\r\n    }\r\n.sewn-profile[_ngcontent-%COMP%]{\r\n        display: block;\r\n        float: right;\r\n        width: 70%;\r\n        line-height: 41px;\r\n        padding-top: 0.2rem;\r\n    }\r\n#black-sewn-logo[_ngcontent-%COMP%]{\r\n        display:none;\r\n    }\r\n#black-add[_ngcontent-%COMP%], #black-msg[_ngcontent-%COMP%], #black-alert[_ngcontent-%COMP%], #black-search[_ngcontent-%COMP%]{\r\n        display:none;  \r\n    }\r\n.nav-item.notify[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{\r\n        padding-top: 15px !important;\r\n        top: 22px;\r\n        line-height: normal !important;\r\n    }\r\n#navbar-people-sewn[_ngcontent-%COMP%]{\r\n        position: fixed;\r\n    left: 0px;\r\n    right: 0px;\r\n    top: 0px;\r\n    }\r\n\r\n@media only screen and (min-width: 1024px) {\r\n        .page-wrapper[_ngcontent-%COMP%] {\r\n    margin-left: 0px; \r\n    margin-top: 6rem;\r\n }\r\n\r\n\r\n    }\r\n@media only screen and (max-width: 767px) {\r\n        .mobile-logo[_ngcontent-%COMP%]{\r\n            display: block;\r\n        }\r\n        .web-logo[_ngcontent-%COMP%], .sewn-bg-img[_ngcontent-%COMP%]{\r\n            display: none;\r\n        }\r\n\r\n        i.mdi[_ngcontent-%COMP%] {\r\n            color: #c29d7a !important;\r\n        }\r\n\r\n \r\n    }\r\n.search[_ngcontent-%COMP%]{\r\n        font-family: 'Montserrat';\r\n        height: 38px;\r\n        border-radius: 8px;\r\n        border: solid 0px #cccccc;\r\n        background-color: #ffffff;\r\n        background: url('header-search.svg') no-repeat scroll 12px 5px;\r\n        padding-left: 45px;\r\n        }\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGVvcGxlL3Blb3BsZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYixlQUFlO0FBQ25CO0FBQ0E7SUFDSSw4QkFBOEI7SUFDOUIsZUFBZTtJQUNmLGNBQWM7SUFDZCxtQkFBbUI7SUFDbkIsc0JBQXNCO0FBQzFCO0FBQ0E7SUFDSSx5QkFBeUI7SUFDekIsd0JBQXdCO0lBQ3hCLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLGVBQWU7SUFDZixrQkFBa0I7QUFDdEI7QUFDQTtHQUNHLHFCQUFxQjtJQUNwQixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixjQUFjO0VBQ2hCO0FBRUU7SUFDQSxnRkFBZ0Y7SUFDaEYscURBQXVFOztJQUV2RSxXQUFXO0lBQ1gsYUFBYTtJQUNiLGVBQWU7SUFDZixNQUFNO0lBQ04sc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQjtBQUNBO0lBQ0EsNEJBQTRCO0lBQzVCLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsb0JBQW9CO0lBQ3BCLGtCQUFrQjtJQUNsQixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2Q7QUFDQTtJQUNBLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWO0FBQ0E7SUFDQSxjQUFjO0lBQ2QsZUFBZTtJQUNmLGlCQUFpQjtJQUNqQjtBQUVBO0tBQ0MsV0FBVztJQUNaLGVBQWU7SUFDZixjQUFjO0lBQ2Q7QUFFQTtRQUNJLGNBQWM7SUFDbEI7QUFFQTtJQUNBLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsa0JBQWtCO0FBQ3RCO0FBRUk7SUFDQSx5QkFBeUI7SUFDekIsa0JBQWtCO1FBQ2Qsa0JBQWtCO0lBQ3RCO0FBQ0E7U0FDSyxrQkFBa0I7SUFDdkI7QUFDQTtTQUNLLGtCQUFrQjtJQUN2QjtBQUNBO0lBQ0EsV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsU0FBUztJQUNULFVBQVU7SUFDVjtBQUNBO0lBQ0EsV0FBVztJQUNYLFVBQVU7SUFDVixXQUFXO0lBQ1gsbUJBQW1CO0lBQ25CLGtCQUFrQjtJQUNsQixrQkFBa0I7SUFDbEIsU0FBUztJQUNULFVBQVU7SUFDVjtBQUNBO0lBQ0Esa0JBQWtCO0lBQ2xCLE1BQU07SUFDTixVQUFVO0lBQ1Y7QUFFRjtHQUNDLFdBQVc7SUFDVixVQUFVO0lBQ1YsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixrQkFBa0I7SUFDbEIsb0JBQW9CO0lBQ3BCLFNBQVM7SUFDVCxTQUFTOztJQUVUO0FBQ0EsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QjtJQUNBLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsaUNBQWlDO0lBQ2pDLHFCQUFxQjtJQUNyQixVQUFVO0lBQ1YsU0FBUztJQUNULFlBQVksQ0FBQztBQUViLDJCQUEyQixhQUFhLENBQUM7QUFDekMsK0NBQStDLGNBQWMsQ0FBQztBQUM5RCwyQkFBMkIsZ0JBQWdCLENBQUM7QUFDNUMsK0NBQStDLGlDQUFpQyxDQUFDO0FBQ2pGO1FBQ0ksYUFBYTtJQUNqQjtBQUNBO1FBQ0ksNkJBQTZCO0lBQ2pDO0FBQ0E7UUFDSSxjQUFjO1FBQ2QsWUFBWTtRQUNaLFVBQVU7UUFDVixpQkFBaUI7UUFDakIsbUJBQW1CO0lBQ3ZCO0FBQ0E7UUFDSSxZQUFZO0lBQ2hCO0FBQ0E7UUFDSSxZQUFZO0lBQ2hCO0FBRUE7UUFDSSw0QkFBNEI7UUFDNUIsU0FBUztRQUNULDhCQUE4QjtJQUNsQztBQUtBO1FBQ0ksZUFBZTtJQUNuQixTQUFTO0lBQ1QsVUFBVTtJQUNWLFFBQVE7SUFDUjtBQUVBLGlDQUFpQztBQUNqQztRQUNJO0lBQ0osZ0JBQWdCO0lBQ2hCLGdCQUFnQjtDQUNuQjs7O0lBR0c7QUFFQTtRQUNJO1lBQ0ksY0FBYztRQUNsQjtRQUNBO1lBQ0ksYUFBYTtRQUNqQjs7UUFFQTtZQUNJLHlCQUF5QjtRQUM3Qjs7O0lBR0o7QUFFQTtRQUNJLHlCQUF5QjtRQUN6QixZQUFZO1FBQ1osa0JBQWtCO1FBQ2xCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsOERBQWdGO1FBQ2hGLGtCQUFrQjtRQUNsQiIsImZpbGUiOiJzcmMvYXBwL3Blb3BsZS9wZW9wbGUuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi53ZWxjb21lLXNlY3tcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIHBhZGRpbmc6IDMwcHg7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuLnVwZGF0ZS10aXRsZXtcclxuICAgIGZvbnQtZmFtaWx5OiAnUGxheWZhaXJEaXNwbGF5JztcclxuICAgIGZvbnQtc2l6ZTogMzRweDtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG4gICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbn1cclxuLmNyZWF0ZS1yb2xlLWJ1dG57XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2Q4NDYyO1xyXG4gICAgYm9yZGVyOjFweCBzb2xpZCAjM2Q4NDYyO1xyXG4gICAgY29sb3I6ICNGRkZGRkY7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgcGFkZGluZzogMiUgMTAlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG59XHJcbi53ZWxvY21lX3R4dHtcclxuICAgd29yZC13cmFwOiBicmVhay13b3JkO1xyXG4gICAgcGFkZGluZzogMSUgNyUgMiU7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICMyNTY1NDc7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuNDM7XHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxuICB9XHJcblxyXG4gICAgLnNld24tYmctaW1ne1xyXG4gICAgLyogYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvc2V3bi1iZy1jb3Zlci5wbmcpICFpbXBvcnRhbnQ7ICovXHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vLi4vYXNzZXRzL2ltYWdlcy9zZXduLWJnLWNvdmVyLnBuZykgIWltcG9ydGFudDtcclxuXHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTUwcHg7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB0b3A6IDA7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjsgICBcclxuICAgIH1cclxuICAgIC5oZWxsby10eHR7XHJcbiAgICBmb250LWZhbWlseTogUGxheWZhaXJEaXNwbGF5O1xyXG4gICAgZm9udC1zaXplOiAzOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcclxuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMjE7XHJcbiAgICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgY29sb3I6ICNmZmZmZmY7XHJcbiAgICB9XHJcbiAgICAuaGVhZGVyLXNld257XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB0b3A6IC01cmVtO1xyXG4gICAgfVxyXG4gICAgLnNlYXJjaC1zZXdue1xyXG4gICAgY29sb3I6ICNhZWFlYWU7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDVweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLnVzZXJuYW1le1xyXG4gICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLmFkbWluLXB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC5jb2xsYXBzZSBhLnNpZGViYXItbGluazpob3ZlciB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjM2Q4NDYyO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbiAgICBcclxuICAgIC5jb2xsYXBzZSAgYS5zaWRlYmFyLWxpbmsuYWN0aXZle1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzNkODQ2MjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcclxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB9XHJcbiAgICAuY29sbGFwc2UgIGEuc2lkZWJhci1saW5re1xyXG4gICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICB9XHJcbiAgICAuZGFyay5hY3RpdmV7XHJcbiAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIH1cclxuICAgIC5jb2xsYXBzZSAgYS5zaWRlYmFyLWxpbms6YmVmb3Jle1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIHdpZHRoOiA1cHg7XHJcbiAgICBoZWlnaHQ6IDVweDtcclxuICAgIGJhY2tncm91bmQ6ICM2NjY2NjY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDE1cHg7XHJcbiAgICBsZWZ0OiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLmNvbGxhcHNlICBhLnNpZGViYXItbGluay5hY3RpdmU6YmVmb3Jle1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIHdpZHRoOiA1cHg7XHJcbiAgICBoZWlnaHQ6IDVweDtcclxuICAgIGJhY2tncm91bmQ6ICMzZDg0NjI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDE1cHg7XHJcbiAgICBsZWZ0OiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLnBvc2l0aW9uLXN0YW5kZXJke1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogOHJlbTtcclxuICAgIH1cclxuICAgIFxyXG4gIC5kYXJrLmFjdGl2ZTpiZWZvcmV7XHJcbiAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICB3aWR0aDogNHB4O1xyXG4gICAgaGVpZ2h0OiAzMHB4O1xyXG4gICAgYmFja2dyb3VuZDogIzNkODQ2MjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwMHB4O1xyXG4gICAgdG9wOiAxMnB4O1xyXG4gICAgbGVmdDogMHB4O1xyXG4gICBcclxuICAgIH1cclxuICAgIC5kYXNoe3Bvc2l0aW9uOiByZWxhdGl2ZTt9XHJcbiAgICAuZGFzaDpiZWZvcmV7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBjb250ZW50OiBcIlwiO1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IGRhc2hlZCAjYWVhZWFlO1xyXG4gICAgcGFkZGluZy1ib3R0b206IC41cmVtO1xyXG4gICAgd2lkdGg6IDYwJTtcclxuICAgIGxlZnQ6IDI0JTtcclxuICAgIGJvdHRvbTogMHJlbTt9XHJcbiAgICBcclxuICAgIC5taW5pLXNpZGViYXIgLmNvbGxhcHNlLmlue2Rpc3BsYXk6IG5vbmU7fVxyXG4gICAgLm1pbmktc2lkZWJhciAuc2lkZWJhci1pdGVtOmhvdmVyIC5jb2xsYXBzZS5pbntkaXNwbGF5OiBibG9jazt9XHJcbiAgICAubWluaS1zaWRlYmFyIC5kYXNoOmJlZm9yZXtib3JkZXItYm90dG9tOiAwO31cclxuICAgIC5taW5pLXNpZGViYXIgLmxlZnQtc2lkZWJhcjpob3ZlciAuZGFzaDpiZWZvcmV7Ym9yZGVyLWJvdHRvbTogMXB4IGRhc2hlZCAjYWVhZWFlO31cclxuICAgIC5tb2JpbGUtbG9nb3tcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG4gICAgaS5tZGkge1xyXG4gICAgICAgIGNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLnNld24tcHJvZmlsZXtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICAgICAgd2lkdGg6IDcwJTtcclxuICAgICAgICBsaW5lLWhlaWdodDogNDFweDtcclxuICAgICAgICBwYWRkaW5nLXRvcDogMC4ycmVtO1xyXG4gICAgfVxyXG4gICAgI2JsYWNrLXNld24tbG9nb3tcclxuICAgICAgICBkaXNwbGF5Om5vbmU7XHJcbiAgICB9XHJcbiAgICAjYmxhY2stYWRkLCAjYmxhY2stbXNnLCAjYmxhY2stYWxlcnQsICNibGFjay1zZWFyY2h7XHJcbiAgICAgICAgZGlzcGxheTpub25lOyAgXHJcbiAgICB9XHJcblxyXG4gICAgLm5hdi1pdGVtLm5vdGlmeSBhe1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiAxNXB4ICFpbXBvcnRhbnQ7XHJcbiAgICAgICAgdG9wOiAyMnB4O1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgXHJcblxyXG4gICAgI25hdmJhci1wZW9wbGUtc2V3bntcclxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBsZWZ0OiAwcHg7XHJcbiAgICByaWdodDogMHB4O1xyXG4gICAgdG9wOiAwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLyogY3VzdG9tIGNvZGUgcGFnZSB3cmFwcGVyIDEwMjQqL1xyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDI0cHgpIHtcclxuICAgICAgICAucGFnZS13cmFwcGVyIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAwcHg7IFxyXG4gICAgbWFyZ2luLXRvcDogNnJlbTtcclxuIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcclxuICAgICAgICAubW9iaWxlLWxvZ297XHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAud2ViLWxvZ28sIC5zZXduLWJnLWltZ3tcclxuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGkubWRpIHtcclxuICAgICAgICAgICAgY29sb3I6ICNjMjlkN2EgIWltcG9ydGFudDtcclxuICAgICAgICB9XHJcblxyXG4gXHJcbiAgICB9XHJcblxyXG4gICAgLnNlYXJjaHtcclxuICAgICAgICBmb250LWZhbWlseTogJ01vbnRzZXJyYXQnO1xyXG4gICAgICAgIGhlaWdodDogMzhweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICAgICAgYm9yZGVyOiBzb2xpZCAwcHggI2NjY2NjYztcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHVybCguLi8uLi9hc3NldHMvaW1hZ2VzL2hlYWRlci1zZWFyY2guc3ZnKSBuby1yZXBlYXQgc2Nyb2xsIDEycHggNXB4O1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogNDVweDtcclxuICAgICAgICB9XHJcbiAgICAiXX0= */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PeopleComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-people',
          templateUrl: './people.component.html',
          styleUrls: ['./people.component.css']
        }]
      }], function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]
        }];
      }, null);
    })();
    /***/

  },

  /***/
  "./src/app/people/people.module.ts":
  /*!*****************************************!*\
    !*** ./src/app/people/people.module.ts ***!
    \*****************************************/

  /*! exports provided: PeopleModule */

  /***/
  function srcAppPeoplePeopleModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PeopleModule", function () {
      return PeopleModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _people_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./people-routing.module */
    "./src/app/people/people-routing.module.ts");
    /* harmony import */


    var _people_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./people.component */
    "./src/app/people/people.component.ts");
    /* harmony import */


    var _create_role_create_role_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./create-role/create-role.component */
    "./src/app/people/create-role/create-role.component.ts");
    /* harmony import */


    var _edit_members_edit_members_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./edit-members/edit-members.component */
    "./src/app/people/edit-members/edit-members.component.ts");
    /* harmony import */


    var _add_members_add_members_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./add-members/add-members.component */
    "./src/app/people/add-members/add-members.component.ts");
    /* harmony import */


    var _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./user-management/user-management.component */
    "./src/app/people/user-management/user-management.component.ts");
    /* harmony import */


    var _manage_role_manage_role_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./manage-role/manage-role.component */
    "./src/app/people/manage-role/manage-role.component.ts");
    /* harmony import */


    var _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! ./pagenotfound/pagenotfound.component */
    "./src/app/people/pagenotfound/pagenotfound.component.ts");
    /* harmony import */


    var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! primeng/overlaypanel */
    "./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-overlaypanel.js");

    var PeopleModule = function PeopleModule() {
      _classCallCheck(this, PeopleModule);
    };

    PeopleModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: PeopleModule
    });
    PeopleModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function PeopleModule_Factory(t) {
        return new (t || PeopleModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _people_routing_module__WEBPACK_IMPORTED_MODULE_2__["PeopleRoutingModule"], primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_10__["OverlayPanelModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](PeopleModule, {
        declarations: [_people_component__WEBPACK_IMPORTED_MODULE_3__["PeopleComponent"], _create_role_create_role_component__WEBPACK_IMPORTED_MODULE_4__["CreateRoleComponent"], _edit_members_edit_members_component__WEBPACK_IMPORTED_MODULE_5__["EditMembersComponent"], _add_members_add_members_component__WEBPACK_IMPORTED_MODULE_6__["AddMembersComponent"], _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_7__["UserManagementComponent"], _manage_role_manage_role_component__WEBPACK_IMPORTED_MODULE_8__["ManageRoleComponent"], _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_9__["PagenotfoundComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _people_routing_module__WEBPACK_IMPORTED_MODULE_2__["PeopleRoutingModule"], primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_10__["OverlayPanelModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PeopleModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_people_component__WEBPACK_IMPORTED_MODULE_3__["PeopleComponent"], _create_role_create_role_component__WEBPACK_IMPORTED_MODULE_4__["CreateRoleComponent"], _edit_members_edit_members_component__WEBPACK_IMPORTED_MODULE_5__["EditMembersComponent"], _add_members_add_members_component__WEBPACK_IMPORTED_MODULE_6__["AddMembersComponent"], _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_7__["UserManagementComponent"], _manage_role_manage_role_component__WEBPACK_IMPORTED_MODULE_8__["ManageRoleComponent"], _pagenotfound_pagenotfound_component__WEBPACK_IMPORTED_MODULE_9__["PagenotfoundComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _people_routing_module__WEBPACK_IMPORTED_MODULE_2__["PeopleRoutingModule"], primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_10__["OverlayPanelModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/people/user-management/user-management.component.ts":
  /*!*********************************************************************!*\
    !*** ./src/app/people/user-management/user-management.component.ts ***!
    \*********************************************************************/

  /*! exports provided: UserManagementComponent */

  /***/
  function srcAppPeopleUserManagementUserManagementComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UserManagementComponent", function () {
      return UserManagementComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! primeng/overlaypanel */
    "./node_modules/primeng/__ivy_ngcc__/fesm2015/primeng-overlaypanel.js");

    var UserManagementComponent = /*#__PURE__*/function () {
      function UserManagementComponent() {
        _classCallCheck(this, UserManagementComponent);
      }

      _createClass(UserManagementComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {}
      }, {
        key: "ngAfterViewChecked",
        value: function ngAfterViewChecked() {
          $('[data-toggle="popover"]').popover({
            html: true,
            content: function content() {
              return $('#popover-content').html();
            }
          });
          $('[data-toggle="popover"]').popover({
            html: true,
            content: function content() {
              return $('#popover-mobile-content').html();
            }
          });
          $('[data-toggle="popover-roles"]').popover({
            html: true,
            content: function content() {
              return $('#roles-content').html();
            }
          });
          $('[data-toggle="popover-status"]').popover({
            html: true,
            content: function content() {
              return $('#status-content').html();
            }
          });
        }
      }]);

      return UserManagementComponent;
    }();

    UserManagementComponent.ɵfac = function UserManagementComponent_Factory(t) {
      return new (t || UserManagementComponent)();
    };

    UserManagementComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: UserManagementComponent,
      selectors: [["app-user-management"]],
      decls: 374,
      vars: 1,
      consts: [[1, "header-sewn"], [1, "hello-txt"], [1, "page-breadcrumb"], [1, "row"], [1, "col-12", "d-flex", "no-block", "align-items-center"], [1, ""], ["aria-label", "breadcrumb"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["routerLink", "/features/welcome-aboard"], ["aria-current", "page", 1, "breadcrumb-item", "active"], [1, "title-header", "d-inline"], [1, "d-inline", "col-sm-12", "page-title"], [1, "d-inline", "col-sm-12", "search-div"], ["type", "text", "name", "search", "placeholder", "Search by Name,role..", 1, "search"], [1, "d-inline", "status-div", "col-sm-12"], [1, "d-inline"], [1, "d-inline", "filter"], ["data-placement", "bottom", "data-toggle", "popover-status"], ["src", "assets/images/active.png"], [1, "d-inline", "role-div", "col-sm-12"], ["data-toggle", "popover-roles", "data-placement", "bottom"], [1, "table-container", "desk_view_user"], [1, "table-responsive"], [1, "table"], [1, "table-header"], [1, "header-row"], [1, "customcheckbox", "m-b-20"], ["type", "checkbox", "id", "mainCheckbox"], [1, "checkmark", "head-check"], ["scope", "col"], ["src", "assets/images/combined-shape.png"], [1, "customtable"], [1, "customcheckbox"], ["type", "checkbox", 1, "listCheckbox"], [1, "checkmark", "body-check"], [1, "status-active"], [3, "click"], [1, "status-disabled"], ["data-toggle", "popover", "data-placement", "left", "data-toggle", "popover"], [1, "", 3, "click"], [1, "mobile_view_user"], [1, "column"], [1, "card", "header_main"], [1, "name_head"], [1, "last_head"], [1, "email_head"], [1, "status_head"], [1, "roles_head"], [1, "action_head"], [1, "card"], [1, "col-12"], [1, "name_data"], ["data-toggle", "popover", "data-placement", "bottom"], ["appendTo", "body", 3, "dismissable"], ["op", ""], [1, "overflow-popover"], [1, "list-group", "custom-popover"], [1, "content_list"], [1, "btn", "addrole_button"], [1, "addrole_content"], ["id", "popover-mobile-content", 2, "display", "none"], [1, "list-group-item"], ["id", "roles-content", 2, "display", "none"], ["id", "status-content", 2, "display", "none"]],
      template: function UserManagementComponent_Template(rf, ctx) {
        if (rf & 1) {
          var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " User Management");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "nav", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ol", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "li", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Home");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "User Management");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " User Management ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "\xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Status:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "p", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, " All\xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "a", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "img", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "\xA0\xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "Role:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "p", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, " All\xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "a", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "img", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "table", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "thead", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "tr", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "label", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "input", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "span", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "th", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Name");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "th", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "Last Login\xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "img", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "th", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Email");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "th", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Status");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "th", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "All Roles\xA0 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "img", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "th", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "Action");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "tbody", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "input", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Luis Stanley");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "24/09/2019 11:45am");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, " Luis.s@roaster.com ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Sales");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "a", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserManagementComponent_Template_a_click_76_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

            var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](304);

            return _r10.toggle($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](78, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](82, "input", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](83, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, "Lillian Duncan");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, "24/09/2019 1:00pm");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, " Lillian@roaster.com ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "p", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "\u25CF Disabled");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](94, "Accountant");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "a", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](98, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](101, "label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](102, "input", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](105, "Sean Hawkins");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](107, "13/09/2019 5:00pm");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109, " Sean.H@roaster.com ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](112, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114, "Brand Management");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "a", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](118, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "input", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](125, "Harold Carpenter");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](127, "02/09/2019 10:07am");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](128, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](129, " Harold@roaster.com ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](131, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](132, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](134, "Marketing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "a", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](137, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](138, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](140, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](142, "input", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](143, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](145, "James Fitzgerald");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](146, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](147, "02/01/2020 7:23am");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](149, " James.f@roaster.com ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](150, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](151, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](152, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](153, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](154, "Marketing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](155, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "a", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](157, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](158, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](159, "tr");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](160, "th");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](161, "label", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](162, "input", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](163, "span", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](164, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](165, "Mae Grant");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](167, "19/08/2019 9:16pm");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](168, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](169, " Mae.grant@roaster.com ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](170, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](171, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](172, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](173, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](174, "Admin");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](175, "td");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](177, "p", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UserManagementComponent_Template_p_click_177_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);

            var _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](304);

            return _r10.toggle($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](178, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](179, "div", 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](181, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](182, "div", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](183, "div", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](184, "Name");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](185, "div", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](186, "Last Login");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](187, "div", 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](188, "Email");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](189, "div", 47);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](190, "Status");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](191, "div", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](192, "All Roles");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](193, "div", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](194, "Action");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](196, "div", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](197, "div", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](198, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](199, "Luis Stanley");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](200, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](201, "24/09/2019 11:45am");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](202, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](203, "Luis.s@roaster.com");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](204, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](205, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](206, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](208, "Sales ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](209, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](210, "a", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](212, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](214, "div", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](215, "div", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](216, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](217, "Lillian Duncan");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](218, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](219, "24/09/2019 1:00pm");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](220, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](221, "Lillian@roaster.com");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](222, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](223, "p", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](224, "\u25CF Disabled");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](225, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](226, "Accounting");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](227, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](228, "a", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](229, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](230, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](231, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](232, "div", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](233, "div", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](234, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](235, "Sean Hawkins");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](236, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](237, "13/09/2019 5:00pm");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](238, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](239, "Sean.H@roaster.com");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](240, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](241, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](242, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](243, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](244, "Brand Management");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](245, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](246, "a", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](247, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](248, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](249, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](250, "div", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](251, "div", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](252, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](253, "Harold Carpenter");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](254, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](255, "02/09/2019 10:07am");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](256, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](257, "Harold@roaster.com");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](258, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](259, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](260, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](261, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](262, "Marketing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](263, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](264, "a", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](265, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](266, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](267, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](268, "div", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](269, "div", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](270, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](271, "James Fitzgerald");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](272, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](273, "02/01/2020 7:23am");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](274, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](275, "James.f@roaster.com");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](276, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](277, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](278, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](279, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](280, "Marketing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](281, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](282, "a", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](283, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](284, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](285, "div", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](286, "div", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](287, "div", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](288, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](289, "Mae Grant");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](290, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](291, "19/08/2019 9:16pm");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](292, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](293, "Mae.grant@roaster.com");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](294, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](295, "p", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](296, "\u25CF Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](297, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](298, "Admin");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](299, "div", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](300, "a", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](301, "p", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](302, "\u22EE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](303, "p-overlayPanel", 54, 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](305, "div", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](306, "ul", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](307, "li", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](308, "Sourcing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](309, "li", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](310, "Accounts");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](311, "button", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](312, "span", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](313, "ADD ROLE");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](314, "div", 61);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](315, "ul", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](316, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](317, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](318, "Edit");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](319, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](320, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](321, "Send a message");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](322, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](323, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](324, "Send a recovery email");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](325, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](326, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](327, "Rename");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](328, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](329, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](330, "Disable account");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](331, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](332, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](333, "Simulated Login");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](334, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](335, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](336, "Make Admin");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](337, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](338, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](339, "Customize Permissions");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](340, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](341, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](342, "Delete");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](343, "div", 63);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](344, "ul", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](345, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](346, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](347, "All");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](348, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](349, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](350, "Sourcing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](351, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](352, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](353, "Accountant");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](354, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](355, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](356, "Brand Management");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](357, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](358, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](359, "Marketing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](360, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](361, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](362, "Sales & Marketing");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](363, "div", 64);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](364, "ul", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](365, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](366, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](367, "All");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](368, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](369, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](370, "Active");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](371, "li", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](372, "a");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](373, "Disabled");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](303);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dismissable", true);
        }
      },
      directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"], primeng_overlaypanel__WEBPACK_IMPORTED_MODULE_2__["OverlayPanel"]],
      styles: [".page-breadcrumb[_ngcontent-%COMP%]{\r\n    background-color: #FFFFFF;\r\n    margin: 1% 5% 2% 4%;\r\n}\r\n\r\n.table-container[_ngcontent-%COMP%]{\r\n    margin: 1% 5% 0% 5%;\r\n}\r\n\r\n.page-wrapper[_ngcontent-%COMP%]{\r\n    background-color: #FFFFFF;\r\n}\r\n\r\n.create-role-btn[_ngcontent-%COMP%]{\r\n    color: white;\r\n    border-radius: 8px;\r\n    background-color: #3d8462;\r\n}\r\n\r\n.view-btn[_ngcontent-%COMP%], .add-btn[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\n    border: solid 1px #3d8462;\r\n    background-color: #ffffff;\r\n    font-family: 'Montserrat';\r\n    font-size: 14px;\r\n    font-weight: 500;\r\n    font-stretch: normal;\r\n    font-style: normal;\r\n    line-height: normal;\r\n    letter-spacing: normal;\r\n    color: #3d8462;\r\n}\r\n\r\n.list-group-item[_ngcontent-%COMP%]{\r\n    border: none;\r\n    font-family: 'Montserrat';\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  color: #000000;\r\n}\r\n\r\n.popover-body[_ngcontent-%COMP%]{\r\n    box-shadow: 0 0 17px 2px rgba(27, 27, 27, 0.08);\r\n    background-color: #ffffff;\r\n    padding: 0;\r\n}\r\n\r\n.popover[_ngcontent-%COMP%]{\r\n    border: 1px solid #FFFFFF;\r\n    border-radius: 5px !important;\r\n    position: absolute;\r\ntransform: translate3d(988px, 253px, 0px);\r\ntop: 0px;\r\nleft: 0px !important;\r\nwill-change: transform;\r\n}\r\n\r\n.table-header[_ngcontent-%COMP%]{\r\n    border-radius: 8px;\r\nbackground-color: #faf8f4;\r\n}\r\n\r\n.header-row[_ngcontent-%COMP%]{\r\n    border: none !important;\r\n}\r\n\r\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{\r\n    border: none !important;\r\n}\r\n\r\ntr[_ngcontent-%COMP%]{\r\n    border-bottom: 1px dashed #ddd;\r\n}\r\n\r\ntr[_ngcontent-%COMP%]:last-child {\r\n    border-bottom-style: none;\r\n    border-bottom-color: none;\r\n}\r\n\r\n.table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n    color: #87623b;\r\n    font-weight: 600;\r\n    font-family: 'Montserrat';\r\n}\r\n\r\nspan.checkmark[_ngcontent-%COMP%]{\r\n    background-color: white;\r\n    border: 1px solid #666666;\r\n    border-radius: 4px;\r\n}\r\n\r\n.customcheckbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    ~ .checkmark[_ngcontent-%COMP%] {\r\nbackground-color: #000;\r\n}\r\n\r\n.breadcrumb-item[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] { \r\n    color: #666666;\r\n }\r\n\r\n.breadcrumb-item.active[_ngcontent-%COMP%]{\r\n    color: #000;\r\n }\r\n\r\ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{\r\n      font-family: 'Montserrat';\r\nfont-size: 14px;\r\nfont-weight: 500;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #000000;\r\n }\r\n\r\n.title-header[_ngcontent-%COMP%]{\r\n    margin: 3% 5% 0% 5%\r\n }\r\n\r\n.page-title[_ngcontent-%COMP%]{\r\n    font-family: 'Montserrat';\r\nfont-size: 18px;\r\nfont-weight: 600;\r\nfont-stretch: normal;\r\nfont-style: normal;\r\nline-height: normal;\r\nletter-spacing: normal;\r\ncolor: #000000;\r\n }\r\n\r\n.search[_ngcontent-%COMP%]{\r\n    \r\n    font-family: 'Montserrat';\r\nheight: 36px;\r\nborder-radius: 8px;\r\nborder: solid 1px #cccccc;\r\nbackground-color: #ffffff;\r\nbackground: url('grey.png') no-repeat scroll 12px 5px;\r\npadding-left:45px;\r\n }\r\n\r\n.filter[_ngcontent-%COMP%]{\r\n    font-family: 'Montserrat';\r\n    font-weight: 600;\r\n    color: #3d8462;\r\n }\r\n\r\np.status-active[_ngcontent-%COMP%]{\r\n        color: #1fa83a;\r\n        margin-bottom: 0;\r\n }\r\n\r\np.status-disabled[_ngcontent-%COMP%]{\r\n    color: #666666;\r\n    margin-bottom: 0;\r\n }\r\n\r\n\r\n\r\n\r\n\r\n.column[_ngcontent-%COMP%] {\r\nfloat: left;\r\nwidth: 50%;\r\npadding: 0 10px;\r\nbox-sizing: border-box;\r\n}\r\n\r\n\r\n\r\n.row[_ngcontent-%COMP%] {margin: 0 -5px;}\r\n\r\n\r\n\r\n.row[_ngcontent-%COMP%]:after {\r\ncontent: \"\";\r\ndisplay: table;\r\nclear: both;\r\n}\r\n\r\n\r\n\r\n.card[_ngcontent-%COMP%] {\r\n\r\n\r\ntext-align: center;\r\nbackground-color: #faf8f4;\r\nfont-size: 13px;\r\n}\r\n\r\n.header_main[_ngcontent-%COMP%]{\r\n\r\nbackground-color: #FFFFFF !important;\r\nborder: 1px solid #666666;\r\n}\r\n\r\n.name_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.last_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.email_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.status_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.roles_head[_ngcontent-%COMP%]{\r\nborder-bottom: 1px solid #f9e8e8;\r\npadding: 2%;\r\n}\r\n\r\n.action_head[_ngcontent-%COMP%]{\r\npadding: 2%;\r\n}\r\n\r\n.data_role[_ngcontent-%COMP%]{\r\npadding-top: 5%;\r\n}\r\n\r\n.name_data[_ngcontent-%COMP%]{\r\npadding-top: 5%;\r\n}\r\n\r\n@media only screen and (min-width: 320px) and (max-width: 920px)  {\r\n.desk_view_user[_ngcontent-%COMP%]{\r\n    display: none;\r\n}\r\n.mobile_view_user[_ngcontent-%COMP%]{\r\n    display: block;\r\n    margin-top: 5%;\r\n}\r\n.list-group-item[_ngcontent-%COMP%]{\r\n    border: none;\r\n    font-family: 'Montserrat';\r\n  font-size: 10px;\r\n  font-weight: 500;\r\n  font-stretch: normal;\r\n  font-style: normal;\r\n  line-height: normal;\r\n  letter-spacing: normal;\r\n  color: #000000;\r\n} \r\n.popover-body[_ngcontent-%COMP%]{\r\n    box-shadow: 0 0 17px 2px rgba(27, 27, 27, 0.08);\r\n    background-color: #ffffff;\r\n    padding: 0;\r\n}\r\n.popover[_ngcontent-%COMP%]{\r\n    border: 1px solid #FFFFFF;\r\n    border-radius: 5px !important;\r\n    position: absolute;\r\ntransform: translate3d(988px, 253px, 0px);\r\ntop: 0px;\r\nleft: 0px !important;\r\nwill-change: transform;\r\n}\r\n.page-breadcrumb[_ngcontent-%COMP%]{\r\n    margin: 0;\r\n    padding: 15px 0px 10px 0px !important;\r\n}\r\n .page-title[_ngcontent-%COMP%]{\r\n    display: inline-block!important;\r\n    \r\n }\r\n .title-header[_ngcontent-%COMP%]{\r\n    margin-left: 0% !important;\r\n }\r\n}\r\n\r\n@media only screen and (min-width: 921px){\r\n.desk_view_user[_ngcontent-%COMP%]{\r\ndisplay:block;\r\npadding: 0;\r\n}\r\n.mobile_view_user[_ngcontent-%COMP%]{\r\n  display: none;\r\n}\r\n}\r\n\r\n\r\n\r\n@media screen and (max-width: 767px) {\r\n.column[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  display: block;\r\n  margin-bottom: 20px;\r\n}\r\n.spacing-top[_ngcontent-%COMP%]{\r\n    margin-top: 1.4rem !important;\r\n }\r\n .search-div[_ngcontent-%COMP%], .role-div[_ngcontent-%COMP%], .status-div[_ngcontent-%COMP%], .page-title[_ngcontent-%COMP%]{\r\n    display: inline-block!important;\r\n    text-align: center;\r\n    margin-bottom: 0% !important;\r\n }\r\n .title-header[_ngcontent-%COMP%]{\r\n    margin-left: 0% !important;\r\n }\r\n \r\n}\r\n\r\n.table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], .table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\r\n    vertical-align: middle !important;\r\n}\r\n\r\n.body-check[_ngcontent-%COMP%]{\r\n    top:-6px !important;\r\n}\r\n\r\n.head-check[_ngcontent-%COMP%]{\r\n    top:-6px !important;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGVvcGxlL3VzZXItbWFuYWdlbWVudC91c2VyLW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsZ0VBQWdFOztBQUVoRTtJQUNJLHlCQUF5QjtJQUN6QixtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSxtQkFBbUI7QUFDdkI7O0FBQ0E7SUFDSSx5QkFBeUI7QUFDN0I7O0FBQ0E7SUFDSSxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHlCQUF5QjtBQUM3Qjs7QUFDQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6QixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLG9CQUFvQjtJQUNwQixrQkFBa0I7SUFDbEIsbUJBQW1CO0lBQ25CLHNCQUFzQjtJQUN0QixjQUFjO0FBQ2xCOztBQUNBO0lBQ0ksWUFBWTtJQUNaLHlCQUF5QjtFQUMzQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixjQUFjO0FBQ2hCOztBQUNBO0lBQ0ksK0NBQStDO0lBQy9DLHlCQUF5QjtJQUN6QixVQUFVO0FBQ2Q7O0FBQ0E7SUFDSSx5QkFBeUI7SUFDekIsNkJBQTZCO0lBQzdCLGtCQUFrQjtBQUN0Qix5Q0FBeUM7QUFDekMsUUFBUTtBQUNSLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEI7O0FBQ0E7SUFDSSxrQkFBa0I7QUFDdEIseUJBQXlCO0FBQ3pCOztBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUNBO0lBQ0ksdUJBQXVCO0FBQzNCOztBQUNBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLHlCQUF5QjtBQUM3Qjs7QUFDQTtJQUNJLGNBQWM7SUFDZCxnQkFBZ0I7SUFDaEIseUJBQXlCO0FBQzdCOztBQUNDO0lBQ0csdUJBQXVCO0lBQ3ZCLHlCQUF5QjtJQUN6QixrQkFBa0I7QUFDdEI7O0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7O0FBQ0E7SUFDSSxjQUFjO0NBQ2pCOztBQUNBO0lBQ0csV0FBVztDQUNkOztBQUNBO01BQ0sseUJBQXlCO0FBQy9CLGVBQWU7QUFDZixnQkFBZ0I7QUFDaEIsb0JBQW9CO0FBQ3BCLGtCQUFrQjtBQUNsQixtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGNBQWM7Q0FDYjs7QUFDQTtJQUNHO0NBQ0g7O0FBQ0E7SUFDRyx5QkFBeUI7QUFDN0IsZUFBZTtBQUNmLGdCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsa0JBQWtCO0FBQ2xCLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsY0FBYztDQUNiOztBQUNBO0lBQ0csZ0JBQWdCO0lBQ2hCLHlCQUF5QjtBQUM3QixZQUFZO0FBQ1osa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIscURBQTBFO0FBQzFFLGlCQUFpQjtDQUNoQjs7QUFDQTtJQUNHLHlCQUF5QjtJQUN6QixnQkFBZ0I7SUFDaEIsY0FBYztDQUNqQjs7QUFDQTtRQUNPLGNBQWM7UUFDZCxnQkFBZ0I7Q0FDdkI7O0FBQ0E7SUFDRyxjQUFjO0lBQ2QsZ0JBQWdCO0NBQ25COztBQUdELHFEQUFxRDs7QUFFckQsb0NBQW9DOztBQUNwQztBQUNBLFdBQVc7QUFDWCxVQUFVO0FBQ1YsZUFBZTtBQUNmLHNCQUFzQjtBQUN0Qjs7QUFFQSx3REFBd0Q7O0FBQ3hELE1BQU0sY0FBYyxDQUFDOztBQUVyQixtQ0FBbUM7O0FBQ25DO0FBQ0EsV0FBVztBQUNYLGNBQWM7QUFDZCxXQUFXO0FBQ1g7O0FBQ0EsNEJBQTRCOztBQUM1QjtBQUNBLGdEQUFnRDtBQUNoRCx1QkFBdUI7QUFDdkIsa0JBQWtCO0FBQ2xCLHlCQUF5QjtBQUN6QixlQUFlO0FBQ2Y7O0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsb0NBQW9DO0FBQ3BDLHlCQUF5QjtBQUN6Qjs7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyxXQUFXO0FBQ1g7O0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsV0FBVztBQUNYOztBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLFdBQVc7QUFDWDs7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyxXQUFXO0FBQ1g7O0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsV0FBVztBQUNYOztBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBO0FBQ0E7SUFDSSxhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxjQUFjO0lBQ2QsY0FBYztBQUNsQjtBQUNBO0lBQ0ksWUFBWTtJQUNaLHlCQUF5QjtFQUMzQixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixjQUFjO0FBQ2hCO0FBQ0E7SUFDSSwrQ0FBK0M7SUFDL0MseUJBQXlCO0lBQ3pCLFVBQVU7QUFDZDtBQUNBO0lBQ0kseUJBQXlCO0lBQ3pCLDZCQUE2QjtJQUM3QixrQkFBa0I7QUFDdEIseUNBQXlDO0FBQ3pDLFFBQVE7QUFDUixvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCO0FBQ0E7SUFDSSxTQUFTO0lBQ1QscUNBQXFDO0FBQ3pDO0NBQ0M7SUFDRywrQkFBK0I7SUFDL0Isc0JBQXNCO0NBQ3pCO0NBQ0E7SUFDRywwQkFBMEI7Q0FDN0I7QUFDRDs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFVBQVU7QUFDVjtBQUNBO0VBQ0UsYUFBYTtBQUNmO0FBQ0E7O0FBQ0EsdUJBQXVCOztBQUN2QjtBQUNBO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxtQkFBbUI7QUFDckI7QUFDQTtJQUNJLDZCQUE2QjtDQUNoQztDQUNBO0lBQ0csK0JBQStCO0lBQy9CLGtCQUFrQjtJQUNsQiw0QkFBNEI7Q0FDL0I7Q0FDQTtJQUNHLDBCQUEwQjtDQUM3Qjs7QUFFRDs7QUFFQTtJQUNJLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2QiIsImZpbGUiOiJzcmMvYXBwL3Blb3BsZS91c2VyLW1hbmFnZW1lbnQvdXNlci1tYW5hZ2VtZW50LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyogPT09PT09PT09PT09PT09PT09IFVTRVIgTUFOQUdFTUVOVCBDU1MgPT09PT09PT09PT09PT09PT09PT09Ki9cclxuXHJcbi5wYWdlLWJyZWFkY3J1bWJ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO1xyXG4gICAgbWFyZ2luOiAxJSA1JSAyJSA0JTtcclxufVxyXG4udGFibGUtY29udGFpbmVye1xyXG4gICAgbWFyZ2luOiAxJSA1JSAwJSA1JTtcclxufVxyXG4ucGFnZS13cmFwcGVye1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtcclxufVxyXG4uY3JlYXRlLXJvbGUtYnRue1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNkODQ2MjtcclxufVxyXG4udmlldy1idG4sLmFkZC1idG57XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBib3JkZXI6IHNvbGlkIDFweCAjM2Q4NDYyO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCc7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIGNvbG9yOiAjM2Q4NDYyO1xyXG59XHJcbi5saXN0LWdyb3VwLWl0ZW17XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBmb250LWZhbWlseTogJ01vbnRzZXJyYXQnO1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xyXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcclxuICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XHJcbiAgY29sb3I6ICMwMDAwMDA7XHJcbn0gXHJcbi5wb3BvdmVyLWJvZHl7XHJcbiAgICBib3gtc2hhZG93OiAwIDAgMTdweCAycHggcmdiYSgyNywgMjcsIDI3LCAwLjA4KTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcbi5wb3BvdmVye1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0ZGRkZGRjtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweCAhaW1wb3J0YW50O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG50cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDk4OHB4LCAyNTNweCwgMHB4KTtcclxudG9wOiAwcHg7XHJcbmxlZnQ6IDBweCAhaW1wb3J0YW50O1xyXG53aWxsLWNoYW5nZTogdHJhbnNmb3JtO1xyXG59XHJcbi50YWJsZS1oZWFkZXJ7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbmJhY2tncm91bmQtY29sb3I6ICNmYWY4ZjQ7XHJcbn1cclxuLmhlYWRlci1yb3d7XHJcbiAgICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcclxufVxyXG50YWJsZSB0aCx0YWJsZSB0ZHtcclxuICAgIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50O1xyXG59XHJcbnRye1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IGRhc2hlZCAjZGRkO1xyXG59XHJcbnRyOmxhc3QtY2hpbGQge1xyXG4gICAgYm9yZGVyLWJvdHRvbS1zdHlsZTogbm9uZTtcclxuICAgIGJvcmRlci1ib3R0b20tY29sb3I6IG5vbmU7XHJcbn1cclxuLnRhYmxlIHRoZWFkIHRoIHtcclxuICAgIGNvbG9yOiAjODc2MjNiO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCc7XHJcbn1cclxuIHNwYW4uY2hlY2ttYXJre1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNjY2NjY2O1xyXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG59XHJcbi5jdXN0b21jaGVja2JveCBpbnB1dDpjaGVja2VkIH4gLmNoZWNrbWFyayB7XHJcbmJhY2tncm91bmQtY29sb3I6ICMwMDA7XHJcbn1cclxuLmJyZWFkY3J1bWItaXRlbSBhIHsgXHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxuIH1cclxuIC5icmVhZGNydW1iLWl0ZW0uYWN0aXZle1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiB9XHJcbiB0YWJsZSB0ZHtcclxuICAgICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0JztcclxuZm9udC1zaXplOiAxNHB4O1xyXG5mb250LXdlaWdodDogNTAwO1xyXG5mb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuZm9udC1zdHlsZTogbm9ybWFsO1xyXG5saW5lLWhlaWdodDogbm9ybWFsO1xyXG5sZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG5jb2xvcjogIzAwMDAwMDtcclxuIH1cclxuIC50aXRsZS1oZWFkZXJ7XHJcbiAgICBtYXJnaW46IDMlIDUlIDAlIDUlXHJcbiB9XHJcbiAucGFnZS10aXRsZXtcclxuICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCc7XHJcbmZvbnQtc2l6ZTogMThweDtcclxuZm9udC13ZWlnaHQ6IDYwMDtcclxuZm9udC1zdHJldGNoOiBub3JtYWw7XHJcbmZvbnQtc3R5bGU6IG5vcm1hbDtcclxubGluZS1oZWlnaHQ6IG5vcm1hbDtcclxubGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuY29sb3I6ICMwMDAwMDA7XHJcbiB9XHJcbiAuc2VhcmNoe1xyXG4gICAgLyp3aWR0aDogMjU1cHg7Ki9cclxuICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCc7XHJcbmhlaWdodDogMzZweDtcclxuYm9yZGVyLXJhZGl1czogOHB4O1xyXG5ib3JkZXI6IHNvbGlkIDFweCAjY2NjY2NjO1xyXG5iYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG5iYWNrZ3JvdW5kOiB1cmwoLi4vLi4vLi4vYXNzZXRzL2ltYWdlcy9ncmV5LnBuZykgbm8tcmVwZWF0IHNjcm9sbCAxMnB4IDVweDtcclxucGFkZGluZy1sZWZ0OjQ1cHg7XHJcbiB9XHJcbiAuZmlsdGVye1xyXG4gICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0JztcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzNkODQ2MjtcclxuIH1cclxuIHAuc3RhdHVzLWFjdGl2ZXtcclxuICAgICAgICBjb2xvcjogIzFmYTgzYTtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xyXG4gfVxyXG4gcC5zdGF0dXMtZGlzYWJsZWR7XHJcbiAgICBjb2xvcjogIzY2NjY2NjtcclxuICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiB9XHJcblxyXG5cclxuLyo9PT09PT09PT09PT09PT0gRm9yIENhcmQgbGF5b3V0ID09PT09PT09PT09PT09PT09PSovXHJcblxyXG4vKiBGbG9hdCBmb3VyIGNvbHVtbnMgc2lkZSBieSBzaWRlICovXHJcbi5jb2x1bW4ge1xyXG5mbG9hdDogbGVmdDtcclxud2lkdGg6IDUwJTtcclxucGFkZGluZzogMCAxMHB4O1xyXG5ib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4vKiBSZW1vdmUgZXh0cmEgbGVmdCBhbmQgcmlnaHQgbWFyZ2lucywgZHVlIHRvIHBhZGRpbmcgKi9cclxuLnJvdyB7bWFyZ2luOiAwIC01cHg7fVxyXG5cclxuLyogQ2xlYXIgZmxvYXRzIGFmdGVyIHRoZSBjb2x1bW5zICovXHJcbi5yb3c6YWZ0ZXIge1xyXG5jb250ZW50OiBcIlwiO1xyXG5kaXNwbGF5OiB0YWJsZTtcclxuY2xlYXI6IGJvdGg7XHJcbn1cclxuLyogU3R5bGUgdGhlIGNvdW50ZXIgY2FyZHMgKi9cclxuLmNhcmQge1xyXG4vKiBib3gtc2hhZG93OiAwIDRweCA4cHggMCByZ2JhKDAsIDAsIDAsIDAuMik7ICovXHJcbi8qIHBhZGRpbmc6IDE1cHggMHB4OyAqL1xyXG50ZXh0LWFsaWduOiBjZW50ZXI7XHJcbmJhY2tncm91bmQtY29sb3I6ICNmYWY4ZjQ7XHJcbmZvbnQtc2l6ZTogMTNweDtcclxufVxyXG4uaGVhZGVyX21haW57XHJcbi8qIGNvbG9yOiAjYThhOGE4OWUgIWltcG9ydGFudDsgKi9cclxuYmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRiAhaW1wb3J0YW50O1xyXG5ib3JkZXI6IDFweCBzb2xpZCAjNjY2NjY2O1xyXG59XHJcbi5uYW1lX2hlYWR7XHJcbmJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjllOGU4O1xyXG5wYWRkaW5nOiAyJTtcclxufVxyXG4ubGFzdF9oZWFke1xyXG5ib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Y5ZThlODtcclxucGFkZGluZzogMiU7XHJcbn1cclxuLmVtYWlsX2hlYWR7XHJcbmJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjllOGU4O1xyXG5wYWRkaW5nOiAyJTtcclxufVxyXG4uc3RhdHVzX2hlYWR7XHJcbmJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZjllOGU4O1xyXG5wYWRkaW5nOiAyJTtcclxufVxyXG4ucm9sZXNfaGVhZHtcclxuYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmOWU4ZTg7XHJcbnBhZGRpbmc6IDIlO1xyXG59XHJcbi5hY3Rpb25faGVhZHtcclxucGFkZGluZzogMiU7XHJcbn1cclxuLmRhdGFfcm9sZXtcclxucGFkZGluZy10b3A6IDUlO1xyXG59XHJcbi5uYW1lX2RhdGF7XHJcbnBhZGRpbmctdG9wOiA1JTtcclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzMjBweCkgYW5kIChtYXgtd2lkdGg6IDkyMHB4KSAge1xyXG4uZGVza192aWV3X3VzZXJ7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcbi5tb2JpbGVfdmlld191c2Vye1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tdG9wOiA1JTtcclxufVxyXG4ubGlzdC1ncm91cC1pdGVte1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0JztcclxuICBmb250LXNpemU6IDEwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcclxuICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICBsZXR0ZXItc3BhY2luZzogbm9ybWFsO1xyXG4gIGNvbG9yOiAjMDAwMDAwO1xyXG59IFxyXG4ucG9wb3Zlci1ib2R5e1xyXG4gICAgYm94LXNoYWRvdzogMCAwIDE3cHggMnB4IHJnYmEoMjcsIDI3LCAyNywgMC4wOCk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG4ucG9wb3ZlcntcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGRkZGRkY7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHggIWltcG9ydGFudDtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxudHJhbnNmb3JtOiB0cmFuc2xhdGUzZCg5ODhweCwgMjUzcHgsIDBweCk7XHJcbnRvcDogMHB4O1xyXG5sZWZ0OiAwcHggIWltcG9ydGFudDtcclxud2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcclxufVxyXG4ucGFnZS1icmVhZGNydW1ie1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMTVweCAwcHggMTBweCAwcHggIWltcG9ydGFudDtcclxufVxyXG4gLnBhZ2UtdGl0bGV7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2shaW1wb3J0YW50O1xyXG4gICAgLyp0ZXh0LWFsaWduOiBjZW50ZXI7Ki9cclxuIH1cclxuIC50aXRsZS1oZWFkZXJ7XHJcbiAgICBtYXJnaW4tbGVmdDogMCUgIWltcG9ydGFudDtcclxuIH1cclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA5MjFweCl7XHJcbi5kZXNrX3ZpZXdfdXNlcntcclxuZGlzcGxheTpibG9jaztcclxucGFkZGluZzogMDtcclxufVxyXG4ubW9iaWxlX3ZpZXdfdXNlcntcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcbn1cclxuLyogUmVzcG9uc2l2ZSBjb2x1bW5zICovXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbi5jb2x1bW4ge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuLnNwYWNpbmctdG9we1xyXG4gICAgbWFyZ2luLXRvcDogMS40cmVtICFpbXBvcnRhbnQ7XHJcbiB9XHJcbiAuc2VhcmNoLWRpdiwucm9sZS1kaXYsLnN0YXR1cy1kaXYsLnBhZ2UtdGl0bGV7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2shaW1wb3J0YW50O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMCUgIWltcG9ydGFudDtcclxuIH1cclxuIC50aXRsZS1oZWFkZXJ7XHJcbiAgICBtYXJnaW4tbGVmdDogMCUgIWltcG9ydGFudDtcclxuIH1cclxuIFxyXG59XHJcblxyXG4udGFibGUgdGQsIC50YWJsZSB0aCB7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5ib2R5LWNoZWNre1xyXG4gICAgdG9wOi02cHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmhlYWQtY2hlY2t7XHJcbiAgICB0b3A6LTZweCAhaW1wb3J0YW50O1xyXG59XHJcbiJdfQ== */"]
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UserManagementComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-user-management',
          templateUrl: './user-management.component.html',
          styleUrls: ['./user-management.component.css']
        }]
      }], function () {
        return [];
      }, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=people-people-module-es5.js.map