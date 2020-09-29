import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcuredCoffeeComponent } from './procured-coffee.component';

describe('ProcuredCoffeeComponent', () => {
  let component: ProcuredCoffeeComponent;
  let fixture: ComponentFixture<ProcuredCoffeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcuredCoffeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcuredCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
