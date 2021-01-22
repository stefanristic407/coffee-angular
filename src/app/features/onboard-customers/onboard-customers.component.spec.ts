import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardCustomersComponent } from './onboard-customers.component';

describe('DashboardComponent', () => {
    let component: OnboardCustomersComponent;
    let fixture: ComponentFixture<OnboardCustomersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OnboardCustomersComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OnboardCustomersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
