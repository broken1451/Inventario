import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Otros } from 'src/app/classes/otros';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OtrosService } from 'src/app/services/otros.service';

declare const $: any;

@Component({
  selector: 'app-otros-details',
  templateUrl: './otros-details.component.html',
  styleUrls: ['./otros-details.component.scss']
})
export class OtrosDetailsComponent implements OnInit {

  public otro: Otros;
  public otroImg: any;
  public imagenSubir: File;
  public imagenSubirTemp: any;
  public loading: any;
  public cont: any;
  public otro$: Subscription;
  @ViewChild('barraProgreso', { static: true }) barraProgreso: ElementRef;
  @ViewChild('customFile', { static: true }) customFile: ElementRef;
  @ViewChild('myModal') modal: ElementRef;

  constructor(private activatedRoute: ActivatedRoute, private otrosService: OtrosService, private router: Router) { }

  ngOnInit(): void {
    this.loading = false;
    this.cont = 0;
    const idOtros = this.activatedRoute.snapshot.paramMap.get('id');
    this.getOtrosById(idOtros);
    this.otro$ = this.otrosService.itemsObservable$.subscribe((data: any) => {
      this.otroImg = data.otros.img;
    });
  }

  async getOtrosById(id: string){
    try {
      const otro =  await this.otrosService.getOtrosById(id).toPromise();
      if (otro) {
        this.otro = otro.otros;
        this.otroImg = otro.otros.img;
        console.log(this.otro);
        console.log(this.otroImg);
      } else {
        this.otro = null;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  back(){
    this.router.navigate(['otros']);
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
        // console.log(reader.result);
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
            this.otrosService.cambiarImagen(this.imagenSubir, this.otro._id);
            $('#imgOtro').modal('hide');
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
