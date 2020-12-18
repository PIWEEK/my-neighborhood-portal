import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { share, map, combineLatest } from 'rxjs/operators';
import { Entity, Category, SocialNetwork, SocialPost, WallItem } from './types';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  public allEntities$: Observable<Entity[]>;
  public selectedEntities$ = new ReplaySubject<Entity[]>(1);
  public allCategories$ = new ReplaySubject<Category[]>(1);
  public mainWall$ = new ReplaySubject<WallItem[]>(1);

  private currentCategories: Category[] = [];

  constructor(
    private http: HttpClient,
  ) {
    this.allEntities$ = this.http.get<Entity[]>("/api/entities/")
      .pipe(share());

    this.http.get<Category[]>("/api/categories/")
      .subscribe((categories) => {
        this.currentCategories = this.initializeCategories(categories);
        this.allCategories$.next(this.currentCategories);
      });

    this.allEntities$.pipe(
      combineLatest(this.allCategories$),
      map(([entities, categories]) => this.filterEntities(entities, categories))
    ).subscribe((entities) => {
      this.selectedEntities$.next(entities);
    });

    this.selectedEntities$.pipe(
      map((entities) => this.buildMainWall(entities))
    ).subscribe((mainWall) => {
      this.mainWall$.next(mainWall);
    });
  }

  public toggleCategory(slug: string) {
    for (let category of this.currentCategories) {
      if (category.slug === slug) {
        category.selected = !category.selected;
        this.allCategories$.next(this.currentCategories);
        break;
      }
    }
  }

  public selectAllCategories() {
    for (let category of this.currentCategories) {
      category.selected = true;
    }
    this.allCategories$.next(this.currentCategories);
  }

  public deselectAllCategories() {
    for (let category of this.currentCategories) {
      category.selected = false;
    }
    this.allCategories$.next(this.currentCategories);
  }

  public getEntity$(id: string): Observable<Entity | undefined> {
    return this.allEntities$.pipe(
      map((entities) => {
        return entities.find((entity) => String(entity.id) === id);
      })
    );
  }

  public networkTypeIcon(network: SocialNetwork): string {
    if (network.networkType === "facebook") {
      return "/assets/img/network-facebook.png";
    }
    if (network.networkType === "twitter") {
      return "/assets/img/network-twitter.png";
    }
    if (network.networkType === "instagram") {
      return "/assets/img/network-instagram.png";
    }
    if (network.networkType === "blog") {
      return "/assets/img/network-rss.png";
    }
    return "";
  }

  public singleWall(entity: Entity, network: SocialNetwork): WallItem[] {
    return network.posts.map((post) => (
      {
        entity: entity,
        network: network,
        post: post,
      }
    ));
  }

  private initializeCategories(categories: Category[]): Category[] {
    for (let category of categories) {
      category.selected = true;
    }
    return categories;
  }

  private filterEntities(entities: Entity[], categories: Category[]): Entity[] {
    return entities.filter((entity) => this.isEntitySelected(entity, categories));
  }

  private buildMainWall(entities: Entity[]): WallItem[] {
    const wall: WallItem[] = [];

    const buffer = [];
    for (let entity of entities) {
      const network = entity.networks.find((n) => n.isDefault);
      if (network) {
        const iterator = network.posts[Symbol.iterator]();
        buffer.push({
          entity: entity,
          network: network,
          posts: iterator,
        });
      }
    }

    let counter = 0;
    while (buffer.length > 0 && counter < 21) {
      counter += 1;
      const index = Math.floor(Math.random() * buffer.length);
      const post = buffer[index].posts.next();
      if (post.done) {
        buffer.splice(index, 1);
      } else {
        wall.push({
          entity: buffer[index].entity,
          network: buffer[index].network,
          post: post.value,
        });
      }
    }

    return wall;
  }

  private isEntitySelected(entity: Entity, categories: Category[]): boolean {
    for (let cat1 of entity.categories) {
      for (let cat2 of categories) {
        if ((cat1.slug === cat2.slug) && cat2.selected) {
          return true;
        }
      }
    }
    return false;
  }
}
