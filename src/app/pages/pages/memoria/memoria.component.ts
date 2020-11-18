import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Memory } from 'src/app/classes/memoria';
import { MemoryService } from '../../../services/memory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss']
})
export class MemoriaComponent implements OnInit {

  public memorys: Memory[] = [];
  public memory: Memory;
  // public typePc: any[] = [];
  // public formularioUpdatePc: FormGroup;
  // public formularioCreatePc: FormGroup;
  public imagenSubir: File;
  public imagenSubirTemp: any;
  public loading: any;
  public cont: any;
  public memory$: Subscription;
  @ViewChild('barraProgreso', { static: true }) barraProgreso: ElementRef;
  @ViewChild('customFile', { static: true }) customFile: ElementRef;

  constructor(private memoryService: MemoryService) { }

  ngOnInit(): void {
    this.getAllMemory();
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


}
