import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoteSensoringComponent } from './remote-sensoring.component';

describe('RemoteSensoringComponent', () => {
  let component: RemoteSensoringComponent;
  let fixture: ComponentFixture<RemoteSensoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoteSensoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteSensoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
