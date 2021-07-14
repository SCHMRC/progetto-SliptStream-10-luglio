import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Articolo } from 'src/app/class/articolo';
import { Ordine } from 'src/app/class/ordine';
import { DataService } from 'src/app/service/data.service';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { OrderService } from 'src/app/service/order.service';
import { ServiceService } from 'src/app/service/service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//tslint:disable

export interface DialogData {
  index: number;
  articolo: Articolo;
}

@Component({
  selector: 'app-item-ordine-bozza',
  templateUrl: './item-ordine.component.html',
  styleUrls: ['./item-ordine.component.scss']
})
export class ItemOrdineBozzaComponent implements OnInit {
  stato: boolean;
  ruolo: string;
  item: Ordine;
  articoli: BehaviorSubject<Articolo[]> = new BehaviorSubject(null);
  form: FormGroup;
  img: string;
  @Input() id: string;


  constructor(private service: ServiceService, private router: Router, private data: DataService, private order: OrderService,
    private active: ActivatedRoute, private fb: FormBuilder, private fireStorage: FireStorageService, public dialog: MatDialog, private orderService: OrderService) {
    this.articoli = this.service.getArticle().articoli$;
    this.ruolo = this.data.getUtente().value.getRuolo();
    this.form = this.fb.group({
      bozza: [, [Validators.required]]
    });
    this.active.params.subscribe(next => console.log(next))
  }

  ngOnInit(): void {
    this.service.getArticle().stato.subscribe(
      data => { (data === 'nuovo') ? this.stato = false : this.stato = true; }
    )
  }

  onClick() {
    const userId = this.data.getUtente().value.getId()
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    this.orderService.getOrder(userId).subscribe(ordini => {
      Object.entries(ordini).forEach(([key,value])=>{
        if (value['idOrdine'] == idOrdine){
          let articoli = this.data.buildArticoloCopia(value['articoli'])
          let ordine = this.data.buildOrdineCopia(value, articoli);
          this.service.setSelectOrder(ordine);
          this.test()
        }
      })
    })
    this.router.navigate(['list'], { relativeTo: this.service.getRoute().value })
  }

  test() {
    const userId = this.data.getUtente().value.getId()
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    let flag = 0;
    this.service.getSelectOrder().subscribe((ordine) => {
      ordine.getArticoli().forEach((element: Articolo) => {
        if (element.getModelloConfermato() === 'vuoto') {
          flag++;
        }
      })
      if (flag === 0) {
        this.order.changeState(userId, idOrdine, 'confermato')
      }

    })
  }

  onConfirm() {
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    const userId = this.data.getUtente().value.getId()
    this.order.changeState(userId, idOrdine, 'confermato')
  }

  getBozze(param): void {
    this.articoli.subscribe(data => {
      this.img = data[param].getBozze();
    })
  }

  onSubmit() {
    console.log(this.form.value)
  }

  changeState(stato: boolean) {
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    const userId = this.data.getUtente().value.getId()
    if (!stato) {
      this.order.changeState(userId, idOrdine, 'in preparazione')
    } else {
      this.order.changeState(userId, idOrdine, 'nuovo')
    }
  }

  uploadImg(file: File, index: number): Observable<string> {
    return this.fireStorage.uploadFileAndGetMetadata('bozza', file).downloadUrl$;
  }

  insertDraw(event, index) {
    const file: File = event.target.files[0];
    this.uploadImg(file, index).subscribe(url => {

      const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
      const userId = this.data.getUtente().value.getId()


      this.order.insertDraw(userId, idOrdine, index, url).then(() => this.order.changeState(userId, idOrdine, 'in attesa'));

    })

  }
  openDialog(index: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { index: index, articolo: this.articoli.value[index]}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openDialogConfirm(index: number): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '350px',
      data: { index: index, articolo: this.articoli.value[index]}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-component.html',
  styleUrls: ['./item-ordine.component.scss']
})
export class DialogComponent {
  form: FormGroup;
  subject: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private fb: FormBuilder, private fireStorage: FireStorageService,
              private order: OrderService, @Inject(MAT_DIALOG_DATA) public data: number, private service: ServiceService,
              private dataService: DataService) {
    this.form = this.fb.group({
      descrizioneModifica: ['', Validators.required],
      fileModificaURL: []
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  insertChange(event) {
    const file: File = event.target.files[0];
    return this.fireStorage.uploadFileAndGetMetadata('modifica', file).downloadUrl$.subscribe(url => {
      this.subject.next(url)
    });


  }

  onClick() {
    this.form.value['fileModificaURL'] = this.subject.value;
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    const userId = this.dataService.getUtente().value.getId()
    this.order.insertChange(userId, idOrdine, this.data['index'], this.form.value['descrizioneModifica'], this.form.value['fileModificaURL']).then(()=>{
      this.order.changeState(userId, idOrdine, 'da modificare')
    }
    )
  }

}

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: 'dialog-confirm-component.html',
  styleUrls: ['dialog-confirm-component.scss']
})
export class DialogConfirmComponent {
  modelloConfermato: string;
  numeroModelli: number[] = [];
  articoli: BehaviorSubject<Articolo[]> = new BehaviorSubject(null);

  constructor(private service: ServiceService,
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private order: OrderService, private dataService: DataService) {
    this.articoli = this.service.getArticle().articoli$;
    if (this.data['articolo'].getNumeroModelliBozze().toString() !== 'vuoto'){
      let numeroModelli = parseInt(this.data['articolo'].getNumeroModelliBozze().toString())
      for (let i = 0; i < numeroModelli; i++) {
        this.numeroModelli.push(i);
      }
    }
     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(){

    const userId = this.dataService.getUtente().value.getId()
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    if (this.data['articolo'].getNumeroModelliBozze().toString() !== 'vuoto'){
      this.order.insertConfirmModelDraw(userId, idOrdine, this.data['index'], this.modelloConfermato)
        .then(() => { if (this.service.getSelectOrder().value.getArticoli().length === 1) { this.order.changeState(userId, idOrdine, 'confermato') } })
        .then(() => { this.test();this.dialogRef.close() })
    }else{
      this.order.insertConfirmModelDraw(userId, idOrdine, this.data['index'], '0')
        .then(() => {
          let flag = 0;
          this.service.getSelectOrder().value.getArticoli().forEach((element: Articolo) => {
            if (element.getModelloConfermato() === 'vuoto') {
              flag++;
            }
          })
          if (flag === 0) {
            this.order.changeState(userId, idOrdine, 'confermato')
          }
        })
        .then(() => { if (this.service.getSelectOrder().value.getArticoli().length === 1) { this.order.changeState(userId, idOrdine, 'confermato') } })
        .then(() => { this.test(); this.dialogRef.close() })
    }




  }

  test(){
    const userId = this.dataService.getUtente().value.getId()
    const idOrdine = this.service.getSelectOrder().value.getIdOrdine();
    let flag = 0;
    this.service.getSelectOrder().subscribe((ordine) => {
      ordine.getArticoli().forEach((element: Articolo) => {
        if (element.getModelloConfermato() === 'vuoto') {
          flag++;
        }
      })
      if (flag === 0) {
        this.order.changeState(userId, idOrdine, 'confermato')
      }

    })
  }

}
