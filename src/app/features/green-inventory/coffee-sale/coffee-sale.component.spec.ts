import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeSaleComponent } from './coffee-sale.component';

describe('CoffeeSaleComponent', () => {
  let component: CoffeeSaleComponent;
  let fixture: ComponentFixture<CoffeeSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
