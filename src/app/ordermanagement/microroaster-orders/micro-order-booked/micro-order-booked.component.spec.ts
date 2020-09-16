import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroOrderBookedComponent } from './micro-order-booked.component';

describe('MicroOrderBookedComponent', () => {
  let component: MicroOrderBookedComponent;
  let fixture: ComponentFixture<MicroOrderBookedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroOrderBookedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroOrderBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
