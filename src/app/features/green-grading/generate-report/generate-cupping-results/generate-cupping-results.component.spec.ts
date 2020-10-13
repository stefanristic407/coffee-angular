import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCuppingResultsComponent } from './generate-cupping-results.component';

describe('GenerateCuppingResultsComponent', () => {
  let component: GenerateCuppingResultsComponent;
  let fixture: ComponentFixture<GenerateCuppingResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCuppingResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCuppingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
