import { Allegato } from './allegato';
import { Bozza } from './bozza';
export class Articolo {
  private supporto: string;
  private copie = 1;
  private descrizione?: string;
  private idOrdineFK: string;
  private bozze?: string;
  private allegato?: string;
  private fileModificaURL: string;
  private descrizioneModifica: string;
  private numeroModelliBozze: string | number;
  private modelloConfermato: string | number;
  private idArticolo: string;
  //tslint:disable

  constructor(idArticolo: string, supporto: string, copie: number, descrizione?: string, allegato?: string, bozze?: string, descrizioneModifica?: string,
    fileModificaURL?: string, numeroModelliBozze?: string | number, modelloConfermato?: string | number){
    this.idArticolo = idArticolo;
    this.supporto = supporto;
    this.copie = copie;
    this.descrizione = descrizione;
    (numeroModelliBozze == null || numeroModelliBozze == undefined) ? this.numeroModelliBozze = 'vuoto' : this.numeroModelliBozze = numeroModelliBozze;
    (modelloConfermato == null || modelloConfermato == undefined) ? this.modelloConfermato = 'vuoto' : this.modelloConfermato = modelloConfermato;
    (allegato == null || allegato == undefined) ? this.allegato = 'vuoto' : this.allegato = allegato;
    (bozze == null || bozze == undefined) ? this.bozze = 'vuoto' : this.bozze = bozze;
    (fileModificaURL == null || fileModificaURL == undefined) ? this.fileModificaURL = 'vuoto' : this.fileModificaURL = fileModificaURL;
    (descrizioneModifica == null || descrizioneModifica == undefined) ? this.descrizioneModifica = 'vuoto' : this.descrizioneModifica = descrizioneModifica;
  }

  serviceArticolo(url: string, param: string){
    (url == null || url == undefined) ? param = 'vuoto' : param = url;
  }

  getSupporto(): string{
    return this.supporto;
  }
  setSupporto(param: string): void{
    this.supporto = param;
  }
  getArticloId(): string { return this.idArticolo; }
  getCopie(): number{return this.copie; }
  getDescrizione(): string{return this.descrizione; }
  getIdOrdineFK(): string{return this.idOrdineFK; }
  getBozze(): string{return this.bozze; }
  getAllegati(): string{return this.allegato; }
  getfileModificaURL(): string { return this.fileModificaURL; }
  getNumeroModelliBozze(): string | number { return this.numeroModelliBozze; }
  getModelloConfermato(): number | string { return this.modelloConfermato; }

  setBozza(bozze: string): void{
    this.bozze = bozze;
  }
  setAllegati(value: string): void { this.allegato = value; }

  setArticoloId(value: string): void{
    this.idArticolo = value;
  }
  setIdOrdineFK(value: string): void{
    this.idOrdineFK = value;
  }



}
