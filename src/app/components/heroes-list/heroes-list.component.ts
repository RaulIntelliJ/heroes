import { Component, computed, signal } from '@angular/core';
import { HeroesService } from '../../service/heroes.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FilterComponent } from "../filter/filter.component";
import { CardsComponent } from "../cards/cards.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-heroes-list',
    standalone: true,
    templateUrl: './heroes-list.component.html',
    styleUrl: './heroes-list.component.scss',
    imports: [MatIconModule, MatCardModule, MatButtonModule, FilterComponent, CardsComponent, MatPaginatorModule]
})
export class HeroesListComponent {
  pageSize = 6;
  pageNumber = signal(0);

  heroes = computed(() => {
    const startIndex = this.pageNumber() * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.heroesService.allHeroes().slice(startIndex, endIndex);
  });

  constructor(
    public heroesService: HeroesService,
    private router: Router
  ) {}

  handlePageEvent(e: PageEvent) {
    this.pageNumber.set(e.pageIndex);
  }

  onFilter(searchParam: string) {
    this.heroesService.getByName(searchParam);
  }

  redirectToCreate() {
    this.router.navigateByUrl('form')
  }
}
