import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDirectMessagingComponent } from './p-direct-messaging.component';

describe('PDirectMessagingComponent', () => {
  let component: PDirectMessagingComponent;
  let fixture: ComponentFixture<PDirectMessagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDirectMessagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDirectMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
