import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRoasteryComponent } from './about-roastery.component';

describe('AboutRoasteryComponent', () => {
  let component: AboutRoasteryComponent;
  let fixture: ComponentFixture<AboutRoasteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRoasteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRoasteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
