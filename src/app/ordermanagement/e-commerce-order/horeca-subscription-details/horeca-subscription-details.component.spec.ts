import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorecaSubscriptionDetailsComponent } from './horeca-subscription-details.component';

describe('HorecaSubscriptionDetailsComponent', () => {
  let component: HorecaSubscriptionDetailsComponent;
  let fixture: ComponentFixture<HorecaSubscriptionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorecaSubscriptionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorecaSubscriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
