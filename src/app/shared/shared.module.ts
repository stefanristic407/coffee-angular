import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';

import { TranslateModule } from '@ngx-translate/core';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ImageCropperModule } from 'ngx-image-cropper';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { MatVideoModule } from 'mat-video';
import { Ng2TelInputModule } from 'ng2-tel-input';

import { RatingDirective } from './directives/rating.directive';
import { WordLimitDirective } from './directives/word-limit.directive';
import { LifecyclehookDirective } from './directives/lifecyclehook/lifecyclehook.directive';

import { AvatarComponent } from './components/avatar/avatar.component';
import { BlankComponent } from './components/blank/blank.component';
import { EmptyComponent } from './components/empty/empty.component';
import { SelectComponent } from './components/select/select.component';
import { RemoteSensoringComponent } from './components/remote-sensoring/remote-sensoring.component';
import { WeatherChartComponent } from './components/remote-sensoring/weather-chart/weather-chart.component';
import { SoilChartComponent } from './components/remote-sensoring/soil-chart/soil-chart.component';
import { UvChartComponent } from './components/remote-sensoring/uv-chart/uv-chart.component';
import { VegetationChartComponent } from './components/remote-sensoring/vegetation-chart/vegetation-chart.component';
import { ImageMapComponent } from './components/remote-sensoring/image-map/image-map.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { MediaComponent } from './components/media/media.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';

import { ConfirmComponent } from './components/confirm/confirm.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { ChartsModule } from 'ng2-charts';

import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { TimeRangeComponent } from './components/time-range/time-range.component';
import { DayPickerComponent } from './components/day-picker/day-picker.component';
import { PhoneNumberComponent } from './components/phone-number/phone-number.component';
import { ReviewSummaryComponent } from './components/review-summary/review-summary.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ArrayFilterPipe } from './pipes/array-filter.pipe';
import { StringReplacePipe } from './pipes/string-replace.pipe';
import { AccordionModule } from 'primeng/accordion';
import { MomentModule } from 'ngx-moment';

import { SewnDirectMessageComponent } from './components/chat/sewn-direct-message/sewn-direct-message.component';
import { SewnOrderChatComponent } from './components/chat/sewn-order-chat/sewn-order-chat.component';
import { PieAreaChartComponent } from './components/pie-area-chart/pie-area-chart.component';
import { AppKeyConfirmationComponent } from './components/app-key-confirmation/app-key-confirmation.component';

// #region third libs
const THIRDMODULES = [
    AutocompleteLibModule,
    AnimateOnScrollModule,
    DragDropModule,
    ModalModule,
    PopoverModule,
    TypeaheadModule,
    AutoCompleteModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    CheckboxModule,
    DialogModule,
    ChipsModule,
    DropdownModule,
    DynamicDialogModule,
    GalleriaModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    MenuModule,
    MultiSelectModule,
    OverlayPanelModule,
    PaginatorModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RatingModule,
    SelectButtonModule,
    SliderModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TooltipModule,
    TreeModule,
    TranslateModule,
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    NgxChartsModule,
    ImageCropperModule,
    GalleryModule,
    LightboxModule,
    MatVideoModule,
    Ng2TelInputModule,
    ProgressBarModule,
    AccordionModule,
    DividerModule,
    ChartsModule,
    MomentModule,
    AvatarModule,
    ToastModule,
];
// #endregion

// #region your componets & directives
const COMPONENTS = [
    AvatarComponent,
    BlankComponent,
    EmptyComponent,
    SelectComponent,
    RemoteSensoringComponent,
    WeatherChartComponent,
    SelectComponent,
    SoilChartComponent,
    UvChartComponent,
    VegetationChartComponent,
    ImageMapComponent,
    BlankComponent,
    PieChartComponent,
    MediaComponent,
    VideoPlayerComponent,
    ReadMoreComponent,
    LoadingComponent,
    LineChartComponent,
    TimeRangeComponent,
    DayPickerComponent,
    BlogCardComponent,
    BarChartComponent,
    HorizontalBarComponent,
    PhoneNumberComponent,
    ReviewSummaryComponent,
    ReviewsComponent,
    SewnDirectMessageComponent,
    SewnOrderChatComponent,
    PieAreaChartComponent,
    AppKeyConfirmationComponent,
];
const COMPONENTS_NOROUNT = [ConfirmComponent];
const DIRECTIVES = [WordLimitDirective, RatingDirective, LifecyclehookDirective];

import { SearchFilterPipe } from './pipes/chat/search-filter.pipe';
import { CountryPipe } from './pipes/country/country.pipe';
import { EstateBrandLinkPipe } from './pipes/link/estate-brand-link.pipe';
import { GcBrandLinkPipe } from './pipes/link/gc-brand-link.pipe';
import { LotBrandLinkPipe } from './pipes/link/lot-brand-link.pipe';
import { ProfileLinkPipe } from './pipes/link/profile-link.pipe';
import { ReviewLinkPipe } from './pipes/link/review-link.pipe';
import { RoasterBrandLinkPipe } from './pipes/link/roaster-brand-link.pipe';
import { OrderRatingLinkPipe } from './pipes/link/order-rating-link.pipe';
import { OrderLinkPipe } from './pipes/link/order-link.pipe';
import { FileIconPipe } from './pipes/file-icon.pipe';
import { FileNamePipe } from './pipes/file-name.pipe';
import { MonthPipe } from './pipes/month/month.pipe';
import { OrgTypePipe } from './pipes/org-type.pipe';
import { WordCountPipe } from './pipes/word-count/word-count.pipe';
import { ConvertToShortDescriptionPipe } from './pipes/convert-to-short-description.pipe';
const PIPES = [
    ArrayFilterPipe,
    CountryPipe,
    EstateBrandLinkPipe,
    GcBrandLinkPipe,
    LotBrandLinkPipe,
    FileIconPipe,
    FileNamePipe,
    MonthPipe,
    ProfileLinkPipe,
    ReviewLinkPipe,
    RoasterBrandLinkPipe,
    OrderRatingLinkPipe,
    OrderLinkPipe,
    OrgTypePipe,
    StringReplacePipe,
    WordCountPipe,
    SearchFilterPipe,
    ConvertToShortDescriptionPipe,
];
// #endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        // third libs
        ...THIRDMODULES,
        NgxEchartsModule.forRoot({
            echarts,
        }),
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
        ...DIRECTIVES,
        ...PIPES,
    ],
    entryComponents: COMPONENTS_NOROUNT,
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
    ],
    providers: [DialogService],
})
export class SharedModule {}
