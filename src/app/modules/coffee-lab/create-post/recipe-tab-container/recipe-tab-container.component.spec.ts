import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTabContainerComponent } from './recipe-tab-container.component';

describe('RecipeTabContainerComponent', () => {
  let component: RecipeTabContainerComponent;
  let fixture: ComponentFixture<RecipeTabContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeTabContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
