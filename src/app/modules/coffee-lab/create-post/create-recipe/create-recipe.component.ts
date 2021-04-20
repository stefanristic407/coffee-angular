import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoffeeLabService, RoasterserviceService } from '@services';
import { number } from 'echarts';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-create-recipe',
    templateUrl: './create-recipe.component.html',
    styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent implements OnInit {
    qualitySeleted = '1 Lbs';
    seletedPreparationTime = 'mins';
    seletedCookingTime = 'mins';
    recipeForm: FormGroup;
    ingredients: FormArray;
    steps: FormArray;
    coverImage = '';
    files: any;
    fileEvent: any;
    fileName: any;
    imageFileData: any;
    imageFileName: any;
    roaster_id: string;
    experiseArray: any[] = [
        {
            label: 'easy',
            value: 'easy',
        },
        {
            label: 'intermediate',
            value: 'intermediate',
        },
        {
            label: 'hard',
            value: 'hard',
        },
    ];

    qualityArray: any[] = [
        {
            label: '1 Lbs',
            value: '1 Lbs',
        },
        {
            label: '2 Tbs',
            value: '2 Tbs',
        },
        {
            label: '2 Units',
            value: '2 Units',
        },
    ];

    preparationArray: any[] = [
        {
            label: 'mins',
            value: 'mins',
        },
        {
            label: 'hours',
            value: 'hours',
        },
    ];

    constructor(
        private fb: FormBuilder,
        private toaster: ToastrService,
        private cookieService: CookieService,
        private roasterService: RoasterserviceService,
        private coffeeLabService: CoffeeLabService,
    ) {
        this.roaster_id = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        this.createRecipeForm();
    }

    createRecipeForm() {
        this.recipeForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            expertise: ['', Validators.compose([Validators.required])],
            serves: ['', Validators.compose([Validators.required])],
            preparation_time_unit: ['mins'],
            cooking_time_unit: ['mins'],
            preparation_time: ['', Validators.compose([Validators.required])],
            cooking_time: ['', Validators.compose([Validators.required])],
            preparation_method: ['', Validators.compose([Validators.required])],
            cover_image_id: [number],
            description: ['', Validators.compose([Validators.required])],
            ingredients: this.fb.array([this.createCoffeIngredient()]),
            steps: this.fb.array([this.createcoffeStep()]),
            allow_translation: [false],
        });
    }

    uploadImage(event: any, index?, type?) {
        this.files = event.target.files;
        this.fileEvent = this.files;
        console.log(this.fileEvent);
        this.imageFileName = this.files[0].name;
        let fileList: FileList = this.fileEvent;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            let formData: FormData = new FormData();
            formData.append('file', file, file.name);
            formData.append('name', this.imageFileName);
            formData.append('file_module', 'Coffee-Story');
            formData.append('parent_id', '0');
            formData.append('api_call', '/ro/' + this.roaster_id + '/file-manager/files');
            formData.append('token', this.cookieService.get('Auth'));
            this.roasterService.uploadFiles(formData).subscribe((result) => {
                console.log('image upload result---');
                if (result['success'] == true) {
                    this.toaster.success('The file ' + this.imageFileName + ' uploaded successfully');
                    this.imageFileData = result['result'];
                    if (type == 'recipeCoverImage') {
                        this.recipeForm.controls.cover_image_id.setValue(result['result'].id);
                    } else {
                        const step = this.recipeForm.get('steps') as FormArray;
                        console.log('step--->>>', step);
                        step['controls'][index].value.image_id = result['result'].id;
                    }
                    console.log('recipe form', this.recipeForm.value);
                } else {
                    this.toaster.error('Error while uploading the file');
                }
            });
        }
    }

    createcoffeStep() {
        return this.fb.group({
            description: ['', Validators.compose([Validators.required])],
            image_id: [number],
        });
    }

    createCoffeIngredient() {
        return this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            quantity: ['', Validators.compose([Validators.required])],
            quantity_unit: ['1 Lbs'],
        });
    }

    addIngredient() {
        console.log('add varient');
        this.ingredients = this.recipeForm.get('ingredients') as FormArray;
        this.ingredients.push(this.createCoffeIngredient());
    }

    addStep() {
        this.steps = this.recipeForm.get('steps') as FormArray;
        this.steps.push(this.createcoffeStep());
    }

    validateForms() {
        let returnFlag = true;
        if (!this.recipeForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        return returnFlag;
    }

    onSave() {
        console.log('save----', this.recipeForm.value);
        if (this.validateForms()) {
            const coffeeObj = this.recipeForm.value;
            this.createNewRecipe(coffeeObj);
        } else {
            this.recipeForm.markAllAsTouched();
            this.toaster.error('Please fill all Data');
        }
    }

    createNewRecipe(data) {
        console.log('send recipe-->>>>', data);
        this.coffeeLabService.postCoffeeRecipe(data).subscribe((res: any) => {
            console.log('post question result >>>', res);
            if (res.success) {
                this.toaster.success('You have posted a coffee recipe successfully.');
            } else {
                this.toaster.error('Failed to post coffee recipe.');
            }
        });
    }
}
