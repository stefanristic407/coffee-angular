import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationAppComponent } from './authentication-app.component';

describe('AuthenticationAppComponent', () => {
  let component: AuthenticationAppComponent;
  let fixture: ComponentFixture<AuthenticationAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
