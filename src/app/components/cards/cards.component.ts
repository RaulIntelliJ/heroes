import { Component, Input, Signal, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Hero } from '../../models/hero';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {
  MatDialog
} from '@angular/material/dialog';
import { HeroesService } from '../../service/heroes.service';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  constructor(
    private router: Router, 
    public dialog: MatDialog, 
    public heroesService: HeroesService) {}

  delete(id: number, name: string) {
    const deleteDialog = this.dialog.open(DeleteDialogComponent, {
      width: '250px', 
      enterAnimationDuration: '0ms', 
      exitAnimationDuration: '0ms'
    });

    deleteDialog.componentInstance.name = name;

    deleteDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.delete(id);
      }
    })
  }

  update(id: number) {
    this.router.navigate(['form', id])
  }

}
