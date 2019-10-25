import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { LogoComponent } from './logo/logo.component';

const components = [
    ButtonComponent,
    InputComponent,
    LogoComponent,
];

@NgModule({
    declarations: [...components],
    imports: [CommonModule],
    exports: [...components],
})
export class SharedModule { }
