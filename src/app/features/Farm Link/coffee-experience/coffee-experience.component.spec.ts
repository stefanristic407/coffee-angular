import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeExperienceComponent } from './coffee-experience.component';

describe('CoffeeExperienceComponent', () => {
  let component: CoffeeExperienceComponent;
  let fixture: ComponentFixture<CoffeeExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
