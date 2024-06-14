import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCapitalizeFirst]',
  standalone: true
})
export class CapitalizeFirstDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.capitalizeFirstLetter(input);
  }

  private capitalizeFirstLetter(input: HTMLInputElement) {
    let value = input.value;
    value = value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    input.value = value;
  }

}
