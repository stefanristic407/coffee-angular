import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseTicketFormComponent } from './raise-ticket-form.component';

describe('RaiseTicketFormComponent', () => {
  let component: RaiseTicketFormComponent;
  let fixture: ComponentFixture<RaiseTicketFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseTicketFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
