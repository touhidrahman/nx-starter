import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-page-lawyers',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './page-lawyers.component.html',
    styleUrl: './page-lawyers.component.scss',
})
export class PageLawyersComponent {
    experience = [
        {
            img: 'https://s3-alpha-sig.figma.com/img/7f31/76d1/5ddef01d39f33b711ad7da10be137285?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VA2HZEAbbEJULoST4fahVqtpb59-lMmb~CrvBlk9IVJZfIaK9ZC1uHQkjmUiBkMaQvtpi0xjRFNvHZK57KSAg7UYJ23KvTDSjinimh6dnBGUFHdm-X~4yto36xTrhKtP9Dz59jFik6m67YoBEy~bKnBscGXHallAfFRP-AJCWmq8uPv9-ZEUFq8jIAsN1Rl6rOud7v5P96mmrEnILid0OndPOAEm~CD~ivuKgoLmlRDhfiz8mU8bkCanugztmobaXxio2vDCaLivSnNSx1gHWk3Rw6tGX6w8c3PU8Ntva1x1VHEZnXHzgcTniU9tRVes7EIZ9PC-P4WKp1Sek9qwfg__',
            content: '15+ years in corporate law',
            bg: '#fffbab',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/5757/6100/113cda33681365945a634b5cdd83d3d8?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bekQYYcqYEY1dxfwd3z0iZ-e~RjOsL3OmctJ634VO-mmJrqX8x3BkaEUYGYph~jVa6xz~n-0QoGt6iKSiExvs-NuG7B0-6BKAWIrjJDSyQYSIG6nMFYqE-BEzZJwxbB~bFZFuC4lX4~HpWtYy38A8Vcf9zjY4XFMCoTDra8C~4p4WOfeFMUdQuLvYLoDjJhJ4SAzcR0gfPnhPC3~lw9Y8gtlIDUVDjb0mMjv3bD~rTcnyBW0CK-NLMia5thtdOEuw6pcAyX1iSOinQRjWiNXjIEzJzMfshTiy58yFe0bKDFsKbRx3k7mIy3kU03AtGXe2JwsZU6Avm2Ex4OPWEYDLQ__',
            content: '10+ years in corporate law',
            bg: '#BAFFEB',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/e632/dc20/86efa3df337e8c215dd8095476bb6513?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jGdpjP4VlIrvTTqnhyQLQCrno4O6YdJb~-rvJP-m5i2zPPunIInJJjdMDHcsdUkm-nbs8ggJxm2fE5RXyg55NJs2EWMZS1m7GJvkGvZNhWL2BnW2hPnJPKCO8Usw5mS3uIdd3XcOSrqqaGu9dzG8pOswu~IG5HXdiIVhgJfiKijYxwhAJNZRuvac6s4XF8O2VRGtCeyGV3zCupRqe2M94FJ~J5ACjCNTh6bTuyCvlrChWPkkpQjBBeYr6NHvcxzg-ebhYjaoDop5lgygzJkQ9kdES5CT5mSqtRjIWNuHx1y2bmQrnZ83YoALK0ZPXiDOa-O~HT1P7CkkWVdpsB~Rtw__',
            content: '5+ years in corporate law',
            bg: '#C6FFAB',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/7f31/76d1/5ddef01d39f33b711ad7da10be137285?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VA2HZEAbbEJULoST4fahVqtpb59-lMmb~CrvBlk9IVJZfIaK9ZC1uHQkjmUiBkMaQvtpi0xjRFNvHZK57KSAg7UYJ23KvTDSjinimh6dnBGUFHdm-X~4yto36xTrhKtP9Dz59jFik6m67YoBEy~bKnBscGXHallAfFRP-AJCWmq8uPv9-ZEUFq8jIAsN1Rl6rOud7v5P96mmrEnILid0OndPOAEm~CD~ivuKgoLmlRDhfiz8mU8bkCanugztmobaXxio2vDCaLivSnNSx1gHWk3Rw6tGX6w8c3PU8Ntva1x1VHEZnXHzgcTniU9tRVes7EIZ9PC-P4WKp1Sek9qwfg__',
            content: '20+ years in corporate law',
            bg: '#FFBCAB',
        },

        {
            img: 'https://s3-alpha-sig.figma.com/img/5757/6100/113cda33681365945a634b5cdd83d3d8?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bekQYYcqYEY1dxfwd3z0iZ-e~RjOsL3OmctJ634VO-mmJrqX8x3BkaEUYGYph~jVa6xz~n-0QoGt6iKSiExvs-NuG7B0-6BKAWIrjJDSyQYSIG6nMFYqE-BEzZJwxbB~bFZFuC4lX4~HpWtYy38A8Vcf9zjY4XFMCoTDra8C~4p4WOfeFMUdQuLvYLoDjJhJ4SAzcR0gfPnhPC3~lw9Y8gtlIDUVDjb0mMjv3bD~rTcnyBW0CK-NLMia5thtdOEuw6pcAyX1iSOinQRjWiNXjIEzJzMfshTiy58yFe0bKDFsKbRx3k7mIy3kU03AtGXe2JwsZU6Avm2Ex4OPWEYDLQ__',
            content: '10+ years in corporate law',
            bg: '#c6ffab',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/e632/dc20/86efa3df337e8c215dd8095476bb6513?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jGdpjP4VlIrvTTqnhyQLQCrno4O6YdJb~-rvJP-m5i2zPPunIInJJjdMDHcsdUkm-nbs8ggJxm2fE5RXyg55NJs2EWMZS1m7GJvkGvZNhWL2BnW2hPnJPKCO8Usw5mS3uIdd3XcOSrqqaGu9dzG8pOswu~IG5HXdiIVhgJfiKijYxwhAJNZRuvac6s4XF8O2VRGtCeyGV3zCupRqe2M94FJ~J5ACjCNTh6bTuyCvlrChWPkkpQjBBeYr6NHvcxzg-ebhYjaoDop5lgygzJkQ9kdES5CT5mSqtRjIWNuHx1y2bmQrnZ83YoALK0ZPXiDOa-O~HT1P7CkkWVdpsB~Rtw__',
            content: '10+ years in corporate law',
            bg: '#BAFFEB',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/7f31/76d1/5ddef01d39f33b711ad7da10be137285?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VA2HZEAbbEJULoST4fahVqtpb59-lMmb~CrvBlk9IVJZfIaK9ZC1uHQkjmUiBkMaQvtpi0xjRFNvHZK57KSAg7UYJ23KvTDSjinimh6dnBGUFHdm-X~4yto36xTrhKtP9Dz59jFik6m67YoBEy~bKnBscGXHallAfFRP-AJCWmq8uPv9-ZEUFq8jIAsN1Rl6rOud7v5P96mmrEnILid0OndPOAEm~CD~ivuKgoLmlRDhfiz8mU8bkCanugztmobaXxio2vDCaLivSnNSx1gHWk3Rw6tGX6w8c3PU8Ntva1x1VHEZnXHzgcTniU9tRVes7EIZ9PC-P4WKp1Sek9qwfg__',
            content: '10+ years in corporate law',
            bg: '#FFBCAB',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/e632/dc20/86efa3df337e8c215dd8095476bb6513?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jGdpjP4VlIrvTTqnhyQLQCrno4O6YdJb~-rvJP-m5i2zPPunIInJJjdMDHcsdUkm-nbs8ggJxm2fE5RXyg55NJs2EWMZS1m7GJvkGvZNhWL2BnW2hPnJPKCO8Usw5mS3uIdd3XcOSrqqaGu9dzG8pOswu~IG5HXdiIVhgJfiKijYxwhAJNZRuvac6s4XF8O2VRGtCeyGV3zCupRqe2M94FJ~J5ACjCNTh6bTuyCvlrChWPkkpQjBBeYr6NHvcxzg-ebhYjaoDop5lgygzJkQ9kdES5CT5mSqtRjIWNuHx1y2bmQrnZ83YoALK0ZPXiDOa-O~HT1P7CkkWVdpsB~Rtw__',
            content: '10+ years in corporate law',
            bg: '#BAFFEB',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/5757/6100/113cda33681365945a634b5cdd83d3d8?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bekQYYcqYEY1dxfwd3z0iZ-e~RjOsL3OmctJ634VO-mmJrqX8x3BkaEUYGYph~jVa6xz~n-0QoGt6iKSiExvs-NuG7B0-6BKAWIrjJDSyQYSIG6nMFYqE-BEzZJwxbB~bFZFuC4lX4~HpWtYy38A8Vcf9zjY4XFMCoTDra8C~4p4WOfeFMUdQuLvYLoDjJhJ4SAzcR0gfPnhPC3~lw9Y8gtlIDUVDjb0mMjv3bD~rTcnyBW0CK-NLMia5thtdOEuw6pcAyX1iSOinQRjWiNXjIEzJzMfshTiy58yFe0bKDFsKbRx3k7mIy3kU03AtGXe2JwsZU6Avm2Ex4OPWEYDLQ__',
            content: '15+ years in corporate law',
            bg: '#fffbab',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/e632/dc20/86efa3df337e8c215dd8095476bb6513?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jGdpjP4VlIrvTTqnhyQLQCrno4O6YdJb~-rvJP-m5i2zPPunIInJJjdMDHcsdUkm-nbs8ggJxm2fE5RXyg55NJs2EWMZS1m7GJvkGvZNhWL2BnW2hPnJPKCO8Usw5mS3uIdd3XcOSrqqaGu9dzG8pOswu~IG5HXdiIVhgJfiKijYxwhAJNZRuvac6s4XF8O2VRGtCeyGV3zCupRqe2M94FJ~J5ACjCNTh6bTuyCvlrChWPkkpQjBBeYr6NHvcxzg-ebhYjaoDop5lgygzJkQ9kdES5CT5mSqtRjIWNuHx1y2bmQrnZ83YoALK0ZPXiDOa-O~HT1P7CkkWVdpsB~Rtw__',
            content: '10+ years in corporate law',
            bg: '#BAFFEB',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/e632/dc20/86efa3df337e8c215dd8095476bb6513?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jGdpjP4VlIrvTTqnhyQLQCrno4O6YdJb~-rvJP-m5i2zPPunIInJJjdMDHcsdUkm-nbs8ggJxm2fE5RXyg55NJs2EWMZS1m7GJvkGvZNhWL2BnW2hPnJPKCO8Usw5mS3uIdd3XcOSrqqaGu9dzG8pOswu~IG5HXdiIVhgJfiKijYxwhAJNZRuvac6s4XF8O2VRGtCeyGV3zCupRqe2M94FJ~J5ACjCNTh6bTuyCvlrChWPkkpQjBBeYr6NHvcxzg-ebhYjaoDop5lgygzJkQ9kdES5CT5mSqtRjIWNuHx1y2bmQrnZ83YoALK0ZPXiDOa-O~HT1P7CkkWVdpsB~Rtw__',
            content: '10+ years in corporate law',
            bg: '#FFBCAB',
        },
        {
            img: 'https://s3-alpha-sig.figma.com/img/5757/6100/113cda33681365945a634b5cdd83d3d8?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bekQYYcqYEY1dxfwd3z0iZ-e~RjOsL3OmctJ634VO-mmJrqX8x3BkaEUYGYph~jVa6xz~n-0QoGt6iKSiExvs-NuG7B0-6BKAWIrjJDSyQYSIG6nMFYqE-BEzZJwxbB~bFZFuC4lX4~HpWtYy38A8Vcf9zjY4XFMCoTDra8C~4p4WOfeFMUdQuLvYLoDjJhJ4SAzcR0gfPnhPC3~lw9Y8gtlIDUVDjb0mMjv3bD~rTcnyBW0CK-NLMia5thtdOEuw6pcAyX1iSOinQRjWiNXjIEzJzMfshTiy58yFe0bKDFsKbRx3k7mIy3kU03AtGXe2JwsZU6Avm2Ex4OPWEYDLQ__',
            content: '10+ years in corporate law',
            bg: '#BAFFEB',
        },
    ]
}
