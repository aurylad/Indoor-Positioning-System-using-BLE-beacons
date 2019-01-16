import { Component, OnInit, Input } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  @Input() activeId: string;

  constructor(private router: Router) { }

  tabChange(event: NgbTabChangeEvent) {
    this.router.navigate([event.nextId]);
  }
}
