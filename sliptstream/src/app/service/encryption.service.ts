
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  secretKey = 'A secret key 123!';

  constructor() { }

  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  decrypt(textToDecrypt: string): void {
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

}
