import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPagesSustainabilityComponent } from './brand-pages-sustainability.component';

describe('BrandPagesSustainabilityComponent', () => {
  let component: BrandPagesSustainabilityComponent;
  let fixture: ComponentFixture<BrandPagesSustainabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandPagesSustainabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPagesSustainabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
