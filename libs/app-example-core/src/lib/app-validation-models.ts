export interface User {
    firstName: string
    lastName: string
    email: string
    id: string
    // TODO: add more fields
}

export interface Requirement {
    id: string
    date: Date
    description: string
    equipment: string
    market: string
    product: string
    revision: string
    title: string

    created_at: Date
    updated_at: Date
}

export interface ApprovalDocument {
    id: string
    author: User
    date_due: Date
    draft_number: string
    requirement: Requirement
    requirement_version: string
    resolution: string
    reviewer_emails: string[]
    type: 'Parallel' | 'Serial'

    created_at: Date
    updated_at: Date
}

export interface TestProtocol {
    id: string
    test_protocol_steps: TestProtocolStep[]
    test_protocol_steps_ids: string[]
}

export interface TestProtocolStep {
    id: string
    description: string
    evidence_required: boolean
    next_step_id: string | null
    order: number
    parent_step_id: string | null
    previous_step_id: string | null
    requirement_ids: string[]
    result_actual_config: string
    result_expected: string
    step: string
    test_protocol_id: string

    created_at: Date
    updated_at: Date
}

export interface ExecutionTest {
    id: string
    author: User
    author_id: string
    date: Date
    execution_test_steps: ExecutionTestStep[]
    execution_test_steps_ids: string[]
    test_protocol: TestProtocol
    test_protocol_id: string

    created_at: Date
    updated_at: Date
}

export interface ExecutionTestStep {
    id: string
    assignments: string[] // TODO: get clarification
    description: string
    deviation_id: string | null
    evidence_media_ids: string[]
    execution_test_id: string
    next_step_id: string | null
    parent_step_id: string | null
    passed: boolean
    previous_step_id: string | null
    requirement_ids: string[]
    result_actual: string
    result_expected: string
    signature: string
    step: string
    test_protocol_step_id: string

    created_at: Date
    updated_at: Date
}

export interface EvidenceMedia {
    id: string
    description: string
    filename: string
    filesize: number
    filetype: string
    uploaded_at: Date
    uploaded_by: User
    url: string

    created_at: Date
    updated_at: Date
}

export interface Deviation {
    id: string
    category: 'Low' | 'Medium' | 'High'
    description: string
    execution_test_step_id: string
    parent_deviation_id: string | null // child: DEV-S2.1-001 parent: DEV-S2-001
    resolution: string
    retest_extra_steps_ids: string[]
    retest_extra_steps: TestProtocolStep[]
    title: string

    created_at: Date
    updated_at: Date
}

export interface Review {
    id: string
    requirement_id: string
    reviewer_verdict_id: string

    created_at: Date
    updated_at: Date
}

export interface ReviewVerdict {
    id: string
    review_id: string
    reviewer_user_id: string
    approved: boolean
    comment: string
}
