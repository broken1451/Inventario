import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Memory } from 'src/app/classes/memoria';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MemoryService } from '../../../services/memory.service';
declare const $: any;



@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {

  public memory: Memory;
  public memoryImg: any;
  public imagenSubir: File;
  public imagenSubirTemp: any;
  public loading: any;
  public cont: any;
  public memory$: Subscription;
  @ViewChild('barraProgreso', { static: true }) barraProgreso: ElementRef;
  @ViewChild('customFile', { static: true }) customFile: ElementRef;
  @ViewChild('myModal') modal: ElementRef;

  constructor(private memoryService: MemoryService , private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loading = false;
    this.cont = 0;
    const idPc = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPcById(idPc);
    this.memory$ = this.memoryService.itemsObservable$.subscribe((data: any) => {
      // console.log(data.memoria.img)
      this.memoryImg = data.memoria.img;
      // console.log('data details ', this.memory);
    });
  }

  async getPcById(id: string){
    try {
      const memory =  await this.memoryService.getMemoryById(id).toPromise();
      if (memory) {
        this.memory = memory.memorias;
        this.memoryImg =  memory.memorias.img;
        // console.log(this.memory);
        console.log(this.memoryImg);
      } else {
        this.memory = null;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  back(){
    this.router.navigate(['memorias']);
  }


  seleccionImage(archivo: File) {
    try {
      if (!archivo) {
        this.imagenSubir = null;
        return;
      }
      if (archivo.type.indexOf('image') < 0) {
        Swal.fire(
          'Solo se permiten imagenes',
          'El archivo seleccionado no es una imagen',
          'error'
        );
        this.imagenSubir = null;
        return;
      }
      // si recibimmos un archivo
      this.imagenSubir = archivo;
      // Cargar imagen temporal
      const reader = new FileReader();
      const urlImagenTemp = reader.readAsDataURL(archivo);
      reader.onloadend = () => {
        this.imagenSubirTemp = reader.result;
      };
    } catch (error) {
      console.log(error);
    }
  }

  cambiarImagen() {
    try {
      this.loading = true;
      console.log(this.loading)
      const interval = setInterval(() => {
        this.loading = true;
        if (this.cont < 100) {
          this.cont = this.cont + 20;
          let barra: any = document.getElementById('barraProgreso');
          barra = barra.style.width = this.cont + '%';
          document.getElementById('barraProgreso').innerHTML = this.cont + '%';
          if (this.cont >= 100) {
            this.memoryService.cambiarImagen(this.imagenSubir, this.memory._id);
            $('#imgPc').modal('hide');
            setTimeout(() => {
              this.imagenSubirTemp = null;
              this.imagenSubir = null;
            }, 800);
          }
        }

        if (this.cont === 100) {
          clearInterval(interval);
          this.cont = 0;
          const barra: any = document.getElementById('barraProgreso');
          barra.style.width = this.cont + '%';
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  }

}
