import { Allegato } from './allegato';
import { Articolo } from './articolo';
import { Cerchio } from './cerchio';
import { Quadrilatero } from './quadrilatero';
export class Volantino extends Articolo {
  formato: string;
  orientamento: string;
  monofacciale: boolean;
  cerchio?: Cerchio;
  dimensioni?: Quadrilatero;

  // tslint:disable-next-line:max-line-length
  constructor(idArticolo: string, copie: number, formato: string, monofacciale: boolean, orientamento: string, descrizione?: string, allegato?: string, bozze?: string,
              descrizioneModifica?: string, fileModificaURL?: string, numeroModelliBozze?: string | number,
              modelloConfermato?: string | number) {
    super(idArticolo, 'Volantino', copie, descrizione, allegato, bozze, descrizioneModifica, fileModificaURL,
    numeroModelliBozze, modelloConfermato);
    if (formato === null) { this.formato = '15x21' } else { this.formato = formato; }
    this.orientamento = orientamento;
    this.monofacciale = monofacciale;
    this.cerchio = new Cerchio(0);
    this.dimensioni = new Quadrilatero(0, 0);
  }
}
