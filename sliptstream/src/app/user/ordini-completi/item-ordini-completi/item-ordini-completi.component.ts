import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Articolo } from 'src/app/class/articolo';
import { Ordine } from 'src/app/class/ordine';
import { DataService } from 'src/app/service/data.service';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { OrderService } from 'src/app/service/order.service';
import { ServiceService } from 'src/app/service/service.service';


@Component({
  selector: 'app-item-ordini-completi',
  templateUrl: './item-ordini-completi.component.html',
  styleUrls: ['./item-ordini-completi.component.scss']
})
export class ItemOrdiniCompletiComponent implements OnInit {
  stato: boolean;
  ruolo: string;
  item: Ordine;
  articoli: BehaviorSubject<Articolo[]> = new BehaviorSubject(null);
  form: FormGroup;
  img: string;
  imgModifica: string;
  imgDraft: string;
  @Input() id: string;

  constructor(private service: ServiceService, private router: Router, private data: DataService, private order: OrderService,
    private active: ActivatedRoute, private fb: FormBuilder, private fireStorage: FireStorageService) {
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
    )}

  onClick() {
    this.router.navigate(['list'], { relativeTo: this.service.getRoute().value })
  }

  getAllegati(param): void {
    this.articoli.subscribe(data => {
      this.img = data[param].getAllegati();
    })
  }

  getBozze(param): void {
    this.articoli.subscribe(data => {
      this.imgDraft = data[param].getBozze();
    })
  }

  getModificaURL(param): void {
    this.articoli.subscribe(data => {
      this.imgModifica = data[param].getfileModificaURL();
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

}
