import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSupportComponent } from './order-support.component';

describe('OrderSupportComponent', () => {
  let component: OrderSupportComponent;
  let fixture: ComponentFixture<OrderSupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
