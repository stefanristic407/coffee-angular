import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateVirtulTourComponent } from './estate-virtul-tour.component';

describe('EstateVirtulTourComponent', () => {
  let component: EstateVirtulTourComponent;
  let fixture: ComponentFixture<EstateVirtulTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateVirtulTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateVirtulTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
