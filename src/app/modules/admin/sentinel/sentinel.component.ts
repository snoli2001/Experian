import { UpdateCellphoneComponent } from './components/update-cellphone/update-cellphone.component';
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/naming-convention */
import { SentinelService } from './sentinel.service';
import { CodeValidationResponse } from './../../auth/code-validation/services/code-validation.service';
/* eslint-disable arrow-parens */
import { CodeValidationService } from './../../auth/code-validation/services/code-validation.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ValidateDocumentIDResponse } from './interfaces/ValidateDocumentIDResponse.interface';
import { Observable, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmailComponent } from './components/update-email/update-email.component';

interface DocumentType {
    value: string;
    description: string;
}

@Component({
    selector: 'app-sentinel',
    templateUrl: './sentinel.component.html',
    styleUrls: ['./sentinel.component.scss'],
})
export class SentinelComponent implements OnInit {
    documentsValidationForm: FormGroup;
    billInformationForm: FormGroup;
    consultedDocumentTypes: DocumentType[] = [
        { value: '1', description: 'DNI - Documento Nacional de Identidad' },
        { value: '2', description: 'RUC - Registro Único de Contribuyentes' },
        { value: '3', description: 'C.E - Carné de extranjería' },
    ];
    consultantDocumentTypes: DocumentType[] = [
        { value: '1', description: 'DNI - Documento Nacional de Identidad' },
        { value: '3', description: 'C.E - Carné de extranjería' },
    ];

    invalidDocuments: boolean = false;
    errorMessage: string = '';
    transactionInfo: CodeValidationResponse;
    consulted: ValidateDocumentIDResponse;
    consultant: ValidateDocumentIDResponse;
    disable: boolean = false;
    withRUC: boolean = false;
    transactionFinished: boolean = false;
    isSuccessTransaction: boolean = false;
    invalidTransactionMessage: string = '';
    email: string;
    cellphone: string;

    constructor(
        private fb: FormBuilder,
        private _codeValidationService: CodeValidationService,
        private _sentinelService: SentinelService,
        private _router: Router,
        private _matDialog: MatDialog
    ) {
        this._codeValidationService.transactionInfo$.subscribe(
            (value) => (this.transactionInfo = value)
        );
    }

    get consultantDocumentNumber(): string {
        return this.documentsValidationForm.get('consultantDocumentNumber')
            .value;
    }

    get consultedDocumentNumber(): string {
        return this.documentsValidationForm.get('consultedDocumentNumber')
            .value;
    }

    get consultantDocumentType(): string {
        return this.documentsValidationForm.get('consultantDocumentType').value;
    }

    get consultedDocumentType(): string {
        return this.documentsValidationForm.get('consultedDocumentType').value;
    }

    get billType(): string {
        return this.billInformationForm.get('billType').value;
    }

    get ruc(): string {
        return this.billInformationForm.get('ruc').value;
    }

    get InvalidRUC(): boolean {
        return (
            this.billInformationForm.get('ruc').invalid &&
            this.billInformationForm.get('ruc').touched
        );
    }

    initDocumentsValidationForm(): void {
        this.documentsValidationForm = this.fb.group({
            consultedDocumentType: ['1', Validators.required],
            consultedDocumentNumber: ['', [Validators.required]],
            consultantDocumentType: ['1', Validators.required],
            consultantDocumentNumber: ['', [Validators.required]],
        });
    }
    changeValidatorsOfDocumentNumber(): void {
        this.documentsValidationForm
            .get('consultedDocumentType')
            .valueChanges.subscribe((value) => {
                if (value === '1') {
                    this.documentsValidationForm
                        .get('consultedDocumentNumber')
                        .setValue('');
                    this.documentsValidationForm
                        .get('consultedDocumentNumber')
                        .clearValidators();
                    this.documentsValidationForm
                        .get('consultedDocumentNumber')
                        .addValidators([
                            Validators.required,
                            Validators.minLength(8),
                            Validators.maxLength(8),
                        ]);
                }

                if (value === '2') {
                }
            });
    }

    initBillInformationForm(): void {
        this.billInformationForm = this.fb.group({
            billType: ['2', Validators.required],
            ruc: ['', [Validators.maxLength(11), Validators.minLength(11)]],
            confirmEmail: [false, [Validators.requiredTrue]],
            confirmCellphone: [false, [Validators.requiredTrue]],
        });
    }

    ngOnInit(): void {
        this.initDocumentsValidationForm();
        this.initBillInformationForm();
        this.detectWithRuc();
    }

    validateDocument(
        tipo_documento_consultado: string,
        numero_documento_consultado: string
    ): Observable<ValidateDocumentIDResponse> {
        return this._sentinelService.validateDocumentID(
            tipo_documento_consultado,
            numero_documento_consultado
        );
    }

    validateDocumentsInForm(): Observable<
        [ValidateDocumentIDResponse, ValidateDocumentIDResponse]
    > {
        const consultantDocumentType = this.documentsValidationForm.get(
            'consultantDocumentType'
        ).value;
        const consultantDocumentNumber = this.documentsValidationForm.get(
            'consultantDocumentNumber'
        ).value;
        const consultedDocumentType = this.documentsValidationForm.get(
            'consultedDocumentType'
        ).value;
        const consultedDocumentNumber = this.documentsValidationForm.get(
            'consultedDocumentNumber'
        ).value;
        const validation1 = this.validateDocument(
            consultantDocumentType,
            consultantDocumentNumber
        );
        const validation2 = this.validateDocument(
            consultedDocumentType,
            consultedDocumentNumber
        );
        return forkJoin([validation1, validation2]);
    }

    generateSentinelReport(): void {
        this.billInformationForm.markAllAsTouched();
        this.invalidDocuments = false;

        if (this.billInformationForm.valid) {
            this._sentinelService
                .generateSentinelReport({
                    codigo_distribuidor:
                        this.transactionInfo.codigo_distribuidor,
                    codigo_comercio: this.transactionInfo.codigo_comercio,
                    nombre_comercio: this.transactionInfo.nombre_comercio,
                    id_producto: this.transactionInfo.id_producto,
                    tipo_documento_PDV: this.transactionInfo.tipo_documento_PDV,
                    numero_documento_PDV:
                        this.transactionInfo.numero_documento_PDV,
                    razon_social_PDV: this.transactionInfo.razon_social_PDV,
                    nro_transaccion_referencia:
                        this.transactionInfo.nro_transaccion_referencia,
                    clave: this.transactionInfo.clave,
                    fecha_envio: this.transactionInfo.fecha_envio,
                    id_pin: this.transactionInfo.id_pin,
                    telefono_solicitante:
                        this.transactionInfo.telefono_solicitante,
                    email_solicitante: this.transactionInfo.email_solicitante,

                    tipo_documento_solicitante: this.consultantDocumentType,
                    numero_documento_solicitante: this.consultantDocumentNumber,
                    tipo_documento_consultado: this.consultedDocumentType,
                    numero_documento_consultado: this.consultedDocumentNumber,
                    tipo_documento_facturacion: this.billType,
                    numero_ruc: this.ruc,
                })
                .subscribe((response) => {
                    if (response.codigo === '00') {
                        this._codeValidationService.setTransactionInfo(null);
                        this.isSuccessTransaction = true;
                        this.transactionFinished = true;
                    } else {
                        this._codeValidationService.setTransactionInfo(null);
                        this.invalidTransactionMessage = response.mensaje;
                        this.transactionFinished = true;
                    }
                });
        }
    }

    detectWithRuc(): void {
        this.billInformationForm
            .get('billType')
            .valueChanges.subscribe((value) => {
                if (value === '1') {
                    this.withRUC = true;
                    this.billInformationForm
                        .get('ruc')
                        .addValidators([Validators.required]);
                    this.billInformationForm
                        .get('ruc')
                        .updateValueAndValidity();
                } else if (value === '2') {
                    this.withRUC = false;
                    this.billInformationForm
                        .get('ruc')
                        .removeValidators(Validators.required);
                    this.billInformationForm
                        .get('ruc')
                        .updateValueAndValidity();
                }
            });
    }

    prevStep(stepper: MatStepper): void {
        stepper.previous();
    }

    nextStep(stepper: MatStepper): void {
        this.documentsValidationForm.markAllAsTouched();
        this.invalidDocuments = false;
        this.validateDocumentsInForm().subscribe((resp) => {
            if (resp[0].codigo === '00' && resp[1].codigo === '00') {
                this.consultant = resp[0];
                this.consulted = resp[1];
                this.disable = false;
                stepper.next();
            } else {
                const indexError: number[] = [];
                const errors = resp.filter((r, index) => {
                    if (r.codigo !== '00') {
                        indexError.push(index);
                        return r;
                    }
                });
                if (errors.length === 2) {
                    this.errorMessage =
                        'Ninguno de los documentos ingresados son validos';
                    this.documentsValidationForm.controls[
                        'consultantDocumentNumber'
                    ].setErrors({ incorrect: true });
                    this.documentsValidationForm.controls[
                        'consultedDocumentNumber'
                    ].setErrors({ incorrect: true });
                } else {
                    if (indexError[0] === 0) {
                        this.errorMessage =
                            'El Documento del solicitante es inválido';
                        this.documentsValidationForm.controls[
                            'consultantDocumentNumber'
                        ].setErrors({ incorrect: true });
                    }

                    if (indexError[0] === 1) {
                        this.errorMessage =
                            'El Documento del consultado es inválido';
                        this.documentsValidationForm.controls[
                            'consultedDocumentNumber'
                        ].setErrors({ incorrect: true });
                    }
                }
                this.invalidDocuments = true;
            }
        });
    }

    goToMainPage(): void {
        this._router.navigate(['/code-validation']);
    }

    openEditEmail(): void {
        this._matDialog
            .open(UpdateEmailComponent, {
                data: {
                    size: 500,
                    email: this.transactionInfo.email_solicitante,
                },
            })
            .afterClosed()
            .subscribe((response) => {
                if (response) {
                    this.transactionInfo.email_solicitante = response;
                    this.billInformationForm
                        .get('confirmEmail')
                        .setValue(false);
                }
            });
    }

    openEditCellphone(): void {
        this._matDialog
            .open(UpdateCellphoneComponent, {
                data: {
                    size: 500,
                    cellphone: this.transactionInfo.telefono_solicitante,
                },
            })
            .afterClosed()
            .subscribe((response) => {
                if (response) {
                    this.transactionInfo.telefono_solicitante = response;
                    this.billInformationForm
                        .get('confirmCellphone')
                        .setValue(false);
                }
            });
    }
}
