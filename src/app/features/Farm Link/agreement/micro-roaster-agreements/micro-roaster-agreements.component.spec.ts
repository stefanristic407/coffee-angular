import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroRoasterAgreementsComponent } from './micro-roaster-agreements.component';

describe('MicroRoasterAgreementsComponent', () => {
  let component: MicroRoasterAgreementsComponent;
  let fixture: ComponentFixture<MicroRoasterAgreementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicroRoasterAgreementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicroRoasterAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
