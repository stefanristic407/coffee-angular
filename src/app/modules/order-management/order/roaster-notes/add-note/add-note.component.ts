import { Component, OnInit, Input } from '@angular/core';
import { OrderManagementService } from '@app/modules/order-management/order-management.service';
import { UserProfile } from '@models';
import { DestroyableComponent } from '@base-components';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent extends DestroyableComponent implements OnInit {
    @Input() orderId: number;

    note = '';
    userProfile: UserProfile;

    constructor(private orderService: OrderManagementService) {
        super();
    }

    ngOnInit(): void {
        this.orderService.userProfile$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((res) => (this.userProfile = res));
    }

    addNote(): void {
        const trimmedNote = this.note.trim();
        if (trimmedNote) {
            this.orderService.addOrderNote(this.orderId, trimmedNote).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.note = '';
                        this.orderService.loadOrderNotes(this.orderId);
                    }
                },
            });
        }
    }
}
