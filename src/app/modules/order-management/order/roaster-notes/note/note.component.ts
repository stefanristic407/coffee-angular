import { Component, OnInit, Input } from '@angular/core';
import { OrderNote } from '@models';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
    @Input() note: OrderNote;

    constructor() {}

    ngOnInit(): void {}
}
