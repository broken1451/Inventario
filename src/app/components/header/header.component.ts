import { Component, OnInit } from '@angular/core';

declare function initPlugings();
declare function initPlugings1();
declare function initPlugings2();
declare function initPlugings3();

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    initPlugings();
    initPlugings1();
    initPlugings2();
    // initPlugings3();
  }
}
