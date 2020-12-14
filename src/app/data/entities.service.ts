import { Injectable } from '@angular/core';
import { SampleData } from './sample-data';
import { Entity, SocialNetwork, SocialPost, WallItem } from './types';

@Injectable({
  providedIn: 'root'
})
export class EntitiesService {

  constructor() { }

  public mainWall(): WallItem[] {
    const wall: WallItem[] = [];

    const buffer = [];
    for (let entity of SampleData) {
      const network = entity.socialNetworks.find((n) => n.isDefault);
      if (network) {
        const iterator = network.posts[Symbol.iterator]();
        buffer.push({
          entity: entity,
          network: network,
          posts: iterator,
        });
      }
    }

    while (buffer.length > 0) {
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
