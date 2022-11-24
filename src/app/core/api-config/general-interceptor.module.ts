import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneralInterceptor } from './general-interceptor';
import { AuthService } from '../auth/auth.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GeneralInterceptor,
            multi: true,
        },
    ],
})
export class GeneralInterceptorModule {}
