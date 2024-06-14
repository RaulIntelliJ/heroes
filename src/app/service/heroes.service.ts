import { Injectable, computed, signal } from '@angular/core';
import { Hero } from '../models/hero';

import * as heroesData from '../data/superheroes.json';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  allHeroes = signal([] as Hero[])
  heroes = signal([] as Hero[]);
  heroesCount = computed(() => this.allHeroes().length);

  constructor() { 
    this.getAll();
  }

  getAll() {
    this.allHeroes.set(this.getHeroesFromLocalStorage());
    if (!this.allHeroes()?.length) {
      this.allHeroes.set((heroesData as any).default);
      this.heroes.set((heroesData as any).default);
      this.setHeroesInLocalStorage();
    }
    this.paginate(0);
  }

  getById(id: number) {
    return this.allHeroes()
      .find((hero) => hero.id === id);
  }

  getByName(searchParam: string) {
    if (searchParam.trim() === '') {
      this.heroes.set(this.allHeroes());
    } else {
      this.heroes.set(this.allHeroes()
        .filter((hero: Hero) => hero.name.toLocaleLowerCase().includes(searchParam.toLocaleLowerCase())));
    }
    if (this.heroes()?.length > 6) {
      this.paginate(0, this.heroes());
    }
  }

  create(hero: Hero) {
    hero.id = this.generateId()
    this.allHeroes.update((values) => [...values, hero]);
    this.setHeroesInLocalStorage();
  }
    
  edit (heroUpdated: Hero) {
    const index = this.allHeroes().findIndex(hero => hero.id === heroUpdated.id);
    this.allHeroes()[index] = heroUpdated;
    this.setHeroesInLocalStorage();
    this.paginate(0);
  }
      
  delete (id: number) {
    this.allHeroes.set(this.allHeroes().filter(hero => hero.id !== id));
    this.setHeroesInLocalStorage();
    this.paginate(0);
  }

  paginate(pageNumber: number, heroesToPaginate?: Hero[]) {
    const startIndex = pageNumber * 6;
    const endIndex = startIndex + 6;
    this.heroes.set((heroesToPaginate ?? this.allHeroes()).slice(startIndex, endIndex));
  }

  private generateId(): number {
    const lastId = this.allHeroes().reduce((maxId, hero) => {
      return hero.id > maxId ? hero.id : maxId;
    }, 0);

    return lastId + 1;
  }

  //Save heroes in LS to get data persistance
  setHeroesInLocalStorage() {
    window.localStorage.setItem('heroes', JSON.stringify(this.allHeroes()));
  }

  getHeroesFromLocalStorage() {
    const heroes = window.localStorage.getItem('heroes');
    return heroes ? JSON.parse(heroes) : undefined;
  }

}

