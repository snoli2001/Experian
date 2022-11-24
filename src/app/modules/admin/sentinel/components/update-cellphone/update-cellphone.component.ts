import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-update-cellphone',
    templateUrl: './update-cellphone.component.html',
    styleUrls: ['./update-cellphone.component.scss'],
})
export class UpdateCellphoneComponent implements OnInit {
    cellphoneForm: FormControl;
    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit(): void {
        this.cellphoneForm = new FormControl(this.data.cellphone, [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(9),
        ]);
        this.dialogRef.updateSize(this.data.size);
    }

    updateCellphone(): void {
        this.cellphoneForm.markAsTouched();
        if (this.cellphoneForm.valid) {
            this.dialogRef.close(this.cellphoneForm.value);
        }
    }

    close(): void {
        this.dialogRef.close();
    }
}
