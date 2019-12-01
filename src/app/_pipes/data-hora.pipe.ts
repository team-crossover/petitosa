import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataHora'
})
export class DataHoraPipe implements PipeTransform {

  transform(mach: string): string {
    let newmach: string;
    let splitted = mach.split(' ', 2);
    newmach = splitted[1] + ' às ' + splitted[0];
    return newmach;
  }

}
