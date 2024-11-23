import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SpartanModules } from '@myorg/spartan-modules'
import { provideIcons } from '@ng-icons/core'
import {
    lucideCalendarDays,
    lucideMapPin,
    lucidePinOff,
} from '@ng-icons/lucide'

@Component({
    selector: 'app-page-home',
    standalone: true,
    imports: [
        ...SpartanModules,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
    ],
    templateUrl: './page-home.component.html',
    styleUrl: './page-home.component.scss',
    providers: [
        provideIcons({
            lucideCalendarDays,
            lucideMapPin,
            lucidePinOff,
        }),
    ],
})
export class PageHomeComponent {
    cards = [
        {
            icon: 'assets/icons/case.png',
            title: 'Total Cases',
            count: 29,
            color: 'text-green-600',
        },
        {
            icon: 'assets/icons/client.png',
            title: 'Total Clients',
            count: 45,
            color: 'text-emerald-600',
        },
        {
            icon: 'assets/icons/active.png',
            title: 'Active Cases',
            count: 11,
            color: 'text-teal-600',
        },
        {
            icon: 'assets/icons/pending.png',
            title: 'Pending Cases',
            count: 18,
            color: 'text-cyan-600',
        },
    ]

    caseCard = [
        {
            date: '29/10/2024',
            location: 'Dhaka judge court',
            caseTitle: 'Shakib vs Tamim',
            description:
                'Here are the details of the card. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            date: '30/10/2024',
            location: 'Dhaka judge court',
            caseTitle: 'Shakib vs Tamim',
            description:
                'Here are the details of the card. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            date: '12/11/2024',
            location: 'Dhaka judge court',
            caseTitle: 'Shakib vs Tamim',
            description:
                'Here are the details of the card. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            date: '30/10/2024',
            location: 'Dhaka judge court',
            caseTitle: 'Shakib vs Tamim',
            description:
                'Here are the details of the card. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
        {
            date: '12/11/2024',
            location: 'Dhaka judge court',
            caseTitle: 'Shakib vs Tamim',
            description:
                'Here are the details of the card. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        },
    ]

    pinnedCard = [
        {
            title: 'Shakib vs Tamim',
            location: 'Dhaka Judge Court',
            date: '10/12/2024',
        },
        {
            title: 'Shakib vs Tamim',
            location: 'Dhaka Judge Court',
            date: '10/12/2024',
        },
        {
            title: 'Shakib vs Tamim',
            location: 'Dhaka Judge Court',
            date: '10/12/2024',
        },
        {
            title: 'Shakib vs Tamim',
            location: 'Dhaka Judge Court',
            date: '10/12/2024',
        },
        {
            title: 'Shakib vs Tamim',
            location: 'Dhaka Judge Court',
            date: '10/12/2024',
        },
        {
            title: 'Shakib vs Tamim',
            location: 'Dhaka Judge Court',
            date: '10/12/2024',
        },
        {
            title: 'Shakib vs Tamim',
            location: 'Dhaka Judge Court',
            date: '10/12/2024',
        },

        // Add more card data as needed
    ]

    // radio = ''
    // dateControl = new FormControl()

    // @ViewChild('datePicker') datePicker!: ElementRef<HTMLInputElement>

    // constructor() {
    //     this.dateControl.valueChanges.subscribe((value) => {
    //         console.log('dateControl valueChanges', value)
    //     })
    // }

    // ngAfterViewInit(): void {}

    // openDialog() {}
}
