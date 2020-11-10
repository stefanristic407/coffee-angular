import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QAForumComponent } from './q-a-forum.component';

describe('QAForumComponent', () => {
  let component: QAForumComponent;
  let fixture: ComponentFixture<QAForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QAForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QAForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
