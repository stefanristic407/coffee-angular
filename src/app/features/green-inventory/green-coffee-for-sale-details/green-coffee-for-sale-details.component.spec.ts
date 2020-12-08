import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenCoffeeForSaleDetailsComponent } from './green-coffee-for-sale-details.component';

describe('GreenCoffeeForSaleDetailsComponent', () => {
  let component: GreenCoffeeForSaleDetailsComponent;
  let fixture: ComponentFixture<GreenCoffeeForSaleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenCoffeeForSaleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenCoffeeForSaleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
