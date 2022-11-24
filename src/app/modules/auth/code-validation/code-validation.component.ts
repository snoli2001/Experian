import { Router } from '@angular/router';
import { FuseAlertService } from '@fuse/components/alert/alert.service';
import { Validators } from '@angular/forms';
/* eslint-disable arrow-parens */
import { CodeValidationService } from './services/code-validation.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    constructor(
        private _codeValidationService: CodeValidationService,
        private _router: Router
    ) {}

    ngOnInit(): void {}

    validateCode(): void {
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
}
