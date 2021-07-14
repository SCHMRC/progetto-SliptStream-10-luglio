import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPasswordStrengthComponent } from '@angular-material-extensions/password-strength';
import { HttpService } from 'src/app/service/http.service';
import { Utente } from 'src/app/class/utente';
import { ruolo } from './../../class/enum';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  form: FormGroup;
  confirm: FormGroup;
  pattern = new RegExp(/^(?=.*?[@#])/);
  criteria: any;
  equalPassword = true;
  isDisabled: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private fb: FormBuilder, private http: HttpService, private router: Router, public dialog: MatDialog,
              private authentication: AuthenticationService, private userService: UserService) {
    this.isDisabled.subscribe(isDisabled => {
      this.form = this.fb.group({
        ruolo: ['', [Validators.required]],
        nome: [{ value: '', disabled: isDisabled }, Validators.required],
        cognome: [{ value: '', disabled: isDisabled }, Validators.required],
        email: [{ value: '', disabled: isDisabled }, [Validators.required, Validators.email]],
        password: [{ value: '', disabled: isDisabled }, Validators.required]
      });
      this.confirm = this.fb.group({
        passwordConfirm: [{ value: '', disabled: isDisabled }, [Validators.required]]
      });
      this.criteria = {
        lower: 'deve contenere almeno una lettera minuscola',
        upper: 'deve contenere almeno una lettera maiuscola',
        digit: 'deve contenere almeno un numero',
        min: 'deve contenere almeno 6 caratteri',
        special: 'deve contenere almeno un carattere speciale'
      };

    })

  }


  ngOnInit(): void {
  }

  test(){
    this.isDisabled.next(false)
  }

  getErrorMessage(): string {
    if (this.form.get('email').hasError('required')) {
      return 'Campo obbligatorio';
    }
    return this.form.get('email').hasError('email') ? 'non è una email valida' : '';
  }

  get indirizzo(): string {
    return this.form.get('indirizzo').value;
  }

  get telefono(): string {
    return this.form.get('telefono').value;
  }

  get ruolo(): string {
    return this.form.get('ruolo').value;
  }

  get email(): string {
    return this.form.get('email').value;
  }
  get password(): string {
    return this.form.get('password').value;
  }
  get passwordConfirm(): string {
    return this.confirm.get('passwordConfirm').value;
  }

  get nome(): string {
    return this.form.get('nome').value;
  }
  get cognome(): string {
    return this.form.get('cognome').value;
  }

  onStrengthChanged(event): void {
    /* console.log(event); */
  }

  onKeyPress(): void {
    const pw = this.password;
    const pw2 = this.passwordConfirm;
    (pw === pw2) ? this.equalPassword = true : this.equalPassword = false;
  }

  onSubmit(): void {
    this.authentication.signup(this.email, this.password).then(userInfo => {
      const utente = new Utente(this.nome, this.cognome, this.email, this.password, this.ruolo.toUpperCase(),
      userInfo.user.uid);
      this.userService.addUser(utente).then(() => {
        this.openDialog()
      })

    }).catch(error => {
      this.errorDialog();
    });

  }

  openDialog(): void {
    this.dialog.open(DialogDataExampleDialog);
  }

  errorDialog(): void{
    this.dialog.open(ErrorDialog);
  }


}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(private router: Router) { }
  redirect(){
    this.router.navigateByUrl('home');

  }
}

@Component({
  selector: 'error-dialog',
  templateUrl: 'error-dialog.html',
})
export class ErrorDialog {
  constructor() { }
}
