import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeMySampleComponent } from './grade-my-sample.component';

describe('GradeMySampleComponent', () => {
  let component: GradeMySampleComponent;
  let fixture: ComponentFixture<GradeMySampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeMySampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeMySampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
