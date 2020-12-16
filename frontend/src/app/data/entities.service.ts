import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { share, map } from 'rxjs/operators';
import { Entity, SocialNetwork, SocialPost, WallItem } from './types';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  public mainWall$ = new ReplaySubject<WallItem[]>(1);
  private allEntities$: Observable<Entity[]>;

  constructor(
    private http: HttpClient,
  ) {
    this.allEntities$ = this.http.get<Entity[]>("/api/entities/")
      .pipe(share());

    this.allEntities$.pipe(
      map((entities) => this.buildMainWall(entities))
    ).subscribe((mainWall) => {
      this.mainWall$.next(mainWall);
    });
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
}
