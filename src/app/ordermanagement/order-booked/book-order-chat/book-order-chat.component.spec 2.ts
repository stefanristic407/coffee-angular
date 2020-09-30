import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOrderChatComponent } from './book-order-chat.component';

describe('BookOrderChatComponent', () => {
  let component: BookOrderChatComponent;
  let fixture: ComponentFixture<BookOrderChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOrderChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOrderChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
