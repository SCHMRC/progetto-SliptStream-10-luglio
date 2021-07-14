export class Bozza {
  idBozza: string;
  emailFK: string;
  img: any;
  descrizione?: string;
  conferma: boolean;
  articoloFK?: string;


  constructor(idBozza: string, emailFK: string, img: any, descrizione?: any){
    this.idBozza = idBozza;
    this.emailFK = emailFK;
    this.img = img;
    this.descrizione = descrizione;
  }

  getIdBozza(): string{return this.idBozza; }
  setIdBozza(value: string): void{this.idBozza = value; }
  getEmailFK(): string { return this.emailFK; }
  setEmailFK(value: string): void{this.emailFK = value; }
  getImg(): any{ return this.img; }
  setImg(value: string): void {this.img = value; }
  setDescrizione(value: string): void{this.descrizione = value; }
  getDescrizione(): string { return this.descrizione; }

  setConferma(value: boolean): void{
    this.conferma = value;
  }
  getConferma(): boolean{return this.conferma; }

  setArticoloFK(value: string): void{
    this.articoloFK = value;
  }
  getArticoloFK(): string{return this.articoloFK; }



}
