import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utente } from '../class/utente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private URL = 'https://www.sliptstream.it/public.php';


  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const auth = {email, password};
    return this.http.post<Utente>(this.URL, auth, {
      headers: {
        header: 'login'
      }
    });
  }
  signin(value: Utente): Observable<boolean> {
    return this.http.post<boolean>(this.URL, value, {
      headers: {
        header: 'signin'
      }
    });
  }
}
