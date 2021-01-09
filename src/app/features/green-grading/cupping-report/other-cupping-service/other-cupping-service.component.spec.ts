import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCuppingServiceComponent } from './other-cupping-service.component';

describe('OtherCuppingServiceComponent', () => {
  let component: OtherCuppingServiceComponent;
  let fixture: ComponentFixture<OtherCuppingServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherCuppingServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCuppingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
