import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPagesVisitUsComponent } from './brand-pages-visit-us.component';

describe('BrandPagesVisitUsComponent', () => {
  let component: BrandPagesVisitUsComponent;
  let fixture: ComponentFixture<BrandPagesVisitUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandPagesVisitUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPagesVisitUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
