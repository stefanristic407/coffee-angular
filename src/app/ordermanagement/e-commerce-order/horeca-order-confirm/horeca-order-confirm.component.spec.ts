import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorecaOrderConfirmComponent } from './horeca-order-confirm.component';

describe('HorecaOrderConfirmComponent', () => {
  let component: HorecaOrderConfirmComponent;
  let fixture: ComponentFixture<HorecaOrderConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorecaOrderConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorecaOrderConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
