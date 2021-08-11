import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_LANGUAGES } from '@constants';
import { AuthService, CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { CropperDialogComponent } from '@app/shared';
import { CroppedImage } from '@models';
import { insertAltAttr } from '@utils';

export enum RecipeFileType {
    CoverImage = 'CoverImage',
    Video = 'Video',
    StepImage = 'StepImage',
}

@Component({
    selector: 'app-create-recipe',
    templateUrl: './create-recipe.component.html',
    styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent implements OnInit, OnDestroy {
    readonly RecipeFileType = RecipeFileType;
    @Input() isTranslate;
    @Input() saveOriginalPost;
    isPosting = false;
    applicationLanguages = [];
    coverImageUrl: any;
    videoUrl: any;
    isUploadingImage = false;
    isShowVideo = false;
    imageIdList = [];
    recipeForm: FormGroup;
    ingredients: FormArray;
    steps: FormArray;
    languageArray = [];
    organizationId: number;
    imageIdListStep = [];
    recipeId: any;
    draftRecipeId: any;
    originRecipeId: any;
    recipe: any;
    copiedCoverImageId: number;
    copiedCoverImageUrl: string;
    copiedStepImageId: number;
    copiedStepImageUrl: string;
    copiedVideoId: number;
    copiedVideoUrl: string;
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
    maxVideoSize = 15;
    destroy$: Subject<boolean> = new Subject<boolean>();
    clicked = false;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private toaster: ToastrService,
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private dialogService: DialogService,
    ) {
        this.organizationId = this.authService.getOrgId();
        this.createRecipeForm();
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            const type = params.type;
            if (type === 'recipe') {
                this.recipeId = params.id;
                this.originRecipeId = params.origin_id;
                this.draftRecipeId = params.draft_id;
                this.coffeeLabService.originalPost.pipe(takeUntil(this.destroy$)).subscribe((res) => {
                    if (res && this.isTranslate) {
                        this.onSave();
                    }
                });
                this.coffeeLabService.copyCoverImage.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
                    this.copyFile(data);
                });
                if (this.recipeId) {
                    this.getRecipeById(this.recipeId);
                }
                if (this.draftRecipeId) {
                    this.getRecipeById(this.draftRecipeId);
                }
                if (this.originRecipeId) {
                    this.setAppLanguages();
                }
            }
        });
    }

    setAppLanguages(): void {
        this.coffeeLabService.getForumDetails('recipe', this.originRecipeId).subscribe((res: any) => {
            if (res.success) {
                this.applicationLanguages = APP_LANGUAGES.filter(
                    (item) =>
                        item.value !== res.result.lang_code &&
                        !res.result.translations?.find((lng) => lng.language === item.value),
                );
            }
        });
    }

    getRecipeById(id: any): void {
        this.coffeeLabService.getForumDetails('recipe', id).subscribe((res: any) => {
            if (res.success) {
                this.recipe = res.result;
                this.images = res.result.inline_images ? res.result.inline_images : [];
                this.coverImageUrl = res.result.cover_image_url;
                this.recipeForm.patchValue({
                    name: res.result.name,
                    expertise: res.result.expertise,
                    serves: res.result.serves,
                    equipment_name: res.result.equipment_name,
                    coffee_ratio: res.result.coffee_ratio,
                    water_ratio: res.result.water_ratio,
                    preparation_method: res.result.preparation_method,
                    description: res.result.description,
                    language: res.result.lang_code,
                    steps: res.result.steps ? res.result.steps : [],
                    cover_image_id: res.result.cover_image_id,
                    video_id: res.result.video_id,
                    allow_translation: res.result.allow_translation,
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
                            image_id: ing?.image_id,
                            coverImageUrl: ing?.image_url,
                            description: ing.description,
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

    createRecipeForm(): void {
        this.recipeForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            expertise: ['', Validators.compose([Validators.required])],
            serves: ['', Validators.compose([Validators.required])],
            equipment_name: ['', Validators.compose([Validators.required])],
            coffee_ratio: ['', Validators.required],
            water_ratio: ['', Validators.required],
            cooking_time_unit: ['mins'],
            preparation_method: ['steps', Validators.compose([Validators.required])],
            cover_image_id: [null, Validators.compose([Validators.required])],
            description: ['', Validators.compose([Validators.required])],
            ingredients: this.fb.array([this.createCoffeeIngredient()]),
            steps: this.fb.array([this.createCoffeeStep()]),
            allow_translation: [true],
            video_id: [null],
            inline_images: [[]],
            language: [],
            publish: [true],
        });
    }

    deleteCoverImage() {
        this.coverImageUrl = null;
        this.recipeForm.controls.cover_image_id.setValue(null);
    }

    onFileChange(event: any, index: number, type: RecipeFileType) {
        if (!event.target.files?.length) {
            return;
        }
        if (type === RecipeFileType.Video) {
            this.uploadFile(event.target.files[0], index, type);
        } else {
            this.dialogService
                .open(CropperDialogComponent, {
                    data: {
                        imageChangedEvent: event,
                        aspectRatio: 672 / 276,
                        resizeToWidth: 672,
                    },
                })
                .onClose.subscribe((data: CroppedImage) => {
                    if (data.status) {
                        this.uploadFile(data.croppedImgFile, index, type);
                    }
                });
        }
    }

    uploadFile(file: any, index: number, type): void {
        const maximumFileSize = type === RecipeFileType.Video ? this.maxVideoSize * 1024 : 2 * 1024;
        const fileSize = Math.round(file.size / 1024);
        // Check max file size
        if (fileSize >= maximumFileSize) {
            this.toaster.error(`Maximum file size is ${maximumFileSize / 1024}mb`);
            return;
        }
        this.coffeeLabService.uploadFile(file, 'recipe-post').subscribe((res: any) => {
            if (res.success === true) {
                this.toaster.success('The file ' + file.name + ' uploaded successfully');
                if (type === RecipeFileType.CoverImage) {
                    this.recipeForm.controls.cover_image_id.setValue(res.result.id);
                    this.coverImageUrl = res.result.url;
                } else if (type === RecipeFileType.StepImage) {
                    const step = this.recipeForm.get('steps') as FormArray;
                    step.controls[index].get('image_id').setValue(res.result.id);
                    step.controls[index].get('coverImageUrl').setValue(res.result.url);
                } else {
                    this.isShowVideo = true;
                    this.videoUrl = res.result.url;
                    this.recipeForm.controls.video_id.setValue(res.result.id);
                }
            } else {
                this.toaster.error('Error while uploading the file');
            }
        });
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
            quantity_unit: ['lbs'],
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

    onSave(status?: string): void {
        this.recipeForm.markAsUntouched();
        if (status === 'draft') {
            if (!this.recipeForm.value.name) {
                this.toaster.error('Please fill recipe name');
                return;
            } else {
                this.recipeForm.controls.publish.setValue(false);
                this.handlePost();
            }
        } else {
            if (this.isTranslate) {
                this.recipeForm.controls.language.setValidators(Validators.required);
                this.recipeForm.controls.language.updateValueAndValidity();
            }
            if (this.recipeForm.invalid) {
                this.recipeForm.markAllAsTouched();
                this.toaster.error('Please fill all Data');
                return;
            } else {
                this.handlePost();
            }
        }
    }

    handlePost(): void {
        this.isPosting = true;
        this.checkRichText();
        if (this.isTranslate) {
            this.translateRecipe(this.recipeForm.value);
        } else if (this.recipeId) {
            this.updateRecipe(this.recipeForm.value);
        } else {
            this.createNewRecipe(this.recipeForm.value);
        }
    }

    updateRecipe(data: any): void {
        data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        data.inline_images = data.inline_images.filter((i) => i !== undefined);
        this.coffeeLabService.updateForum('recipe', this.recipeId, data).subscribe((res: any) => {
            this.isPosting = false;
            if (res.success) {
                this.toaster.success('You have updated an recipe successfully.');
                this.router.navigate(['/coffee-lab/overview/coffee-recipes']);
            } else {
                this.isPosting = false;
                this.toaster.error('Failed to update recipe.');
            }
        });
    }

    translateRecipe(data: any): void {
        data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        data.inline_images = data.inline_images.filter((i) => i !== undefined);
        this.coffeeLabService.translateForum('recipe', this.originRecipeId, data).subscribe((res: any) => {
            if (res.success) {
                this.toaster.success('You have translated a coffee recipe successfully.');
                this.router.navigate(['/coffee-lab/overview/coffee-recipes']);
            } else {
                this.isPosting = false;
                this.toaster.error(res.messages.translation);
            }
        });
    }

    copyFile(data: any) {
        const { imageId, imageUrl, type } = data;
        if (type === 'cover') {
            this.copiedCoverImageId = imageId;
            this.copiedCoverImageUrl = imageUrl;
        } else if (type === 'video') {
            this.copiedVideoId = imageId;
            this.copiedVideoUrl = imageUrl;
        } else {
            this.copiedStepImageId = imageId;
            this.copiedStepImageUrl = imageUrl;
        }
    }

    createNewRecipe(data: any): void {
        data.language = this.coffeeLabService.currentForumLanguage;
        data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        data.steps.map((item: any, index: number) => {
            item.image_id = data.inline_images[index];
            return item;
        });
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

    pasteCoverImage(): void {
        this.coverImageUrl = this.copiedCoverImageUrl;
        this.recipeForm.controls.cover_image_id.setValue(this.copiedCoverImageId);
    }

    pasteVideo(): void {
        this.isShowVideo = true;
        this.videoUrl = this.copiedVideoUrl;
        this.recipeForm.controls.video_id.setValue(this.copiedVideoId);
    }

    pasteStepImage(index: number) {
        const step = this.recipeForm.get('steps') as FormArray;
        step.controls[index].get('image_id').setValue(this.copiedStepImageId);
        step.controls[index].get('coverImageUrl').setValue(this.copiedStepImageUrl);
    }

    deleteStepImage(index) {
        const step = this.recipeForm.get('steps') as FormArray;
        step.controls[index].get('image_id').setValue(null);
        step.controls[index].get('coverImageUrl').setValue(null);
    }

    deleteIngredient(index) {
        this.ingredients.removeAt(index);
    }

    deleteStep(index) {
        this.steps.removeAt(index);
    }

    deleteVideo() {
        this.videoUrl = null;
        this.isShowVideo = false;
        this.recipeForm.controls.video_id.setValue(null);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    checkRichText() {
        (this.recipeForm.get('steps') as FormArray).controls.forEach((item) => {
            item.get('description').setValue(
                insertAltAttr(item.get('description').value, ` ${this.recipeForm.get('name').value} step image`),
            );
        });
    }
}
