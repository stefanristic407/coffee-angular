import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrderChatComponent } from './pre-order-chat.component';

describe('PreOrderChatComponent', () => {
  let component: PreOrderChatComponent;
  let fixture: ComponentFixture<PreOrderChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreOrderChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreOrderChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
