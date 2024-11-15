import { z } from 'zod'
import { db } from '../../core/db/db'
import { InviteUser } from './invite.schema'
import { invitesTable } from '../../core/db/schema'

export async function createInvite(invite: InviteUser, userId: string) {
    return db
        .insert(invitesTable)
        .values({ ...invite, invitedBy: userId })
        .returning()
}
