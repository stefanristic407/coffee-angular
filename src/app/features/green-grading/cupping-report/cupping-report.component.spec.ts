import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuppingReportComponent } from './cupping-report.component';

describe('CuppingReportComponent', () => {
  let component: CuppingReportComponent;
  let fixture: ComponentFixture<CuppingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuppingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuppingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
