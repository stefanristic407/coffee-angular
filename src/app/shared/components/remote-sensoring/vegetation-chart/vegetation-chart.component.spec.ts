import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilChartComponent } from './soil-chart.component';

describe('SoilChartComponent', () => {
  let component: SoilChartComponent;
  let fixture: ComponentFixture<SoilChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SoilChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoilChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
