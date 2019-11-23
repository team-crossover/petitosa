import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tamanho'
})
export class TamanhoPipe implements PipeTransform {

  transform(mach: string): string {
    let newmach: string;
    if (mach === 'GRANDE') {
      newmach = 'Grande';
    } else {
      if (mach === 'MEDIO') {
        newmach = 'Médio';
      } else {
        if (mach === 'PEQUENO') {
          newmach = 'Pequeno';
        }
      }
    }
    return newmach;
  }

}
