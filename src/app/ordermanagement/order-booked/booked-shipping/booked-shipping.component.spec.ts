import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedShippingComponent } from './booked-shipping.component';

describe('BookedShippingComponent', () => {
  let component: BookedShippingComponent;
  let fixture: ComponentFixture<BookedShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
