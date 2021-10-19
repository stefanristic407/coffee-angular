import { Component, OnInit, Input } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { OrderManagementService } from '../../order-management.service';
import { takeUntil } from 'rxjs/operators';
import { OrderNote } from '@models';

@Component({
    selector: 'app-roaster-notes',
    templateUrl: './roaster-notes.component.html',
    styleUrls: ['./roaster-notes.component.scss'],
})
export class RoasterNotesComponent extends DestroyableComponent implements OnInit {
    notes: OrderNote[] = [];
    currentIndex = 1;

    @Input() orderId: number;

    constructor(private orderService: OrderManagementService) {
        super();
    }

    ngOnInit(): void {
        this.orderService.orderNotes$
            .pipe(takeUntil(this.unsubscribeAll$))
            .subscribe((notes) => (this.notes = (notes || []).reverse()));
    }

    navigate(dir: number): void {
        let newIndex = this.currentIndex + dir;
        if (newIndex <= 1) {
            newIndex = 1;
        }

        if (newIndex > this.notes.length) {
            newIndex = this.notes.length;
        }

        this.currentIndex = newIndex;
    }
}
