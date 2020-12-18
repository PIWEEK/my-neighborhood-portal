import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { DirectoryService } from '../data/directory.service';
import { Entity, SocialNetwork, WallItem } from '../data/types';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {

  public entity$!: Observable<Entity | undefined>;
  public currentNetwork$ = new ReplaySubject<SocialNetwork>(1);
  public currentWall$ = new ReplaySubject<WallItem[]>(1);

  constructor(
    public directory: DirectoryService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.entity$ = this.directory.getEntity$(params.id);

      this.entity$.subscribe((entity) => {
        if (entity) {
          if (entity.networks && entity.networks.length > 0) {
            this.currentNetwork$.next(entity.networks[0]);
          }
        }
      });

      combineLatest(this.entity$, this.currentNetwork$).subscribe(
        ([entity, network]) => {
          if (entity) {
            this.currentWall$.next(
              network.posts.map((post) => ({
                entity: entity,
                network: network,
                post: post,
              }))
            );
          }
        }
      );
    });
  }

  public goBack() {
    this.location.back();
  }

  public typeIcon(network: SocialNetwork) {
    return this.directory.networkTypeIcon(network);
  }

  public changeNetwork(network: SocialNetwork) {
    this.currentNetwork$.next(network);
  }
}
