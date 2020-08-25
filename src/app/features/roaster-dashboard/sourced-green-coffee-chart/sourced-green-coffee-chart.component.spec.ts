import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcedGreenCoffeeChartComponent } from './sourced-green-coffee-chart.component';

describe('SourcedGreenCoffeeChartComponent', () => {
  let component: SourcedGreenCoffeeChartComponent;
  let fixture: ComponentFixture<SourcedGreenCoffeeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcedGreenCoffeeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcedGreenCoffeeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
