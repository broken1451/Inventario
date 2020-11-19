import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Memory } from 'src/app/classes/memoria';
import { MemoryService } from '../../../services/memory.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare const $: any;
@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent implements OnInit {
  public memorys: Memory[] = [];
  public memory: Memory;
  public typeMemory: any[] = [];
  public formularioUpdateMemory: FormGroup;
  public formularioCreateMemory: FormGroup;

  constructor(private memoryService: MemoryService, private router: Router) {}

  ngOnInit(): void {
    this.getAllMemory();
    this.formularioUpdateMemory = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
    });

    this.formularioCreateMemory = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.typeMemory = this.memoryService.getTypes();
  }

  async getAllMemory() {
    try {
      const memorys: any = await this.memoryService.getAllMemory().toPromise();
      if (memorys) {
        this.memorys = memorys.memorias;
        console.log(this.memorys);
      } else {
        this.memorys = null;
      }
    } catch (error) {
      console.log('error ', error);
    }
  }

  get formUpdate() {
    return this.formularioUpdateMemory.controls;
  }

  get formCreate(): any {
    return this.formularioCreateMemory.controls;
  }

  update(memory: Memory) {
    try {
      console.log({ memory });
      this.memory = memory;
      this.formularioUpdateMemory.setValue({
        name: memory.name,
        description: memory.description || 'Ram',
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateMemory() {
    try {
      this.memory.name = this.formUpdate.name.value;
      this.memory.description = this.formUpdate.description.value;
      const memoryUpdate: any = await this.memoryService
        .updateMemory(this.memory)
        .toPromise();
      if (memoryUpdate) {
        $('#updatePc').modal('hide');
        console.log({ memoryUpdate });
        Swal.fire({
          title: 'Actualizado existosamente',
          text: `Memoria ${memoryUpdate.memoryUpdateSave.name}`,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          icon: 'success',
          confirmButtonText: 'ok!',
          showCancelButton: false,
          allowOutsideClick: false,
        });
        this.getAllMemory();
        Swal.showLoading();
        setTimeout(() => {
          Swal.close();
        }, 3000);
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createPc() {
    try {
      if (this.formularioCreateMemory.invalid) {
        return;
      }
      const memory = new Memory(
        this.formCreate.name.value,
        this.formCreate.type.value,
        this.formCreate.description.value
      );
      const memoryCreated: any = await this.memoryService
        .createPc(memory)
        .toPromise();
      if (memoryCreated) {
        $('#createPc').modal('hide');
        Swal.fire({
          title: '',
          text: `La memoria con el nombre ${memoryCreated.memorys.name}`,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          icon: 'success',
          confirmButtonText: 'ok!',
          showCancelButton: false,
          allowOutsideClick: false,
        });
        this.getAllMemory();
        Swal.showLoading();
        setTimeout(() => {
          Swal.close();
        }, 3000);
        this.formularioCreateMemory.setValue({
          name: '',
          type: 'DDR2 Desktop',
          description: '',
        });
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  delete(memory: Memory) {
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Borrara el usurio ' + memory.name,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      icon: 'warning',
      confirmButtonText: 'Si!',
    }).then(async (borrar) => {
      if (borrar.value) {
        const memoryDeleted = await this.memoryService
          .deleteMemory(memory)
          .toPromise();
        console.log({ memoryDeleted });
        if (memoryDeleted) {
          Swal.fire({
            title: '',
            text: 'La memoria fue borrada exitosamente',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            icon: 'success',
            confirmButtonText: 'ok!',
          });
          this.getAllMemory();
        } else {
          return false;
        }
      } else if (borrar.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'La memoria ' + memory.name + ' esta a salvo :)',
          'info'
        );
      }
    });
  }

  goTodetails(id: string) {
    this.router.navigate(['/detailsMemory/', id]);
  }
}
