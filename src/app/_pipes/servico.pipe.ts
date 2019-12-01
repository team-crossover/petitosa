import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'servico'
})
export class ServicoPipe implements PipeTransform {

  transform(mach: string): string {
    let newmach: string;
    if (mach === 'BANHO') {
      newmach = 'Banho';
    } else {
      if (mach === 'TOSA') {
        newmach = 'Tosa';
      } else {
        if (mach === 'PASSEIO') {
          newmach = 'Passeio';
        }
      }
    }
    return newmach;
  }
}
