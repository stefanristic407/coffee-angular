import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateProfileComponent } from './estate-profile.component';

describe('EstateProfileComponent', () => {
  let component: EstateProfileComponent;
  let fixture: ComponentFixture<EstateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
