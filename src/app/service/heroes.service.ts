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
    const heroes = this.getHeroesFromLocalStorage();
    if (heroes) {
      this.heroes.set(heroes);
    } else {
      this.heroes.set((heroesData as any).default);
      this.setHeroesInLocalStorage();
    }
  }

  getById(id: number) {
    return this.heroes()
      .find((hero) => hero.id === id);
  }

  getByName(searchParam: string) {
    const allHeroes = this.getHeroesFromLocalStorage();
    if (searchParam.trim() === '') {
      this.heroes.set(allHeroes);
    } else {
      this.heroes.set(allHeroes
        .filter((hero: Hero) => hero.name.toLocaleLowerCase().includes(searchParam.toLocaleLowerCase())));
    }
  }

  create(hero: Hero) {
    hero.id = this.generateId()
    this.heroes().push(hero);
    this.setHeroesInLocalStorage();
  }

  generateId(): number {
    const lastId = this.heroes().reduce((maxId, hero) => {
      return hero.id > maxId ? hero.id : maxId;
    }, this.heroes()[0].id);

    return lastId + 1;
  }
    
  edit (heroUpdated: Hero) {
    const index = this.heroes().findIndex(hero => hero.id === heroUpdated.id);
    this.heroes()[index] = heroUpdated;
  }
      
  delete (id: number) {
    this.heroes.set(this.heroes().filter(hero => hero.id !== id));
    this.setHeroesInLocalStorage();
  }

  //Save heroes in LS to get data persistance
  setHeroesInLocalStorage() {
    window.localStorage.setItem('heroes', JSON.stringify(this.heroes()));
  }

  getHeroesFromLocalStorage() {
    const heroes = window.localStorage.getItem('heroes');
    return heroes ? JSON.parse(heroes) : undefined;
  }
}
