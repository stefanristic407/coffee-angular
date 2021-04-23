import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeOriginalPostComponent } from './recipe-original-post.component';

describe('RecipeOriginalPostComponent', () => {
    let component: RecipeOriginalPostComponent;
    let fixture: ComponentFixture<RecipeOriginalPostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecipeOriginalPostComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeOriginalPostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
