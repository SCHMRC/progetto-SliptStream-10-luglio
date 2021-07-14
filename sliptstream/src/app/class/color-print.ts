import { Allegato } from './allegato';
import { Articolo } from './articolo';
import { Cerchio } from './cerchio';
import { Quadrilatero } from './quadrilatero';
export class ColorPrint extends Articolo{
  dimensioni?: Quadrilatero;
  cerchio: Cerchio;

  constructor(idArticolo: string, copie: number, descrizione?: string, forma?: string, base?: number, altezza?: number,
              diametro?: number, allegato?: string, bozze?: string, descrizioneModifica?: string, fileModificaURL?: string,
              numeroModelliBozze?: string | number, modelloConfermato?: string | number){
    super(idArticolo, 'Colorprint', copie, descrizione, allegato, bozze, descrizioneModifica, fileModificaURL, numeroModelliBozze, modelloConfermato);
    if (forma === 'cerchio') { this.cerchio = new Cerchio(diametro); this.dimensioni = new Quadrilatero(0, 0); }
    else { this.dimensioni = new Quadrilatero(base, altezza); this.cerchio = new Cerchio(0); }

  }
  setCerchio(value: number): void{this.cerchio = new Cerchio(value); }
  getCerchio(): Cerchio{return this.cerchio; }

  getDimensioni(): Quadrilatero {
    return this.dimensioni;
  }

  setDimensioni(value: Quadrilatero): void { this.dimensioni = value; }
}
