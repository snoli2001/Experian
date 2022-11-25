import { Router } from '@angular/router';
import { FuseAlertService } from '@fuse/components/alert/alert.service';
import { Validators } from '@angular/forms';
/* eslint-disable arrow-parens */
import { CodeValidationService } from './services/code-validation.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { createMask } from '@ngneat/input-mask';

@Component({
    selector: 'app-code-validation',
    templateUrl: './code-validation.component.html',
    styleUrls: ['./code-validation.component.scss'],
})
export class CodeValidationComponent implements OnInit {
    code: FormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3),
    ]);
    errorMessage: string = '';
    invalidCode: boolean = false;

    pinMask = createMask({
        mask: '***-**-***',
        onBeforePaste: (pastedValue) => {
            pastedValue = pastedValue.toLocaleUpperCase();
            this.code.setValue(pastedValue);
            return pastedValue;
        },
    });

    constructor(
        private _codeValidationService: CodeValidationService,
        private _router: Router
    ) {}

    ngOnInit(): void {}

    validateCode(): void {
        console.log(this.code.value.toUpperCase());
        if (this.code.valid) {
            this.invalidCode = false;
            this._codeValidationService
                .validateCode(this.code.value)
                .subscribe((response) => {
                    if (response.codigo !== '00') {
                        this.errorMessage = response.mensaje;
                        this.invalidCode = true;
                    } else {
                        this._codeValidationService.setTransactionInfo(
                            response
                        );
                        this._router.navigate(['/sentinel']);
                    }
                });
        }
    }

    setNoValue($event): void {
        this.code.setValue('');
    }
}
