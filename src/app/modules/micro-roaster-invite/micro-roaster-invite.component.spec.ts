import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroRoasterInviteComponent } from './micro-roaster-invite.component';

describe('MicroRoasterInviteComponent', () => {
  let component: MicroRoasterInviteComponent;
  let fixture: ComponentFixture<MicroRoasterInviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroRoasterInviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroRoasterInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
