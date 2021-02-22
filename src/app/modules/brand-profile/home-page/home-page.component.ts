import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { maxWordCountValidator, fileCountValidator } from '@services';
import { FormService } from '@services';
import { GlobalsService } from '@services';
import { RoasterserviceService } from '@services';
import { UserserviceService } from '@services';
import { ConfirmComponent } from '@shared';
import * as _ from 'underscore';
@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    providers: [DialogService],
})
export class HomePageComponent implements OnInit {
    loaded = false;
    breadItems: any[];
    certificates: any[];
    roasterId: string;
    roasterSlug: string;
    featuredProducts: any[];
    infoForm: FormGroup;
    certIndex = null;
    certMenuItems = [
        {
            label: 'View',
            command: () => {
                window.open(this.certificates[this.certIndex].public_url);
            },
        },
        {
            label: 'Delete',
            command: () => {
                this.deleteCertificate(this.certificates[this.certIndex]);
            },
        },
    ];

    constructor(
        public dialogSrv: DialogService,
        private fb: FormBuilder,
        private formSrv: FormService,
        public globals: GlobalsService,
        private toastrService: ToastrService,
        public cookieService: CookieService,
        public userService: UserserviceService,
        public route: Router,
        public roasterService: RoasterserviceService,
    ) {
        this.roasterId = this.cookieService.get('roaster_id');
        this.roasterSlug = this.cookieService.get('roasterSlug');
    }

    ngOnInit(): void {
        this.breadItems = [
            { label: this.globals.languageJson?.home, routerLink: '/' },
            { label: this.globals.languageJson?.brand_profile, routerLink: '/brand-profile' },
            { label: this.globals.languageJson?.home_page },
        ];
        this.infoForm = this.fb.group({
            banner_file: [null, Validators.compose([Validators.required])],
            banner_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            intro_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            short_description: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
            wizard_title: ['', Validators.compose([Validators.required, maxWordCountValidator(10)])],
            wizard_sub_heading: ['', Validators.compose([maxWordCountValidator(15)])],
            wizard_image: [null, Validators.compose([Validators.required])],
            featured_products_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            traceability_story_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            traceability_story_sub_heading: ['', Validators.compose([maxWordCountValidator(30)])],
            traceability_story_file_1: [null, Validators.compose([Validators.required])],
            sustainability_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            sustainability_sub_heading: ['', Validators.compose([maxWordCountValidator(25)])],
            sustainability_file_1: [null, Validators.compose([Validators.required])],
            roastery_images_title: ['', Validators.compose([Validators.required, maxWordCountValidator(15)])],
            roastery_images: [null, Validators.compose([fileCountValidator(2)])],
        });
        this.getHomeDetails();
        this.getFeaturedProducts();
        this.getCertificates();
        this.loaded = true;
    }

    savePageData() {
        if (this.infoForm.valid) {
            const postData = {
                ...this.infoForm.value,
                banner_file: this.infoForm.value.banner_file.id,
                wizard_image: this.infoForm.value.wizard_image.id,
                traceability_story_file_1: this.infoForm.value.traceability_story_file_1.id,
                sustainability_file_1: this.infoForm.value.sustainability_file_1.id,
                roastery_image_1: this.infoForm.value.roastery_images[0].id,
                roastery_image_2: this.infoForm.value.roastery_images[1].id,
            };
            delete postData.roastery_images;
            this.userService.updateHomeDetails(this.roasterId, postData, 'home-page').subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Home page Details updated successfully');
                    this.route.navigate(['/brand-profile']);
                } else {
                    this.toastrService.error('Error while updating details');
                }
            });
        } else {
            this.formSrv.markGroupDirty(this.infoForm);
        }
    }

    getHomeDetails() {
        this.userService.getPageDetails(this.roasterId, 'home-page').subscribe((res: any) => {
            if (res.success) {
                this.infoForm.patchValue(res.result);
                if (res.result.banner_file) {
                    this.infoForm.controls.banner_file.setValue({
                        id: res.result.banner_file,
                        url: res.result.banner_file_url,
                    });
                }
                if (res.result.wizard_image) {
                    this.infoForm.controls.wizard_image.setValue({
                        id: res.result.wizard_image,
                        url: res.result.wizard_image_url,
                    });
                }
                if (res.result.traceability_story_file_1) {
                    this.infoForm.controls.traceability_story_file_1.setValue({
                        id: res.result.traceability_story_file_1,
                        url: res.result.traceability_story_file_1_url,
                    });
                }
                if (res.result.sustainability_file_1) {
                    this.infoForm.controls.sustainability_file_1.setValue({
                        id: res.result.sustainability_file_1,
                        url: res.result.sustainability_file_1_url,
                    });
                }
                const rosteryImages: any[] = [];
                if (res.result.roastery_image_1) {
                    rosteryImages.push({
                        id: res.result.roastery_image_1,
                        url: res.result.roastery_image_1_url,
                    });
                }
                if (res.result.roastery_image_2) {
                    rosteryImages.push({
                        id: res.result.roastery_image_2,
                        url: res.result.roastery_image_2_url,
                    });
                }
                this.infoForm.controls.roastery_images.setValue(rosteryImages);

                // this.banner_image_name = await this.userService
                //     .getFileDetails(this.roaster_id, this.banner_id)
                //     .pipe(map((response) => response['name']))
                //     .toPromise();
            }
        });
    }

    getFeaturedProducts() {
        this.roasterService.getFeaturedProducts(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.featuredProducts = res.result;
            }
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousIndex !== event.currentIndex) {
            moveItemInArray(this.featuredProducts, event.previousIndex, event.currentIndex);
            this.sortCertificates();
        }
    }

    removeFeaturedProduct(idx) {
        this.featuredProducts.splice(idx, 1);
        const sortPriorities = _.chain(this.featuredProducts)
            .map((item, index) => {
                return { product_id: item.id, sort_priority: index + 1 };
            })
            .value();
        this.roasterService
            .updateFeatured(this.roasterId, { featured_products: sortPriorities })
            .subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Featured products updated successfully');
                    this.getFeaturedProducts();
                } else {
                    this.toastrService.error('Error while updating featured products');
                }
            });
    }

    getCertificates() {
        this.userService.getCompanyCertificates(this.roasterId).subscribe((res: any) => {
            if (res.success) {
                this.certificates = res.result;
            }
        });
    }

    deleteCertificate(certificateId) {
        this.dialogSrv
            .open(ConfirmComponent, {
                data: {
                    title: 'Confirm delete',
                    desp: 'Are you sure want to delete certificate',
                },
                showHeader: false,
                styleClass: 'confirm-dialog',
            })
            .onClose.subscribe((action: any) => {
                if (action === 'yes') {
                    this.roasterService.deleteCertificate(this.roasterId, certificateId).subscribe((res: any) => {
                        if (res.success) {
                            this.toastrService.success('Certificate deleted successfully');
                            this.getCertificates();
                        } else {
                            this.toastrService.error('Error while deleting certificate');
                        }
                    });
                }
            });
    }

    sortCertificates() {
        const sortPriorities = _.chain(this.featuredProducts)
            .map((item, index) => {
                return { product_id: item.id, sort_priority: index + 1 };
            })
            .value();
        this.roasterService
            .updateFeatured(this.roasterId, { featured_products: sortPriorities })
            .subscribe((res: any) => {
                if (res.success) {
                    this.toastrService.success('Featured products order has been updated successfully');
                    this.getFeaturedProducts();
                } else {
                    this.toastrService.error('Something went wrong while update the featured products order');
                }
            });
    }
}
