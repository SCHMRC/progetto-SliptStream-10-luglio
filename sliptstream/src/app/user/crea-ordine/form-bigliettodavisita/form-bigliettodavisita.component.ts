import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-form-bigliettodavisita',
  templateUrl: './form-bigliettodavisita.component.html',
  styleUrls: ['./form-bigliettodavisita.component.scss']
})
export class FormBigliettodavisitaComponent implements OnInit {
  articolo: FormGroup;
  img: any[] = [];
  value: number;
  show = false;
  nameFile: string;
  @Output() output = new EventEmitter<FormGroup>();

  constructor(private service: ServiceService, private fireStorage: FireStorageService) {
    this.articolo = this.service.getForm('biglietto_da_visita')
    this.service.setFormGroup(this.articolo);
  }

  ngOnInit(): void {
  }

  control(event): void {
    //this.img = this.service.getImg(this.articolo, this.img);
    this.output.emit(this.articolo);
    (this.articolo.valid) ? this.service.setStatus(false) : this.service.setStatus(true);
  }

  onChange(): void {
    this.articolo.controls.base.setValue('')
    this.articolo.controls.altezza.setValue('')
  }
  upload() {
    this.service.progress.subscribe(data => {
      const mypromise = new Promise((resolve, reject) => {
        this.show = true;
        this.value = data;
        if (this.value == 100) {
          setTimeout(() => { resolve(this.value) }, 700)
        }
      });
      mypromise.then(() => { this.show = false })
    })
    this.nameFile = this.articolo.value.allegati.files[0].name
    this.img = this.service.getImg(this.articolo, this.img);
    this.output.emit(this.articolo);
  }

  removeImg(): void {
    let numeroArticolo = this.service.selectedArticolo.value
    this.fireStorage.removeFile('allegato', numeroArticolo, this.nameFile)
    this.img = [null];
  }

}
