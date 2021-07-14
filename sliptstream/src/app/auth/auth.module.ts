import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule, COMPONENTS } from './auth-routing.module';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';





@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatPasswordStrengthModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
