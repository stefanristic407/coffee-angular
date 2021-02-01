import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/services/globals.service';

@Component({
    selector: 'app-edit-user-details',
    templateUrl: './edit-user-details.component.html',
    styleUrls: ['./edit-user-details.component.scss'],
})
export class EditUserDetailsComponent implements OnInit {
    userForm: FormGroup;
    items: FormArray;
    constructor(private fb: FormBuilder, public globals: GlobalsService) {}
    ngOnInit(): void {
        this.userForm = this.fb.group({
            items: this.fb.array([this.createItem()]),
        });
        console.log(this.userForm);
    }
    addUser(): void {
        this.items = this.userForm.get('items') as FormArray;
        this.items.push(this.createItem());
    }
    createItem(): FormGroup {
        return this.fb.group({
            name: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
        });
    }
    deleteEmail(idx): void {
        this.items.removeAt(idx);
    }
}
