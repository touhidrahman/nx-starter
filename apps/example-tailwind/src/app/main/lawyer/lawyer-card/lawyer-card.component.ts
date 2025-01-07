import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Lawyer } from '@myorg/app-example-models';
import { PrimeModules } from '@myorg/prime-modules';

@Component({
  selector: 'app-lawyer-card',
  imports: [CommonModule, PrimeModules],
  templateUrl: './lawyer-card.component.html',
  styleUrl: './lawyer-card.component.css'
})
export class LawyerCardComponent {
  lawyer = input.required<Lawyer>()

}
