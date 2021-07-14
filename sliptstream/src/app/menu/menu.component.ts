import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  verify = false;

  constructor(private router: Router, private service: ServiceService, private data: DataService) { }

  ngOnInit(): void {
    this.service.getLogged().subscribe(verify => {
      this.verify = verify;
    });
  }

  route(evento: any): void {
    let route: string = evento.target.textContent;
    this.router.navigate([route.toLowerCase(), this.data.getUtente().value.getNome()]);
  }

  openDialog(): void {
    this.router.navigate(['login']);
  }

  onClick(){
    this.service.setLogged(false);
    this.service.setImgList([]);
    this.data.setUtente(null)
    this.router.navigate(['home'])
  }
}
