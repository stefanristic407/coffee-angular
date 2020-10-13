import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuppingResultsComponent } from './cupping-results.component';

describe('CuppingResultsComponent', () => {
  let component: CuppingResultsComponent;
  let fixture: ComponentFixture<CuppingResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuppingResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuppingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
