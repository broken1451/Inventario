import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Otros } from 'src/app/classes/otros';
import { API } from 'src/config/api';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SubirArchivoService } from './subir-archivo.service';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class OtrosService {

  private otrosSubject = new Subject<Otros>();
  public itemsObservable$ = this.otrosSubject.asObservable();

  constructor(    private httpClient: HttpClient, private subirArchivoService: SubirArchivoService) { }



  getAllOtros(desde?: number) {
    try {
      return this.httpClient.get(`${URL}${API.otros}?desde=${desde}`).pipe(
        map((otros: any) => {
          return otros;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  getOtrosById(id: string) {
    try {
      return this.httpClient.get(`${URL}${API.otros}/${id}`).pipe(
        map((otros: any) => {
          return otros;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  createOtros(otro: Otros) {
    try {
      return this.httpClient.post(`${URL}${API.otrosCreate}`, otro).pipe(
        map((otroCreated: Otros) => {
          return otroCreated;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  updateOtros(otro: Otros){
    try {
      return this.httpClient.put(`${URL}${API.otrosUpdate}/${otro._id}`, otro).pipe(
        map((otroUpdate: Otros) => {
          return otroUpdate;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  deleteOtros(otro: Otros) {
    try {
      return this.httpClient.delete(`${URL}${API.otrosDeleted}/${otro._id}`).pipe(
        map((otrodelete: any) => {
          return otrodelete;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  cambiarImagen(archivo: File, id: string) {
    try {
      this.subirArchivoService
        .subirArchivoOtros(archivo, id)
        .then((data: any) => {
          console.log({ data });
          // this.usuario.img = data.user.img;
          this.otrosSubject.next(data);
          // this.authService.guardarStorage( id , this.token, this.usuario);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
}
