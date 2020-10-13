import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeServiceComponent } from './grade-service.component';

describe('GradeServiceComponent', () => {
  let component: GradeServiceComponent;
  let fixture: ComponentFixture<GradeServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
