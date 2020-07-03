import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAnOrderComponent } from './select-an-order.component';

describe('SelectAnOrderComponent', () => {
  let component: SelectAnOrderComponent;
  let fixture: ComponentFixture<SelectAnOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAnOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
