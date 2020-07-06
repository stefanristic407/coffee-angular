import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFileComponent } from './document-file.component';

describe('DocumentFileComponent', () => {
  let component: DocumentFileComponent;
  let fixture: ComponentFixture<DocumentFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
