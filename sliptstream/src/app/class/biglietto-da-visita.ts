import { Allegato } from './allegato';
import { Articolo } from './articolo';
import { Cerchio } from './cerchio';
import { Quadrilatero } from './quadrilatero';

export class BigliettoDaVisita extends Articolo{
  orientamento: string;
  monofacciale: boolean;
  plastificato: boolean;
  cerchio: Cerchio;
  dimensioni?: Quadrilatero;

  constructor(idArticolo: string, copie: number, monofacciale: boolean, plastificato: boolean, orientamento: string,
              descrizione?: string, allegato?: string, bozze?: string, descrizioneModifica?: string, fileModificaURL?: string,
              numeroModelliBozze?: string | number, modelloConfermato?: string | number){
    super(idArticolo, 'Biglietto_da_visita', copie, descrizione, allegato, bozze, descrizioneModifica, fileModificaURL, numeroModelliBozze, modelloConfermato);
    this.orientamento = orientamento;
    this.monofacciale = monofacciale;
    this.plastificato = plastificato;
    this.cerchio = new Cerchio(0);
    this.dimensioni = new Quadrilatero(8.5, 5.5);
  }

  getMonofacciale(): boolean{
    return this.monofacciale;
  }
  getPlastificato(): boolean {
    return this.plastificato;
  }
  setMonofacciale(value: boolean): void{
    this.monofacciale = value;
  }
  setPlastificato(value: boolean): void{
    this.plastificato = value;
  }

  setOrientamento(param: string): void{
    this.orientamento = param;
  }

  getOrientamento(): string{
    return this.orientamento;
  }

}
