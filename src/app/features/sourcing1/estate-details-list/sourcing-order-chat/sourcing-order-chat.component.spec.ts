import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcingOrderChatComponent } from './sourcing-order-chat.component';

describe('SourcingOrderChatComponent', () => {
  let component: SourcingOrderChatComponent;
  let fixture: ComponentFixture<SourcingOrderChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcingOrderChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcingOrderChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
