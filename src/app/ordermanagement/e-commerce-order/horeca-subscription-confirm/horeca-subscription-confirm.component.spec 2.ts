import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorecaSubscriptionConfirmComponent } from './horeca-subscription-confirm.component';

describe('HorecaSubscriptionConfirmComponent', () => {
  let component: HorecaSubscriptionConfirmComponent;
  let fixture: ComponentFixture<HorecaSubscriptionConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorecaSubscriptionConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorecaSubscriptionConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
