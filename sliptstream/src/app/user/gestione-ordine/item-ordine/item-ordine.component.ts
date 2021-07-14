import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncSubject, BehaviorSubject, Observable } from 'rxjs';
import { Articolo } from 'src/app/class/articolo';
import { Ordine } from 'src/app/class/ordine';
import { DataService } from 'src/app/service/data.service';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { OrderService } from 'src/app/service/order.service';
import { ServiceService } from 'src/app/service/service.service';
import { UserService } from 'src/app/service/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//tslint:disable

export interface DialogData {
  numeroArticolo: number;
  articolo: Articolo;
}

@Component({
  selector: 'app-item-ordine',
  templateUrl: './item-ordine.component.html',
  styleUrls: ['./item-ordine.component.scss'],
  preserveWhitespaces: false
})
export class ItemOrdineComponent implements OnInit {
  stato: boolean;
  ruolo: string;
  item: Ordine;
  articoli: BehaviorSubject<Articolo[]> = new BehaviorSubject(null);
  articoliAsync: AsyncSubject<Articolo[]> = new AsyncSubject();
  img: string;
  imgModifica: string;
  checked = false;
  @Input() id: string;

  constructor(private service: ServiceService, private router: Router, private data: DataService, private order: OrderService,
              private active: ActivatedRoute, private fb: FormBuilder, private fireStorage: FireStorageService, private user: UserService,
              public dialog: MatDialog) {
    this.articoli = this.service.getArticle().articoli$;
    this.ruolo = this.data.getUtente().value.getRuolo();
  }

  ngOnInit(): void {
   this.service.getArticle().stato.subscribe(
     data => {
       (data === 'nuovo') ? this.stato = false : this.stato = true; }
   );
  }

  delete(index: number, articoloId: string): void{
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    const userId = this.data.getCliente().value.getId();
    const data = this.articoli.getValue(); //non è possibile effettuare il subscribe altrimenti ci sarebbe un continuo flusso di dati che dannegerebbe il DB
    data.forEach(element => {
        if (element.getArticloId() === articoloId) {
          if (index === 0) {
            this.articoli.value.shift();
          }else if(index > 0 && index < data.length){
            this.articoli.value.splice(index,1);
          }
          else if (index == data.length-1){
            this.articoli.value.pop()
          }

        }
      });
    if (this.articoli.value.length === 0){
        this.order.deleteOrdine(userId, idOrdine)
        .then(() => {this.onClick(); } );
      }else{
        const articoli = this.articoli.getValue();
        console.log(articoli);
        this.order.updateArticolo(userId, idOrdine, articoli)
          .then(() => { this.service.setArticle(articoli, 'nuovo'); })
          .catch((error) => { console.log(error); });
      }


  }

  onClick(): void{
    this.router.navigate(['list'], {relativeTo: this.service.getRoute().value});
  }

  getAllegati(param): void{
    this.articoli.subscribe(data => {
      this.img = data[param].getAllegati();
    });
  }

  getModificaURL(param): void {
    this.articoli.subscribe(data => {
      this.imgModifica = data[param].getfileModificaURL();
    });
  }

  onSubmit(): void{

  }

  changeState(stato: boolean): void{
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    const userId = this.data.getCliente().value.getId();
    if (!stato){
      this.order.changeState(userId, idOrdine, 'in preparazione');
    }else {
      this.order.changeState(userId, idOrdine, 'nuovo');
    }


  }

  openDialog(param): void {
    this.service.setIndex(param);
    const dialogRef = this.dialog.open(DialogInsertBozza, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogModifica(param, numeroArticolo): void{
    const dialogRef = this.dialog.open(DialogModificaArticolo, {
      width: '100%',
      data: { numeroArticolo , articolo: param}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}

@Component({
  selector: 'app-dialog-insert-bozza',
  templateUrl: 'dialog-insert-bozza-component.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogInsertBozza {
  modello: number;
  modelliBozze = ['0', '1', '2', '3', '4', '5', '6', '7'];
  form: FormGroup;

  constructor(
    private service: ServiceService, private order: OrderService, private fireStorage: FireStorageService, private dataService: DataService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogInsertBozza>) {
      this.form = this.fb.group({
        numeroModelliBozze: []
    });
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void{
    const index = this.service.getIndex().value;
    const numeroModelliBozze = this.form.value.numeroModelliBozze;
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    const userId = this.dataService.getCliente().value.getId();

    this.order.insertNumberDraw(userId, idOrdine, index, numeroModelliBozze);
  }

  uploadImg(file: File, index: number): Observable<string> {
    return this.fireStorage.uploadFileAndGetMetadata('bozza', file).downloadUrl$;
  }

  insertDraw(event): void {
    const index = this.service.getIndex().value;

    const file: File = event.target.files[0];
    this.uploadImg(file, index).subscribe(url => {

      const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
      const userId = this.dataService.getCliente().value.getId();
      this.order.insertDraw(userId, idOrdine, index, url).then(() => this.order.changeState(userId, idOrdine, 'in attesa'));

    });

  }

}

@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-modifica-articolo.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogModificaArticolo {
  supporto = 'Adesivo';
  form: FormGroup[] = [];
  temp: FormGroup = new FormGroup({});
  articoli: Articolo[];
  articoli$: BehaviorSubject<Articolo[]> = new BehaviorSubject(null);
//tslint:disable
  constructor(
    private dataService: DataService,
    private order: OrderService,
    private service: ServiceService,
    public dialogRef: MatDialogRef<DialogModificaArticolo>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.supporto = this.data.articolo['supporto'];
      this.articoli$ = this.service.getArticle().articoli$;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setForm(event) {
    this.temp = event;
  }

  onSubmit(){
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    const userId = this.dataService.getCliente().value.getId();
    const numeroArticolo = this.data.numeroArticolo;
    this.form.push(this.temp);
    this.articoli = this.dataService.buildArticolo(this.form);
    const articoli = this.articoli$.value;
    articoli[numeroArticolo] = this.articoli[0];
    this.order.updateArticolo(userId, idOrdine, articoli)
      .then(() => { this.service.setArticle(articoli, 'nuovo')})
      .then(()=>{this.onNoClick()})
      .catch((error)=>{console.log(error)});

  }

}
