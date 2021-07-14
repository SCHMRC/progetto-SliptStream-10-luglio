import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-riepilogo-ordine',
  templateUrl: './riepilogo-ordine.component.html',
  styleUrls: ['./riepilogo-ordine.component.scss']
})
export class RiepilogoOrdineComponent implements OnInit {
  @Input() articoli: FormGroup[] = [];


  constructor(private service: ServiceService) {

  }

  ngOnInit(): void {
  }

}
