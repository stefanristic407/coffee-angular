import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPagesAboutUsComponent } from './brand-pages-about-us.component';

describe('BrandPagesAboutUsComponent', () => {
  let component: BrandPagesAboutUsComponent;
  let fixture: ComponentFixture<BrandPagesAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandPagesAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPagesAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
