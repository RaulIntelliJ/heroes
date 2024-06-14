import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HeroesService } from '../../service/heroes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Hero } from '../../models/hero';
import { CapitalizeFirstDirective } from '../../directives/capitalize-first.directive';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, CapitalizeFirstDirective],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent{
  heroForm: FormGroup;
  hero: Hero | undefined;

  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder, 
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      subtitle: [''],
      image: ['', Validators.required],
      iconImage: ['', Validators.required],
      description: [''],
    })

    this.route.params.subscribe((params: Params) => {
      this.hero = this.heroesService.getById(Number(params['id']));
      
      this.heroForm.get('name')?.setValue(this.hero?.name);
      this.heroForm.get('subtitle')?.setValue(this.hero?.subtitle);
      this.heroForm.get('description')?.setValue(this.hero?.description);
      this.heroForm.get('image')?.setValue(this.hero?.image);
      this.heroForm.get('iconImage')?.setValue(this.hero?.iconImage);
    });
  }

  create() {
    this.heroesService.create(this.heroForm.getRawValue());
    this.redirectHome();
  }

  edit() {
    const hero = this.heroForm.getRawValue();
    hero.id = this.hero?.id;
    this.heroesService.edit(hero);
    this.redirectHome();
  }
    
  redirectHome() {
    this.router.navigateByUrl('heroes');
  }
}
