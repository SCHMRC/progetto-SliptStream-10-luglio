import { EventEmitter, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Articolo } from '../class/articolo';
import { Ordine } from '../class/ordine';
import { Utente } from '../class/utente';
import { FireStorageService, FilesUploadMetadata } from './fire-storage.service';
//tslint:disable


export interface data {
  articoli$: BehaviorSubject<Articolo[]>;
  stato: BehaviorSubject<string>;
}
export interface Counter {
  counter: BehaviorSubject<number>;
  counterClienti: BehaviorSubject<number>;
}
export interface Statistic {
  clienti: BehaviorSubject<Set<string>>;
  ordini: BehaviorSubject<Ordine[]>;
}
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private $formGroup: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
  private $status: BehaviorSubject<boolean> = new BehaviorSubject(false); //verifica lo stato del form
  private $stato: BehaviorSubject<string[]> = new BehaviorSubject(null); //
  private $selectOrder: BehaviorSubject<Ordine> = new BehaviorSubject(null)
  private $route: BehaviorSubject<ActivatedRoute> = new BehaviorSubject(null);
  private $index: BehaviorSubject<number> = new BehaviorSubject(null);
  private $logged: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private $selectArticle: BehaviorSubject<Articolo[]> = new BehaviorSubject(null);
  public $imgURL: BehaviorSubject<string[]> = new BehaviorSubject(['vuoto']);
  private stato: BehaviorSubject<string> = new BehaviorSubject(null);
  private counter: BehaviorSubject<number> = new BehaviorSubject(null);
  private counterClienti: BehaviorSubject<number> = new BehaviorSubject(null);
  private setClienti: BehaviorSubject<Set<string>> = new BehaviorSubject(null);
  private ordini: BehaviorSubject<Ordine[]> = new BehaviorSubject(null);
  public progress: BehaviorSubject<number> = new BehaviorSubject(null);
  public test: BehaviorSubject<number> = new BehaviorSubject(0);
  public selectedArticolo: BehaviorSubject<number> = new BehaviorSubject(1);


  imgList: string[] = [];
  private $imgList: BehaviorSubject<string[]> = new BehaviorSubject([]);

  constructor(private fb: FormBuilder, private fireStorage: FireStorageService) { }



  getStatistic(): Statistic{
    return {
      clienti: this.setClienti,
      ordini: this.ordini
    }

  }

  setStatistic(param1: Set<string>, param2: Ordine[]){
    this.setClienti.next(param1);
    this.ordini.next(param2);

  }

  setCounter(paramOrdini: number, paramClienti?: number){
    this.counter.next(paramOrdini)
    this.counterClienti.next(paramClienti)
  }

  getCounter(): Counter{
    return {
      counter: this.counter,
      counterClienti: this.counterClienti
    }
  }

  setIndex(param: number){
    this.$index.next(param)
  }

  getIndex(){
    return this.$index;
  }

  setImgList(param: string[]): void{
    this.$imgList.next(param)
  }

  getImgList(): BehaviorSubject<string[]>{
    return this.$imgList
  }

  setStato(stato: string[]){
    this.$stato.next(stato)
  }

  getStato(index: number): string{
    return this.$stato.value[index];
  }

  setArticle(param, stato?){
    this.$selectArticle.next(param)
    this.stato.next(stato)
  }

  getArticle(): data{
    return {
      articoli$: this.$selectArticle,
      stato: this.stato
    }
  }

  setLogged(param: boolean){
    this.$logged.next(param);
  }
  getLogged(): BehaviorSubject<boolean>{
    return this.$logged;
  }

  setRoute(param: ActivatedRoute): void {
    this.$route.next(param);
  }

  getRoute(): BehaviorSubject<ActivatedRoute> {
    return this.$route;
  }

  setSelectOrder(param: Ordine): void{
    this.$selectOrder.next(param);
  }

  getSelectOrder(): BehaviorSubject<Ordine>{
    return this.$selectOrder;
  }

  setReadonly(): void {
    (this.getRadonly()) ? this.readonly.next(false) : this.readonly.next(true);
  }

  getRadonly(): boolean{
    return this.readonly.getValue();
  }

  subReadonly(): BehaviorSubject<boolean> {
    return this.readonly;
  }

  setFormGroup(param: FormGroup): void{
    this.$formGroup.next(param);
  }
  getFormGroup(): BehaviorSubject<FormGroup>{
    return this.$formGroup;
  }
  setStatus(param: boolean): void{
    this.$status.next(param);
  }
  getStatus(): BehaviorSubject<boolean>{
    return this.$status;
  }

  /**
   * Permette di costruire il form valido per tutti gli articoli
   * @param supporto l'articolo che tipo di supporto deve avere
   * @returns un FormGoup con i parametri necessari per il form
   */

  getForm(supporto: string): FormGroup{
    let form: FormGroup =  this.fb.group({
      supporto: [supporto],
      copie: [1, [Validators.required]],
      descrizione: [''],
      allegati: ['vuoto'],
      base: [''],
      altezza: [''],
      diametro: [''],
      forma: ['poligono'],
      opzioni: ['0'],
      laminazione: ['nessuna'],
      spec: [''],
      monofacciale: ['true'],
      pieghe: [false],
      occhielli: [false],
      plastificato: [false],
      orientamento: [''],
      spessore: ['3mm', [Validators.required]],
      spazzolato: [false],
      formato: [],
      trasparente: [false],
      colore: [''],
      vetrofania: [{value: false, disabled: true}],
      biancoRetro: [{value: false, disabled: true}]
    });

    (form.value.supporto === 'prespaziato') ? form.get('vetrofania').enable() : form.get('vetrofania').disable();
    (form.value.supporto === 'volantino') ? form.get('orientamento').setValue('verticale') : form.get('orientamento').setValue('orizzontale') ;
    return form;
  }

  /**metodo che permette di settare i vincoli del formGroup a seconda dei casi
   * riceve in ingresso un articolo
   * restituisce un articolo con nuovi vincoli
   */
  getValidator(articolo: FormGroup): FormGroup {
    if (articolo.value.forma !== 'cerchio') {
      articolo.controls.base.setValidators(Validators.required);
      articolo.controls.altezza.setValidators(Validators.required);
    } else {
      articolo.controls.diametro.setValidators(Validators.required);
    }
    return articolo;
  }

  /**metodo che permette la lettura delle immagini caricate per visualizzare l'anteprima
   * riceve in ingresso un vettore che rappresentano le immagini
   * restituisce un vettore con i src da insewrire nel tag IMG
   */
  getImg(articolo: FormGroup, img: any[]): any[]{
    let x = this.test.value + 1;
    this.test.next(x);
      articolo.value.allegati.files.forEach((file, index) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => { img[index] = event.target.result; };

        let ob$ = this.uploadImg(file, this.selectedArticolo.value); //<- carica immagine

        ob$.uploadProgress$.subscribe(data => {
          this.progress.next(data)
        })
        ob$.downloadUrl$.subscribe(
          (data)=>{
            let temp = this.getImgList().value
            temp.push(data)
            this.setImgList(temp)
            this.$imgURL.next(this.getImgList().value)
        })
      });
    return img;
  }

  getImgURL(): BehaviorSubject<string[]>{
    return this.$imgURL;
  }

  uploadImg(file: File, index: number): FilesUploadMetadata {

    return this.fireStorage.uploadFileAndGetMetadata('allegato', file, index);

  }
}
