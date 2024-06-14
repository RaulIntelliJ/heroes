import { Component, Input, Signal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Hero } from '../../models/hero';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() heroes: Signal<Hero[]> = signal([]);

  constructor(private router: Router) {}

  delete(id: number) {

  }

  update(id: number) {
    this.router.navigate(['form', id])
  }

}
