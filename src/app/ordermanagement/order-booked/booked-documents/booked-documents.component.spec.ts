import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedDocumentsComponent } from './booked-documents.component';

describe('BookedDocumentsComponent', () => {
  let component: BookedDocumentsComponent;
  let fixture: ComponentFixture<BookedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
