import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenGradingComponent } from './green-grading.component';

describe('GreenGradingComponent', () => {
  let component: GreenGradingComponent;
  let fixture: ComponentFixture<GreenGradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenGradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
