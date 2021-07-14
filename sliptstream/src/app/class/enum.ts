export enum Laminazione { lucida, opaca }
export interface Selezioni {
  value: string;
  viewValue: string;
}

export const stato: string[] = [
  'nuovo', 'in lavorazione', 'in attesa', 'completo', 'spedito'
];

export const ruolo: string[] = [
  'GRAFICO',
  'CLIENTE'
];

export const formati: Selezioni[] = [
  { value: '15x21', viewValue: 'A5 15x21 cm' },
  { value: '21x29,7', viewValue: 'A4 21x29,7 cm' },
  { value: '29,7x42', viewValue: 'A3 29,7x42 cm' },
  { value: '32x45', viewValue: 'SRA3 32x45 cm' },
  { value: '50x70', viewValue: '50x70 cm' },
  { value: '70x100', viewValue: '70x100 cm' },
  { value: '600x300', viewValue: '600x300 cm' }
]
export const spessore: Selezioni[] = [
  { value: '2mm', viewValue: '2mm' },
  { value: '3mm', viewValue: '3mm' },
  { value: '5mm', viewValue: '5mm' },
  { value: '10mm', viewValue: '10mm' },
  { value: '15mm', viewValue: '15mm' },
  { value: '20mm', viewValue: '20mm' }
];

export const forme: Selezioni[] =[
  { value: '0', viewValue: 'ovale' },
  { value: '1', viewValue: 'cerchio' },
  { value: '2', viewValue: 'sagomato' },
];

export const supporti: Selezioni[] = [
  { value: '0', viewValue: 'Adesivo' },
  { value: '1', viewValue: 'Banner' },
  { value: '2', viewValue: 'Carta' },
  { value: '3', viewValue: 'ColorPrint' },
  { value: '4', viewValue: 'DiBond' },
  { value: '5', viewValue: 'Prespaziato' },
  { value: '6', viewValue: 'Plex' },
  { value: '7', viewValue: 'Semiespanso' },
  { value: '8', viewValue: 'Biglietto da visita' },
  { value: '9', viewValue: 'Volantino' },
  { value: '10', viewValue: 'Manifesto' },
  { value: '11', viewValue: 'Locandina' },
];

export class Enum {

  laminazione: Laminazione;
}
