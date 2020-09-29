import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotSaleComponent } from './lot-sale.component';

describe('LotSaleComponent', () => {
  let component: LotSaleComponent;
  let fixture: ComponentFixture<LotSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
