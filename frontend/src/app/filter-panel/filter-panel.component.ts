import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../data/entities.service';
import { Category } from '../data/types';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  constructor(public entities: EntitiesService) { }

  ngOnInit(): void {
  }

  public buttonClass(category: Category) {
    if (category.selected) {
      return "btn";
    } else {
      return "btn-flat";
    }
  }

  public toggleCategory(category: Category) {
    this.entities.toggleCategory(category.slug);
  }

  public selectAllCategories() {
    this.entities.selectAllCategories();
  }

  public deselectAllCategories() {
    this.entities.deselectAllCategories();
  }

}
