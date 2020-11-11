import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPagesHomeComponent } from './brand-pages-home.component';

describe('BrandPagesHomeComponent', () => {
  let component: BrandPagesHomeComponent;
  let fixture: ComponentFixture<BrandPagesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandPagesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
