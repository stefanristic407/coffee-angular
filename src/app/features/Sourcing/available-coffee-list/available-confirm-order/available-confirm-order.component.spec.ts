import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableConfirmOrderComponent } from './available-confirm-order.component';

describe('AvailableConfirmOrderComponent', () => {
  let component: AvailableConfirmOrderComponent;
  let fixture: ComponentFixture<AvailableConfirmOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableConfirmOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
