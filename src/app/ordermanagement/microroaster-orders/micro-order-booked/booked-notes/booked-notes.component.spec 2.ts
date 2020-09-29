import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedNotesComponent } from './booked-notes.component';

describe('BookedNotesComponent', () => {
  let component: BookedNotesComponent;
  let fixture: ComponentFixture<BookedNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
