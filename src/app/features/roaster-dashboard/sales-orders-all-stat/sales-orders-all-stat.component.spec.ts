import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrdersAllStatComponent } from './sales-orders-all-stat.component';

describe('SalesOrdersAllStatComponent', () => {
  let component: SalesOrdersAllStatComponent;
  let fixture: ComponentFixture<SalesOrdersAllStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrdersAllStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrdersAllStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
