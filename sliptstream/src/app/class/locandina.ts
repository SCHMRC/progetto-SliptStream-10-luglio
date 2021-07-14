import { Allegato } from './allegato';
import { Articolo } from './articolo';
import { Cerchio } from './cerchio';
import { Quadrilatero } from './quadrilatero';

export class Locandina extends Articolo {
  formato: string;
  orientamento: string;
  cerchio?: Cerchio;
  dimensioni: Quadrilatero;

  constructor(idArticolo: string, copie: number, formato: string, orientamento: string, descrizione?: string, allegato?: string, bozze?: string,
              descrizioneModifica?: string, fileModificaURL?: string, numeroModelliBozze?: string | number,
              modelloConfermato?: string | number){
    super(idArticolo, 'Locandina', copie, descrizione, allegato, bozze, descrizioneModifica, fileModificaURL, numeroModelliBozze, modelloConfermato);
    if (formato === null) { this.formato = '29,7x42' } else { this.formato = formato; }
    this.orientamento = orientamento;
    this.cerchio = new Cerchio(0);
    this.dimensioni = new Quadrilatero(0, 0);
  }

  getFormato(): string{return this.formato; }
  setFormato(value: string): void{this.formato = value; }

}
