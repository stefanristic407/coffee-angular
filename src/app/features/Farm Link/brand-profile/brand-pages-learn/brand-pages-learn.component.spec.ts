import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPagesLearnComponent } from './brand-pages-learn.component';

describe('BrandPagesLearnComponent', () => {
  let component: BrandPagesLearnComponent;
  let fixture: ComponentFixture<BrandPagesLearnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandPagesLearnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPagesLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
