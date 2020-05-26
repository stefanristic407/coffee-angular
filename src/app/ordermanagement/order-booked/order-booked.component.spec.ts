import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBookedComponent } from './order-booked.component';

describe('OrderBookedComponent', () => {
  let component: OrderBookedComponent;
  let fixture: ComponentFixture<OrderBookedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBookedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
