import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenCoffeeGradingComponent } from './green-coffee-grading.component';

describe('GreenCoffeeGradingComponent', () => {
  let component: GreenCoffeeGradingComponent;
  let fixture: ComponentFixture<GreenCoffeeGradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreenCoffeeGradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenCoffeeGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
