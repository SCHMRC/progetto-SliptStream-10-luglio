import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {
  counterClienti: number;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getCounter().counterClienti.subscribe(data =>{
      this.counterClienti = data;
    })
  }

}
