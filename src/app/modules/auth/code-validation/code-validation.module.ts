import { InputMaskModule } from '@ngneat/input-mask';
/* eslint-disable arrow-body-style */
import { UtilsModule } from './../../../utils/utils.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { codeValidationRoutes } from './code-validation.routing';
import { SharedModule } from 'app/shared/shared.module';
import { CodeValidationComponent } from './code-validation.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertModule } from '@fuse/components/alert';

@NgModule({
    declarations: [CodeValidationComponent],
    imports: [
        RouterModule.forChild(codeValidationRoutes),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        SharedModule,
        MatProgressBarModule,
        FuseAlertModule,
        UtilsModule,
        InputMaskModule.forRoot({
            isAsync: true, // set to true if native input is lazy loaded
            inputSelector: 'input',
        }),
        MatProgressSpinnerModule,
    ],
})
export class CodeValidationModule {}
