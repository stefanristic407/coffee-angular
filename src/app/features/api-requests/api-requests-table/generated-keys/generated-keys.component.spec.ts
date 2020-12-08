import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedKeysComponent } from './generated-keys.component';

describe('GeneratedKeysComponent', () => {
  let component: GeneratedKeysComponent;
  let fixture: ComponentFixture<GeneratedKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
