import { Component, OnInit } from '@angular/core';
import { Otros } from 'src/app/classes/otros';
import { OtrosService } from '../../../services/otros.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare const $: any;

@Component({
  selector: 'app-otros',
  templateUrl: './otros.component.html',
  styleUrls: ['./otros.component.scss']
})
export class OtrosComponent implements OnInit {

  public otros: Otros[] = [];
  public otro: Otros;
  public formularioUpdateOtros: FormGroup;
  public formularioCreateOtros: FormGroup;
  public desde: number;
  public totalotros: number;

  constructor(private otrosService: OtrosService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOtros();
    this.formularioUpdateOtros = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
    });

    this.formularioCreateOtros = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
    });
    this.desde = 0;
    this.totalotros = 0;
  }

  async getAllOtros() {
    try {
     const otros: any = await this.otrosService.getAllOtros(this.desde).toPromise();
     if (otros) {
       console.log(otros);
       this.otros = otros.otros;
       this.totalotros = otros.otrossNumbers;
     } else {
       this.otros = null;
     }
    } catch (error) {
       console.log('error ', error);
    }
  }

  get formUpdate() {
    return this.formularioUpdateOtros.controls;
  }

  get formCreate(): any {
    return this.formularioCreateOtros.controls;
  }

  goTodetails(id: string){
    this.router.navigate(['/detailsotros/', id]);
  }

  update(otro: Otros){
    try {
      console.log({ otro });
      this.otro = otro;
      this.formularioUpdateOtros.setValue({
        name: otro.name,
        description: otro.description || 'Otros',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createOtros(){
    console.log('sdsssd')
    try {
      if (this.formularioCreateOtros.invalid) {
        return;
      }
      const otro = new Otros(
        this.formCreate.name.value,
        this.formCreate.description.value
      );
      // console.log({pc})
      const otroCreated: any = await this.otrosService.createOtros(otro).toPromise();
      console.log({otroCreated})
      if (otroCreated) {
        $('#createOtros').modal('hide');
        Swal.fire(
          `Otros con el nombre ${otroCreated.otros.name}`,
          `Creado existosamente`,
          'success'
        );
        this.getAllOtros();
        this.formularioCreateOtros.setValue({
          name: '',
          description: '',
        });
      } else {
        return false;
      }

     } catch (error) {
       console.log(error);
     }
  }

  async updateOtros(){
    try {
      this.otro.name = this.formUpdate.name.value;
      this.otro.description = this.formUpdate.description.value;
      const otrosUpdate: any = await this.otrosService.updateOtros(this.otro).toPromise();
      if (otrosUpdate) {
        $('#updateOtros').modal('hide');
        Swal.fire(
          `Pc ${otrosUpdate.otrosUpdateSave.name}`,
          `Actualizado existosamente`,
          'success'
        );
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  delete(otro: Otros){
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Borrara el usurio ' + otro.name,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      icon: 'warning',
      confirmButtonText: 'Si!',
    }).then(async (borrar) => {
      if (borrar.value) {
        const otroDeleted = await this.otrosService
          .deleteOtros(otro)
          .toPromise();
        console.log({ otroDeleted });
        if (otroDeleted) {
          Swal.fire({
            title: '',
            text: 'La memoria fue borrada exitosamente',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            icon: 'success',
            confirmButtonText: 'ok!',
          });
          this.getAllOtros();
        } else {
          return false;
        }
      } else if (borrar.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'La memoria ' + otro.name + ' esta a salvo :)',
          'info'
        );
      }
    });
  }


  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalotros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde = this.desde + valor;
    const next: any = document.getElementsByClassName('number');
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < next.length; i++) {
      const element = next[i];
      if (desde === 0 && element.textContent === '1') {
        document.getElementById('demo').classList.add('back');
        document.getElementById('demo1').classList.remove('back');
        document.getElementById('demo').classList.add('active');
        document.getElementById('demo1').classList.remove('active');
        document.getElementById('demo2').classList.remove('active');
        document.getElementById('demo3').classList.remove('active');
        document.getElementById('demo').classList.add('back');
        document.getElementById('demo1').classList.remove('back');
        document.getElementById('btnb').classList.add('active');
        document.getElementById('btns').classList.remove('active');
      } else if (desde === 3 && element.textContent === '2') {
        document.getElementById('demo').classList.remove('back');
        document.getElementById('demo1').classList.add('back');
        document.getElementById('demo').classList.remove('active');
        document.getElementById('demo1').classList.add('active');
        document.getElementById('demo2').classList.remove('active');
        document.getElementById('demo3').classList.remove('active');
        document.getElementById('demo1').classList.add('back');
        document.getElementById('demo2').classList.remove('back');
      } else if (desde === 6 && element.textContent === '3') {
        document.getElementById('demo1').classList.remove('back');
        document.getElementById('demo2').classList.add('back');
        document.getElementById('demo').classList.remove('active');
        document.getElementById('demo1').classList.remove('active');
        document.getElementById('demo2').classList.add('active');
        document.getElementById('demo3').classList.remove('active');
        document.getElementById('demo2').classList.add('back');
        document.getElementById('demo3').classList.remove('back');
      } else if (desde === 9 && element.textContent === '4') {
        document.getElementById('demo2').classList.remove('back');
        document.getElementById('demo3').classList.add('back');
        document.getElementById('demo').classList.remove('active');
        document.getElementById('demo1').classList.remove('active');
        document.getElementById('demo2').classList.remove('active');
        document.getElementById('demo3').classList.add('active');
        document.getElementById('btnb').classList.remove('active');
        document.getElementById('btns').classList.add('active');
      }
    }

    this.getAllOtros();
  }

}
