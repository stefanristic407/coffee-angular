import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoastingProfileComponent } from './create-roasting-profile.component';

describe('CreateRoastingProfileComponent', () => {
  let component: CreateRoastingProfileComponent;
  let fixture: ComponentFixture<CreateRoastingProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoastingProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoastingProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
