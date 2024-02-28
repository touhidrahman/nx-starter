import { TestBed } from '@angular/core/testing'

import { RequirementApiService } from './requirement-api.service'

describe('RequirementApiService', () => {
    let service: RequirementApiService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(RequirementApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
