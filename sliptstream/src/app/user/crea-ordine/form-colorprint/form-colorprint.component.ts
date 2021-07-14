import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forme } from 'src/app/class/enum';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-form-colorprint',
  templateUrl: './form-colorprint.component.html',
  styleUrls: ['./form-colorprint.component.scss']
})
export class FormColorprintComponent implements OnInit {
  articolo: FormGroup;
  img: any[] = [];
  forme = forme;
  selectedForma = 'poligono';
  value: number;
  show = false;
  nameFile: string;
  @Output() output = new EventEmitter<FormGroup>();
  constructor(private service: ServiceService, private fireStorage: FireStorageService) { }

  ngOnInit(): void {
    this.articolo = this.service.getForm('colorprint');
    this.service.setFormGroup(this.articolo);
  }

  // tslint:disable-next-line:jsdoc-format
  /**questo metodo tiene costantemente aggiornato il componente padre */
  control(event): void {
    this.articolo = this.service.getValidator(this.articolo)
   // this.img = this.service.getImg(this.articolo, this.img);
    this.output.emit(this.articolo);
    (this.articolo.valid) ? this.service.setStatus(false) : this.service.setStatus(true);
  }

  onChange(): void {
    this.articolo.controls.base.setValue('')
    this.articolo.controls.altezza.setValue('')
    this.articolo.controls.diametro.setValue('')
    this.selectedForma = this.articolo.value['forma']
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
