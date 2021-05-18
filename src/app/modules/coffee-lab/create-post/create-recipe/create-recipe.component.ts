import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_LANGUAGES } from '@constants';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

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
    applicationLanguages = [];
    coverImageUrl: any;
    videoUrl: any;
    description: any;
    stepDescription: any;
    isUploadingImage = false;
    isShowVideo = false;
    imageIdList = [];
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
    recipe: any;
    copiedCoverImageId: any;
    copiedCoverImageUrl: any;
    preparationMethods: any[] = [
        {
            label: 'Video Recipe',
            value: 'video',
        },
        {
            label: 'Add step by step introduction & video',
            value: 'steps',
        },
    ];
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
            label: 'lbs',
            value: 'lbs',
        },
        {
            label: 'tbsp',
            value: 'tbsp',
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

    images = [];
    constructor(
        private cookieService: CookieService,
        private fb: FormBuilder,
        private toaster: ToastrService,
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
    ) {
        this.createRecipeForm();
        this.roasterId = this.cookieService.get('roaster_id');
    }

    ngOnInit(): void {
        const type = this.route.snapshot.queryParamMap.get('type');
        if (type === 'recipe') {
            this.recipeId = this.route.snapshot.queryParamMap.get('id');
        }
        if (this.recipeId) {
            this.getRecipeById();
        }
        this.recipeSub?.unsubscribe();
        const recipeSub = this.coffeeLabService.originalPost.subscribe((res) => {
            console.log('response', res);
            if (res && this.isTranslate) {
                this.onSave();
            }
        });

        const recipeCoverImage = this.coffeeLabService.copyCoverImage.subscribe((res) => {
            if (res && this.isTranslate) {
                this.copyCoverImage(res);
            }
        });

        this.recipeSub?.add(recipeSub);
        this.recipeSub?.add(recipeCoverImage);
    }

    getRecipeById(): void {
        this.coffeeLabService.getForumDetails('recipe', this.recipeId).subscribe((res: any) => {
            if (res.success) {
                this.recipe = res.result;
                this.applicationLanguages = APP_LANGUAGES.filter(
                    (item) =>
                        item.value !== res.result.lang_code &&
                        !res.result.translations?.find((lng) => lng.language === item.value),
                );
                console.log('get by id response-->>>>>>>', res);
                if (this.isTranslate) {
                    this.recipeForm.controls.language.setValue(null);
                }
                this.recipeForm.controls.cover_image_id.setValue(res.result.cover_image_id);
                this.coverImageUrl = res.result.cover_image_url;
                this.isUploadingImage = true;
                this.description = res.result.description;
                this.images = res.result.inline_images ? res.result.inline_images : [];
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
                    steps: res.result.steps ? res.result.steps : [],
                    allow_translation: res.result.allow_translation,
                    video_id: res.result?.video_id,
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
                if (res.result?.steps && res.result?.steps.length > 0) {
                    let j = 0;
                    for (const ing of res.result?.steps) {
                        const ingredient = {
                            description: ing.description,
                            image_id: ing?.image_id,
                            coverImageUrl: ing?.image_url,
                        };
                        const controlArray = this.recipeForm.controls?.steps as FormArray;
                        controlArray.controls[j]?.patchValue(ingredient);
                        if (j < res.result.steps.length - 1) {
                            controlArray.push(this.createCoffeeStep());
                        }
                        j++;
                    }
                }
                if (res.result.video_url) {
                    this.isShowVideo = true;
                    this.videoUrl = res.result.video_url;
                }
            } else {
                this.toaster.error('Error while get recipe');
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
            preparation_time: [null, Validators.compose([Validators.required])],
            cooking_time: [null, Validators.compose([Validators.required])],
            preparation_method: ['steps', Validators.compose([Validators.required])],
            cover_image_id: [null, Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
            ingredients: this.fb.array([this.createCoffeeIngredient()]),
            steps: this.fb.array([this.createCoffeeStep()]),
            allow_translation: [false],
            video_id: [null],
            inline_images: [[]],
            language: this.coffeeLabService.currentForumLanguage,
            publish: true,
        });
    }

    deleteCoverImage() {
        this.coverImageUrl = null;
        this.recipeForm.controls.cover_image_id.setValue(null);
    }

    uploadImage(event: any, index?, type?): void {
        this.files = event.target.files;
        this.fileEvent = this.files;
        console.log(this.fileEvent);
        this.imageFileName = this.files[0].name;
        const fileList: FileList = this.fileEvent;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            const fsize = file.size;
            const fileSize = Math.round(fsize / 1024);
            if (fileSize >= 2048) {
                this.toaster.error('File size exceeds 2mb');
                return;
            }
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
                        step.controls[index].value.coverImageUrl = res.result.url;
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

    createCoffeeStep() {
        return this.fb.group({
            description: [''],
            image_id: [null],
            coverImageUrl: [null],
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
        this.ingredients = this.recipeForm.get('ingredients') as FormArray;
        this.ingredients.push(this.createCoffeeIngredient());
    }

    addStep(): void {
        this.steps = this.recipeForm.get('steps') as FormArray;
        this.steps.push(this.createCoffeeStep());
    }

    validateForms() {
        let returnFlag = true;
        if (!this.recipeForm.valid) {
            returnFlag = false;
            return returnFlag;
        }
        if (this.isTranslate) {
            if (!this.recipeForm.value.language) {
                returnFlag = false;
            }
        }
        return returnFlag;
    }

    onSave(status?: string): void {
        console.log('save----', this.recipeForm.value);
        if (status === 'draft') {
            if (!this.recipeForm.value.name) {
                this.toaster.error('Please fill recipe name');
            } else {
                this.isPosting = true;
                this.recipeForm.controls.publish.setValue(false);
                this.createNewRecipe(this.recipeForm.value);
            }
        } else {
            if (this.validateForms()) {
                this.isPosting = true;
                if (this.isTranslate) {
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
    }

    updateRecipe(data: any): void {
        data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        this.coffeeLabService.updateForum('recipe', this.recipeId, data).subscribe((res: any) => {
            this.isPosting = false;
            if (res.success) {
                this.toaster.success('You have updated an recipe successfully.');
                this.location.back();
            } else {
                this.isPosting = false;
                this.toaster.error('Failed to update recipe.');
            }
        });
    }

    translateRecipe(data: any): void {
        data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        console.log('send recipe-->>>>', data);
        this.coffeeLabService.translateForum('recipe', this.recipeId, data).subscribe((res: any) => {
            console.log('post question result >>>', res);
            if (res.success) {
                this.toaster.success('You have translated a coffee recipe successfully.');
                this.router.navigate(['/coffee-lab/overview/coffee-recipes']);
            } else {
                this.isPosting = false;
                this.toaster.error(res.messages.translation);
            }
        });
    }

    copyCoverImage(data) {
        this.coffeeLabService.copyFile(data?.cover_image_id).subscribe((res: any) => {
            if (res.success) {
                this.copiedCoverImageId = res.result.id;
                this.copiedCoverImageUrl = res.result.url;
                this.toaster.success('Copied cover image successfully.');
            } else {
                this.toaster.error('Failed to copy cover image.');
            }
        });
    }

    createNewRecipe(data: any): void {
        data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        console.log('send recipe-->>>>', data);
        this.coffeeLabService.postCoffeeRecipe(data).subscribe((res: any) => {
            if (res.success) {
                this.toaster.success('You have posted a coffee recipe successfully.');
                this.router.navigate(['/coffee-lab/overview/coffee-recipes']);
            } else {
                this.isPosting = false;
                this.toaster.error('Failed to post coffee recipe.');
            }
        });
    }

    ngOnDestroy(): void {
        this.recipeSub?.unsubscribe();
    }

    pasteCoverImage() {
        this.coverImageUrl = this.copiedCoverImageUrl;
        this.recipeForm.controls.cover_image_id.setValue(this.copiedCoverImageId);
    }
}
