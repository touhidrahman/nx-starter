import { TestBed } from '@angular/core/testing'

import { TestProtocolApiService } from './test-protocol-api.service'

describe('TestProtocolApiService', () => {
    let service: TestProtocolApiService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(TestProtocolApiService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
