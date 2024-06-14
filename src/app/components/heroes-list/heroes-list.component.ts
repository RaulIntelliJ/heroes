import { Component, computed } from '@angular/core';
import { HeroesService } from '../../service/heroes.service';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
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
    imports: [MatIconModule, MatCardModule, MatButtonModule, FilterComponent, CardsComponent, MatPaginatorModule]
})
export class HeroesListComponent {
  pageSize = 6;
  pageIndex = 0;

  constructor(
    public heroesService: HeroesService,
    private router: Router
  ) {}

  filterHeroesByName(filterText: string) {
    this.heroesService.getByName(filterText);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.heroesService.paginate(this.pageIndex)
  }

  redirectToCreate() {
    this.router.navigateByUrl('form')
  }
}
