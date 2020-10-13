import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateGreenCoffeeComponent } from './generate-green-coffee.component';

describe('GenerateGreenCoffeeComponent', () => {
  let component: GenerateGreenCoffeeComponent;
  let fixture: ComponentFixture<GenerateGreenCoffeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateGreenCoffeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateGreenCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
