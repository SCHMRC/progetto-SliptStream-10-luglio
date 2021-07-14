import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrderService } from './order.service';


export interface FilesUploadMetadata {
  uploadProgress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root'
})

export class FireStorageService {

  constructor(private readonly storage: AngularFireStorage, private order: OrderService) { }


  uploadFileAndGetMetadata(
    mediaFolderPath: string,
    fileToUpload: File,
    index?: number
  ): FilesUploadMetadata {
    let idOrdine = this.order.getIdOrdine().value;
    const { name } = fileToUpload;
    let filePath: string;
    if(index == null || index === undefined){
      filePath = `${mediaFolderPath}/${new Date().getTime()}_${name}`;
    }else{
      filePath = `${mediaFolderPath}/x${idOrdine}_${index}_${name}`;
    }

    const uploadTask: AngularFireUploadTask = this.storage.upload(
      filePath,
      fileToUpload,
    );
    return {
      uploadProgress$: uploadTask.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(uploadTask, filePath),
    };
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string,
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL()),
    );
  }

  removeFile(mediaFolderPath, index, name: string){
    let idOrdine = this.order.getIdOrdine().value;
    const filePath = `${mediaFolderPath}/x${idOrdine}_${index}_${name}`;
    this.storage.ref(filePath).delete();
  }
}
