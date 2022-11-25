import { UtilsModule } from './../../../utils/utils.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/shared.module';
import { SentinelComponent } from './sentinel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { sentinelRoutes } from './sentinel.routing';
import { MatSelectModule } from '@angular/material/select';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UpdateEmailComponent } from './components/update-email/update-email.component';
import { UpdateCellphoneComponent } from './components/update-cellphone/update-cellphone.component';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
    declarations: [
        SentinelComponent,
        UpdateEmailComponent,
        UpdateCellphoneComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        MatInputModule,
        MatStepperModule,
        MatSelectModule,
        MatButtonModule,
        FuseAlertModule,
        MatCheckboxModule,
        UtilsModule,
        MatDialogModule,
        MatIconModule,
        InputMaskModule,
        RouterModule.forChild(sentinelRoutes),
    ],
})
export class SentinelModule {}
