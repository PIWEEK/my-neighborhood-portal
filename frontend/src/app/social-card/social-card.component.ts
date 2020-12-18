import { Component, OnInit, Input } from '@angular/core';
import { EntitiesService } from '../data/entities.service';
import { WallItem } from '../data/types';

@Component({
  selector: 'app-social-card',
  templateUrl: './social-card.component.html',
  styleUrls: ['./social-card.component.scss']
})
export class SocialCardComponent implements OnInit {

  @Input() item!: WallItem;

  constructor(public entities: EntitiesService) { }

  ngOnInit(): void {
  }

  public typeIcon(): string {
    if (this.item) {
      return this.entities.networkTypeIcon(this.item.network);
    }
    return "";
  }
}
