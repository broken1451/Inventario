import { Component, OnInit } from '@angular/core';
import { Pc } from 'src/app/classes/pc';
import { PcService } from '../../../services/pc.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.scss']
})
export class PcComponent implements OnInit {

  public pcs: Pc[] = [];

  constructor(private pcService: PcService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPcs();
  }

  async getAllPcs() {
     try {
      const pcs: any = await this.pcService.getAllPcs().toPromise();
      if (pcs) {
        console.log(pcs);
        this.pcs = pcs.pcs;
      } else {
        this.pcs = [];
      }
     } catch (error) {
        console.log('error ', error);
     }
  }

  update(pc: Pc) {}

  delete(pc: Pc) {
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Borrara el usurio ' + pc.name,
      showCancelButton: true,
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
            });
            this.getAllPcs();
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
