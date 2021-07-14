import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Ordine } from 'src/app/class/ordine';
import { DataService } from 'src/app/service/data.service';
import { ServiceService } from 'src/app/service/service.service';
import { debounceTime, switchMap, distinctUntilChanged, startWith, share } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { OrderService } from 'src/app/service/order.service';
import { Articolo } from 'src/app/class/articolo';

@Component({
  selector: 'app-ordini-completi',
  templateUrl: './ordini-completi.component.html',
  styleUrls: ['./ordini-completi.component.scss']
})
export class OrdiniCompletiComponent implements OnInit {
  nome: string;

  constructor(public service: ServiceService, private route: ActivatedRoute, private data: DataService) {
    this.service.setRoute(this.route);
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  selectItem(): void {

  }
}
