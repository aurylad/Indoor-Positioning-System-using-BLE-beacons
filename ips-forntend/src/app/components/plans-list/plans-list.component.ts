import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.css']
})
export class PlansListComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {

  }

  planAddPage() {
    this._router.navigate(['/plan/add']);
  }

}
