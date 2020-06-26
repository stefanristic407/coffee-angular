import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebookDocumentsComponent } from './prebook-documents.component';

describe('PrebookDocumentsComponent', () => {
  let component: PrebookDocumentsComponent;
  let fixture: ComponentFixture<PrebookDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrebookDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebookDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
