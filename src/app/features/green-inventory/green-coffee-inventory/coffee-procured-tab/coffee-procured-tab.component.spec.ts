import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeProcuredTabComponent } from './coffee-procured-tab.component';

describe('CoffeeProcuredTabComponent', () => {
  let component: CoffeeProcuredTabComponent;
  let fixture: ComponentFixture<CoffeeProcuredTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeProcuredTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeProcuredTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
