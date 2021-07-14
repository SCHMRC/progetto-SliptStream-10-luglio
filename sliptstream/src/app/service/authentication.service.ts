import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  resetPassword(email: string): Promise<any>{
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }



  signup(email: string, password: string): Promise<any> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<any>{
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }
}
