import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyableComponent } from '@base-components';
import { APP_LANGUAGES } from '@constants';
import { CroppedImage } from '@models';
import { AuthService, CoffeeLabService, CommonService, GlobalsService, GoogletranslateService } from '@services';
import { ConfirmComponent, CropperDialogComponent } from '@shared';
import { editorRequired, insertAltAttr, maxWordCountValidator } from '@utils';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'primeng/dynamicdialog';
import { combineLatest } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

export enum RecipeFileType {
    CoverImage = 'CoverImage',
    StepImage = 'StepImage',
}

@Component({
    selector: 'app-create-recipe',
    templateUrl: './create-recipe.component.html',
    styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent extends DestroyableComponent implements OnInit {
    readonly RecipeFileType = RecipeFileType;
    @Input() isTranslate;
    @Input() saveOriginalPost;
    @Input() translateLang: string;
    isPosting = false;
    applicationLanguages = [];
    coverImageUrl: any;
    isUploadingImage = false;
    imageIdList = [];
    introImageIdList = [];
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
    clicked = false;
    categoryList: any[] = [];
    categoryValue: any[] = [];
    status: string;
    translatedCategory: any[] = [];
    expertiseArray: any[] = [];
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
    brewingMethodArray = [];
    orginalBrewingMethodArray = [
        { label: 'Pour Over', value: 'pour-over', langCode: 'en' },
        { label: 'Espresso', value: 'espresso', langCode: 'en' },
        { label: 'Coffeemaker', value: 'coffee-maker', langCode: 'en' },
        { label: 'French Press', value: 'french-press', langCode: 'en' },
        { label: 'AeroPress', value: 'aeropress', langCode: 'en' },
        { label: 'Moka Pot', value: 'mocha-pot', langCode: 'en' },
        { label: 'Chemix', value: 'chemex', langCode: 'en' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex', langCode: 'en' },
        { label: 'Vierta sobre', value: 'Vierta sobre', langCode: 'es' },
        { label: 'Espresso', value: 'Espresso', langCode: 'es' },
        { label: 'Cafetera', value: 'Cafetera', langCode: 'es' },
        { label: 'Prensa francesa', value: 'Prensa francesa', langCode: 'es' },
        { label: 'AeroPress', value: 'Aeropress', langCode: 'es' },
        { label: 'Olla Moka', value: 'Olla Moka', langCode: 'es' },
        { label: 'Chemix', value: 'Chemix', langCode: 'es' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex', langCode: 'es' },
        { label: 'Häll över', value: 'Häll över', langCode: 'sv' },
        { label: 'Kaffebryggare', value: 'Kaffebryggare', langCode: 'sv' },
        { label: 'Cafetera', value: 'Cafetera', langCode: 'sv' },
        { label: 'Fransk press', value: 'Fransk press', langCode: 'sv' },
        { label: 'AeroPress', value: 'Aeropress', langCode: 'sv' },
        { label: 'Moka Pot', value: 'Moka Pot', langCode: 'sv' },
        { label: 'Chemix', value: 'Chemix', langCode: 'sv' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex', langCode: 'sv' },
        { label: 'Despeje sobre', value: 'Despeje sobre', langCode: 'pt' },
        { label: 'Expresso', value: 'Expresso', langCode: 'pt' },
        { label: 'Máquina de café', value: 'Máquina de café', langCode: 'pt' },
        { label: 'Imprensa francesa', value: 'Imprensa francesa', langCode: 'pt' },
        { label: 'AeroPress', value: 'Aeropress', langCode: 'pt' },
        { label: 'Olla Moka', value: 'Olla Moka', langCode: 'pt' },
        { label: 'Chemix', value: 'Chemix', langCode: 'pt' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex', langCode: 'pt' },
        { label: 'Hælde over', value: 'Hælde over', langCode: 'da' },
        { label: 'Espresso', value: 'Espresso', langCode: 'da' },
        { label: 'Kaffemaskine', value: 'Kaffemaskine', langCode: 'da' },
        { label: 'French Press', value: 'Fransk Presse', langCode: 'da' },
        { label: 'AeroPress', value: 'AeroPress', langCode: 'da' },
        { label: 'Moka Pot', value: 'Moka Pot', langCode: 'da' },
        { label: 'Chemix', value: 'Chemix', langCode: 'da' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex', langCode: 'da' },
        { label: 'Verser', value: 'Verser', langCode: 'fr' },
        { label: 'Expresso', value: 'Expresso', langCode: 'fr' },
        { label: 'Machine à café', value: 'Machine à café', langCode: 'fr' },
        { label: 'Presse française', value: 'Presse française', langCode: 'fr' },
        { label: 'AéroPresse', value: 'AéroPresse', langCode: 'fr' },
        { label: 'Pot à Moka', value: 'Pot à Moka', langCode: 'fr' },
        { label: 'Chemix', value: 'chemex', langCode: 'fr' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex', langCode: 'fr' },
        { label: 'Übergießen', value: 'Übergießen', langCode: 'de' },
        { label: 'Espresso', value: 'Espresso', langCode: 'de' },
        { label: 'Kaffeemaschine', value: 'Kaffeemaschine', langCode: 'de' },
        { label: 'Französische Presse', value: 'Französische Presse', langCode: 'de' },
        { label: 'AeroPress', value: 'aeropress', langCode: 'de' },
        { label: 'Moka-Topf', value: 'Moka-Topf', langCode: 'de' },
        { label: 'Chemix', value: 'chemex', langCode: 'de' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex', langCode: 'de' },
        { label: 'Overgieten', value: 'Overgieten', langCode: 'nl' },
        { label: 'Espresso', value: 'Espresso', langCode: 'nl' },
        { label: 'Koffiezetapparaat', value: 'Koffiezetapparaat', langCode: 'nl' },
        { label: 'French Press', value: 'French Press', langCode: 'nl' },
        { label: 'AeroPress', value: 'aeropress', langCode: 'nl' },
        { label: 'Moka Pot', value: 'mocha-pot', langCode: 'nl' },
        { label: 'Chemix', value: 'chemex', langCode: 'nl' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex', langCode: 'nl' },
        { label: 'Rovesciare', value: 'Rovesciare', langCode: 'it' },
        { label: 'Caffè espresso', value: 'Caffè espresso', langCode: 'it' },
        { label: 'Caffettiera', value: 'Caffettiera', langCode: 'it' },
        { label: 'La stampa francese', value: 'La stampa francese', langCode: 'it' },
        { label: 'AeroPress', value: 'aeropress', langCode: 'it' },
        { label: 'Caffettiera moka', value: 'Caffettiera moka', langCode: 'it' },
        { label: 'Chemix', value: 'chemex', langCode: 'it' },
        { label: 'Presskanna eller Chemex', value: 'Presskanna eller Chemex', langCode: 'it' },
    ];
    @ViewChild('bannerFileInput', { static: false }) bannerFileInput;

    constructor(
        private authService: AuthService,
        private coffeeLabService: CoffeeLabService,
        private commonService: CommonService,
        private dialogService: DialogService,
        private fb: FormBuilder,
        private globalsService: GlobalsService,
        private gtrans: GoogletranslateService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private toaster: ToastrService,
    ) {
        super();
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
                this.brewingMethodArray = this.orginalBrewingMethodArray.filter(
                    (item) => item.langCode === this.recipeForm.get('language').value,
                );
                this.coffeeLabService.originalPost.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res) => {
                    if (res && this.isTranslate) {
                        this.onSave();
                    }
                });
                this.coffeeLabService.draftPost.pipe(takeUntil(this.unsubscribeAll$)).subscribe((res) => {
                    if (res && this.isTranslate) {
                        this.onSave('draft');
                    }
                });
                this.coffeeLabService.copyCoverImage.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data: any) => {
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
                this.setExpertiseArray();
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
                    if (this.isTranslate && !this.draftRecipeId) {
                        // Put all data im one array which we have to translate from response
                        if (
                            this.recipe.user_id !== this.authService.currentUser.id ||
                            this.recipe.organisation_type !== this.authService.orgType
                        ) {
                            this.copyCoverImage('noCopy');
                        }

                        const translateData = [
                            res.result.name,
                            res.result.expertise,
                            res.result.equipment_name,
                            res.result.description,
                            res.result.introduction,
                        ];
                        res.result.steps.forEach((element) => {
                            translateData.push(element.description);
                        });
                        res.result.ingredients.forEach((i) => {
                            translateData.push(i.name);
                        });
                        this.brewingMethodArray = this.orginalBrewingMethodArray.filter(
                            (item) => item.langCode === this.translateLang,
                        );
                        this.gtrans
                            .translateCoffeeLab(translateData, this.translateLang)
                            .subscribe((translatedOutput: any) => {
                                const steps = [];
                                const ingredients = [];
                                translatedOutput.forEach((item, index) => {
                                    if (index > 4 && index <= res.result.steps.length + 4) {
                                        steps.push(item.translatedText);
                                    }
                                    if (
                                        index > res.result.steps.length + 4 &&
                                        index <= res.result.ingredients.length + (res.result.steps.length + 4)
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
                                    introduction: translatedOutput[4].translatedText,
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
            brew_ratio: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*[:][0-9]*$')])],
            preparation_method: ['steps', Validators.compose([Validators.required])],
            cover_image_id: [null, Validators.compose([Validators.required])],
            description: ['', Validators.compose([maxWordCountValidator(60), Validators.required])],
            introduction: [''],
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
            introduction: value.introduction,
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
                    this.ingredients = controlArray;
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
                    this.steps = controlArray;
                }
                j++;
            }
        }
        if (this.isTranslate) {
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
        if (
            event.target.files[0].type === 'image/png' ||
            event.target.files[0].type === 'image/jpg' ||
            event.target.files[0].type === 'image/jpeg'
        ) {
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
                    if (data?.status) {
                        this.uploadFile(data.croppedImgFile, index, type, event.target.files[0]?.name);
                    }
                    this.bannerFileInput.nativeElement.value = '';
                });
        } else {
            this.toaster.error('Please upload only image files with extension png,jpg,jpeg');
        }
    }

    uploadFile(file: any, index: number, type, fileName?: string): void {
        const maximumFileSize = 2 * 1024;
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
                this.handlePost();
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
            if (this.draftRecipeId) {
                this.updateRecipe(this.recipeForm.value);
            } else {
                this.translateRecipe(this.recipeForm.value);
            }
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
        let recipeId = this.recipeId;
        if (this.isTranslate) {
            data.equipment_name = this.recipe.equipment_name;
            data.serves = this.recipe.serves;
            if (this.translatedCategory && this.translatedCategory.length > 0) {
                data.categories = this.translatedCategory?.map((item) => item.id);
            }
            if (this.draftRecipeId) {
                recipeId = this.draftRecipeId;
            }
        }
        this.coffeeLabService.updateForum('recipe', recipeId, data).subscribe((res: any) => {
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
        this.coffeeLabService.updateLang(this.recipeForm.get('language').value).then(() => {
            this.brewingMethodArray = this.orginalBrewingMethodArray.filter(
                (item) => item.langCode === this.recipeForm.get('language').value,
            );
            this.setExpertiseArray();
            this.getCategory();
        });
    }

    setExpertiseArray() {
        if (this.coffeeLabService.currentForumLanguage === 'en') {
            this.expertiseArray = [
                {
                    label: 'Easy',
                    value: 'Easy',
                },
                {
                    label: 'Intermediate',
                    value: 'Intermediate',
                },
                {
                    label: 'Hard',
                    value: 'Hard',
                },
            ];
        } else if (this.coffeeLabService.currentForumLanguage === 'sv') {
            this.expertiseArray = [
                {
                    label: 'Lätt',
                    value: 'lätt',
                },
                {
                    label: 'Mellanliggande',
                    value: 'Mellanliggande',
                },
                {
                    label: 'Hård',
                    value: 'Hård',
                },
            ];
        } else if (this.coffeeLabService.currentForumLanguage === 'pt') {
            this.expertiseArray = [
                {
                    label: 'Fácil',
                    value: 'Fácil',
                },
                {
                    label: 'Intermediário',
                    value: 'Intermediário',
                },
                {
                    label: 'Duro',
                    value: 'Duro',
                },
            ];
        } else if (this.coffeeLabService.currentForumLanguage === 'es') {
            this.expertiseArray = [
                {
                    label: 'Fácil',
                    value: 'Fácil',
                },
                {
                    label: 'Intermedio',
                    value: 'Intermedio',
                },
                {
                    label: 'Duro',
                    value: 'Duro',
                },
            ];
        }
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
}
