import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ordine } from '../class/ordine';
import { BehaviorSubject } from 'rxjs';
import { Articolo } from '../class/articolo';
import { Adesivo } from '../class/adesivo';
import { FormGroup } from '@angular/forms';
import { Banner } from '../class/banner';
import { BigliettoDaVisita } from '../class/biglietto-da-visita';
import { Carta } from '../class/carta';
import { ColorPrint } from '../class/color-print';
import { ServiceService } from './service.service';
import { DiBond } from '../class/di-bond';
import { Locandina } from '../class/locandina';
import { Manifesto } from '../class/manifesto';
import { Volantino } from '../class/volantino';
import { Semiespanso } from '../class/semiespanso';
import { Plex } from '../class/plex';
import { Prespaziato } from '../class/prespaziato';
import { Utente } from '../class/utente';
import * as shortid from 'shortid';

interface ArticoliI {
  idArticolo: string;
  articolo: Articolo;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private $utente: BehaviorSubject<Utente> = new BehaviorSubject(null);
  private $cliente: BehaviorSubject<Utente> = new BehaviorSubject(null);

  httpOptions: any;



  constructor(private http: HttpClient, private service: ServiceService ) {
  }
  //tslint:disable

  buildUtente(json: any): Utente {
    return new Utente(
      json.nome,
      json.cognome,
      json.email,
      json.password,
      json.ruolo,
      json.id
    )
  }


  setUtente(param: any): void{
    (param) ? this.$utente.next(new Utente(param.nome, param.cognome, param.email, param.password, param.ruolo, param.id, param.telefono, param.indirizzo, param.fotoProfilo)) : this.$utente.next(null);
  }

  getUtente(): BehaviorSubject<Utente>{
    return this.$utente;
  }
  setCliente(param: any): void {
    (param) ? this.$cliente.next(new Utente(param.nome, param.cognome, param.email, param.password, param.ruolo, param.id)) : this.$utente.next(null);
  }

  getCliente(): BehaviorSubject<Utente> {
    return this.$cliente;
  }

  buildOrdine(jsonOrdine: any, idOrder: string, jsonArticoli?: any): Ordine {
    return new Ordine(
      jsonOrdine.grafico,
      jsonOrdine.nome,
      jsonOrdine.stato,
      jsonArticoli,
      jsonOrdine.descrizione,
      idOrder,
      new Date().toString()
    );
  }
  buildArticolo(jsonArticolo: any[], allegato?: File[][]): Articolo[] {
    let articoli: Articolo[] = [];
    this.service.getImgList().subscribe(allegati => {
       jsonArticolo.forEach((element, index) => {

         if (allegati[index] === null){
           allegati[index] = 'vuoto';
         }
      switch (element.value.supporto){
        case 'adesivo': articoli.push(
                        new Adesivo(
                          shortid.generate(),
                          element.value.copie,
                          element.value.descrizione,
                          allegati[index],
                          element.value.forma,
                          element.value.opzioni,
                          element.value.laminazione,
                          element.value.diametro,
                          element.value.base,
                          element.value.altezza));
                        break;
        case 'banner': articoli.push(
                        new Banner(
                          shortid.generate(),
                          element.value.copie,
                          element.value.base,
                          element.value.altezza,
                          element.value.monofacciale,
                          element.value.pieghe,
                          element.value.occhielli,
                          element.value.descrizione,
                          allegati[index]));
                        break;
        case 'biglietto_da_visita': articoli.push(
                        new BigliettoDaVisita(
                          shortid.generate(),
                          element.value.copie,
                          element.value.monofacciale,
                          element.value.plastificato,
                          element.value.orientamento,
                          element.value.descrizione,
                          allegati[index]));
                        break;
        case 'carta': articoli.push(
                          new Carta(
                            shortid.generate(),
                            element.value.copie,
                            element.value.base,
                            element.value.altezza,
                            element.value.opzioni,
                            element.value.descrizione,
                            allegati[index]));
                          break;
        case 'colorprint': articoli.push(
                          new ColorPrint(
                            shortid.generate(),
                            element.value.copie,
                            element.value.descrizione,
                            element.value.forma,
                            element.value.base,
                            element.value.altezza,
                            element.value.diametro,
                            allegati[index]));
                          break;
        case 'dibond': articoli.push(
                          new DiBond(
                            shortid.generate(),
                            element.value.copie,
                            element.value.descrizione,
                            element.value.spessore,
                            element.value.forma,
                            element.value.diametro,
                            element.value.base,
                            element.value.altezza,
                            allegati[index],
                            element.value.spazzolato));
                          break;
        case 'locandina': articoli.push(
                          new Locandina(
                            shortid.generate(),
                            element.value.copie,
                            element.value.formato,
                            element.value.orientamento,
                            element.value.descrizione,
                            allegati[index],));
                          break;
        case 'manifesto': articoli.push(
                          new Manifesto(
                            shortid.generate(),
                            element.value.copie,
                            element.value.formato,
                            element.value.orientamento,
                            element.value.descrizione,
                            allegati[index]));
                          break;
        case 'volantino': articoli.push(
                          new Volantino(
                            shortid.generate(),
                            element.value.copie,
                            element.value.formato,
                            element.value.monofacciale,
                            element.value.orientamento,
                            element.value.descrizione,
                            allegati[index]));
                          break;
        case 'semiespanso': articoli.push(
                          new Semiespanso(
                            shortid.generate(),
                            element.value.copie,
                            element.value.descrizione,
                            element.value.spessore,
                            element.value.monofacciale,
                            element.value.forma,
                            element.value.diametro,
                            element.value.base,
                            element.value.altezza,
                            allegati[index]));
                          break;
        case 'plex': articoli.push(
                          new Plex(
                            shortid.generate(),
                            element.value.copie,
                            element.value.descrizione,
                            element.value.colore,
                            element.value.spessore,
                            element.value.forma,
                            element.value.biancoRetro,
                            element.value.vetrofania,
                            element.value.diametro,
                            element.value.base,
                            element.value.trasparente,
                            element.value.altezza,
                            allegati[index]));
                          break;
        case 'prespaziato': articoli.push(
          new Prespaziato(
            shortid.generate(),
            element.value.copie,
            element.value.descrizione,
            element.value.colore,
            element.value.forma,
            element.value.vetrofania,
            element.value.diametro,
            element.value.base,
            element.value.altezza,
            allegati[index]));
          break;
                    }
    });

    })

    return articoli;
  }

  buildOrdineCopia(jsonOrdine: any, jsonArticoli?: any): Ordine {
    return new Ordine(
      jsonOrdine.grafico,
      jsonOrdine.nome,
      jsonOrdine.stato,
      jsonArticoli,
      jsonOrdine.descrizione,
      jsonOrdine.idOrdine,
      jsonOrdine.data,
      jsonOrdine.emailFK
    );
  }

  buildArticoloCopia(jsonArticolo: any[]): Articolo[] {
    let articoli: Articolo[] = [];

      jsonArticolo.forEach((element, index) => {
        switch (element.supporto) {
          case 'Adesivo': articoli.push(
            new Adesivo(
              element.idArticolo,
              element.copie,
              element.descrizione,
              element.allegato,
              element.forma,
              element.opzioni,
              element.laminazione,
              element.cerchio.diametro,
              element.dimensioni.base,
              element.dimensioni.altezza,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Banner': articoli.push(
            new Banner(
              element.idArticolo,
              element.copie,
              element.dimensioni.base,
              element.dimensioni.altezza,
              element.monofacciale,
              element.pieghe,
              element.occhielli,
              element.descrizione,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Biglietto_da_visita': articoli.push(
            new BigliettoDaVisita(
              element.idArticolo,
              element.copie,
              element.monofacciale,
              element.plastificato,
              element.orientamento,
              element.descrizione,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Carta': articoli.push(
            new Carta(
              element.idArticolo,
              element.copie,
              element.dimensioni.base,
              element.dimensioni.altezza,
              element.opzioni,
              element.descrizione,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Colorprint': articoli.push(
            new ColorPrint(
              element.idArticolo,
              element.copie,
              element.descrizione,
              element.forma,
              element.dimensioni.base,
              element.dimensioni.altezza,
              element.cerchio.diametro,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Dibond': articoli.push(
            new DiBond(
              element.idArticolo,
              element.copie,
              element.descrizione,
              element.spessore,
              element.forma,
              element.cerchio.diametro,
              element.dimensioni.base,
              element.dimensioni.altezza,
              element.allegato,
              element.spazzolato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Locandina': articoli.push(
            new Locandina(
              element.idArticolo,
              element.copie,
              element.formato,
              element.orientamento,
              element.descrizione,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Manifesto': articoli.push(
            new Manifesto(
              element.idArticolo,
              element.copie,
              element.formato,
              element.orientamento,
              element.descrizione,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Volantino': articoli.push(
            new Volantino(
              element.idArticolo,
              element.copie,
              element.formato,
              element.monofacciale,
              element.orientamento,
              element.descrizione,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Semiespanso': articoli.push(
            new Semiespanso(
              element.idArticolo,
              element.copie,
              element.descrizione,
              element.spessore,
              element.monofacciale,
              element.forma,
              element.cerchio.diametro,
              element.dimensioni.base,
              element.dimensioni.altezza,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Plex': articoli.push(
            new Plex(
              element.idArticolo,
              element.copie,
              element.descrizione,
              element.colore,
              element.spessore,
              element.forma,
              element.biancoRetro,
              element.vetrofania,
              element.cerchio.diametro,
              element.dimensioni.base,
              element.trasparente,
              element.dimensioni.altezza,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
          case 'Prespaziato': articoli.push(
            new Prespaziato(
              element.idArticolo,
              element.copie,
              element.descrizione,
              element.colore,
              element.forma,
              element.vetrofania,
              element.cerchio.diametro,
              element.dimensioni.base,
              element.dimensioni.altezza,
              element.allegato,
              element.bozze,
              element.descrizioneModifica,
              element.fileModificaURL,
              element.numeroModelliBozze,
              element.modelloConfermato));
            break;
        }
      });



    return articoli;
  }
}
