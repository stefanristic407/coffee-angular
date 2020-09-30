import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFileComponent } from './video-file.component';

describe('VideoFileComponent', () => {
  let component: VideoFileComponent;
  let fixture: ComponentFixture<VideoFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
