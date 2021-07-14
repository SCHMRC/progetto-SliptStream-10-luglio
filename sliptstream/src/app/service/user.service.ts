import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Utente } from '../class/utente';
import { PATH, FILE_PATH, ORDER_PATH } from './../service/path';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  public updateFotoProfilo(user: Utente, urlFotoProfilo: string){
    this.angularFireDatabase.object(`${PATH}/${user.getId()}`).update({ fotoProfilo: urlFotoProfilo});

  }

  public updateUserData(user: Utente, indirizzo?: string, telefono?: string){
    let param1: string;
    let param2: string;
    (indirizzo == null || indirizzo == undefined)? param1 = 'vuoto' : param1 = indirizzo;
    (telefono == null || telefono == undefined) ? param2 = 'vuoto' : param2 = telefono;
    this.angularFireDatabase.object(`${PATH}/${user.getId()}`).update({indirizzo: param1, telefono: param2});
  }

  public addUser(user: Utente): Promise<any> {
    return this.angularFireDatabase.object(`${PATH}/${user.getId()}`).set(user);
  }

  public getUser(uid: string): Observable<any> {
    return this.angularFireDatabase.object(`${PATH}/${uid}`).valueChanges();
  }

  public getGrafici(): Observable<any[]> {
    return this.angularFireDatabase.object<any[]>(`${PATH}`).valueChanges()
  }

  public getClienti(): Observable<any[]> {
    return this.angularFireDatabase.object<any[]>(`${PATH}`).valueChanges()
  }
}
