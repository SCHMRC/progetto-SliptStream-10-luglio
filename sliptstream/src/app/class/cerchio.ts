export class Cerchio {
  diametro = 0;

  constructor(diametro: number) {
    this.setDiametro(diametro);
  }

  setDiametro(diametro: number): void {
    this.diametro = diametro;
  }

  getDiametro(): number{return this.diametro; }
}
