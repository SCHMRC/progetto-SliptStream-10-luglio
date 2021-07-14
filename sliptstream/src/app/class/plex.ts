import { Allegato } from './allegato';
import { Articolo } from './articolo';
import { Cerchio } from './cerchio';
import { Quadrilatero } from './quadrilatero';

export class Plex extends Articolo {
  idArticoloFK: string;
  dimensioni: Quadrilatero;
  cerchio: Cerchio;
  forma: string;
  trasparente: boolean;
  spessore: string;
  colore: string;
  vetrofania: boolean;
  biancoRetro: string;

  constructor(idArticolo: string, copie: number, descrizione: string, colore: string, spessore: string, forma?: string, biancoRetro?: string,
              vetrofania?: boolean, diametro?: number, base?: number, trasparente?: boolean,
              altezza?: number, allegato?: string, bozze?: string, descrizioneModifica?: string, fileModificaURL?: string,
              numeroModelliBozze?: string | number, modelloConfermato?: string | number) {
    super(idArticolo, 'Plex', copie, descrizione, allegato, bozze, descrizioneModifica, fileModificaURL, numeroModelliBozze, modelloConfermato);
    if (forma === 'cerchio') { this.cerchio = new Cerchio(diametro); this.dimensioni = new Quadrilatero(0, 0); }
    else { this.dimensioni = new Quadrilatero(base, altezza); this.cerchio = new Cerchio(0); }
    this.spessore = spessore;
    this.forma = forma;
    if (biancoRetro == undefined || biancoRetro == null) { this.biancoRetro = 'false'; } else { this.biancoRetro = biancoRetro;}
    if (vetrofania == undefined || vetrofania == null) { this.vetrofania = false; } else { this.vetrofania = vetrofania; }
    this.colore = colore;
    this.trasparente = trasparente;
  }
}
