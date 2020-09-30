import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileShareDetailsComponent } from './file-share-details.component';

describe('FileShareDetailsComponent', () => {
  let component: FileShareDetailsComponent;
  let fixture: ComponentFixture<FileShareDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileShareDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileShareDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
