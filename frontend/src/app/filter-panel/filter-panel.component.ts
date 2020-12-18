import { Component, OnInit } from '@angular/core';
import { DirectoryService } from '../data/directory.service';
import { Category } from '../data/types';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent implements OnInit {

  constructor(public directory: DirectoryService) { }

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
    this.directory.toggleCategory(category.slug);
  }

  public selectAllCategories() {
    this.directory.selectAllCategories();
  }

  public deselectAllCategories() {
    this.directory.deselectAllCategories();
  }

}
