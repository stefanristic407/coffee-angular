import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedSaleComponent } from './marked-sale.component';

describe('MarkedSaleComponent', () => {
  let component: MarkedSaleComponent;
  let fixture: ComponentFixture<MarkedSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkedSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkedSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
