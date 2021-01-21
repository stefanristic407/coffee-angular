import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { ChartAllModule, AccumulationChartAllModule, RangeNavigatorAllModule } from '@syncfusion/ej2-angular-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AvatarComponent } from './components/avatar/avatar.component';
import { BlankComponent } from './components/blank/blank.component';
import { SelectComponent } from './components/select/select.component';
import { RemoteSensoringComponent } from './components/remote-sensoring/remote-sensoring.component';
import { WeatherChartComponent } from './components/remote-sensoring/weather-chart/weather-chart.component';
import { DatePickerComponent } from './components/remote-sensoring/date-picker/date-picker.component';
import { SoilChartComponent } from './components/remote-sensoring/soil-chart/soil-chart.component';
import { UvChartComponent } from './components/remote-sensoring/uv-chart/uv-chart.component';
import { VegetationChartComponent } from './components/remote-sensoring/vegetation-chart/vegetation-chart.component';
import { ImageMapComponent } from './components/remote-sensoring/image-map/image-map.component';
import { HarvestCardComponent } from './components/harvest-card/harvest-card.component';
import { EstateCardComponent } from './components/estate-card/estate-card.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

// #region material
const MATMODULES = [];
// #endregion

// #region third libs
const THIRDMODULES = [
    AnimateOnScrollModule,
    PopoverModule,
    AutoCompleteModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    SelectButtonModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    ChartAllModule,
    AccumulationChartAllModule,
    RangeNavigatorAllModule,
    NgxChartsModule,
];
// #endregion

// #region your componets & directives
const COMPONENTS = [
    AvatarComponent,
    BlankComponent,
    SelectComponent,
    RemoteSensoringComponent,
    WeatherChartComponent,
    SelectComponent,
    DatePickerComponent,
    SoilChartComponent,
    UvChartComponent,
    VegetationChartComponent,
    ImageMapComponent,
    HarvestCardComponent,
    BlankComponent,
    EstateCardComponent,
    PieChartComponent,
];
const COMPONENTS_NOROUNT = [];
const DIRECTIVES = [];
// #endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ...MATMODULES,
        // third libs
        ...THIRDMODULES,
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...COMPONENTS_NOROUNT,
        ...DIRECTIVES,
    ],
    entryComponents: COMPONENTS_NOROUNT,
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...MATMODULES,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
})
export class SharedModule {}
