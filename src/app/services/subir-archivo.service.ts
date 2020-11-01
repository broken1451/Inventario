import { Injectable } from '@angular/core';
import { API } from '../../config/api';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // tslint:disable-next-line: max-line-length
  subirArchivo(archivo: File, id: string) { // tipo de imagen es usuarios,medicos o hospitales , id del objeto a actualizar

    return new Promise( (resolve, reject) => {

       let formData = new FormData(); // esto es todo el payload que quiero mandar a subir
       let xhr = new XMLHttpRequest(); // inicializar la peticion ajax

       // Configuracion del formData
       // formData.append('nombre q esta en el postman opcion fromdata para subir la imagens', archivo que quiero subir, nombre del archivo)
       formData.append('image', archivo, archivo.name);

       // Configuracion de la peticion ajax
       xhr.onreadystatechange = () => {
           if (xhr.readyState === 4) {
             if (xhr.status === 200) {
               // resolve('Imagen Subida exitosamente' mandar el response exitoso);
               // resolve(xhr.response);
               resolve(JSON.parse(xhr.response));
               console.log('Imagen subida: ', xhr.response);
             } else {
               // reject('Imagen Subida exitosamente' mandar el response exitoso);
               // reject(xhr.response);
               reject(JSON.parse(xhr.response));
               console.log(' Error Imagen no subida: ', xhr.response);
             }
           }
       };

       // Peticion al servicio
       const url = `${environment.url}${API.upload}${id}`;
       // xhr.open('metodo', peticion de servicio, decidir si es asincrono o no);
       xhr.open('PUT', url, true);
       xhr.send(formData);
   });

  }
}
