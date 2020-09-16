import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOrderTableComponent } from './select-order-table.component';

describe('SelectOrderTableComponent', () => {
  let component: SelectOrderTableComponent;
  let fixture: ComponentFixture<SelectOrderTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectOrderTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
