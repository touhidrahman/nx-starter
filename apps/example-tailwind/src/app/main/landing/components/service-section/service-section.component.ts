import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SectionTitleComponent } from '../../utils/section-title/section-title.component'

@Component({
    selector: 'app-service-section',
    standalone: true,
    imports: [CommonModule, SectionTitleComponent],
    templateUrl: './service-section.component.html',
    styleUrl: './service-section.component.scss',
})
export class ServiceSectionComponent {
    cardContent = [
        {
            svgPath:
                'M17.6997 20.3213L26.7998 30L30 26.5157L20.8999 16.8369L17.6997 20.3213ZM23.3418 11.9331C22.7503 11.9331 22.1132 11.8524 21.6127 11.6266L4.33771 29.9193L1.13751 26.5157L12.3761 14.5786L9.69161 11.7072L8.5996 12.8364L6.4004 10.5619V15.1754L5.33873 16.3046L0 10.5619L1.06168 9.43272H5.32356L3.2002 7.15822L8.5996 1.41551C10.3741 -0.471838 13.2255 -0.471838 15 1.41551L11.7998 4.89985L13.9383 7.15822L12.8615 8.30354L15.5763 11.1749L18.3367 8.14222C18.1244 7.60989 18.0334 6.93238 18.0334 6.33553C18.0334 3.15768 20.3994 0.657346 23.3418 0.657346C24.2366 0.657346 25.0253 0.883183 25.7381 1.33486L21.6886 5.64189L23.9636 8.06157L28.0131 3.75454C28.4378 4.5127 28.6502 5.31926 28.6502 6.33553C28.6502 9.43272 26.2993 11.9331 23.3418 11.9331Z',
            heading: 'Comprehensive Legal Services',
            description:
                'We offer a wide range of legal services across various practice areas, including corporate law, family law, personal injury, and more.',
            width: '30',
            height: '30',
            viewBox: '0 0 30 30',
        },
        {
            svgPath:
                'M16.4782 0C14.4035 0 12.5575 1.34737 11.8714 3.36842H1.77586V6.73684H4.96136L0.142269 18.5263C-0.625518 21.8947 1.77586 23.5789 5.85983 23.5789C9.94381 23.5789 12.4922 21.8947 11.5774 18.5263L6.75831 6.73684H11.8551C12.3942 8.16842 13.456 9.26316 14.8446 9.81895V28.6316H0.142269V32H32.8141V28.6316H18.1118V9.8021C19.5003 9.26316 20.5621 8.16842 21.0849 6.73684H26.198L21.3789 18.5263C20.6111 21.8947 23.0125 23.5789 27.0965 23.5789C31.1805 23.5789 33.7289 21.8947 32.8141 18.5263L27.995 6.73684H31.1805V3.36842H21.1012C20.3988 1.34737 18.5528 0 16.4782 0ZM16.4782 3.36842C16.9114 3.36842 17.3269 3.54586 17.6333 3.86172C17.9396 4.17757 18.1118 4.60595 18.1118 5.05263C18.1118 5.49931 17.9396 5.9277 17.6333 6.24355C17.3269 6.5594 16.9114 6.73684 16.4782 6.73684C16.0449 6.73684 15.6294 6.5594 15.323 6.24355C15.0167 5.9277 14.8446 5.49931 14.8446 5.05263C14.8446 4.60595 15.0167 4.17757 15.323 3.86172C15.6294 3.54586 16.0449 3.36842 16.4782 3.36842ZM5.85983 12.2105L8.31022 18.5263H3.40945L5.85983 12.2105ZM27.0965 12.2105L29.5469 18.5263H24.6461L27.0965 12.2105Z',
            heading: 'Experienced Attorneys',
            description:
                'Our team consists of seasoned attorneys with extensive knowledge and expertise in their respective fields.',
            width: '33',
            height: '32',
            viewBox: '0 0 33 32',
        },
        {
            svgPath:
                'M17 0C15.685 0 14.4238 0.500445 13.4939 1.39124C12.5641 2.28204 12.0417 3.49022 12.0417 4.75C12.0417 6.00978 12.5641 7.21796 13.4939 8.10876C14.4238 8.99955 15.685 9.5 17 9.5C18.315 9.5 19.5762 8.99955 20.5061 8.10876C21.4359 7.21796 21.9583 6.00978 21.9583 4.75C21.9583 3.49022 21.4359 2.28204 20.5061 1.39124C19.5762 0.500445 18.315 0 17 0ZM17 2.71429C17.5636 2.71429 18.1041 2.92876 18.5026 3.31053C18.9011 3.6923 19.125 4.21009 19.125 4.75C19.125 5.2899 18.9011 5.8077 18.5026 6.18947C18.1041 6.57124 17.5636 6.78571 17 6.78571C16.4364 6.78571 15.8959 6.57124 15.4974 6.18947C15.0989 5.8077 14.875 5.2899 14.875 4.75C14.875 4.21009 15.0989 3.6923 15.4974 3.31053C15.8959 2.92876 16.4364 2.71429 17 2.71429ZM7.79167 4.07143C6.85236 4.07143 5.95152 4.42889 5.28733 5.06517C4.62314 5.70146 4.25 6.56444 4.25 7.46429C4.25 8.74 5.00083 9.83929 6.0775 10.4229C6.5875 10.6943 7.16833 10.8571 7.79167 10.8571C8.415 10.8571 8.99583 10.6943 9.50583 10.4229C10.03 10.1379 10.4692 9.73071 10.795 9.24214C9.76083 7.95286 9.20833 6.37857 9.20833 4.75C9.20833 4.62786 9.20833 4.49214 9.20833 4.37C8.78333 4.18 8.30167 4.07143 7.79167 4.07143ZM26.2083 4.07143C25.6983 4.07143 25.2167 4.18 24.7917 4.37C24.7917 4.49214 24.7917 4.62786 24.7917 4.75C24.7917 6.37857 24.2392 7.95286 23.205 9.24214C23.375 9.5 23.5592 9.70357 23.7717 9.90714C23.9983 10.1107 24.225 10.2871 24.4942 10.4229C25.0042 10.6943 25.585 10.8571 26.2083 10.8571C26.8317 10.8571 27.4125 10.6943 27.9225 10.4229C28.9992 9.83929 29.75 8.74 29.75 7.46429C29.75 6.56444 29.3769 5.70146 28.7127 5.06517C28.0485 4.42889 27.1476 4.07143 26.2083 4.07143ZM17 12.2143C13.685 12.2143 7.08333 13.8021 7.08333 16.9643V19H26.9167V16.9643C26.9167 13.8021 20.315 12.2143 17 12.2143ZM6.6725 12.9607C3.93833 13.2729 0 14.6029 0 16.9643V19H4.25V16.3807C4.25 15.01 5.2275 13.87 6.6725 12.9607ZM27.3275 12.9607C28.7725 13.87 29.75 15.01 29.75 16.3807V19H34V16.9643C34 14.6029 30.0617 13.2729 27.3275 12.9607ZM17 14.9286C19.1675 14.9286 21.59 15.6071 22.9925 16.2857H11.0075C12.41 15.6071 14.8325 14.9286 17 14.9286Z',
            heading: 'Client-Centered Approach',
            description:
                'We prioritize personalized service and transparent communication, ensuring that you are informed and involved every step of the way.',
            width: '34',
            height: '19',
            viewBox: '0 0 34 19',
        },
        {
            svgPath:
                'M17.6997 20.3213L26.7998 30L30 26.5157L20.8999 16.8369L17.6997 20.3213ZM23.3418 11.9331C22.7503 11.9331 22.1132 11.8524 21.6127 11.6266L4.33771 29.9193L1.13751 26.5157L12.3761 14.5786L9.69161 11.7072L8.5996 12.8364L6.4004 10.5619V15.1754L5.33873 16.3046L0 10.5619L1.06168 9.43272H5.32356L3.2002 7.15822L8.5996 1.41551C10.3741 -0.471838 13.2255 -0.471838 15 1.41551L11.7998 4.89985L13.9383 7.15822L12.8615 8.30354L15.5763 11.1749L18.3367 8.14222C18.1244 7.60989 18.0334 6.93238 18.0334 6.33553C18.0334 3.15768 20.3994 0.657346 23.3418 0.657346C24.2366 0.657346 25.0253 0.883183 25.7381 1.33486L21.6886 5.64189L23.9636 8.06157L28.0131 3.75454C28.4378 4.5127 28.6502 5.31926 28.6502 6.33553C28.6502 9.43272 26.2993 11.9331 23.3418 11.9331Z',
            heading: 'Comprehensive Legal Services',
            description:
                'We offer a wide range of legal services across various practice areas, including corporate law, family law, personal injury, and more.',
            width: '30',
            height: '30',
            viewBox: '0 0 30 30',
        },
        {
            svgPath:
                'M16.4782 0C14.4035 0 12.5575 1.34737 11.8714 3.36842H1.77586V6.73684H4.96136L0.142269 18.5263C-0.625518 21.8947 1.77586 23.5789 5.85983 23.5789C9.94381 23.5789 12.4922 21.8947 11.5774 18.5263L6.75831 6.73684H11.8551C12.3942 8.16842 13.456 9.26316 14.8446 9.81895V28.6316H0.142269V32H32.8141V28.6316H18.1118V9.8021C19.5003 9.26316 20.5621 8.16842 21.0849 6.73684H26.198L21.3789 18.5263C20.6111 21.8947 23.0125 23.5789 27.0965 23.5789C31.1805 23.5789 33.7289 21.8947 32.8141 18.5263L27.995 6.73684H31.1805V3.36842H21.1012C20.3988 1.34737 18.5528 0 16.4782 0ZM16.4782 3.36842C16.9114 3.36842 17.3269 3.54586 17.6333 3.86172C17.9396 4.17757 18.1118 4.60595 18.1118 5.05263C18.1118 5.49931 17.9396 5.9277 17.6333 6.24355C17.3269 6.5594 16.9114 6.73684 16.4782 6.73684C16.0449 6.73684 15.6294 6.5594 15.323 6.24355C15.0167 5.9277 14.8446 5.49931 14.8446 5.05263C14.8446 4.60595 15.0167 4.17757 15.323 3.86172C15.6294 3.54586 16.0449 3.36842 16.4782 3.36842ZM5.85983 12.2105L8.31022 18.5263H3.40945L5.85983 12.2105ZM27.0965 12.2105L29.5469 18.5263H24.6461L27.0965 12.2105Z',
            heading: 'Experienced Attorneys',
            description:
                'Our team consists of seasoned attorneys with extensive knowledge and expertise in their respective fields.',
            width: '33',
            height: '32',
            viewBox: '0 0 33 32',
        },
        {
            svgPath:
                'M17 0C15.685 0 14.4238 0.500445 13.4939 1.39124C12.5641 2.28204 12.0417 3.49022 12.0417 4.75C12.0417 6.00978 12.5641 7.21796 13.4939 8.10876C14.4238 8.99955 15.685 9.5 17 9.5C18.315 9.5 19.5762 8.99955 20.5061 8.10876C21.4359 7.21796 21.9583 6.00978 21.9583 4.75C21.9583 3.49022 21.4359 2.28204 20.5061 1.39124C19.5762 0.500445 18.315 0 17 0ZM17 2.71429C17.5636 2.71429 18.1041 2.92876 18.5026 3.31053C18.9011 3.6923 19.125 4.21009 19.125 4.75C19.125 5.2899 18.9011 5.8077 18.5026 6.18947C18.1041 6.57124 17.5636 6.78571 17 6.78571C16.4364 6.78571 15.8959 6.57124 15.4974 6.18947C15.0989 5.8077 14.875 5.2899 14.875 4.75C14.875 4.21009 15.0989 3.6923 15.4974 3.31053C15.8959 2.92876 16.4364 2.71429 17 2.71429ZM7.79167 4.07143C6.85236 4.07143 5.95152 4.42889 5.28733 5.06517C4.62314 5.70146 4.25 6.56444 4.25 7.46429C4.25 8.74 5.00083 9.83929 6.0775 10.4229C6.5875 10.6943 7.16833 10.8571 7.79167 10.8571C8.415 10.8571 8.99583 10.6943 9.50583 10.4229C10.03 10.1379 10.4692 9.73071 10.795 9.24214C9.76083 7.95286 9.20833 6.37857 9.20833 4.75C9.20833 4.62786 9.20833 4.49214 9.20833 4.37C8.78333 4.18 8.30167 4.07143 7.79167 4.07143ZM26.2083 4.07143C25.6983 4.07143 25.2167 4.18 24.7917 4.37C24.7917 4.49214 24.7917 4.62786 24.7917 4.75C24.7917 6.37857 24.2392 7.95286 23.205 9.24214C23.375 9.5 23.5592 9.70357 23.7717 9.90714C23.9983 10.1107 24.225 10.2871 24.4942 10.4229C25.0042 10.6943 25.585 10.8571 26.2083 10.8571C26.8317 10.8571 27.4125 10.6943 27.9225 10.4229C28.9992 9.83929 29.75 8.74 29.75 7.46429C29.75 6.56444 29.3769 5.70146 28.7127 5.06517C28.0485 4.42889 27.1476 4.07143 26.2083 4.07143ZM17 12.2143C13.685 12.2143 7.08333 13.8021 7.08333 16.9643V19H26.9167V16.9643C26.9167 13.8021 20.315 12.2143 17 12.2143ZM6.6725 12.9607C3.93833 13.2729 0 14.6029 0 16.9643V19H4.25V16.3807C4.25 15.01 5.2275 13.87 6.6725 12.9607ZM27.3275 12.9607C28.7725 13.87 29.75 15.01 29.75 16.3807V19H34V16.9643C34 14.6029 30.0617 13.2729 27.3275 12.9607ZM17 14.9286C19.1675 14.9286 21.59 15.6071 22.9925 16.2857H11.0075C12.41 15.6071 14.8325 14.9286 17 14.9286Z',
            heading: 'Client-Centered Approach',
            description:
                'We prioritize personalized service and transparent communication, ensuring that you are informed and involved every step of the way.',
            width: '34',
            height: '19',
            viewBox: '0 0 34 19',
        },
    ]
}