import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeRoutingModule, COMPONENT } from './home-routing.module';
import { MaterialModule } from './../material/material.module';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [COMPONENT],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MaterialModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
