import { Component, OnInit } from '@angular/core';
import { API } from '../../../config/api';

declare function initPlugings();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    initPlugings();
  }

}
