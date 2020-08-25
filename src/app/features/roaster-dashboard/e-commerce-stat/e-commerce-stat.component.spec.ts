import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ECommerceStatComponent } from './e-commerce-stat.component';

describe('ECommerceStatComponent', () => {
  let component: ECommerceStatComponent;
  let fixture: ComponentFixture<ECommerceStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ECommerceStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECommerceStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
