import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPrebookComponent } from './order-prebook.component';

describe('OrderPrebookComponent', () => {
  let component: OrderPrebookComponent;
  let fixture: ComponentFixture<OrderPrebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPrebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPrebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
