import { TestBed } from '@angular/core/testing';

import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should encrypt a string', () => {
    const secretMessage = 'This is a secret message!';
    const encryptedMessage = service.encrypt(secretMessage);

    console.log('Secret Message: ' + secretMessage);
    console.log('Encrypted Message: ' + encryptedMessage);

    const decryptedMessage = service.decrypt(encryptedMessage);
    console.log('Decrypted Message: ' + decryptedMessage);

    expect(encryptedMessage).not.toEqual(secretMessage);
  });
});
