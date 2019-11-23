import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especie'
})
export class EspeciePipe implements PipeTransform {

  transform(mach: string): string {
    let newmach: string;
    if (mach === 'CACHORRO') {
      newmach = 'Cachorro';
    } else {
      if (mach === 'GATO') {
        newmach = 'Gato';
      }
    }
    return newmach;
  }

}
