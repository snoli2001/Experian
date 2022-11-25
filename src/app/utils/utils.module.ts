import { BlockCopyPasteDirective } from './directives/BlockCopyPaste.directive';
import { NgModule } from '@angular/core';
import { CurrencyDirective } from './directives/CurrencyDirective';
import { MaxLengthDirective } from './directives/MaxLenghtDirective';
import { StrictNumberOnlyDirective } from './directives/StrictNumberOnlyDirective';

@NgModule({
    declarations: [
        StrictNumberOnlyDirective,
        MaxLengthDirective,
        CurrencyDirective,
        BlockCopyPasteDirective,
    ],
    exports: [
        StrictNumberOnlyDirective,
        MaxLengthDirective,
        CurrencyDirective,
        BlockCopyPasteDirective,
    ],
})
export class UtilsModule {}
