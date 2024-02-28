import { TestBed } from '@angular/core/testing'

import { ApprovalApiService } from './approval-api.service'

describe('ApprovalApiService', () => {
    let service: ApprovalApiService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(ApprovalApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
