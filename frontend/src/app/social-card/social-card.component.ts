import { Component, OnInit, Input } from '@angular/core';
import { DirectoryService } from '../data/directory.service';
import { WallItem } from '../data/types';

@Component({
  selector: 'app-social-card',
  templateUrl: './social-card.component.html',
  styleUrls: ['./social-card.component.scss']
})
export class SocialCardComponent implements OnInit {

  @Input() item!: WallItem;

  constructor(public directory: DirectoryService) { }

  ngOnInit(): void {
  }

  public typeIcon(): string {
    if (this.item) {
      return this.directory.networkTypeIcon(this.item.network);
    }
    return "";
  }
}
