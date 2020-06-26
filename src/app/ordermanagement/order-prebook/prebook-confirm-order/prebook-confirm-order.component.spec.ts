import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebookConfirmOrderComponent } from './prebook-confirm-order.component';

describe('PrebookConfirmOrderComponent', () => {
  let component: PrebookConfirmOrderComponent;
  let fixture: ComponentFixture<PrebookConfirmOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebookConfirmOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebookConfirmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
