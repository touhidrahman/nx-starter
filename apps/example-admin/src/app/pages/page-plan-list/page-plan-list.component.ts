import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrimeModules } from '@myorg/prime-modules';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlanCreateDialogComponent } from '../../main/plan/components/plan-create-dialog/plan-create-dialog.component';

@Component({
  selector: 'app-page-plan-list',
  imports: [CommonModule, PrimeModules],
  templateUrl: './page-plan-list.component.html',
  styleUrl: './page-plan-list.component.css'
})
export class PagePlanListComponent {

  constructor(public dialogService: DialogService) { }

  ref: DynamicDialogRef | undefined

  openDialog() {
    this.ref = this.dialogService.open(PlanCreateDialogComponent, {
      header: 'Add new Plan',
      width: '70vw',
      modal: true,
      dismissableMask: false,
      closable: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    })
  }

}
