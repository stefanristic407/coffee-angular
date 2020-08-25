import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCoffeeAvailableChartComponent } from './total-coffee-available-chart.component';

describe('TotalCoffeeAvailableChartComponent', () => {
  let component: TotalCoffeeAvailableChartComponent;
  let fixture: ComponentFixture<TotalCoffeeAvailableChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCoffeeAvailableChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCoffeeAvailableChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
