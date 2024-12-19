import { Component } from '@angular/core'
import { register } from 'swiper/element/bundle';
register();

@Component({
    selector: 'myorg-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {
    constructor() {}
}
