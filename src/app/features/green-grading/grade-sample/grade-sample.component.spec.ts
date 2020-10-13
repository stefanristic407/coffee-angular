import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSampleComponent } from './grade-sample.component';

describe('GradeSampleComponent', () => {
  let component: GradeSampleComponent;
  let fixture: ComponentFixture<GradeSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
