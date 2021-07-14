import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, Dialog, ErrorDialogLogin } from './login/login.component';
import { DialogDataExampleDialog, ErrorDialog, RegisterComponent } from './register/register.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent},

  { path: 'signin', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

export const COMPONENTS = [
  Dialog,
  LoginComponent,
  RegisterComponent,
  DialogDataExampleDialog,
  ErrorDialog,
  ErrorDialogLogin
];
