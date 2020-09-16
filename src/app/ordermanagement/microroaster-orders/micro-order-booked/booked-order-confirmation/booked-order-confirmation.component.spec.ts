import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedOrderConfirmationComponent } from './booked-order-confirmation.component';

describe('BookedOrderConfirmationComponent', () => {
  let component: BookedOrderConfirmationComponent;
  let fixture: ComponentFixture<BookedOrderConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedOrderConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
