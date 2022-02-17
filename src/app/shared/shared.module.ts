import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ClipboardModule } from 'ngx-clipboard';

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
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { EditorModule } from 'primeng/editor';
import { GalleriaModule } from 'primeng/galleria';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
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
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ImageCropperModule } from 'ngx-image-cropper';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { MatVideoModule } from 'mat-video';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { ChartsModule } from 'ng2-charts';
import { MomentModule } from 'ngx-moment';
import { NgOtpInputModule } from 'ng-otp-input';

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

import { AppKeyConfirmationComponent } from './components/app-key-confirmation/app-key-confirmation.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { BackLinkComponent } from './components/back-link/back-link.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BlankComponent } from './components/blank/blank.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CropperDialogComponent } from './components/cropper-dialog/cropper-dialog.component';
import { DayPickerComponent } from './components/day-picker/day-picker.component';
import { EmptyComponent } from './components/empty/empty.component';
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component';
import { ImageMapComponent } from './components/remote-sensoring/image-map/image-map.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MediaComponent } from './components/media/media.component';
import { MultiselectChipsComponent } from './components/form-controls/multiselect-chips/multiselect-chips.component';
import { PhoneNumberComponent } from './components/form-controls/phone-number/phone-number.component';
import { PieAreaChartComponent } from './components/pie-area-chart/pie-area-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { RemoteSensoringComponent } from './components/remote-sensoring/remote-sensoring.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewSummaryComponent } from './components/review-summary/review-summary.component';
import { SelectLanguageComponent } from './components/form-controls/select-language/select-language.component';
import { SelectOrdersComponent } from './components/select-orders/select-orders.component';
import { SewnDirectMessageComponent } from './components/chat/sewn-direct-message/sewn-direct-message.component';
import { SewnOrderChatComponent } from './components/chat/sewn-order-chat/sewn-order-chat.component';
import { SoilChartComponent } from './components/remote-sensoring/soil-chart/soil-chart.component';
import { TimeRangeComponent } from './components/time-range/time-range.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UrlInputComponent } from './components/form-controls/url-input/url-input.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UvChartComponent } from './components/remote-sensoring/uv-chart/uv-chart.component';
import { VegetationChartComponent } from './components/remote-sensoring/vegetation-chart/vegetation-chart.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { WeatherChartComponent } from './components/remote-sensoring/weather-chart/weather-chart.component';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { OtpInputComponent } from './components/form-controls/otp-input/otp-input.component';
import { SingleselectComponent } from './components/form-controls/singleselect/singleselect.component';
import { StoryCardComponent } from './components//story-card/story-card.component';

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
    SewnDirectMessageComponent,
    SewnOrderChatComponent,
    SingleselectComponent,
    SoilChartComponent,
    StoryCardComponent,
    TimeRangeComponent,
    UploaderComponent,
    UrlInputComponent,
    UserDetailComponent,
    UvChartComponent,
    VegetationChartComponent,
    VideoPlayerComponent,
    WeatherChartComponent,
];
const COMPONENTS_NOROUNT = [ConfirmComponent];

import { RatingDirective } from './directives/rating.directive';
import { WordLimitDirective } from './directives/word-limit.directive';
import { LifecyclehookDirective } from './directives/lifecyclehook/lifecyclehook.directive';
import { ChatHighlighterDirective } from './directives/chat-highlighter/chat-highlighter.directive';
import { ImageFallbackDirective } from './directives/image-fallback/image-fallback.directive';
import { CopyImageToClipboardDirective } from './directives/copy-image-to-clipboard.directive';
import { FullImgWrapperDirective } from './directives/full-img-wrapper.directive';
import { AclDirective, InputNumberDirective } from './directives';
const DIRECTIVES = [
    AclDirective,
    ChatHighlighterDirective,
    CopyImageToClipboardDirective,
    FullImgWrapperDirective,
    ImageFallbackDirective,
    InputNumberDirective,
    LifecyclehookDirective,
    RatingDirective,
    WordLimitDirective,
];

import { SearchFilterPipe } from './pipes/chat/search-filter.pipe';
import { CountryPipe } from './pipes/country/country.pipe';
import { FileIconPipe } from './pipes/file-icon.pipe';
import { FileNamePipe } from './pipes/file-name.pipe';
import { MonthPipe } from './pipes/month/month.pipe';
import { OrgTypePipe } from './pipes/org-type.pipe';
import { WordCountPipe } from './pipes/word-count/word-count.pipe';
import { ConvertToShortDescriptionPipe } from './pipes/convert-to-short-description.pipe';
import { WeightConvertPipe } from './pipes/weight-convert.pipe';
import { ThousandSuffPipe } from './pipes/thousand-suff.pipe';
import { ArrayFilterPipe } from './pipes/array-filter.pipe';
import { StringReplacePipe } from './pipes/string-replace.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

import {
    AvailabilityListingStatusPipe,
    AvailabilityTypePipe,
    ConvertKgPipe,
    CurrencyFormatPipe,
    EcomProductStatus,
    EstateBrandLinkPipe,
    GcBrandLinkPipe,
    HtmlStringWordCountPipe,
    LanguagePipe,
    LotBrandLinkPipe,
    OrderLinkPipe,
    OrderRatingLinkPipe,
    OrderTypePipe,
    ProfileLinkPipe,
    QuantityTypePipe,
    ReviewLinkPipe,
    RoasterBrandCmsLinkPipe,
    RoasterBrandLinkPipe,
    SentenceCasePipe,
    ShopLinkPipe,
} from './pipes';

const PIPES = [
    ArrayFilterPipe,
    AvailabilityListingStatusPipe,
    AvailabilityTypePipe,
    ConvertKgPipe,
    ConvertToShortDescriptionPipe,
    CountryPipe,
    CurrencyFormatPipe,
    EcomProductStatus,
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
