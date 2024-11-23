import { z } from 'zod'
import { db } from '../../core/db/db'
import { invitesTable } from '../../core/db/schema'
import { InviteDto } from './invite.schema'

export async function createInvite(invite: InviteDto, userId: string) {
    return db
        .insert(invitesTable)
        .values({ ...invite, invitedBy: userId })
        .returning()
}
