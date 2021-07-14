export class Allegato {
  idAllegato?: string;
  path: string;
  file: File;
  idArticoloFK?: string;

  constructor(file: File, path?: string, idAllegato?: string, idArticoloFK?: string) {
    this.file = file;
    this.path = path;
    this.idAllegato = idAllegato;
    this.idArticoloFK = idArticoloFK;
  }

 setidAllegato(value: string): void{this.idAllegato = value; }
 setIdArticoloFK(value: string): void{this.idArticoloFK = value; }
 getidAllegato(): string{return this.idAllegato; }
 getFile(): File { return this.file; }
 getidArticoloFK(): string { return this.idArticoloFK; }
}
