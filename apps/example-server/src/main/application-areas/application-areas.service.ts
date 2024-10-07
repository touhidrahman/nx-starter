import { Injectable } from '@angular/core'
import { db } from '../../core/db/db'
import { getTableColumns, eq } from 'drizzle-orm'
import { applicationAreasTable } from '../../core/db/schema'
import {
    InsertApplicationArea,
    SelectApplicationArea,
    zInsertApplicationArea,
    zUpdateApplicationArea,
} from './application-areas.schema'

export class ApplicationAreasService {
    // List all application areas
    async listAllApplicationAreas(): Promise<SelectApplicationArea[]> {
        return await db
            .select({ ...getTableColumns(applicationAreasTable) })
            .from(applicationAreasTable)
    }

    // Find one application area by ID
    async findApplicationAreaById(
        id: string,
    ): Promise<SelectApplicationArea | null> {
        const applicationAreas = await db
            .select({ ...getTableColumns(applicationAreasTable) })
            .from(applicationAreasTable)
            .where(eq(applicationAreasTable.id, id))
            .limit(1)

        if (applicationAreas.length === 0) {
            return null
        }

        return applicationAreas[0]
    }

    // Create a new application area
    async createApplicationArea(
        data: InsertApplicationArea,
    ): Promise<SelectApplicationArea> {
        const parsedData = zInsertApplicationArea.parse(data)

        const [newApplicationArea] = await db
            .insert(applicationAreasTable)
            .values(parsedData)
            .returning()

        return newApplicationArea
    }

    // Update an application area
    async updateApplicationArea(
        id: string,
        data: Partial<InsertApplicationArea>,
    ): Promise<SelectApplicationArea | null> {
        const parsedData = zUpdateApplicationArea.parse(data)

        const [updatedApplicationArea] = await db
            .update(applicationAreasTable)
            .set(parsedData)
            .where(eq(applicationAreasTable.id, id))
            .returning()

        return updatedApplicationArea || null
    }

    // Delete an application area
    async deleteApplicationArea(id: string): Promise<void> {
        await db
            .delete(applicationAreasTable)
            .where(eq(applicationAreasTable.id, id))
    }
}

export const applicationAreasService = new ApplicationAreasService()
