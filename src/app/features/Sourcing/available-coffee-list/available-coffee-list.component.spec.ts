import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCoffeeListComponent } from './available-coffee-list.component';

describe('AvailableCoffeeListComponent', () => {
  let component: AvailableCoffeeListComponent;
  let fixture: ComponentFixture<AvailableCoffeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableCoffeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableCoffeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
