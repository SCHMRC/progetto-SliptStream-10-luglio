import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { formati } from 'src/app/class/enum';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-form-volantino',
  templateUrl: './form-volantino.component.html',
  styleUrls: ['./form-volantino.component.scss']
})
export class FormVolantinoComponent implements OnInit {
  articolo: FormGroup;
  img: any[] = [];
  value: number;
  show = false;
  nameFile: string;
  formati = formati.filter(element => element.value === '15x21' || element.value === '21x29,7')
  @Output() output = new EventEmitter<FormGroup>();

  constructor(private service: ServiceService, private fireStorage: FireStorageService) {
    this.articolo = this.service.getForm('volantino');
    this.service.setFormGroup(this.articolo);
  }

  ngOnInit(): void {
  }

  control(event): void {
    //this.img = this.service.getImg(this.articolo, this.img);
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
  }

  removeImg(): void {
    let numeroArticolo = this.service.selectedArticolo.value
    this.fireStorage.removeFile('allegato', numeroArticolo, this.nameFile)
    this.img = [null];
  }


}
