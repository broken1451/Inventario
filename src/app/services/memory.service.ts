import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from './subir-archivo.service';
import { Memory } from 'src/app/classes/memoria';
import { environment } from 'src/environments/environment';
import { API } from 'src/config/api';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class MemoryService {

  private memorySubject = new Subject<Memory>();
  public itemsObservable$ = this.memorySubject.asObservable();

  constructor(private httpClient: HttpClient, private subirArchivoService: SubirArchivoService) { }

  getAllMemory(desde?: number) {
    try {
      return this.httpClient.get(`${URL}${API.memory}?${desde}=0`).pipe(
        map((memorys: any) => {
          return memorys;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

}
