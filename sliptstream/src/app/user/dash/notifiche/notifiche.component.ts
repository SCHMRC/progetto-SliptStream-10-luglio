import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Articolo } from 'src/app/class/articolo';
import { Ordine } from 'src/app/class/ordine';
import { DataService } from 'src/app/service/data.service';
import { OrderService } from 'src/app/service/order.service';
import { ServiceService, Statistic } from 'src/app/service/service.service';
import { UserService } from 'src/app/service/user.service';

export interface TableData {
  name: string;
  position: number;
  articoli: number;
  emailFK: string;
}



export interface TableDataDraw {
  name: string;
  position: number;
  articoli: number;
  stato: string;
}




@Component({
  selector: 'app-notifiche',
  templateUrl: './notifiche.component.html',
  styleUrls: ['./notifiche.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class NotificheComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'emailFK', 'articoli'];
  //displayedColumnsDraw: string[] = ['position', 'name', 'stato', 'articoli'];
  ruolo: string;
  tableData: TableData[] = [];
  tableDataDrow: TableDataDraw[] = [];
  public subject: BehaviorSubject<TableDataDraw[]> = new BehaviorSubject(null);
  date: Date;



  constructor(private data: DataService, private order: OrderService,private user: UserService, private service: ServiceService) {
    this.date = new Date()
    let statistic: Statistic[] = [];
    let articoli: Articolo[] = [];
    let artConBozze: Articolo[] = [];
    let ordine: Ordine[] = [];
    let ordineConBozze: Ordine[] = [];
    let date = new Date();
    let table: any[] = [];
    let tableBozza: any[] = [];
    let count = 0;
    let ordini: Ordine[] = [];
    let countClienti = new Set<string>();
    this.tableData = [];
    this.data.getUtente().subscribe(utente => {
      this.ruolo = utente.getRuolo();
      if (this.ruolo === 'GRAFICO') {
        this.order.getAllOrder().subscribe(orders => {
          Object.entries(orders).forEach(([key, value]) => {
            Object.entries(value).forEach(([k, v]) => {
              let tempDate = new Date(v['data']);
              if (v['grafico'] === this.data.getUtente().value.getEmail() && v['stato'] !== 'confermato')
                  {count++;}
              if (v['grafico'] === this.data.getUtente().value.getEmail()
                  && (date.getDate() == tempDate.getDate() && date.getMonth() == tempDate.getMonth() && v['stato'] !== 'confermato' && v['stato'] !== 'in attesa')) {
                articoli = this.data.buildArticoloCopia(v['articoli']);
                ordine.push(this.data.buildOrdineCopia(v, articoli))
              }
              if (v['grafico'] === this.data.getUtente().value.getEmail()){
                ordini.push(this.data.buildOrdineCopia(v, articoli))
                countClienti.add(v['emailFK'])
              }




            });
          });
          this.service.setCounter(count, countClienti.size);
          this.service.setStatistic(countClienti, ordini);

          ordine.forEach((element, index) => {

            table.push({
              position: index + 1, name: element.getNome(),
              emailFK: element.getEmailFK(), articoli: element.getArticoli().length
            });

          });
          this.tableData = table;
        });


      } else {
        let userId = this.data.getUtente().value.getId()
        this.order.getOrder(userId).subscribe(orders => {
          Object.entries(orders).forEach(([key, value]) => {
              let tempDate = new Date(value['data']);
              if ((date.getDate() == tempDate.getDate() && date.getMonth() == tempDate.getMonth()) && value['stato'] !== 'confermato' && value['stato'] !== 'in attesa') {
                articoli = this.data.buildArticoloCopia(value['articoli']);
                ordine.push(this.data.buildOrdineCopia(value, articoli))
              }
              if (value['stato'] === 'in attesa'){
                artConBozze = this.data.buildArticoloCopia(value['articoli']);
                ordineConBozze.push(this.data.buildOrdineCopia(value, artConBozze))
              }


          });

          ordineConBozze.forEach((element, index) => {
            console.log(element.getStato())
            tableBozza.push({
              position: index + 1, name: element.getNome(),
              stato: element.getStato(), articoli: element.getArticoli().length
            });

          });

          ordine.forEach((element, index) => {
            table.push({
              position: index + 1, name: element.getNome(),
              emailFK: element.getEmailFK(), articoli: element.getArticoli().length
            });

          });
          this.tableDataDrow = tableBozza;
          this.subject.next(this.tableDataDrow);
          this.tableData = table;
        });


      }
    })
  }

  ngOnInit(): void {

  }

}

@Component({
  selector: 'app-draw-notifiche',
  templateUrl: './notifiche.Drawcomponent.html',
  styleUrls: ['./notifiche.component.scss']
})
export class NotificheDrawComponent implements OnInit {
  displayedColumnsDraw: string[] = ['position', 'name', 'stato', 'articoli'];
  tableDataDrow: TableDataDraw[] = [];

  constructor(private notifice: NotificheComponent){}

  ngOnInit(){
    this.notifice.subject.subscribe(data =>
      this.tableDataDrow = data)
    let artConBozze: Articolo[] = [];
    let ordineConBozze: Ordine[] = [];
    let tableBozza: any[] = [];
  }

}
