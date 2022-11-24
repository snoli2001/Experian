import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthModule } from 'app/core/auth/auth.module';
import { IconsModule } from 'app/core/icons/icons.module';
import { GeneralInterceptorModule } from './api-config/general-interceptor.module';

@NgModule({
    imports: [GeneralInterceptorModule, IconsModule],
})
export class CoreModule {
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        // Do not allow multiple injections
        if (parentModule) {
            throw new Error(
                'CoreModule has already been loaded. Import this module in the AppModule only.'
            );
        }
    }
}
