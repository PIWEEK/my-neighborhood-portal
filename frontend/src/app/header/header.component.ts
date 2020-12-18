import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() newEntityEvent = new EventEmitter<void>();

  public isMenuOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  public openMenu() {
    this.isMenuOpen = true;
  }

  public closeMenu() {
    this.isMenuOpen = false;
  }

  public newEntity() {
    this.newEntityEvent.emit();
  }

}
