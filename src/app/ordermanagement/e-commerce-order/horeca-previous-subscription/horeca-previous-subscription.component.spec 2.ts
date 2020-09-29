import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorecaPreviousSubscriptionComponent } from './horeca-previous-subscription.component';

describe('HorecaPreviousSubscriptionComponent', () => {
  let component: HorecaPreviousSubscriptionComponent;
  let fixture: ComponentFixture<HorecaPreviousSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorecaPreviousSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorecaPreviousSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
