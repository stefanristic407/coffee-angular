import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceGradingComponent } from './source-grading.component';

describe('SourceGradingComponent', () => {
  let component: SourceGradingComponent;
  let fixture: ComponentFixture<SourceGradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceGradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
