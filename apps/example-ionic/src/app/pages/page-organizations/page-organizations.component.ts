import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule, IonItem, IonRow, IonText } from '@ionic/angular'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'

@Component({
    selector: 'myorg-page-organizations',
    imports: [CommonModule, IonicModule],
    templateUrl: './page-organizations.component.html',
    styleUrl: './page-organizations.component.scss',
})
export class PageOrganizationsComponent {
    isModalOpen = false
    selectedImage: string | null = null

    setOpen(isOpen: boolean) {
        this.isModalOpen = isOpen
    }

    async pickImage() {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: false,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Photos,
            })

            this.selectedImage = image.dataUrl ?? null
        } catch (error) {
            console.error('Image picking failed:', error)
        }
    }
}
