import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-form-banner',
  templateUrl: './form-banner.component.html',
  styleUrls: ['./form-banner.component.scss']
})
export class FormBannerComponent implements OnInit {
  articolo: FormGroup;
  img: any[] = [];
  value: number;
  show = false;
  @Output() output = new EventEmitter<FormGroup>();
  nameFile: string;

  constructor(private service: ServiceService, private fireStorage: FireStorageService) { }

  ngOnInit(): void {
    this.articolo = this.service.getForm('banner');
    this.service.setFormGroup(this.articolo);
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
