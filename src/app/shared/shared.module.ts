import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';

import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AccumulationChartAllModule, ChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import * as echarts from 'echarts';
import { MatVideoModule } from 'mat-video';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgOtpInputModule } from 'ng-otp-input';
import { ChartsModule } from 'ng2-charts';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxEchartsModule } from 'ngx-echarts';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MomentModule } from 'ngx-moment';

const THIRDMODULES = [
    AccordionModule,
    AccumulationChartAllModule,
    AutocompleteLibModule,
    AutoCompleteModule,
    AvatarModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CarouselModule,
    ChartAllModule,
    ChartsModule,
    CheckboxModule,
    ChipsModule,
    ClipboardModule,
    DialogModule,
    DividerModule,
    DragDropModule,
    DropdownModule,
    DynamicDialogModule,
    EditorModule,
    GalleriaModule,
    GalleryModule,
    ImageCropperModule,
    InputMaskModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    InputTextModule,
    LightboxModule,
    ListboxModule,
    MatVideoModule,
    MenuModule,
    ModalModule,
    MomentModule,
    MultiSelectModule,
    Ng2TelInputModule,
    NgOtpInputModule,
    NgxChartsModule,
    OverlayPanelModule,
    PaginatorModule,
    PopoverModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RadioButtonModule,
    RangeNavigatorAllModule,
    RatingModule,
    SelectButtonModule,
    SkeletonModule,
    SliderModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    ToastModule,
    TooltipModule,
    TranslateModule,
    TreeModule,
    TypeaheadModule,
];

import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { AppKeyConfirmationComponent } from './components/app-key-confirmation/app-key-confirmation.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { BackLinkComponent } from './components/back-link/back-link.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BlankComponent } from './components/blank/blank.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { SewnDirectMessageComponent } from './components/chat/sewn-direct-message/sewn-direct-message.component';
import { SewnOrderChatComponent } from './components/chat/sewn-order-chat/sewn-order-chat.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CropperDialogComponent } from './components/cropper-dialog/cropper-dialog.component';
import { DayPickerComponent } from './components/day-picker/day-picker.component';
import { EmptyComponent } from './components/empty/empty.component';
import { MultiselectChipsComponent } from './components/form-controls/multiselect-chips/multiselect-chips.component';
import { OtpInputComponent } from './components/form-controls/otp-input/otp-input.component';
import { PhoneNumberComponent } from './components/form-controls/phone-number/phone-number.component';
import { SelectLanguageComponent } from './components/form-controls/select-language/select-language.component';
import { SingleselectComponent } from './components/form-controls/singleselect/singleselect.component';
import { UploadAvatarComponent } from './components/form-controls/upload-avatar/upload-avatar.component';
import { UrlInputComponent } from './components/form-controls/url-input/url-input.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MediaComponent } from './components/media/media.component';
import { PieAreaChartComponent } from './components/pie-area-chart/pie-area-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { ImageMapComponent } from './components/remote-sensoring/image-map/image-map.component';
import { RemoteSensoringComponent } from './components/remote-sensoring/remote-sensoring.component';
import { SoilChartComponent } from './components/remote-sensoring/soil-chart/soil-chart.component';
import { UvChartComponent } from './components/remote-sensoring/uv-chart/uv-chart.component';
import { VegetationChartComponent } from './components/remote-sensoring/vegetation-chart/vegetation-chart.component';
import { WeatherChartComponent } from './components/remote-sensoring/weather-chart/weather-chart.component';
import { ReviewSummaryComponent } from './components/review-summary/review-summary.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { SelectOrdersComponent } from './components/select-orders/select-orders.component';
import { SetupLicenseComponent } from './components/setup-license/setup-license.component';
import { StoryCardComponent } from './components/story-card/story-card.component';
import { TimeRangeComponent } from './components/time-range/time-range.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

const COMPONENTS = [
    ActionMenuComponent,
    AppKeyConfirmationComponent,
    AvatarComponent,
    BackLinkComponent,
    BarChartComponent,
    BlankComponent,
    BlankComponent,
    BlogCardComponent,
    CropperDialogComponent,
    DayPickerComponent,
    EmptyComponent,
    HorizontalBarComponent,
    ImageMapComponent,
    LineChartComponent,
    LoadingComponent,
    MediaComponent,
    MultiselectChipsComponent,
    OtpInputComponent,
    PhoneNumberComponent,
    PieAreaChartComponent,
    PieChartComponent,
    ReadMoreComponent,
    RemoteSensoringComponent,
    ReviewsComponent,
    ReviewSummaryComponent,
    SelectLanguageComponent,
    SelectOrdersComponent,
    SetupLicenseComponent,
    SewnDirectMessageComponent,
    SewnOrderChatComponent,
    SingleselectComponent,
    SoilChartComponent,
    StoryCardComponent,
    TimeRangeComponent,
    UploadAvatarComponent,
    UploaderComponent,
    UrlInputComponent,
    UserDetailComponent,
    UvChartComponent,
    VegetationChartComponent,
    VideoPlayerComponent,
    WeatherChartComponent,
];
const COMPONENTS_NOROUNT = [ConfirmComponent];

import {
    AclDirective,
    ArrowScrollDirective,
    BackLinkDirective,
    ChatHighlighterDirective,
    CopyImageToClipboardDirective,
    FullImgWrapperDirective,
    ImageFallbackDirective,
    InputNumberDirective,
    LifecyclehookDirective,
    RatingDirective,
    WordLimitDirective,
} from './directives';
const DIRECTIVES = [
    AclDirective,
    ArrowScrollDirective,
    BackLinkDirective,
    ChatHighlighterDirective,
    CopyImageToClipboardDirective,
    FullImgWrapperDirective,
    ImageFallbackDirective,
    InputNumberDirective,
    LifecyclehookDirective,
    RatingDirective,
    WordLimitDirective,
];

import {
    ArrayFilterPipe,
    AvailabilityListingStatusPipe,
    AvailabilityTypePipe,
    BusinessTypePipe,
    ConvertKgPipe,
    ConvertToShortDescriptionPipe,
    CountryPipe,
    CurrencyFormatPipe,
    EstateBrandLinkPipe,
    FileIconPipe,
    FileNamePipe,
    GcBrandLinkPipe,
    HtmlStringWordCountPipe,
    LanguagePipe,
    LotBrandLinkPipe,
    MonthPipe,
    OrderLinkPipe,
    OrderRatingLinkPipe,
    OrderTypePipe,
    OrgTypePipe,
    PhoneNumberPipe,
    ProductStatusPipe,
    ProfileLinkPipe,
    QuantityTypePipe,
    ReversePipe,
    ReviewLinkPipe,
    RoasterBrandCmsLinkPipe,
    RoasterBrandLinkPipe,
    SafeHtmlPipe,
    SearchFilterPipe,
    SentenceCasePipe,
    ShopLinkPipe,
    StringReplacePipe,
    ThousandSuffPipe,
    WeightConvertPipe,
    WordCountPipe,
} from './pipes';

const PIPES = [
    ArrayFilterPipe,
    AvailabilityListingStatusPipe,
    AvailabilityTypePipe,
    BusinessTypePipe,
    ConvertKgPipe,
    ConvertToShortDescriptionPipe,
    CountryPipe,
    CurrencyFormatPipe,
    EstateBrandLinkPipe,
    FileIconPipe,
    FileNamePipe,
    GcBrandLinkPipe,
    HtmlStringWordCountPipe,
    LanguagePipe,
    LotBrandLinkPipe,
    MonthPipe,
    OrderLinkPipe,
    OrderRatingLinkPipe,
    OrderTypePipe,
    OrgTypePipe,
    PhoneNumberPipe,
    ProductStatusPipe,
    ProfileLinkPipe,
    QuantityTypePipe,
    ReversePipe,
    ReviewLinkPipe,
    RoasterBrandCmsLinkPipe,
    RoasterBrandLinkPipe,
    SafeHtmlPipe,
    SafeHtmlPipe,
    SearchFilterPipe,
    SentenceCasePipe,
    ShopLinkPipe,
    StringReplacePipe,
    ThousandSuffPipe,
    WordCountPipe,
];

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
        FullImgWrapperDirective,
        WeightConvertPipe,
        SafeHtmlPipe,
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
