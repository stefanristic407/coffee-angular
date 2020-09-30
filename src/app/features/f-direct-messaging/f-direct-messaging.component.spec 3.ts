import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FDirectMessagingComponent } from './f-direct-messaging.component';

describe('FDirectMessagingComponent', () => {
  let component: FDirectMessagingComponent;
  let fixture: ComponentFixture<FDirectMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FDirectMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FDirectMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
