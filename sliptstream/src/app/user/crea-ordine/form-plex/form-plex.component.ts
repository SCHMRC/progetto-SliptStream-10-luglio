import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { forme, spessore } from 'src/app/class/enum';
import { ServiceService } from 'src/app/service/service.service';
import { ThemePalette } from '@angular/material/core';
import { FireStorageService } from 'src/app/service/fire-storage.service';

@Component({
  selector: 'app-form-plex',
  templateUrl: './form-plex.component.html',
  styleUrls: ['./form-plex.component.scss']
})
export class FormPlexComponent implements OnInit {
  articolo: FormGroup;
  forme = forme;
  selectedForma = 'poligono';
  spessori = spessore;
  img: any[] = [];
  value: number;
  show = false;
  nameFile: string;
  @Output() output = new EventEmitter<FormGroup>()

  constructor(private service: ServiceService, private fireStorage: FireStorageService) {
    this.articolo = this.service.getForm('plex');
    this.service.setFormGroup(this.articolo);
  }

  ngOnInit(): void {
  }

  control(event): void {
    this.articolo = this.service.getValidator(this.articolo);
   // this.img = this.service.getImg(this.articolo, this.img);
    this.output.emit(this.articolo);
    (this.articolo.valid) ? this.service.setStatus(false) : this.service.setStatus(true);

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

  onChange() {
    this.articolo.controls.base.setValue('')
    this.articolo.controls.altezza.setValue('')
    this.articolo.controls.diametro.setValue('')
    this.selectedForma = this.articolo.value['forma'];
  }

  option(){
    (this.articolo.value.trasparente) ? this.articolo.get('vetrofania').disable() : this.articolo.get('vetrofania').enable();
    (this.articolo.value.trasparente) ? this.articolo.get('biancoRetro').disable() : this.articolo.get('biancoRetro').enable();
    this.articolo.controls.vetrofania.setValue(false);
    this.articolo.controls.biancoRetro.setValue('');
  }

  removeImg(): void {
    let numeroArticolo = this.service.selectedArticolo.value
    this.fireStorage.removeFile('allegato', numeroArticolo, this.nameFile)
    this.img = [null];
  }

}
