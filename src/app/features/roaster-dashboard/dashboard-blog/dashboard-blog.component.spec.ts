import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeAboardComponent } from './welcome-aboard.component';

describe('WelcomeAboardComponent', () => {
  let component: WelcomeAboardComponent;
  let fixture: ComponentFixture<WelcomeAboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeAboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeAboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
