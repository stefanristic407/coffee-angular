import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSupportFaqsComponent } from './order-support-faqs.component';

describe('OrderSupportFaqsComponent', () => {
  let component: OrderSupportFaqsComponent;
  let fixture: ComponentFixture<OrderSupportFaqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSupportFaqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSupportFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
