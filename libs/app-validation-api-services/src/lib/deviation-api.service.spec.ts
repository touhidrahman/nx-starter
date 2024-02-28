import { TestBed } from '@angular/core/testing'

import { DeviationApiService } from './deviation-api.service'

describe('DeviationApiService', () => {
    let service: DeviationApiService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(DeviationApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
