import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrls: ['./ordini.component.scss']
})
export class OrdiniComponent implements OnInit {
  counter: number;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getCounter().counter.subscribe(data => {
      this.counter = data;
    })
  }

}
