import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { Hero } from '../models/hero';

import * as heroesData from '../data/superheroes.json';

fdescribe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);

    // Clear local storage before each test
    window.localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with heroes from JSON if local storage is empty', () => {
    service.getAll();
    expect(service.allHeroes()).toEqual((heroesData as any).default);
  });

  it('should initialize with heroes from local storage if available', () => {
    const heroes: Hero[] = [
      { id: 1, name: 'Hero One', image: '', iconImage: '' },
      { id: 2, name: 'Hero Two' , image: '', iconImage: ''}
    ];
    window.localStorage.setItem('heroes', JSON.stringify(heroes));
    service.getAll();
    expect(service.allHeroes()).toEqual(heroes);
  });

  it('should return a hero by ID', () => {
    const hero = { id: 1, name: 'Hero One' } as Hero;
    service.allHeroes.set([hero]);
    expect(service.getById(1)).toEqual(hero);
  });

  it('should return undefined for a non-existing hero ID', () => {
    service.allHeroes.set([]);
    expect(service.getById(1)).toBeUndefined();
  });

  it('should filter heroes by name', () => {
    const heroes: Hero[] = [
      { id: 1, name: 'Hero One', image: '', iconImage: '' },
      { id: 2, name: 'Another Hero', image: '', iconImage: '' }
    ];
    service.allHeroes.set(heroes);
    service.getByName('Hero');
    expect(service.heroes()).toEqual(heroes);
    service.getByName('One');
    expect(service.heroes()).toEqual([heroes[0]]);
  });

  it('should create a new hero', () => {
    service.allHeroes.set([]);
    const newHero = { name: 'New Hero' } as Hero;
    service.create(newHero);
    expect(service.allHeroes().length).toBe(1);
    expect(service.allHeroes()[0].id).toBe(1);
  });

  it('should edit an existing hero', () => {
    const hero = { id: 1, name: 'Hero One' } as Hero;
    service.allHeroes.set([hero]);
    const updatedHero = { id: 1, name: 'Updated Hero' } as Hero;
    service.edit(updatedHero);
    expect(service.allHeroes()[0].name).toBe('Updated Hero');
  });

  it('should delete a hero by ID', () => {
    const hero = { id: 1, name: 'Hero One' } as Hero;
    service.allHeroes.set([hero]);
    service.delete(1);
    expect(service.allHeroes().length).toBe(0);
  });

  it('should paginate heroes', () => {
    const heroes: Hero[] = [
      { id: 1, name: 'Hero One', image: '', iconImage: '' },
      { id: 2, name: 'Hero Two', image: '', iconImage: '' },
      { id: 3, name: 'Hero Three', image: '', iconImage: '' },
      { id: 4, name: 'Hero Four', image: '', iconImage: '' },
      { id: 5, name: 'Hero Five', image: '', iconImage: '' },
      { id: 6, name: 'Hero Six', image: '', iconImage: '' },
      { id: 7, name: 'Hero Seven', image: '', iconImage: '' }
    ];
    service.allHeroes.set(heroes);
    service.paginate(0);
    expect(service.heroes()).toEqual(heroes.slice(0, 6));
    service.paginate(1);
    expect(service.heroes()).toEqual(heroes.slice(6, 7));
  });

  it('should save and retrieve heroes from local storage', () => {
    const heroes: Hero[] = [
      { id: 1, name: 'Hero One' , image: '', iconImage: ''},
      { id: 2, name: 'Hero Two' , image: '', iconImage: ''}
    ];
    service.allHeroes.set(heroes);
    service.setHeroesInLocalStorage();
    const storedHeroes = service.getHeroesFromLocalStorage();
    expect(storedHeroes).toEqual(heroes);
  });
});
