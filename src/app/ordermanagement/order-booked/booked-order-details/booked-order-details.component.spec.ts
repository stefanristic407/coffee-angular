import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedOrderDetailsComponent } from './booked-order-details.component';

describe('BookedOrderDetailsComponent', () => {
  let component: BookedOrderDetailsComponent;
  let fixture: ComponentFixture<BookedOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
