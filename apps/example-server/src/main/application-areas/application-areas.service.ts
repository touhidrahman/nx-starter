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

// List all application areas
export const listAllApplicationAreas = async (): Promise<
    SelectApplicationArea[]
> => {
    return await db
        .select({ ...getTableColumns(applicationAreasTable) })
        .from(applicationAreasTable)
}

// Find one application area by ID
export const findApplicationAreaById = async (
    id: string,
): Promise<SelectApplicationArea | null> => {
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
export const createApplicationArea = async (
    data: InsertApplicationArea,
): Promise<SelectApplicationArea> => {
    const parsedData = zInsertApplicationArea.parse(data)

    const [newApplicationArea] = await db
        .insert(applicationAreasTable)
        .values(parsedData)
        .returning()

    return newApplicationArea
}

// Update an application area
export const updateApplicationArea = async (
    id: string,
    data: Partial<InsertApplicationArea>,
): Promise<SelectApplicationArea[]> => {
    const parsedData = zUpdateApplicationArea.parse(data)

    const application = await db
        .update(applicationAreasTable)
        .set(parsedData)
        .where(eq(applicationAreasTable.id, id))
        .returning()

    return application
}

// Delete an application area
export const deleteApplicationArea = async (id: string): Promise<void> => {
    await db
        .delete(applicationAreasTable)
        .where(eq(applicationAreasTable.id, id))
}
