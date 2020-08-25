import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomerWantsChartComponent } from './coustomer-wants-chart.component';

describe('CoustomerWantsChartComponent', () => {
  let component: CoustomerWantsChartComponent;
  let fixture: ComponentFixture<CoustomerWantsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoustomerWantsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoustomerWantsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
