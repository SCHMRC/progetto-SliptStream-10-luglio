
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { ServiceService } from 'src/app/service/service.service';
import { DataService } from 'src/app/service/data.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
//tslint:disable

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      height: '300px',
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./login.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class Dialog implements OnInit {
  hide = true;
  form: FormGroup;
  msgError: string;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpService,
              private service: ServiceService, private data: DataService, private authentication :AuthenticationService,
    private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: []
    });
  }

  getErrorMessage(): string {
    if (this.form.get('email').hasError('required')) {
      return 'Devi inserire una email';
    }

    return this.form.get('email').hasError('email') ? 'non è una email valida' : '';
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  onSubmit(): void {
    /* this.http.login(this.form.value['email'], this.form.value['password']).subscribe(
      data => {
        (data['password_verify']) ? this.service.setLogged(true) : this.service.setLogged(false);
        this.data.setUtente(data['profilo']);
        //TODO: passaggio di parametri al profilo
        if (data['password_verify']){this.router.navigate(['profilo',this.data.getUtente().value.getNome()])}
      }

    ); */
    let email = this.form.value['email'];
    let password = this.form.value['password']
    this.authentication.login(email, password).then(userInfo => {
      this.userService.getUser(userInfo.user.uid).subscribe(
        data => {
          this.service.setLogged(true);
          this.data.setUtente(data);
          this.router.navigate(['profilo', this.data.getUtente().value.getNome()])
        }
      )
    }).catch((error) => {this.errorDialog() })

  }
  getHome(): void {
    this.router.navigate(['home']);
  }
  errorDialog(): void {
    this.dialog.open(ErrorDialogLogin);
  }
}

@Component({
  selector: 'error-dialog-login',
  templateUrl: 'error-dialog-login.html',
})
export class ErrorDialogLogin {
  constructor(private router: Router) { }

  getLogin(): void {
    this.router.navigate(['home']);
  }
}


