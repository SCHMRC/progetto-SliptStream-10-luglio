import { Articolo } from './articolo';
import { Quadrilatero } from './quadrilatero';
import { Cerchio } from './cerchio';
import { Allegato } from './allegato';

export class Semiespanso extends Articolo {
  cerchio?: Cerchio;
  dimensioni?: Quadrilatero;
  spessore: string;
  forma: string;
  monofacciale: boolean;
  constructor(idArticolo: string, copie: number, descrizione: string, spessore: string, monofacciale: boolean, forma?: string, diametro?: number,
              base?: number, altezza?: number, allegato?: string, bozze?: string, descrizioneModifica?: string, fileModificaURL?: string,
              numeroModelliBozze?: string | number, modelloConfermato?: string | number) {
    super(idArticolo, 'Semiespanso', copie, descrizione, allegato,
    bozze, descrizioneModifica, fileModificaURL, numeroModelliBozze, modelloConfermato);
    if (forma === 'cerchio') { this.cerchio = new Cerchio(diametro); this.dimensioni = new Quadrilatero(0, 0); }
    else { this.dimensioni = new Quadrilatero(base, altezza); this.cerchio = new Cerchio(0); }
    this.spessore = spessore;
    this.forma = forma;
    this.monofacciale = monofacciale;
  }
}
