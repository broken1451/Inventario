import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pc } from 'src/app/classes/pc';
import { PcService } from 'src/app/services/pc.service';

@Component({
  selector: 'app-pc-details',
  templateUrl: './pc-details.component.html',
  styleUrls: ['./pc-details.component.scss']
})
export class PcDetailsComponent implements OnInit {

  public pc: Pc;
  public pcImg: any;

  constructor(private pcService: PcService, private activatedRoute: ActivatedRoute, private router: Router) { }

   ngOnInit(): void {
     // const idPc = this.activatedRoute.params.subscribe(data=> { console.log(data)});
     const idPc = this.activatedRoute.snapshot.paramMap.get('id');
     console.log({idPc});
     this.getPcById(idPc);
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

}
