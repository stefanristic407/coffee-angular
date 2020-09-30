import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CofeeExpeienceDetailsComponent } from './cofee-expeience-details.component';

describe('CofeeExpeienceDetailsComponent', () => {
  let component: CofeeExpeienceDetailsComponent;
  let fixture: ComponentFixture<CofeeExpeienceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CofeeExpeienceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofeeExpeienceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
