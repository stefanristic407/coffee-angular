import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderManagementService } from '@app/modules/order-management/order-management.service';
import { DestroyableComponent } from '@base-components';
import { UserProfile } from '@models';
import { maxWordCountValidator } from '@utils';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent extends DestroyableComponent implements OnInit {
    @Input() orderId: number;

    infoForm: FormGroup;
    userProfile: UserProfile;

    constructor(private orderService: OrderManagementService, private fb: FormBuilder) {
        super();
    }

    ngOnInit(): void {
        this.infoForm = this.fb.group({
            note: ['', Validators.compose([Validators.required, maxWordCountValidator(50)])],
        });
        this.orderService.userProfile$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((res) => (this.userProfile = res));
    }

    addNote(): void {
        if (this.infoForm.valid) {
            this.orderService.addOrderNote(this.orderId, this.infoForm.value.note).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.infoForm.reset();
                        this.orderService.loadOrderNotes(this.orderId);
                    }
                },
            });
        } else {
            this.infoForm.markAllAsTouched();
        }
    }
}
