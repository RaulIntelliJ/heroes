import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  filterText: string = '';
  @Output() onFilter: EventEmitter<string> = new EventEmitter();

  filter() {
    this.onFilter.emit(this.filterText);
  }
}
