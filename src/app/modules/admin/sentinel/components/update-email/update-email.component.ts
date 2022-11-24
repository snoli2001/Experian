import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-update-email',
    templateUrl: './update-email.component.html',
    styleUrls: ['./update-email.component.scss'],
})
export class UpdateEmailComponent implements OnInit {
    emailForm: FormControl;
    emailRegex: RegExp = new RegExp(
        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    );
    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.emailForm = new FormControl(this.data.email, [
            Validators.required,
            Validators.pattern(this.emailRegex),
        ]);
        this.dialogRef.updateSize(this.data.size);
    }

    updateEmail(): void {
        this.emailForm.markAsTouched();
        if (this.emailForm.valid) {
            this.dialogRef.close(this.emailForm.value);
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
