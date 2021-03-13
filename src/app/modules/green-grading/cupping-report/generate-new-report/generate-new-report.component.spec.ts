import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateNewReportComponent } from './generate-new-report.component';

describe('GenerateNewReportComponent', () => {
  let component: GenerateNewReportComponent;
  let fixture: ComponentFixture<GenerateNewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateNewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateNewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
