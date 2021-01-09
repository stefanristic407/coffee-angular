import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherGenerateReportComponent } from './other-generate-report.component';

describe('OtherGenerateReportComponent', () => {
  let component: OtherGenerateReportComponent;
  let fixture: ComponentFixture<OtherGenerateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherGenerateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherGenerateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
