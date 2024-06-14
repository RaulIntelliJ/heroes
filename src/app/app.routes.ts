import { Routes } from '@angular/router';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';

export const routes: Routes = [
    { path: 'form', component: HeroFormComponent},
    { path: 'form/:id', component: HeroFormComponent},
    { path: 'heroes', component: HeroesListComponent },
    { path: '', redirectTo: '/heroes', pathMatch: 'full' }
];
