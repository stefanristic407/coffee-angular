import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-recipe-original-post',
    templateUrl: './recipe-original-post.component.html',
    styleUrls: ['./recipe-original-post.component.scss'],
})
export class RecipeOriginalPostComponent implements OnInit, OnChanges {
    @Input() recipeId;
    @Output() checkTranslationExits = new EventEmitter<any>();
    id: string | number = '';
    isLoading = true;
    isCopying = false;
    detailsData: any;
    recipeForm: FormGroup;
    ingredients: FormArray;
    brewRatio: string;
    expertiseArray: any[] = [
        {
            label: 'Easy',
            value: 'easy',
        },
        {
            label: 'Intermediate',
            value: 'intermediate',
        },
        {
            label: 'Hard',
            value: 'hard',
        },
    ];
    qualityArray: any[] = [
        {
            label: 'ounces',
            value: 'ounces',
        },
        {
            label: 'lbs',
            value: 'lbs',
        },
        {
            label: 'tbsp',
            value: 'tbsp',
        },
        {
            label: 'cups',
            value: 'cups',
        },
        {
            label: 'grams',
            value: 'grams',
        },
        {
            label: 'kg',
            value: 'kg',
        },
        {
            label: 'units',
            value: 'units',
        },
        {
            label: 'ml',
            value: 'ml',
        },
        {
            label: 'L',
            value: 'L',
        },
        {
            label: 'glasses',
            value: 'glasses',
        },
        {
            label: 'N/A',
            value: '',
        },
    ];
    buttonList = [{ button: 'Roasting' }, { button: 'Coffee grinding' }, { button: 'Brewing' }];

    constructor(private coffeeLabService: CoffeeLabService, private toaster: ToastrService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.createRecipeForm();
    }

    ngOnChanges(): void {
        if (this.recipeId) {
            this.getCoffeeDetails(true);
        }
    }

    getCoffeeDetails(isReloading: boolean): void {
        this.isLoading = isReloading;
        this.coffeeLabService.getForumDetails('recipe', this.recipeId).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
                const emitObject = {
                    translation: this.detailsData?.translations,
                    lang_code: this.detailsData?.lang_code,
                    slug: this.detailsData?.slug,
                };
                this.checkTranslationExits.emit(emitObject);
                this.recipeForm.patchValue({
                    name: res.result.name,
                    description: res.result.description,
                    expertise: res.result.expertise,
                    serves: res.result.serves,
                    equipment_name: res.result.equipment_name,
                    coffee_ratio: res.result.coffee_ratio,
                    water_ratio: res.result.water_ratio,
                });
                if (res.result?.ingredients && res.result?.ingredients.length > 0) {
                    let i = 0;
                    for (const ing of res.result?.ingredients) {
                        const ingredient = {
                            name: ing.name,
                            quantity: ing.quantity,
                            quantity_unit: ing.quantity_unit,
                        };
                        const controlArray = this.recipeForm.controls?.ingredients as FormArray;
                        controlArray.controls[i]?.patchValue(ingredient);
                        if (i < res.result.ingredients.length - 1) {
                            controlArray.push(this.createCoffeeIngredient());
                        }
                        i++;
                    }
                }
            }
            this.brewRatio = this.recipeForm.get('coffee_ratio').value + ':' + this.recipeForm.get('water_ratio').value;
            this.recipeForm.disable();
            this.isLoading = false;
        });
    }

    copyImage(id: number, type: string): void {
        if (this.isCopying) {
            return;
        }
        this.isCopying = true;
        this.coffeeLabService.copyFile(id).subscribe((res: any) => {
            this.isCopying = false;
            if (res.success) {
                this.toaster.success('Copied cover image successfully');
                this.coffeeLabService.copyCoverImage.emit({
                    imageId: res.result.id,
                    imageUrl: res.result.url,
                    type,
                });
            } else {
                this.toaster.error('Failed to copy file.');
            }
        });
    }
    createRecipeForm(): void {
        this.recipeForm = this.fb.group({
            name: [''],
            description: [''],
            expertise: [''],
            serves: [''],
            equipment_name: [''],
            coffee_ratio: [''],
            water_ratio: [''],
            ingredients: this.fb.array([this.createCoffeeIngredient()]),
        });
    }

    createCoffeeIngredient() {
        return this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            quantity: ['', Validators.compose([Validators.required])],
            quantity_unit: ['lbs'],
        });
    }

    addIngredient(): void {
        this.ingredients = this.recipeForm.get('ingredients') as FormArray;
        this.ingredients.push(this.createCoffeeIngredient());
    }

    deleteIngredient(index) {
        this.ingredients.removeAt(index);
    }
}
