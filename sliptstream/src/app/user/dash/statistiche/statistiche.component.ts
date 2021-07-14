import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { OrderService } from 'src/app/service/order.service';
import { ServiceService } from 'src/app/service/service.service';
import { UserService } from 'src/app/service/user.service';

interface SaleData{
  name: string;
  value: number;
}

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.scss']
})
export class StatisticheComponent implements OnInit, OnDestroy {
  saleData: SaleData[] = [];
  clienti: string[] = [];
  x: any[] = [];


  constructor(private data: DataService, private order: OrderService, private user: UserService, private service: ServiceService) {
    let temp = new Array<SaleData>();
    this.service.getStatistic().clienti.subscribe(clienti => {
      if (clienti !== null){
        this.clienti = [];
        this.x = [];
        clienti.forEach(cliente => {
          this.clienti.push(cliente);
        });
        this.service.getStatistic().ordini.subscribe(ordini => {
          if (ordini !== null){

            for (let i = 0; i < this.clienti.length; i++){
              this.x.push(ordini.filter(ordine => ordine.getEmailFK() == this.clienti[i]))
            }
            this.clienti.forEach((element, index) => {
              temp.push({ name: element, value: this.x[index].length })
            });
            this.saleData = temp;
          }

        });

      }


    });
   }
  ngOnDestroy(): void {
    this.service.setStatistic(null, null)

    this.clienti = [];
    this.x = [];

  }
  ngOnInit(): void {

  }




}
