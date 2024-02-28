import { TestBed } from '@angular/core/testing'

import { ExecutionTestApiService } from './execution-test-api.service'

describe('ExecutionTestApiService', () => {
    let service: ExecutionTestApiService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(ExecutionTestApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
