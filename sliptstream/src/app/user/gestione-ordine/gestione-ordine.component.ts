import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-gestione-ordine',
  templateUrl: './gestione-ordine.component.html',
  styleUrls: ['./gestione-ordine.component.scss']
})
export class GestioneOrdineComponent implements AfterViewInit, OnInit {
  nome: string;

  constructor(public service: ServiceService, private route: ActivatedRoute, private data: DataService) {
    this.service.setRoute(this.route);
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  selectItem(): void{
    console.log('xxx')
 

  }








}
