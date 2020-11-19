import { Component, OnInit } from '@angular/core';
import { Pc } from 'src/app/classes/pc';
import { PcService } from '../../../services/pc.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.scss']
})
export class PcComponent implements OnInit {

  public pcs: Pc[] = [];
  public pc: Pc;
  public typePc: any[] = [];
  public formularioUpdatePc: FormGroup;
  public formularioCreatePc: FormGroup;

  constructor(private pcService: PcService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPcs();
    this.formularioUpdatePc = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
    });

    this.formularioCreatePc = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.typePc = this.pcService.getTypes();
    console.log(this.typePc)
  }

  async getAllPcs() {
     try {
      const pcs: any = await this.pcService.getAllPcs().toPromise();
      if (pcs) {
        console.log(pcs);
        this.pcs = pcs.pcs;
      } else {
        this.pcs = null;
      }
     } catch (error) {
        console.log('error ', error);
     }
  }

  get formUpdate() {
    return this.formularioUpdatePc.controls;
  }

  get formCreate() {
    return this.formularioCreatePc.controls;
  }


  update(pc: Pc) {
    try {
      this.pc = pc;
      this.formularioUpdatePc.setValue({
        name: pc.name,
        description: pc.description,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updatePc(){
    try {
      this.pc.name = this.formUpdate.name.value;
      this.pc.description = this.formUpdate.description.value;
      const pcUpdate: any = await this.pcService.updatePc(this.pc).toPromise();
      if (pcUpdate) {
        $('#updatePc').modal('hide');
        // console.log({pcUpdate})
        Swal.fire(
          `Pc ${pcUpdate.pcUpdateSave.name}`,
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


  async createPc(){
   try {
    if (this.formularioCreatePc.invalid) {
      return;
    }
    const pc = new Pc(
      this.formCreate.name.value,
      this.formCreate.type.value,
      this.formCreate.description.value
    );
    // console.log({pc})
    const pcCreated: any = await this.pcService.createPc(pc).toPromise();
    if (pcCreated) {
      $('#createPc').modal('hide');
      Swal.fire(
        `Pc con el nombre ${pcCreated.pcs.name}`,
        `Creado existosamente`,
        'success'
      );
      this.getAllPcs();
      this.formularioCreatePc.setValue({
        name: '',
        type: '' || 'Desktop',
        description: '',
      });
    } else {
      return false;
    }

   } catch (error) {
     console.log(error);
   }
  }


  delete(pc: Pc) {
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Borrara el Pc ' + pc.name,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      icon: 'warning',
      confirmButtonText: 'Si!'
    }).then( async (borrar) => {
        if (borrar.value) {
          const pcDeleted =  await this.pcService.deletePc(pc).toPromise();
          console.log({pcDeleted});
          if (pcDeleted) {
            Swal.fire({
              title: '',
              text: 'El pc fue borrado exitosamente',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              icon: 'success',
              confirmButtonText: 'ok!',
              showCancelButton: false,
              allowOutsideClick: false
            });
            this.getAllPcs();
            Swal.showLoading();
            setTimeout(() => {
              Swal.close();
            }, 3000);
          } else {
            return false;
          }
        } else if (borrar.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelado', 'El pc ' + pc.name + ' esta a salvo :)', 'info');
        }
    });
  }

  goTodetails(id: string){
    this.router.navigate(['/details/', id]);
  }

}
