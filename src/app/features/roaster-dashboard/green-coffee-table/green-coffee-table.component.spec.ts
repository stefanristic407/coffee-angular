import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenCoffeeTableComponent } from './green-coffee-table.component';

describe('GreenCoffeeTableComponent', () => {
  let component: GreenCoffeeTableComponent;
  let fixture: ComponentFixture<GreenCoffeeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenCoffeeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenCoffeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
