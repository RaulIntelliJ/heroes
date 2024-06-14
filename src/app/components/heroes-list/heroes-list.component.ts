import { Component, OnInit, computed, signal } from '@angular/core';
import { HeroesService } from '../../service/heroes.service';
import { Hero } from '../../models/hero';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FilterComponent } from "../filter/filter.component";
import { CardsComponent } from "../cards/cards.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-heroes-list',
    standalone: true,
    templateUrl: './heroes-list.component.html',
    styleUrl: './heroes-list.component.scss',
    imports: [MatIconModule, MatCardModule, MatButtonModule, FilterComponent, CardsComponent]
})
export class HeroesListComponent implements OnInit {
  heroesFiltered = signal([] as Hero[]);
  heroesCount = computed(() => this.heroesFiltered().length);

  constructor(
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.heroesFiltered.set(this.heroesService.getAll());
  }

  filterHeroesByName(filterText: string) {
    this.heroesFiltered.set(this.heroesService.getByName(filterText));
  }

  redirectToCreate() {
    this.router.navigateByUrl('form')
  }
}
