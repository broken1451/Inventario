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
  public desde: number;
  public totalmemory: number;

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
    this.desde = 0;
    this.totalmemory = 0;
  }

  async getAllMemory() {
    try {
      const memorys: any = await this.memoryService.getAllMemory(this.desde).toPromise();
      if (memorys) {
        this.memorys = memorys.memorias;
        this.totalmemory  = memorys.memoriasNumbers;
        console.log(memorys);
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
        $('#updateMemory').modal('hide');
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
        $('#createMemory').modal('hide');
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

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

    if (desde >= this.totalmemory) {
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

    this.getAllMemory();
  }
}
