import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../data/entities.service';
import { WallItem } from '../data/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public columns: WallItem[][] = [[], [], []];
  public currentTab = 1;
  public filterOpen = false;

  constructor(public entities: EntitiesService) { }

  ngOnInit(): void {
    this.entities.mainWall$.subscribe(
      (mainWall) => {
        let column = 0;
        this.columns = [[], [], []];
        for (let item of mainWall) {
          this.columns[column].push(item);
          column = (column + 1) % 3;
        }
      }
    );
  }

  public setTab(tab: number) {
    this.currentTab = tab;
  }

  public toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

}
