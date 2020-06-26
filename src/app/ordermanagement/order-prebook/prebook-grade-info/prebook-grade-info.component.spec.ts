import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebookGradeInfoComponent } from './prebook-grade-info.component';

describe('PrebookGradeInfoComponent', () => {
  let component: PrebookGradeInfoComponent;
  let fixture: ComponentFixture<PrebookGradeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebookGradeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebookGradeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
