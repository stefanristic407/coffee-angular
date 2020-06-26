import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageRegionComponent } from './language-region.component';

describe('LanguageRegionComponent', () => {
  let component: LanguageRegionComponent;
  let fixture: ComponentFixture<LanguageRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
