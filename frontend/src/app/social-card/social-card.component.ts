import { Component, OnInit, Input } from '@angular/core';
import { WallItem } from '../data/types';

@Component({
  selector: 'app-social-card',
  templateUrl: './social-card.component.html',
  styleUrls: ['./social-card.component.scss']
})
export class SocialCardComponent implements OnInit {

  @Input() item!: WallItem;

  constructor() { }

  ngOnInit(): void {
  }

  public typeIcon(): string {
    if (this.item) {
      if (this.item.network.networkType === "facebook") {
        return "/assets/img/network-facebook.png";
      }
      if (this.item.network.networkType === "blog") {
        return "/assets/img/network-rss.png";
      }
    }
    return "";
  }
}
