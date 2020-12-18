import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DirectoryService } from '../data/directory.service';
import { WallItem } from '../data/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public columns: WallItem[][] = [[], [], []];
  public activeTab?: string;
  public filterOpen = false;
  public filterLabel$?: Observable<string>;
  public addPanelOpen = false;

  constructor(
    public directory: DirectoryService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.activeTab = data.activeTab;
    });
    this.directory.mainWall$.subscribe(
      (mainWall) => {
        let column = 0;
        this.columns = [[], [], []];
        for (let item of mainWall) {
          this.columns[column].push(item);
          column = (column + 1) % 3;
        }
      }
    );

    this.filterLabel$ = this.directory.allCategories$.pipe(
      map((categories) => {
        const selectedNames = categories
          .filter((category) => category.selected)
          .map((category) => category.name);

        if (selectedNames.length === categories.length) {
          return "Todas las categorías";
        } else if (selectedNames.length === 0) {
          return "Nada";
        } else {
          return selectedNames.join(", ");
        }
      })
    );
  }

  public toggleFilter() {
    this.filterOpen = !this.filterOpen;
  }

  public openAddPanel() {
    this.addPanelOpen = true;
  }

  public closeAddPanel() {
    this.addPanelOpen = false;
  }

}
