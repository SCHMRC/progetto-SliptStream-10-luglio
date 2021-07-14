import { Allegato } from './allegato';
import { Articolo } from './articolo';
import { Cerchio } from './cerchio';
import { Quadrilatero } from './quadrilatero';

export class Prespaziato extends Articolo {
  idArticoloFK: string;
  dimensioni: Quadrilatero;
  cerchio: Cerchio;
  forma: string;
  colore: string;
  vetrofania: boolean;

  constructor(idArticolo: string, copie: number, descrizione: string, colore: string, forma?: string,
              vetrofania?: boolean, diametro?: number, base?: number,
              altezza?: number, allegato?: string, bozze?: string, descrizioneModifica?: string, fileModificaURL?: string,
              numeroModelliBozze?: string | number, modelloConfermato?: string | number) {
    super(idArticolo, 'Prespaziato', copie, descrizione, allegato, bozze, descrizioneModifica, fileModificaURL, numeroModelliBozze, modelloConfermato);
    if (forma === 'cerchio') { this.cerchio = new Cerchio(diametro); this.dimensioni = new Quadrilatero(0, 0); }
    else { this.dimensioni = new Quadrilatero(base, altezza); this.cerchio = new Cerchio(0); }
    this.forma = forma;
    this.vetrofania = vetrofania;
    this.colore = colore;
  }
}
