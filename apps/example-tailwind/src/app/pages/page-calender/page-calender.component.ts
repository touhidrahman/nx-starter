import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core'
import { CommonModule } from '@angular/common'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { FullCalendarModule } from '@fullcalendar/angular'
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core'

@Component({
    selector: 'app-page-calender',
    imports: [CommonModule, FullCalendarModule],
    templateUrl: './page-calender.component.html',
    styleUrl: './page-calender.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageCalenderComponent {
    events: EventInput[] = [
        { title: 'Event 4', date: '2024-09-26' },
        { title: 'Event 1', date: '2024-09-26' },
        { title: 'Event 1', date: '2024-09-26' },

        {},
        { title: 'Event 1', date: '2024-09-1' },
        { title: 'Event 1', date: '2024-09-29' },
        { title: 'Event 1', date: '2024-09-29' },
        { title: 'Event 1', date: '2024-09-29' },
        { title: 'Event 2', date: '2024-10-01' },
    ]

    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',

        dateClick: (arg) => this.handleDateClick(arg),
        events: this.events,
        editable: true,
        droppable: true,
        eventClick: this.handleEventClick.bind(this),
        eventDrop: this.handleEventDrop.bind(this),
        eventResize: this.handleEventResize.bind(this),

        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        },
    }

    @ViewChild('calendar') calendarComponent: any

    handleDateClick(arg: DateClickArg) {
        const newEventTitle = prompt('Enter Event Title')
        if (newEventTitle) {
            const newEvent = { title: newEventTitle, start: arg.dateStr }
            this.events = [...this.events, newEvent]
            this.calendarComponent.getApi().refetchEvents()
        }
    }

    handleEventClick(arg: EventClickArg) {
        const event = arg.event
        alert(
            `Event Details:\nTitle: ${event.title}\nStart: ${event.startStr}\nEnd: ${event.endStr}`,
        )
    }

    handleEventDrop(info: any) {
        alert('Event dropped to ' + info.event.startStr)
    }

    handleEventResize(info: any) {
        alert('Event resized to end at ' + info.event.endStr)
    }
}
