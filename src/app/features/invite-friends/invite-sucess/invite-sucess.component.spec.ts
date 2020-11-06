import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteSucessComponent } from './invite-sucess.component';

describe('InviteSucessComponent', () => {
  let component: InviteSucessComponent;
  let fixture: ComponentFixture<InviteSucessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteSucessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
