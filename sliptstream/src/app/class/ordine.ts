import { Articolo } from './articolo';
import { stato } from './enum';

export class Ordine {
  private grafico: string;
  private emailFK: string;
  private idOrdine?: string;
  private nome: string;
  private data: Date | string;
  private stato: string;
  private descrizione: string;
  private articoli: Articolo[] = [];

  constructor(grafico: string, nome: string, stato: string, articoli: Articolo[], descrizione?: string, idOrdine?: string, data?: Date | string, emailFK?: string){
    this.nome = nome;
    this.idOrdine = idOrdine;
    this.data = data;
    this.stato = stato;
    this.articoli = articoli;
    this.descrizione = descrizione;
    this.grafico = grafico;
    this.emailFK = emailFK;
  }

  setEmailFK(param: string): void { this.emailFK = param; }
  getEmailFK(): string {return this.emailFK; }

  setIdOrdine(value: string): void{this.idOrdine = value; }
  getIdOrdine(): string{return this.idOrdine; }
  setNome(value: string): void{this.nome = value; }
  getNome(): string{return this.nome; }
  getData(): Date | string{return this.data; }
  setData(value: Date): void{this.data = value; }
  getStato(): string{return this.stato; }
  setArticoli(value: Articolo[]): void {this.articoli = value; }
  getArticoli(): Articolo[]{return this.articoli; }
  setDescrizione(value: string): void {this.descrizione = value; }
  getDescrizione(): string{return this.descrizione; }
  getGrafico(): string {return this.grafico; }
  setGrafico(param: string): void{this.grafico = param; }



}
