import {
    Directive,
    HostListener,
    Input,
    ElementRef,
    HostBinding,
} from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
    selector: '[Currency]',
})
export class CurrencyDirective {
    private specialKeys: Array<string> = [
        // 'Backspace',
        'ArrowLeft',
        'ArrowRight',
    ];
    constructor(public elementRef: ElementRef, private ngControl: NgControl) {}

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent): any {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            event.preventDefault();
            return;
        }

        const arrayValue: string[] = Array.from(
            this.elementRef.nativeElement.value.trim().replace('.', '')
        );

        if ((Number(event.key) || event.key === '0') && arrayValue[0] === '0') {
            arrayValue.shift();
            arrayValue.push(event.key);
        }
        if (event.key === 'Backspace') {
            event.preventDefault();
            arrayValue.pop();
            arrayValue.unshift('0');
        }

        const result: string =
            arrayValue.join('').slice(0, 3) +
            '.' +
            arrayValue.join('').slice(3);

        this.elementRef.nativeElement.value = result;
        this.ngControl.control.setValue(result);
        return;
    }
}
