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
  public typeMemory: any[] = [];

  constructor(private httpClient: HttpClient, private subirArchivoService: SubirArchivoService) {
    this.typeMemory = [
      {
        name: 'DDR2 Desktop',
      },
      {
        name: 'DDR3 Desktop',
      },
      {
        name: 'DDR4 Desktop',
      },
      {
        name: 'DDR2 NoteBook',
      },
      {
        name: 'DDR3 NoteBook',
      },
      {
        name: 'DDR4 NoteBook',
      }
    ];
  }


  getAllMemory(desde?: number) {
    try {
      return this.httpClient.get(`${URL}${API.memory}?desde=${desde}`).pipe(
        map((memorys: any) => {
          return memorys;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  // TODO hacer este servicio en dicho componente
  getMemoryById(id: string) {
    try {
      return this.httpClient.get(`${URL}${API.memory}/${id}`).pipe(
        map((memory: any) => {
          return memory;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  updateMemory(memory: Memory) {
    try {
      return this.httpClient.put(`${URL}${API.memoryUpdate}/${memory._id}`, memory).pipe(
        map((memoryUpdate: Memory) => {
          return memoryUpdate;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  deleteMemory(memory: Memory) {
    try {
      return this.httpClient.delete(`${URL}${API.memoryDeleted}/${memory._id}`).pipe(
        map((memoryDeleted: any) => {
          return memoryDeleted;
        })
      );
    } catch (error) {
      console.log(error);
      // console.log(`${URL}${API.pcDelete}/${memory._id}`);
    }
  }

  createPc(memory: Memory) {
    try {
      return this.httpClient.post(`${URL}${API.memoryCreate}`, memory).pipe(
        map((memoryCreated: Memory) => {
          return memoryCreated;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  getTypes() {
    return this.typeMemory;
  }

  cambiarImagen(archivo: File, id: string) {
    try {
      this.subirArchivoService
        .subirArchivoMemory(archivo, id)
        .then((data: any) => {
          console.log({ data });
          this.memorySubject.next(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

}
