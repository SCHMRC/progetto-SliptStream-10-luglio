import { Component, ElementRef, OnInit, OnDestroy, ViewEncapsulation, Renderer2, AfterViewInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { Utente } from 'src/app/class/utente';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
//tslint:disable

export interface DialogData{
  form: FormGroup;
}

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.scss'],
})
export class ProfiloComponent implements OnInit, AfterViewInit {
utente: Utente;
  readonly = true;
  form: FormGroup;

  constructor(public dialog: MatDialog, private renderer: Renderer2, private fb: FormBuilder, private service: ServiceService, private data: DataService,
    private firestorage: FireStorageService, private userService: UserService) {
    /*TODO: preleva i dati dell'utente da DB e li imposta come valori predefiniti all'interno del form reactive */
  }

  ngOnInit(): void {
    this.service.subReadonly().subscribe(data => {
      this.readonly = data;
    })
    this.data.getUtente().subscribe(user =>{
      this.utente = user;
    })
    this.form = this.fb.group({
      fotoProfilo: [],
      indirizzo: [this.utente.getIndirizzo(),[]],
      telefono: [this.utente.getTelefono(),[]],
      email: [this.utente.getEmail(), []]
    });

  }

  ngAfterViewInit(): void {
  }

  setProfilo(){
    this.service.setReadonly();
    //(this.readonly) ? this.readonly = false : this.readonly = true;
    if (this.service.getRadonly() === false) { this.focusMyInput(); }
  }
  uploadImgProfile(event){
    let file = event.target.files[0]
    this.firestorage.uploadFileAndGetMetadata('fotoProfilo',file).downloadUrl$.subscribe(url => {
      let utente = this.data.getUtente().value
      this.userService.updateFotoProfilo(utente,url)
    })
  }


  openDialog(param: string): void {
    if (param === 'salva'){
      const dialogRef = this.dialog.open(Dialog, {
        height: '150px',
        width: '400px',
        data: {form: this.form},
        disableClose: false
      });
    }else{
      const dialogRef = this.dialog.open(DialogCred, {
        height: '300px',
        width: '400px',
        disableClose: false
      });
    }

  }
  focusMyInput(): void {
    this.renderer.selectRootElement('#myInput').focus();

  }




}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./profilo.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class Dialog implements OnInit {
  hide = true;

  constructor(private service: ServiceService, private userService: UserService, private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }

  ngOnInit(): void {


  }
  onSubmit(): void {
    /**quando l'utente clicca sul pulsante salva del modal mi connetto al server per effettuare l'aggiornamento delle credenziali */
    let utente = this.dataService.getUtente().value;
    let indirizzo = this.data.form.get('indirizzo').value
    let telefono = this.data.form.get('telefono').value
    this.userService.updateUserData(utente,indirizzo,telefono)
    this.service.setReadonly();
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialogCred.component.html',
  styleUrls: ['./profilo.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class DialogCred implements OnInit {
  hide = true;
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService, private dataService: DataService) {
    this.form = this.fb.group(
      {password: ['',[Validators.required]]
      }
      )
   }

  ngOnInit(): void {
  }
  onSubmit(): void {
    let password = this.form.get('password').value
    let utente = this.dataService.getUtente().value
    this.auth.resetPassword(utente.getEmail())
    .then()
    .catch(error =>{
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorMessage)
    })
  }
}


