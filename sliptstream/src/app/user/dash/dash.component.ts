import { Component } from '@angular/core';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {
  date: string;
  ruolo: string;
  /** Based on the screen size, switch from standard to one column per row */

  constructor(private data: DataService) {
    this.date = new Date().toString();
    this.ruolo = this.data.getUtente().value.getRuolo();
  }
}
