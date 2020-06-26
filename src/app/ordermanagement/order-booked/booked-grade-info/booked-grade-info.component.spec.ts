import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedGradeInfoComponent } from './booked-grade-info.component';

describe('BookedGradeInfoComponent', () => {
  let component: BookedGradeInfoComponent;
  let fixture: ComponentFixture<BookedGradeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedGradeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedGradeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
