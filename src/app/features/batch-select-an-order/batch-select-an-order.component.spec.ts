import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSelectAnOrderComponent } from './batch-select-an-order.component';

describe('BatchSelectAnOrderComponent', () => {
  let component: BatchSelectAnOrderComponent;
  let fixture: ComponentFixture<BatchSelectAnOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchSelectAnOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchSelectAnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
