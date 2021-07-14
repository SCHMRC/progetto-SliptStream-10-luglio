import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Allegato } from 'src/app/class/allegato';
import { Ordine } from 'src/app/class/ordine';
import { DataService } from 'src/app/service/data.service';
import { OrderService } from './../../service/order.service';
import { ServiceService } from 'src/app/service/service.service';
import { supporti } from './../../class/enum';
import { UserService } from 'src/app/service/user.service';
import { Utente } from 'src/app/class/utente';
import { MatStepper } from '@angular/material/stepper';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import * as shortid from 'shortid';
//tslint:disable

/*Questa classe contiente la logica per la gestione della creazione di un ordine.
I vincoli cui l'ordine deve sottostare per poter essere creato sono:
1) deve essere sempre inserito un identificativo per il cliente anche se nel DB verrà assegnato un identificativo in automatico
2) tutte le parti non opzionali degli articoli devono essere compilate
se un utente non ha inserito nel modo corretto i parametri il pulsante di salvataggio dell'ordine non verrà abilitato

TODO: creare un localizzatore per gli errori*/



@Component({
  selector: 'app-crea-ordine',
  templateUrl: './crea-ordine.component.html',
  styleUrls: ['./crea-ordine.component.scss']
})
export class CreaOrdineComponent implements OnInit, OnDestroy {
  articoliSel = supporti; /**questa variabile contienei valori che verranno visualizzati nella select*/
  selectedArt: string[] = [this.articoliSel[0].value]; /**questa variabile visualizza il primo valore all'interno della select */
  formOrdine: FormGroup;/**questo è il mio ordine che contiene identificativo e articoli */
  articoli: FormGroup[] = [];/**elenco di articoli mi permette di tenere traccia degli articoli*/
  viewArticoli: FormArray;/**questa variabile mi consente di creare form dinamici ma non mi permettere di tenere traccia degli articoli */
  status = true;/**stato degli articoli e dell'ordine */
  isDisabled = true
  error: any;
  indexArticolo = 0
  grafici: Utente[] = []
  idOrdine: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  @ViewChild('stepper') stepper: MatStepper;

  public currentQuestion: number;

  constructor(private fb: FormBuilder, private data: DataService, private service: ServiceService, private orderService: OrderService, private userService: UserService, private _snackBar: MatSnackBar, private order: OrderService) {
  }
/**
 * 1. genero id Ordine
 * 2. imposto l'id ordine che mi servirà per la creazione del nome univoco del file img da salvare
 * 3. creo l'elenco dei grafici
 * 4. creo il form
 */
  ngOnInit(): void {
    this.idOrdine = shortid.generate();
    this.order.setIdOrdine(this.idOrdine);
    this.userService.getGrafici().subscribe(grafici => {
      Object.entries(grafici).forEach(([key,value]) => {
        if (value.ruolo == 'GRAFICO'){
          this.grafici.push(this.data.buildUtente(value));
        }
      })
    })
    this.create();
    this.service.getStatus().subscribe(status => {
      this.status = status;
    });
  }
  /**
   * 1. creo il form dell'ordine
   * 2. aggiungo il primo articolo
   */

  create(): void {
    this.formOrdine = this.fb.group({
      ordine: this.fb.group({
        nome: ['', [Validators.required]],
        stato: 'nuovo',
        descrizione: [''],
        grafico: ['',Validators.required]
      }),
      articoli: this.fb.array([])
    });
    this.addItem();
  }

  init(): FormGroup {
    return this.fb.group({ nome: ['null'] });
  }

  /**
   *
   */

  addItem(): void {
    this.viewArticoli = this.formOrdine.get('articoli') as FormArray;
    this.viewArticoli.push(this.init());
    this.selectedArt.push(this.articoliSel[0].value);
    this.service.setStatus(true);
    try {
      if (!this.articoli[this.indexArticolo] !== undefined && this.articoli[this.indexArticolo].value.allegati === 'vuoto') {
        let temp = this.service.getImgList().value

        temp.push('vuoto')
        this.service.setImgList(temp)
      }
    } catch (error) {
      console.log('')

    }

  }

  removeArticolo(index: number): void {
    this.viewArticoli.removeAt(index);
    this.articoli.splice(index, 1);
    this.selectedArt.splice(index, 1);
  }

  resetItems(): void {
    this.create();
    this.articoli = [];
    this.service.setImgList([])
    this.service.$imgURL.next(['vuoto'])
  }
  onSubmit(): void {
    const ordine = this.formOrdine.get('ordine').value;
    const articoli = this.data.buildArticolo(this.articoli);
    const ord: Ordine = this.data.buildOrdine(ordine, this.idOrdine ,articoli);

    const emailFK = this.data.getUtente().value.getEmail();
    ord.setEmailFK(emailFK);
    let utente = this.data.getUtente().value;
    this.orderService.insertOrder(utente, ord)
    .then(() =>{this.openSnackBar()})
    .catch()

  }

  onSelect(index: number, event: any): void {
    this.selectedArt[index] = (event.target as HTMLSelectElement).value;
  }

  setForm(articolo: FormGroup, index) {
    this.indexArticolo = index;
    this.articoli[index] = articolo;
  }

  openSnackBar() {
    this._snackBar.open('Inserimento avvenuto con successo', 'Chiudi', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  /**questo metodo viene scatenato nel momento in cui c'è un passaggio di evento
   * effettua un controllo della presenza di errori nell'ordine
   * ed avvine il passaggio dei parametri dalla variabile articoli nell'ordine
  */
  onChange(event: any) {
    (this.articoli.length == 0)? this.isDisabled = true : this.isDisabled = false;
    console.log()
    /* this.formOrdine.value['articoli'] = this.articoli;
    let counter = 0;
    if (this.articoli.length === 0 || this.articoli.length !== this.viewArticoli.length) { counter++ }
    this.articoli.forEach((element: FormGroup) => { if (element.invalid) { counter++; } });
    if (counter > 0) { this.service.setStatus(true); } else { this.service.setStatus(false); } */
  }
  onSelectedIndex(event){
    console.log(this.viewArticoli)
  }

  selectedArticle(i){
    this.service.selectedArticolo.next(i)
  }
  ngOnDestroy(): void {


  }
}
