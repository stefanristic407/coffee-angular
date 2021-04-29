import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_LANGUAGES } from '@constants';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
    selector: 'app-create-recipe',
    templateUrl: './create-recipe.component.html',
    styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent implements OnInit, OnChanges, OnDestroy {
    @Input() isTranslate;
    @Input() saveOriginalPost;
    isPosting = false;
    recipeSub: Subscription;
    applicationLanguages: any[] = APP_LANGUAGES;
    id: any;
    coverImageUrl: any;
    videoUrl: any;
    description: any;
    stepDescription: any;
    isUploadingImage = false;
    isShowVideo = false;
    imageIdList = [];
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
    languageArray = [];
    roasterId: string;
    imageIdListStep = [];
    recipeId: any;
    expertiseArray: any[] = [
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
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
    ) {
        this.createRecipeForm();
    }

    ngOnInit(): void {
        const type = this.route.snapshot.queryParamMap.get('type');
        if (type === 'recipe') {
            this.recipeId = this.route.snapshot.queryParamMap.get('id');
        }
        if (this.recipeId) {
            this.getRecipeyById();
        }
        this.recipeSub?.unsubscribe();
        const recipeSub = this.coffeeLabService.originalPost.subscribe((res) => {
            console.log('response', res);
            if (res && this.isTranslate) {
                console.log('this.id--->>posttttttt', this.id);
                this.onSave();
            }
        });

        this.recipeSub?.add(recipeSub);
    }

    getRecipeyById(): void {
        // this.isLoading = true;
        this.coffeeLabService.getForumDetails('recipe', this.recipeId).subscribe((res: any) => {
            // this.isLoading = false;
            console.log('getby id response--->>', res);
            if (res.success) {
                // this.article = res.result;
                this.recipeForm.controls.cover_image_id.setValue(res.result.cover_image_id);
                this.coverImageUrl = res.result.cover_image_url;
                this.isUploadingImage = true;
                this.description = res.result.description;
                this.recipeForm.patchValue({
                    name: res.result.name,
                    expertise: res.result.expertise,
                    serves: res.result.serves,
                    preparation_time_unit: res.result.preparation_time_unit,
                    cooking_time_unit: res.result.cooking_time_unit,
                    preparation_time: res.result.preparation_time,
                    cooking_time: res.result.cooking_time,
                    preparation_method: res.result.preparation_method,
                    cover_image_id: res.result.cover_image_id,
                    description: res.result.description,
                    ingredients: res.result.ingredients ? res.result.ingredients : [],
                    steps: res.result.steps ? res.result.steps : [],
                    allow_translation: res.result.allow_translation,
                    video_id: res.result?.video_id,
                });
                this.isShowVideo = true;
                this.videoUrl = res.result.video_url;
            } else {
                this.toaster.error('Error while get article');
                this.location.back();
            }
        });
    }

    ngOnChanges(): void {
        console.log('isTranslate', this.isTranslate);
    }

    createRecipeForm(): void {
        this.recipeForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            expertise: ['', Validators.compose([Validators.required])],
            serves: ['', Validators.compose([Validators.required])],
            preparation_time_unit: ['mins'],
            cooking_time_unit: ['mins'],
            preparation_time: ['', Validators.compose([Validators.required])],
            cooking_time: ['', Validators.compose([Validators.required])],
            preparation_method: ['', Validators.compose([Validators.required])],
            cover_image_id: [null, Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
            ingredients: this.fb.array([this.createCoffeeIngredient()]),
            steps: this.fb.array([this.createcoffeeStep()]),
            allow_translation: [false],
            video_id: [null, Validators.compose([Validators.required])],
            inline_images: [[]],
            language: 'en',
        });
    }

    uploadImage(event: any, index?, type?): void {
        this.files = event.target.files;
        this.fileEvent = this.files;
        console.log(this.fileEvent);
        this.imageFileName = this.files[0].name;
        const fileList: FileList = this.fileEvent;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            this.coffeeLabService.uploadFile(file, 'recipe-post').subscribe((res: any) => {
                console.log('image upload result---', res);
                if (res.success === true) {
                    this.toaster.success('The file ' + this.imageFileName + ' uploaded successfully');
                    this.imageFileData = res.result;
                    if (type === 'recipeCoverImage') {
                        this.recipeForm.controls.cover_image_id.setValue(res.result.id);
                        this.coverImageUrl = res.result.url;
                    } else if (type === 'stepImage') {
                        const step = this.recipeForm.get('steps') as FormArray;
                        console.log('step--->>>', step);
                        step.controls[index].value.image_id = res.result.id;
                    } else {
                        this.isShowVideo = true;
                        this.videoUrl = res.result.url;
                        this.recipeForm.controls.video_id.setValue(res.result.id);
                    }
                    console.log('recipe form', this.recipeForm.value);
                } else {
                    this.toaster.error('Error while uploading the file');
                }
            });
        }
    }

    createcoffeeStep() {
        return this.fb.group({
            description: [''],
            image_id: [null],
        });
    }

    createCoffeeIngredient() {
        return this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            quantity: ['', Validators.compose([Validators.required])],
            quantity_unit: ['1 Lbs'],
        });
    }

    addIngredient(): void {
        console.log('add varient');
        this.ingredients = this.recipeForm.get('ingredients') as FormArray;
        this.ingredients.push(this.createCoffeeIngredient());
    }

    addStep(): void {
        this.steps = this.recipeForm.get('steps') as FormArray;
        this.steps.push(this.createcoffeeStep());
        console.log('this.steps--->>', this.steps);
    }

    validateForms() {
        let returnFlag = true;
        if (!this.recipeForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        this.recipeForm.value.steps.forEach((child) => {
            if (!child.description) {
                returnFlag = false;
                return;
            }
        });
        return returnFlag;
    }

    onSave(): void {
        this.recipeForm.controls.description.setValue(this.description);
        console.log('save----', this.recipeForm.value);
        if (this.validateForms()) {
            this.isPosting = true;
            if (this.id) {
                console.log('translate recipe');
                this.translateRecipe(this.recipeForm.value);
            } else if (this.recipeId) {
                console.log('update recipe');
                this.updateRecipe(this.recipeForm.value);
            } else {
                console.log('create new recipe');
                this.createNewRecipe(this.recipeForm.value);
            }
        } else {
            this.recipeForm.markAllAsTouched();
            this.toaster.error('Please fill all Data');
        }
    }

    updateRecipe(data: any): void {
        data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        console.log('send recipe-->>>>', data);
        this.coffeeLabService.updateForum('recipe', this.recipeId, data).subscribe((res: any) => {
            this.isPosting = false;
            if (res.success) {
                this.toaster.success('You have updated an recipe successfully.');
                this.location.back();
            } else {
                this.toaster.error('Failed to update recipe.');
            }
        });
    }

    translateRecipe(data: any): void {
        data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        console.log('send recipe-->>>>', data);
        this.coffeeLabService.translateForum('recipe', this.id, data).subscribe((res: any) => {
            console.log('post question result >>>', res);
            if (res.success) {
                this.toaster.success('You have translated a coffee recipe successfully.');
                this.router.navigate(['/coffee-lab/overview/coffee-recipes']);
            } else {
                this.toaster.error('Failed to translate coffee recipe.');
            }
        });
    }

    createNewRecipe(data: any): void {
        data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        console.log('send recipe-->>>>', data);
        this.coffeeLabService.postCoffeeRecipe(data).subscribe((res: any) => {
            console.log('post question result >>>', res);
            if (res.success) {
                this.toaster.success('You have posted a coffee recipe successfully.');
                this.router.navigate(['/coffee-lab/overview/coffee-recipes']);
            } else {
                this.toaster.error('Failed to post coffee recipe.');
            }
        });
    }

    ngOnDestroy(): void {
        this.recipeSub?.unsubscribe();
    }
}
