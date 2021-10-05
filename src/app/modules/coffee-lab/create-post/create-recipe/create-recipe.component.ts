import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_LANGUAGES } from '@constants';
import { AuthService, CoffeeLabService, CommonService, GlobalsService, GoogletranslateService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { take, takeUntil } from 'rxjs/operators';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmComponent, CropperDialogComponent } from '@app/shared';
import { CroppedImage } from '@models';
import { editorRequired, insertAltAttr, maxWordCountValidator } from '@utils';

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
    isUploadingImage = false;
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
    languageList: any[] = APP_LANGUAGES;
    images = [];
    maxVideoSize = 15;
    destroy$: Subject<boolean> = new Subject<boolean>();
    clicked = false;
    categoryList: any[] = [];
    categoryValue: any[] = [];
    status: string;
    translatedCategory: any[] = [];
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
    ];

    constructor(
        private authService: AuthService,
        private coffeeLabService: CoffeeLabService,
        private commonService: CommonService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private globals: GlobalsService,
        private globalsService: GlobalsService,
        private gtrans: GoogletranslateService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private toaster: ToastrService,
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
                this.status = params.status;
                this.recipeForm.get('language').setValue(this.coffeeLabService.currentForumLanguage);
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
        combineLatest([
            this.coffeeLabService.getForumDetails('recipe', id),
            this.coffeeLabService.getCategory(this.coffeeLabService.currentForumLanguage),
        ])
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
                                    allow_translation: res.result.allow_translation,
                                };
                                this.patchRecipeForm(translatedData);
                            });
                    } else {
                        this.patchRecipeForm(res.result);
                    }
                    this.categoryValue = res.result.categories;
                    if (this.categoryValue && this.categoryValue?.length > 0) {
                        if (this.isTranslate) {
                            this.getTranslateCategory();
                        }
                    }
                } else {
                    this.toaster.error('Error while get recipe');
                    this.location.back();
                }
            });
    }

    getTranslateCategory() {
        this.translatedCategory = [];
        this.coffeeLabService.getCategory(this.translateLang).subscribe((category) => {
            if (category.success) {
                category.result?.forEach((item) => {
                    this.categoryValue?.forEach((element) => {
                        if (item.parent_id === element.parent_id) {
                            this.translatedCategory.push(item);
                        }
                    });
                });
            }
        });
    }

    getCategory() {
        this.categoryList = [];
        this.coffeeLabService.getCategory(this.recipeForm.get('language').value).subscribe((category) => {
            if (category.success) {
                this.categoryList = category.result;
                if (this.categoryValue) {
                    const changedCategoryValue = [];
                    this.categoryList.forEach((item) => {
                        this.categoryValue.forEach((element) => {
                            if (item.parent_id === element.parent_id) {
                                changedCategoryValue.push(item);
                            }
                        });
                    });
                    this.categoryValue = changedCategoryValue;
                }
            }
        });
    }

    copyCoverImage(copy?: string) {
        this.coffeeLabService.copyFile(this.recipe.cover_image_id).subscribe((res: any) => {
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
            name: ['', Validators.compose([Validators.required, Validators.maxLength(120)])],
            expertise: ['', Validators.compose([Validators.required])],
            serves: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$|^[0-9]*[-][0-9]*$')])],
            equipment_name: ['', Validators.compose([Validators.required])],
            coffee_ratio: [''],
            water_ratio: [''],
            brew_ratio: ['', Validators.compose([Validators.required, Validators.pattern('[0-9][:][0-9]$')])],
            preparation_method: ['steps', Validators.compose([Validators.required])],
            cover_image_id: [null, Validators.compose([Validators.required])],
            description: ['', Validators.compose([maxWordCountValidator(60), Validators.required])],
            ingredients: this.fb.array([this.createCoffeeIngredient()]),
            steps: this.fb.array([this.createCoffeeStep()]),
            allow_translation: [true],
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
            brew_ratio: value.coffee_ratio + ':' + value.water_ratio,
            preparation_method: value.preparation_method,
            description: value.description,
            language: value.lang_code,
            steps: value.steps ? value.steps : [],
            cover_image_id: value.cover_image_id,
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
        if (this.isTranslate) {
            this.recipeForm.get('equipment_name').disable();
            this.recipeForm.get('serves').disable();
            this.recipeForm.get('brew_ratio').disable();
        }
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
                }
            } else {
                this.toaster.error('Error while uploading the file');
            }
        });
    }

    createCoffeeStep() {
        return this.fb.group({
            description: ['', [editorRequired(this.commonService)]],
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
        this.recipeForm
            .get('coffee_ratio')
            .setValue(parseInt(this.recipeForm.get('brew_ratio').value.split(':')[0], 10));
        this.recipeForm
            .get('water_ratio')
            .setValue(parseInt(this.recipeForm.get('brew_ratio').value.split(':')[1], 10));

        if (status === 'draft') {
            if (!this.recipeForm.value.name) {
                this.toaster.error('Please fill recipe name');
                return;
            } else {
                this.recipeForm.controls.publish.setValue(false);
                this.openCconfirmDialog(status);
            }
        } else {
            if (this.isTranslate) {
                this.recipeForm.controls.language.setValidators(Validators.required);
                this.recipeForm.controls.language.updateValueAndValidity();
            }
            if (this.recipeForm.invalid) {
                this.recipeForm.markAllAsTouched();
                this.toaster.error('Please fill all data');
                return;
            } else {
                this.openCconfirmDialog(status);
            }
        }
    }

    openCconfirmDialog(status: string) {
        const confirmText = status === 'draft' ? 'save this recipe in draft?' : 'publish this recipe?';
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    title: this.globalsService.languageJson?.are_you_sure_text + ' you want to ' + confirmText,
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.handlePost();
                } else {
                    this.isPosting = false;
                }
            });
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
        if (this.categoryValue) {
            data.categories = this.categoryValue?.map((item) => item.id);
        }
        this.coffeeLabService.updateForum('recipe', this.recipeId, data).subscribe((res: any) => {
            this.isPosting = false;
            if (res.success) {
                if (!data.publish) {
                    this.toaster.success('Your changes have been successfully updated to the draft.');
                } else if (this.status === 'draft') {
                    this.toaster.success('Your recipe have been posted successfully.');
                } else {
                    this.toaster.success('You have updated an recipe successfully.');
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
        if (this.translatedCategory && this.translatedCategory.length > 0) {
            data.categories = this.translatedCategory?.map((item) => item.id);
        }
        this.coffeeLabService.translateForum('recipe', this.originRecipeId, data).subscribe((res: any) => {
            if (res.success) {
                if (data.publish) {
                    this.toaster.success('You have translated a coffee recipe successfully.');
                } else {
                    this.toaster.success('Your translated recipe successfully saved in draft.');
                }
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
        data.inline_images = [];
        if (this.categoryValue) {
            data.categories = this.categoryValue?.map((item) => item.id);
        }
        this.coffeeLabService.postCoffeeRecipe(data).subscribe((res: any) => {
            if (res.success) {
                if (data.publish) {
                    this.toaster.success('Your recipe have been posted successfully.');
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
        this.getCategory();
    }

    onDeleteDraft(): void {
        this.dialogService
            .open(ConfirmComponent, {
                data: {
                    type: 'delete',
                    desp: this.globalsService.languageJson?.delete_from_coffee_lab,
                },
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.coffeeLabService.deleteForumById('recipe', this.draftRecipeId).subscribe((res: any) => {
                        if (res.success) {
                            this.toaster.success(`Draft recipe deleted successfully`);
                            this.coffeeLabService.forumDeleteEvent.emit();
                            this.router.navigateByUrl('/coffee-lab/overview/coffee-recipes');
                        } else {
                            this.toaster.error(`Failed to delete a forum.`);
                        }
                    });
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
