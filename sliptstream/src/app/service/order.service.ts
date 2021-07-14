import { Injectable } from '@angular/core';
import { Utente } from '../class/utente';
import { ORDER_PATH } from './path';
import { AngularFireDatabase } from '@angular/fire/database';
import { Ordine } from '../class/ordine';
import { BehaviorSubject, Observable } from 'rxjs';
import { Articolo } from '../class/articolo';
//tslint:disable
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private idOrdine: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  insertOrder(user: Utente, order: Ordine): Promise<any> {

    return this.angularFireDatabase.object<any>(`${ORDER_PATH}/${user.getId()}/${order.getIdOrdine()}`).set(order);


  }

  getAllOrder(): Observable<any[]> {
    return this.angularFireDatabase.object<any[]>(`${ORDER_PATH}`).valueChanges();
  }

  test(uid: string){
    return this.angularFireDatabase.database.ref(`${ORDER_PATH}/${uid}`).once('value');
  }

  getOrder(uid: string) {

    return this.angularFireDatabase.object<any[]>(`${ORDER_PATH}/${uid}`).valueChanges();
  }

  insertDraw(user: string, order: string, indexArticolo: number, bozza: string){
    return this.angularFireDatabase.object<any>(`${ORDER_PATH}/${user}/${order}/articoli/${indexArticolo}`).update({'bozze': bozza});
  }

  insertNumberDraw(user: string, order: string, indexArticolo: number, numeroModelliBozze: string) {
    return this.angularFireDatabase.object<any>(`${ORDER_PATH}/${user}/${order}/articoli/${indexArticolo}`).update({ 'numeroModelliBozze': numeroModelliBozze });
  }

  insertConfirmModelDraw(user: string, order: string, indexArticolo: number, modelloConfermato: string) {
    return this.angularFireDatabase.object<any>(`${ORDER_PATH}/${user}/${order}/articoli/${indexArticolo}`).update({ 'modelloConfermato': modelloConfermato });
  }

  changeState(user: string, order: string, stato: string){
    return this.angularFireDatabase.object<any>(`${ORDER_PATH}/${user}/${order}`).update({'stato': stato});
  }

  updateArticolo(user: string, order: string, articoli: any){
    return this.angularFireDatabase.object<any>(`${ORDER_PATH}/${user}/${order}`).update({articoli});
  }

  insertChange(user: string, order: string, indexArticolo: number, descrizioneModifica: string, fileModificaURL?: string) {
    let temp: string
    (fileModificaURL == null || fileModificaURL == undefined) ? temp = 'vuoto' : temp = fileModificaURL;
    return this.angularFireDatabase.object<any>(`${ORDER_PATH}/${user}/${order}/articoli/${indexArticolo}`).update({ 'descrizioneModifica': descrizioneModifica, 'fileModificaURL': temp});
  }

  deleteArticolotest(user: string, order: string, indexArticolo: number) {

    return this.angularFireDatabase.database.ref(`${ORDER_PATH}/${user}/${order}/articoli/${indexArticolo}`).remove()

  }

  deleteArticolo(user: string, order: string, indexArticolo: number){
    return this.angularFireDatabase.object<any>(`${ORDER_PATH}/${user}/${order}/articoli/${indexArticolo}`).remove()


  }

  deleteOrdine(user: string, order: string) {
    return this.angularFireDatabase.object<any>(`${ORDER_PATH}/${user}/${order}`).remove()

  }
  getIdOrdine(): BehaviorSubject<string> {
    return this.idOrdine;
  }

  setIdOrdine(param: string) {
    this.idOrdine.next(param)
  }
}
