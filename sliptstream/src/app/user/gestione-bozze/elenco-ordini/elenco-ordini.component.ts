import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { OrderService } from 'src/app/service/order.service';
import { ServiceService } from 'src/app/service/service.service';
import { MatPaginator } from '@angular/material/paginator';
import { Ordine } from 'src/app/class/ordine';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Articolo } from 'src/app/class/articolo';

@Component({
  selector: 'app-elenco-ordini-bozza',
  templateUrl: './elenco-ordini.component.html',
  styleUrls: ['./elenco-ordini.component.scss']
})
export class ElencoOrdiniBozzaComponent implements OnInit {
  error: any;
  public searchString = '';
  dataSource: MatTableDataSource<Ordine>;
  obs: Observable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private searchTerms: Subject<string> = new Subject();

  ordini: Ordine[] = [];
  index: number;

  constructor(private service: ServiceService, private router: Router, private route: ActivatedRoute, private data: DataService,
              private orderService: OrderService) {
    if (this.data.getUtente().value.getRuolo() == 'CLIENTE') { this.init(); } else { this.initGrafico() }
              }

  ngOnInit(): void {
  }
  init(): void {
    this.orderService.getOrder(this.data.getUtente().value.getId()).subscribe(data => {
      let articoli: Articolo[] = [];
      this.ordini = [];
      let stato: string[] = []
      Object.entries(data).forEach(([key, value]) => {
        articoli = this.data.buildArticoloCopia(value['articoli']);
        if (value['stato'] === 'in attesa') {
          stato.push(value['stato']);
          this.ordini.push(this.data.buildOrdineCopia(value, articoli));
        }
      })
      this.service.setStato(stato);
      this.dataSource = new MatTableDataSource<Ordine>(this.ordini);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }
  initGrafico(): void {
    let articoli: Articolo[] = [];
    let stato: string[] = []

    this.orderService.getAllOrder().subscribe(ordini => {
      this.ordini = [];
      Object.entries(ordini).forEach(([key, value]) => {
        Object.entries(value).forEach(([k, v]) => {
          if (v['grafico'] === this.data.getUtente().value.getEmail() || v['emailFK'] === this.data.getUtente().value.getEmail()) {
            articoli = this.data.buildArticoloCopia(v['articoli'])
            if ((v['stato'] === 'in attesa')) {
              stato.push(v['stato']);
              this.ordini.push(this.data.buildOrdineCopia(v, articoli));
            }
          }
        })
      });
      this.service.setStato(stato);
      this.dataSource = new MatTableDataSource<Ordine>(this.ordini);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })

  }

  search(): void {
    this.searchTerms.next(this.searchString);
    const emailFK = this.data.getUtente().value.getEmail();
    if (this.searchString !== '') {
      this.searchTerms.pipe(
        debounceTime(700),
        distinctUntilChanged()
      ).subscribe(data => {
        let x = this.ordini.filter(res => { return res.getNome().match(data) })
        this.dataSource = new MatTableDataSource<Ordine>(x);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      });
    } else {
      this.init();
    }
  }


  onClick(param: Ordine, indice: number): void {
    this.service.setSelectOrder(param);
    this.router.navigate(['element', param.getIdOrdine(), indice], { relativeTo: this.service.getRoute().value });
    this.service.setArticle(param.getArticoli(), this.service.getStato(indice))
  }

}
