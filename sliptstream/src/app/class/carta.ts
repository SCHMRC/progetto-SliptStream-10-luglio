import { Allegato } from './allegato';
import { Articolo } from './articolo';
import { Cerchio } from './cerchio';
import { Quadrilatero } from './quadrilatero';

export class Carta extends Articolo{
  opzioni: string;
  dimensioni: Quadrilatero;
  cerchio?: Cerchio;

  constructor(idArticolo: string, copie: number, base: number, altezza: number, opzioni: string, descrizione?: string, allegato?: string, bozze?: string,
              descrizioneModifica?: string, fileModificaURL?: string, numeroModelliBozze?: string | number,
              modelloConfermato?: string | number){
    super(idArticolo, 'Carta', copie, descrizione, allegato, bozze, descrizioneModifica, fileModificaURL, numeroModelliBozze, modelloConfermato);
    this.dimensioni = new Quadrilatero(base, altezza);
    this.opzioni = opzioni;
    this.cerchio = new Cerchio(0);
  }


  getParato(): string{return this.opzioni; }
  setBlueBack(value: string): void{this.opzioni = value; }

  getQuadrilatero(): Quadrilatero {
    return this.dimensioni;
  }
  setQuadrilatero(value: Quadrilatero): void { this.dimensioni = value; }
}
