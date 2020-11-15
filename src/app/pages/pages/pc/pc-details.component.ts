import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pc } from 'src/app/classes/pc';
import { PcService } from 'src/app/services/pc.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-pc-details',
  templateUrl: './pc-details.component.html',
  styleUrls: ['./pc-details.component.scss']
})
export class PcDetailsComponent implements OnInit {

  public pc: Pc;
  public pcImg: any;
  public imagenSubir: File;
  public imagenSubirTemp: any;
  public loading: any;
  public cont: any;
  public pc$: Subscription;
  @ViewChild('barraProgreso', { static: true }) barraProgreso: ElementRef;
  @ViewChild('customFile', { static: true }) customFile: ElementRef;
  @ViewChild('myModal') modal: ElementRef;


  constructor(private pcService: PcService, private activatedRoute: ActivatedRoute, private router: Router) { }

   ngOnInit(): void {
     // const idPc = this.activatedRoute.params.subscribe(data=> { console.log(data)});
     this.loading = false;
     this.cont = 0;
     const idPc = this.activatedRoute.snapshot.paramMap.get('id');
     console.log({idPc});
     this.getPcById(idPc);
     this.pc$ = this.pcService.itemsObservable$.subscribe((data: any) => {
      this.pcImg = data.pc.img;
      console.log('data details ', this.pc);
    });

  }


  async getPcById(id: string){
    try {
      const pc =  await this.pcService.getPcById(id).toPromise();
      if (pc) {
        this.pc = pc.pc;
        this.pcImg = pc.pc.img;
        console.log(this.pc);
        console.log(this.pcImg);
      } else {
        this.pc = null;
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  back(){
    this.router.navigate(['pc']);
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
          // barra = barra.innerText = this.cont + '%';
          // this.barraProgreso.nativeElement.style.width = this.cont + '%';
          // this.modal.nativeElement.style.width = this.cont + '%';
          // this.modal.nativeElement.innerHTML = this.cont + '%';
          if (this.cont >= 100) {
            this.pcService.cambiarImagen(this.imagenSubir, this.pc._id);
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
