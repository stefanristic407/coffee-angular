import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_LANGUAGES } from '@constants';
import { AuthService, CoffeeLabService, GlobalsService, GoogletranslateService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { take, takeUntil } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent, CropperDialogComponent } from '@app/shared';
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
    @Input() translateLang: string;
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
    brewRatio: string;
    isbrewRatio = false;
    recipe: any;
    copiedCoverImageId: number;
    copiedCoverImageUrl: string;
    copiedStepImageId: number;
    copiedStepImageUrl: string;
    copiedVideoId: number;
    copiedVideoUrl: string;
    languageList: any[] = APP_LANGUAGES;
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
            label: 'cups',
            value: 'cups',
        },
        {
            label: 'glasses',
            value: 'glasses',
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
            label: 'ltr',
            value: 'ltr',
        },
        {
            label: 'lbs',
            value: 'lbs',
        },
        {
            label: 'ml',
            value: 'ml',
        },
        {
            label: 'ounces',
            value: 'ounces',
        },
        {
            label: 'piece',
            value: 'piece',
        },
        {
            label: 'tbsp',
            value: 'tbsp',
        },
        {
            label: 'tsp',
            value: 'tsp',
        },
        {
            label: 'units',
            value: 'units',
        },
        {
            label: 'N/A',
            value: '',
        },
    ];

    brewingMethodArray = [
        { label: 'Pour Over', value: 'pour-over' },
        { label: 'Espresso', value: 'espresso' },
        { label: 'Coffeemaker', value: 'coffee-maker' },
        { label: 'French Press', value: 'french-press' },
        { label: 'AeroPress', value: 'aeropress' },
        { label: 'Moka Pot', value: 'mocha-pot' },
        { label: 'Chemix', value: 'chemex' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex' },
        // { label: 'Select or add an equipment', value: '' },
    ];
    images = [];
    maxVideoSize = 15;
    destroy$: Subject<boolean> = new Subject<boolean>();
    clicked = false;
    categoryList: any;
    categoryValue: any;

    constructor(
        private authService: AuthService,
        private fb: FormBuilder,
        private toaster: ToastrService,
        private coffeeLabService: CoffeeLabService,
        private router: Router,
        private route: ActivatedRoute,
        private globals: GlobalsService,
        private location: Location,
        private dialogService: DialogService,
        private gtrans: GoogletranslateService,
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
                this.coffeeLabService.draftPost.pipe(takeUntil(this.destroy$)).subscribe((res) => {
                    if (res && this.isTranslate) {
                        this.onSave('draft');
                    }
                });
                this.coffeeLabService.copyCoverImage.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
                    this.copyFile(data);
                });
                if (this.recipeId) {
                    this.getCompleteData(this.recipeId);
                } else {
                    this.getCategory();
                }
                if (this.draftRecipeId) {
                    this.getCompleteData(this.draftRecipeId);
                } else if (this.originRecipeId) {
                    this.setAppLanguages();
                    this.getCompleteData(this.originRecipeId);
                }
            }
        });
        this.recipeForm.get('language').setValue(this.coffeeLabService.currentForumLanguage);
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

    getCompleteData(id: number) {
        console.log('completed called');
        combineLatest([this.coffeeLabService.getForumDetails('recipe', id), this.coffeeLabService.getCategory()])
            .pipe(take(1))
            .subscribe(([res, category]: [any, any]) => {
                if (category.success) {
                    this.categoryList = category.result;
                }
                if (res.success) {
                    this.recipe = res.result;
                    this.images = res.result.inline_images ? res.result.inline_images : [];
                    this.coverImageUrl = res.result.cover_image_url;
                    if (this.isTranslate) {
                        // Put all data im one array which we have to translate from response
                        if (this.recipe.user_id !== this.authService.currentUser.id) {
                            this.copyCoverImage('noCopy');
                        }
                        const translateData = [
                            res.result.name,
                            res.result.expertise,
                            res.result.equipment_name,
                            res.result.description,
                        ];
                        res.result.steps.forEach((element) => {
                            translateData.push(element.description);
                        });
                        res.result.ingredients.forEach((i) => {
                            translateData.push(i.name);
                        });
                        this.gtrans
                            .translateCoffeeLab(translateData, this.translateLang)
                            .subscribe((translatedOutput: any) => {
                                const steps = [];
                                const ingredients = [];
                                translatedOutput.forEach((item, index) => {
                                    if (index > 3 && index <= res.result.steps.length + 3) {
                                        steps.push(item.translatedText);
                                    }
                                    if (
                                        index > res.result.steps.length + 3 &&
                                        index <= res.result.ingredients.length + (res.result.steps.length + 3)
                                    ) {
                                        ingredients.push(item.translatedText);
                                    }
                                });
                                const translatedSteps = [];
                                res.result.steps.forEach((step, index) => {
                                    translatedSteps.push({
                                        image_id: step?.image_id,
                                        coverImageUrl: step?.image_url,
                                        description: steps[index],
                                    });
                                });
                                const translatedingredient = [];
                                res.result.ingredients.forEach((ing, index) => {
                                    translatedingredient.push({
                                        name: ingredients[index],
                                        quantity: ing.quantity,
                                        quantity_unit: ing.quantity_unit,
                                    });
                                });
                                const translatedData = {
                                    name: translatedOutput[0].translatedText,
                                    expertise: translatedOutput[1].translatedText,
                                    serves: res.result.serves,
                                    equipment_name: translatedOutput[2].translatedText,
                                    coffee_ratio: res.result.coffee_ratio,
                                    water_ratio: res.result.water_ratio,
                                    preparation_method: res.result.preparation_method,
                                    description: translatedOutput[3].translatedText,
                                    lang_code: this.translateLang,
                                    steps: translatedSteps ? translatedSteps : [],
                                    ingredients: translatedingredient ? translatedingredient : [],
                                    cover_image_id: res.result.cover_image_id,
                                    video_id: res.result.video_id,
                                    allow_translation: res.result.allow_translation,
                                };
                                this.patchRecipeForm(translatedData);
                            });
                    } else {
                        this.patchRecipeForm(res.result);
                    }
                    if (res.result.video_url) {
                        this.isShowVideo = true;
                        this.videoUrl = res.result.video_url;
                    }
                    this.categoryValue = res.result.categories;
                } else {
                    this.toaster.error('Error while get recipe');
                    this.location.back();
                }
            });
    }

    getCategory() {
        console.log('cat called');
        this.coffeeLabService.getCategory().subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
            }
        });
    }

    copyCoverImage(copy?: string) {
        // if (this.isCopying) {
        //     return;
        // }
        // this.isCopying = true;
        this.coffeeLabService.copyFile(this.recipe.cover_image_id).subscribe((res: any) => {
            // this.isCopying = false;
            console.log(res);
            if (res.success) {
                this.copiedCoverImageId = res.result.id;
                this.copiedCoverImageUrl = res.result.url;
                this.recipeForm.get('cover_image_id').setValue(this.copiedCoverImageId);
                if (!copy) {
                    this.toaster.success('Copied cover image successfully.');
                }
            } else {
                this.toaster.error('Failed to copy cover image.');
            }
        });
    }

    createRecipeForm(): void {
        this.recipeForm = this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            expertise: ['', Validators.compose([Validators.required])],
            serves: ['', Validators.compose([Validators.required])],
            equipment_name: ['', Validators.compose([Validators.required])],
            coffee_ratio: [''],
            water_ratio: [''],
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

    patchRecipeForm(value: any): void {
        this.recipeForm.patchValue({
            name: value.name,
            expertise: value.expertise,
            serves: value.serves,
            equipment_name: value.equipment_name,
            coffee_ratio: value.coffee_ratio,
            water_ratio: value.water_ratio,
            preparation_method: value.preparation_method,
            description: value.description,
            language: value.lang_code,
            steps: value.steps ? value.steps : [],
            cover_image_id: value.cover_image_id,
            video_id: value.video_id,
            allow_translation: value.allow_translation,
        });
        if (value?.ingredients && value?.ingredients.length > 0) {
            let i = 0;
            for (const ing of value?.ingredients) {
                const ingredient = {
                    name: ing.name,
                    quantity: ing.quantity,
                    quantity_unit: ing.quantity_unit,
                };
                const controlArray = this.recipeForm.controls?.ingredients as FormArray;
                controlArray.controls[i]?.patchValue(ingredient);
                if (i < value.ingredients.length - 1) {
                    controlArray.push(this.createCoffeeIngredient());
                }
                i++;
            }
        }
        if (value?.steps && value?.steps.length > 0) {
            let j = 0;
            for (const ing of value?.steps) {
                const ingredient = {
                    image_id: ing?.image_id,
                    coverImageUrl: ing?.image_url,
                    description: ing.description,
                };
                const controlArray = this.recipeForm.controls?.steps as FormArray;
                controlArray.controls[j]?.patchValue(ingredient);
                if (j < value.steps.length - 1) {
                    controlArray.push(this.createCoffeeStep());
                }
                j++;
            }
        }
        this.brewRatio = this.recipeForm.get('coffee_ratio').value + ':' + this.recipeForm.get('water_ratio').value;
        if (this.isTranslate) {
            this.recipeForm.get('equipment_name').disable();
            this.recipeForm.get('serves').disable();
        }
    }

    deleteCoverImage() {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.globals.languageJson?.are_you_sure_delete + ' cover image?',
                    yesButton: 'Remove',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.coverImageUrl = null;
                    this.recipeForm.controls.cover_image_id.setValue(null);
                }
            });
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
                        maintainAspectRatio: type !== RecipeFileType.StepImage,
                        resizeToWidth: 672,
                    },
                })
                .onClose.subscribe((data: CroppedImage) => {
                    if (data.status) {
                        this.uploadFile(data.croppedImgFile, index, type, event.target.files[0]?.name);
                    }
                });
        }
    }

    uploadFile(file: any, index: number, type, fileName?: string): void {
        const maximumFileSize = type === RecipeFileType.Video ? this.maxVideoSize * 1024 : 2 * 1024;
        const fileSize = Math.round(file.size / 1024);
        // Check max file size
        if (fileSize >= maximumFileSize) {
            this.toaster.error(`Maximum file size is ${maximumFileSize / 1024}mb`);
            return;
        }
        this.coffeeLabService.uploadFile(file, 'recipe-post').subscribe((res: any) => {
            if (res.success === true) {
                this.toaster.success('The file ' + fileName + ' uploaded successfully');
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
        if (status !== 'draft' && !this.brewRatio) {
            this.isbrewRatio = true;
        }
        if (this.brewRatio) {
            this.recipeForm.get('coffee_ratio').setValue(parseInt(this.brewRatio.split(':')[0], 10));
            this.recipeForm.get('water_ratio').setValue(parseInt(this.brewRatio.split(':')[1], 10));
        }
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
                // this.recipeForm.get('language').setValue(this.translateLang);
            }
            if (this.recipeForm.invalid) {
                this.recipeForm.markAllAsTouched();
                this.toaster.error('Please fill all data');
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
        // data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        // data.inline_images = data.inline_images.filter((i) => i !== undefined);
        data.categories = this.categoryValue?.map((item) => item.id);
        this.coffeeLabService.updateForum('recipe', this.recipeId, data).subscribe((res: any) => {
            this.isPosting = false;
            if (res.success) {
                if (data.publish) {
                    this.toaster.success('You have updated an recipe successfully.');
                } else {
                    this.toaster.success('Your changes have been successfully updated to the draft.');
                }
                this.router.navigate(['/coffee-lab/overview/coffee-recipes']);
            } else {
                this.isPosting = false;
                this.toaster.error('Failed to update recipe.');
            }
        });
    }

    translateRecipe(data: any): void {
        data.equipment_name = this.recipe.equipment_name;
        data.serves = this.recipe.serves;
        data.categories = this.categoryValue?.map((item) => item.id);
        // data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        // data.inline_images = data.inline_images.filter((i) => i !== undefined);
        this.coffeeLabService.translateForum('recipe', this.originRecipeId, data).subscribe((res: any) => {
            if (res.success) {
                this.toaster.success('You have translated a coffee recipe successfully.');
                this.router.navigate([`/coffee-lab/recipes/${this.recipe.slug}`]);
            } else {
                this.isPosting = false;
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
        // data.inline_images = [].concat(this.imageIdList, ...this.imageIdListStep);
        // data.steps.map((item: any, index: number) => {
        //     item.image_id = data.inline_images[index];
        //     return item;
        // });
        data.inline_images = [];
        data.categories = this.categoryValue?.map((item) => item.id);
        this.coffeeLabService.postCoffeeRecipe(data).subscribe((res: any) => {
            if (res.success) {
                if (data.publish) {
                    this.toaster.success('Your recipe have been posted successfully');
                } else if (!data.publish && this.isTranslate) {
                    this.toaster.success('Your translated recipe successfully saved in draft.');
                } else {
                    this.toaster.success('Your recipe is successfully saved in draft.');
                }
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

    resetCategory() {
        this.categoryValue = null;
    }

    changeLanguage(value) {
        this.coffeeLabService.forumLanguage.next(this.recipeForm.get('language').value);
    }
}
