import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousSubscriptionComponent } from './previous-subscription.component';

describe('PreviousSubscriptionComponent', () => {
  let component: PreviousSubscriptionComponent;
  let fixture: ComponentFixture<PreviousSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
