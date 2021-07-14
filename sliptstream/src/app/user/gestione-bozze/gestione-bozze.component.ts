import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utente } from 'src/app/class/utente';
import { DataService } from 'src/app/service/data.service';
import { OrderService } from 'src/app/service/order.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-gestione-bozze',
  templateUrl: './gestione-bozze.component.html',
  styleUrls: ['./gestione-bozze.component.scss']
})
export class GestioneBozzeComponent implements OnInit {
  utente: Utente;

  constructor(public service: ServiceService, private route: ActivatedRoute) {
    this.service.setRoute(this.route);
   }

  ngOnInit(): void {

  }

}
