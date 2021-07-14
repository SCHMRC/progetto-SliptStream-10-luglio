import { Profilo } from './profilo';
import { Ordine } from './ordine';


export class Utente {
    private id: string;
    private nome: string;
    private cognome: string;
    private email: string;
    private telefono: string;
    private indirizzo: string;
    private password: string;
    private ruolo: string;
    private fotoProfilo: string;
    private profilo?: Profilo;
    private ordini: Ordine[] = [];

    constructor(nome: string, cognome: string, email: string, password: string,
                ruolo: string, id?: string, telefono?: string, indirizzo?: string, fotoProfilo?: string) {
      this.nome = nome;
      this.cognome = cognome;
      this.email = email;
      this.password = password;
      this.ruolo = ruolo;
      this.id = id;
      (telefono == null || telefono === undefined) ? this.telefono = 'vuoto' : this.telefono = telefono;
      (indirizzo == null || indirizzo === undefined) ? this.indirizzo = 'vuoto' : this.indirizzo = indirizzo;
      (fotoProfilo == null || fotoProfilo === undefined) ? this.fotoProfilo = 'vuoto' : this.fotoProfilo = fotoProfilo;
    }

  getFotoProfilo(): string {
    return this.fotoProfilo;
  }

    getIndirizzo(): string{
      return this.indirizzo;
    }

    setId(id: string): void{
      this.id = id;
    }
    getId(): string{
      return this.id;
    }

    setOrdini(ordini: Ordine[]): void{this.ordini = ordini; }
    getOrdini(): Ordine[]{return this.ordini; }

    setProfilo(profilo: Profilo): void{this.profilo = profilo; }
    getProfilo(): Profilo{return this.profilo; }

    setRuolo(value: string): void{this.ruolo = value; }
    getRuolo(): string{return this.ruolo.toString(); }
    getPassword(): string{return this.password; }
    setPassword(value: string): void{this.password = value; }
    getEmail(): string{return this.email; }
    setEmail(value: string): void {this.email = value; }
    getNome(): string{return this.nome; }
    setNome(value: string): void{this.nome = value; }
    setCognome(value: string): void {this.cognome = value; }
    getCognome(): string {return this.cognome; }
    setTelefono(tel: string): void{this.telefono = tel; }
    getTelefono(): string{return this.telefono; }

}
