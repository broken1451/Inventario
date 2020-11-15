import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pc } from 'src/app/classes/pc';
import { API } from 'src/config/api';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { SubirArchivoService } from './subir-archivo.service';

const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class PcService {

  private token: string;
  private pcSubject = new Subject<Pc>();
  public itemsObservable$ = this.pcSubject.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthService, private subirArchivoService: SubirArchivoService) {
    // this.token =  localStorage.getItem('token');
  }

  getAllPcs(desde?: number){
    try {
      return this.httpClient.get(`${URL}${API.pc}?${desde}=0`).pipe(
        map((pcs: any) => {
          return pcs;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  getPcById(id: string){
    try {
      return this.httpClient.get(`${URL}${API.pc}/${id}`).pipe(
        map((pc: any) => {
          return pc;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  updatePc(pc: Pc){
    // http://localhost:3000/pc/update/5fa869e68794223ccd3d5cb2
    try {
      return this.httpClient.put(`${URL}${API.pcUpdate}/${pc._id}`, pc).pipe(
        map((pcUpdate: Pc) => {
          return pcUpdate;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  deletePc(pc: Pc){
    try {
      return this.httpClient.delete(`${URL}${API.pcDelete}/${pc._id}`).pipe(
        map((pcdelete: any) => {
          return pcdelete;
        })
      );
    } catch (error) {
      console.log(error);
      console.log(`${URL}${API.pcDelete}/${pc._id}`);
    }
  }

}
