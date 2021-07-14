import { Allegato } from './allegato';
import { Articolo } from './articolo';
import { Cerchio } from './cerchio';
import { Quadrilatero } from './quadrilatero';

export class Banner  extends Articolo{
  monofacciale: boolean;
  occhielli: boolean;
  pieghe: boolean;
  dimensioni: Quadrilatero;
  cerchio?: Cerchio;


  constructor(idArticolo: string, copie: number, base: number, altezza: number,
              monofacciale: boolean, pieghe: boolean, occhielli: boolean, descrizione?: string, allegato?: string, bozze?: string,
              descrizioneModifica?: string, fileModificaURL?: string, numeroModelliBozze?: string | number,
              modelloConfermato?: string | number){
    super(idArticolo, 'Banner', copie, descrizione, allegato, bozze, descrizioneModifica, fileModificaURL, numeroModelliBozze, modelloConfermato);
    this.dimensioni = new Quadrilatero(base, altezza);
    this.monofacciale = monofacciale;
    this.occhielli = occhielli;
    this.pieghe = pieghe;
    this.cerchio = new Cerchio(0);
  }

  getMonofacciale(): boolean{
    return this.monofacciale;
  }
  getOcchielli(): boolean{
    return this.monofacciale;
  }
  getPieghe(): boolean{
    return this.pieghe;
  }
  getQuadrilatero(): Quadrilatero{
    return this.dimensioni;
  }

  setMonofacciale(value: boolean): void{this.monofacciale = value; }
  setOcchielli(value: boolean): void{this.occhielli = value; }
  setPieghe(value: boolean): void{this.pieghe = value; }
  setQuadrilatero(value: Quadrilatero): void { this.dimensioni = value; }

}
