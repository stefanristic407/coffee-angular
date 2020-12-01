import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSettingComponent } from './default-setting.component';

describe('DefaultSettingComponent', () => {
  let component: DefaultSettingComponent;
  let fixture: ComponentFixture<DefaultSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
