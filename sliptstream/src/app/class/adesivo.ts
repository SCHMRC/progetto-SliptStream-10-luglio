import { Articolo } from './articolo';
import { Quadrilatero } from './quadrilatero';
import { Cerchio } from './cerchio';
import { Laminazione } from './enum';
import { Allegato } from './allegato';



export class Adesivo extends Articolo{
  dimensioni?: Quadrilatero;
  cerchio?: Cerchio;
  forma ? = 'rettangolo';
  laminazione: string;
  opzioni: string;

  constructor(idArticolo: string, copie: number, descrizione?: string, allegati?: string,
              forma?: string, opzioni?: string, laminazione?: string,
              diametro?: number, base?: number, altezza?: number, bozze?: string, descrizioneModifica?: string,
              fileModificaURL?: string, numeroModelliBozze?: string | number, modelloConfermato?: string | number){
    super(idArticolo, 'Adesivo', copie, descrizione, allegati, bozze, descrizioneModifica, fileModificaURL,
    numeroModelliBozze, modelloConfermato);
    this.forma = forma;
    if (forma === 'cerchio') { this.cerchio = new Cerchio(diametro); this.dimensioni = new Quadrilatero(0, 0); }
    else { this.dimensioni = new Quadrilatero(base, altezza); this.cerchio = new Cerchio(0); }
    this.laminazione = laminazione;
    this.opzioni = opzioni;
  }
}
