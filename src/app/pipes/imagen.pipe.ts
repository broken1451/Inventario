import { Pipe, PipeTransform } from '@angular/core';
import { API } from 'src/config/api';
import { environment } from 'src/environments/environment';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipoImagen: string = 'usuario'): any {

    let URLIMGUSER = `${environment.url}${API.imgUser}`;
    let URLIMGPC = `${environment.url}${API.imgPC}`;
    let URLIMGOTROS = `${environment.url}${API.imgOtros}`;
    let URLIMGMEMORIA = `${environment.url}${API.imgMemoria}`;

    if (!imagen || imagen === '') {
      return `${URLIMGUSER}ddsds`;
    }

    if ( tipoImagen === 'usuario') {
      URLIMGUSER = `${URLIMGUSER}${imagen}`;
      return URLIMGUSER;
    } else if (tipoImagen === 'pc') {
      URLIMGPC = `${URLIMGPC}${imagen}`;
      return URLIMGPC;
    } else if (tipoImagen === 'otros') {
      URLIMGOTROS = `${URLIMGOTROS}${imagen}`;
      return URLIMGOTROS;
    }else if (tipoImagen === 'memoria') {
      URLIMGMEMORIA = `${URLIMGMEMORIA}${imagen}`;
      return URLIMGMEMORIA;
    }
  }

}
