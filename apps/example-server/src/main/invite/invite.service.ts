import { z } from 'zod'
import { db } from '../../core/db/db'
import { InviteDto } from './invite.schema'
import { invitesTable } from '../../core/db/schema'

export async function createInvite(invite: InviteDto, userId: number) {
    return db
        .insert(invitesTable)
        .values({ ...invite, invitedBy: userId })
        .returning()
}
