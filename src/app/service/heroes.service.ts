import { Injectable, signal } from '@angular/core';
import { Hero } from '../models/hero';

import * as heroesData from '../data/superheroes.json';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroes = signal([] as Hero[]);

  constructor() { 
    this.getAll();
  }

  getAll() {
    if (!this.heroes().length) {
      this.heroes.set((heroesData as any).default);
    }
    return this.heroes();
  }

  getById(id: number) {
    return this.heroes()
      .find((hero) => hero.id === id);
  }

  getByName(searchParam: string) {
    if (searchParam && searchParam.trim() === '') {
      return this.heroes();
    }
    return this.heroes()
      .filter((hero) => hero.name.toLocaleLowerCase().includes(searchParam.toLocaleLowerCase()));
  }

  create(hero: Hero) {
    const lastId = this.heroes().reduce((maxId, hero) => {
      return hero.id > maxId ? hero.id : maxId;
    }, this.heroes()[0].id);
    hero.id = lastId + 1;
    this.heroes.update((values) => {return [...values, hero]})
  }
}
