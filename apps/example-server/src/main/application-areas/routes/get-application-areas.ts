import { createRoute, z } from '@hono/zod-openapi';
import { eq, getTableColumns, sql, SQL } from 'drizzle-orm';
import { toInt } from 'radash';
import { OK } from 'stoker/http-status-codes';
import { AppRouteHandler } from '../../../core/core.type';
import { db } from '../../../core/db/db';
import { applicationAreasTable } from '../../../core/db/schema';
import { ApiResponse } from '../../../core/utils/api-response.util';
import { checkToken } from '../../auth/auth.middleware';
import { zSearchApplicationArea, zSelectApplicationArea } from '../application-areas.schema';

export const getApplicationAreasRoute = createRoute({
    path: '/v1/application-areas',
    method: 'get',
    tags: ['Application Area'],
    middleware: [checkToken],
    request: {
        query: zSearchApplicationArea,
    },
    responses: {
        [OK]: ApiResponse(z.array(zSelectApplicationArea), 'List of Application Areas'),
    },
});

export const getApplicationAreasHandler: AppRouteHandler<typeof getApplicationAreasRoute> = async (c) => {
    const query = c.req.valid('query');
    const conditions: SQL[] = [];

    query?.id && conditions.push(eq(applicationAreasTable.id, query?.id));
    query?.area && conditions.push(eq(applicationAreasTable.area, query?.area));
    query?.description && conditions.push(eq(applicationAreasTable.description, query?.description));

    const limit = query?.size ? toInt(query?.size) : 10;
    const offset = (query?.page ? toInt(query?.page) : 0) * limit;

    const applicationAreas = await db
        .select({ ...getTableColumns(applicationAreasTable) })
        .from(applicationAreasTable)
        .where(
            conditions.length
                ? sql`${conditions.reduce(
                      (acc, condition, index) =>
                          index === 0 ? condition : sql`${acc} AND ${condition}`,
                      sql``,
                  )}`
                : undefined,
        )
        .limit(limit)
        .offset(offset);

    return c.json({ data: applicationAreas, message: 'List of application areas' });
};
