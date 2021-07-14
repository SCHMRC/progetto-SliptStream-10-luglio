import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forme } from 'src/app/class/enum';
import { FireStorageService } from 'src/app/service/fire-storage.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-form-adesivo',
  templateUrl: './form-adesivo.component.html',
  styleUrls: ['./form-adesivo.component.scss']
})
export class FormAdesivoComponent implements OnInit {
  articolo: FormGroup;
  forme = forme;
  selectedForma = 'poligono';
  srcResult: any;
  img: any[] = [];
  value: number;
  show = false;
  nameFile: string;
  @Output() output = new EventEmitter<FormGroup>();


  constructor(private service: ServiceService, private fireStorage: FireStorageService) {
    this.articolo = this.service.getForm('adesivo');
    this.service.setFormGroup(this.articolo);
   }

  ngOnInit(): void {

  }

  /**questo metodo tiene costantemente aggiornato il componente padre */
   control(event): void{

       //this.articolo = this.service.getValidator(this.articolo);
       //this.img = this.service.getImg(this.articolo, this.img);
       (this.articolo.valid) ? this.service.setStatus(false) : this.service.setStatus(true);
       this.output.emit(this.articolo);


   }

   upload(){
     this.service.progress.subscribe(data => {
       const mypromise = new Promise((resolve, reject) => {
         this.show = true;
         this.value = data;
         if(this.value == 100){
           setTimeout(() => { resolve(this.value)}, 700)
         }
       });
       mypromise.then(() => {this.show = false})
     })
     this.nameFile = this.articolo.value.allegati.files[0].name
     this.img = this.service.getImg(this.articolo, this.img);
     this.output.emit(this.articolo);
   }

   onChange(){
     this.articolo.controls.base.setValue('')
     this.articolo.controls.altezza.setValue('')
     this.articolo.controls.diametro.setValue('')
     this.selectedForma = this.articolo.value['forma']
   }



   removeImg(event): void{
     let numeroArticolo = this.service.selectedArticolo.value
     this.fireStorage.removeFile('allegato', numeroArticolo ,this.nameFile)
     this.img = [null];
     this.show = false
     this.value = -1;
   }
}
