import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenCoffeeInventoryComponent } from './green-coffee-inventory.component';

describe('GreenCoffeeInventoryComponent', () => {
  let component: GreenCoffeeInventoryComponent;
  let fixture: ComponentFixture<GreenCoffeeInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenCoffeeInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenCoffeeInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
