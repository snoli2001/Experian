import { NgModule } from '@angular/core';
import { CurrencyDirective } from './directives/CurrencyDirective';
import { MaxLengthDirective } from './directives/MaxLenghtDirective';
import { StrictNumberOnlyDirective } from './directives/StrictNumberOnlyDirective';

@NgModule({
    declarations: [
        StrictNumberOnlyDirective,
        MaxLengthDirective,
        CurrencyDirective,
    ],
    exports: [StrictNumberOnlyDirective, MaxLengthDirective, CurrencyDirective],
})
export class UtilsModule {}
