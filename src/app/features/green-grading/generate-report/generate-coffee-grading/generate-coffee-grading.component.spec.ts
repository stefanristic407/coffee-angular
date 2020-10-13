import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateCoffeeGradingComponent } from './generate-coffee-grading.component';

describe('GenerateCoffeeGradingComponent', () => {
  let component: GenerateCoffeeGradingComponent;
  let fixture: ComponentFixture<GenerateCoffeeGradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateCoffeeGradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateCoffeeGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
