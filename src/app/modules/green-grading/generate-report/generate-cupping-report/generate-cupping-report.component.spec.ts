import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCuppingReportComponent } from './generate-cupping-report.component';

describe('GenerateCuppingReportComponent', () => {
  let component: GenerateCuppingReportComponent;
  let fixture: ComponentFixture<GenerateCuppingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCuppingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCuppingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
