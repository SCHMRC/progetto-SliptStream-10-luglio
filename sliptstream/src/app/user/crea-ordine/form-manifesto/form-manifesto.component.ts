import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { formati } from 'src/app/class/enum';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-form-manifesto',
  templateUrl: './form-manifesto.component.html',
  styleUrls: ['./form-manifesto.component.scss']
})
export class FormManifestoComponent implements OnInit {
  articolo: FormGroup;
  img: any[] = [];
  showValue = true;
  formati: any;
  selectedValue: string;
  value: number;
  show = false;
  nameFile: string;
  @Output() output = new EventEmitter<FormGroup>();

  constructor(private service: ServiceService, private fireStorage: FireStorageService) {
    this.articolo = this.service.getForm('manifesto');
    this.service.setFormGroup(this.articolo);
    this.formati = formati.filter(element => element.value === '50x70' || element.value === '70x100' || element.value === '600x300' );
  }

  ngOnInit(): void {
  }

  control(event): void {
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
    if (this.articolo.value.formato === '70x100 cm' || this.articolo.value.formato === '600x300 cm') {
      this.showValue = true;
    } else { this.showValue = false }
  }

  removeImg(): void {
    let numeroArticolo = this.service.selectedArticolo.value
    this.fireStorage.removeFile('allegato', numeroArticolo, this.nameFile)
    this.img = [null];
  }

}
