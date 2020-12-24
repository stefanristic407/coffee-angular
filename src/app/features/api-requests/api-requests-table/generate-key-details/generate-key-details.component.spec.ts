import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateKeyDetailsComponent } from './generate-key-details.component';

describe('GenerateKeyDetailsComponent', () => {
  let component: GenerateKeyDetailsComponent;
  let fixture: ComponentFixture<GenerateKeyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateKeyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateKeyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
